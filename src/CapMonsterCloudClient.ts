import { CaptchaResult } from './CaptchaResult';
import { ClientOptions } from './ClientOptions';
import { CreateTaskResponse, CreateTaskResponseError } from './CreateTask';
import { ErrorCodeConverter } from './ErrorCodeConverter';
import { ErrorType } from './ErrorType';
import { GetBalanceError, GetBalanceResponse, GetBalanceResponseError, GetBalanceResponseSuccess } from './GetBalance';
import {
  GetResultTimeouts,
  GetTaskResultResponse,
  GetTaskResultResponseError,
  GetTaskResultResponseSuccess,
  TaskResult,
  TaskResultStatus,
  TaskResultType,
} from './GetTaskResult';
import { HttpClient, HttpStatusCode, HttpStatusError, JSONParseError } from './HttpClient';
import { AnyObject } from './Utils';
import { Task } from './Requests/Task';

export class CapmonsterCloudClientError extends Error {}

export class CapMonsterCloudClient {
  constructor(private _options: ClientOptions, private _httpClient: HttpClient) {}

  private calcJSONData(options: { task?: Task; softId?: number; taskId?: number } = {}) {
    return { clientKey: this._options.clientKey, ...options };
  }

  public async getBalance(cancellationToken: AbortController = new AbortController()): Promise<GetBalanceResponseSuccess> {
    try {
      const response = await this._httpClient.post<GetBalanceResponse>(
        'getBalance',
        JSON.stringify(this.calcJSONData()),
        cancellationToken,
      );

      if (response.errorId !== 0) {
        throw new GetBalanceError(ErrorCodeConverter.convert((response as GetBalanceResponseError).errorCode));
      }
      return response as GetBalanceResponseSuccess;
    } catch (err) {
      if (err instanceof HttpStatusError) {
        throw new CapmonsterCloudClientError(`Cannot get balance. Status code was ${err.statusCode}`);
      } else if (err instanceof JSONParseError) {
        throw new CapmonsterCloudClientError(`Cannot parse get balance response. Response was: ${err.responseBody}`);
      }
      throw err;
    }
  }

  private async CreateTask(task: Task, cancellationToken: AbortController = new AbortController()): Promise<CreateTaskResponse> {
    try {
      const response = await this._httpClient.post<CreateTaskResponse>(
        'createTask',
        JSON.stringify(this.calcJSONData({ task, softId: this._options.softId || ClientOptions.defaultSoftId })),
        cancellationToken,
      );

      return response;
    } catch (err) {
      if (err instanceof HttpStatusError) {
        throw new CapmonsterCloudClientError(`Cannot create task. Status code was ${err.statusCode}`);
      } else if (err instanceof JSONParseError) {
        throw new CapmonsterCloudClientError(`Cannot parse create task response. Response was: ${err.responseBody}`);
      }
      throw err;
    }
  }

  private async GetTaskResult(taskId: number, cancellationToken: AbortController = new AbortController()): Promise<TaskResult> {
    try {
      const response = await this._httpClient.post<GetTaskResultResponse>(
        'getTaskResult',
        JSON.stringify(this.calcJSONData({ taskId })),
        cancellationToken,
      );

      if (response.errorId !== 0) {
        if ((response as GetTaskResultResponseError).errorCode.includes('CAPTCHA_NOT_READY')) {
          return { type: TaskResultType.InProgress };
        } else {
          return { type: TaskResultType.Failed, error: ErrorCodeConverter.convert((response as CreateTaskResponseError).errorCode) };
        }
      }

      if ((response as GetTaskResultResponseSuccess).status === TaskResultStatus.ready) {
        return { type: TaskResultType.Completed, solution: (response as GetTaskResultResponseSuccess).solution };
      }

      return { type: TaskResultType.InProgress };
    } catch (err) {
      if (err instanceof HttpStatusError) {
        if (err.statusCode === HttpStatusCode.ServiceUnavailable) {
          return { type: TaskResultType.InProgress };
        }
        throw new CapmonsterCloudClientError(`Cannot get task result. Status code was ${err.statusCode}`);
      } else if (err instanceof JSONParseError) {
        throw new CapmonsterCloudClientError(`Cannot parse get task result response. Response was: ${err.responseBody}`);
      }
      throw err;
    }
  }

  public async Solve<TSolution extends AnyObject>(
    task: Task,
    getResultTimeouts: GetResultTimeouts,
    cancellationToken: AbortController = new AbortController(),
  ): Promise<CaptchaResult<TSolution>> {
    const createdTask = await this.CreateTask(task, cancellationToken);
    if (createdTask.errorId !== 0) {
      return { error: ErrorCodeConverter.convert((createdTask as CreateTaskResponseError).errorCode) };
    }

    const firstRequestDelay = task.nocache ? getResultTimeouts.firstRequestNoCacheDelay : getResultTimeouts.firstRequestDelay;

    await new Promise((resolve) => setTimeout(resolve, firstRequestDelay));

    setTimeout(() => {
      cancellationToken.abort();
    }, getResultTimeouts.timeout);

    while (!cancellationToken.signal.aborted) {
      try {
        const result = await this.GetTaskResult(createdTask.taskId, cancellationToken);
        switch (result.type) {
          case TaskResultType.Failed:
            return new CaptchaResult<TSolution>({ error: result.error });
          case TaskResultType.Completed:
            return new CaptchaResult<TSolution>({ solution: result.solution as TSolution });
          case TaskResultType.InProgress:
          default:
            break;
        }
      } catch (err) {
        if (cancellationToken.signal.aborted) {
          break;
        }

        throw err;
      }

      if (cancellationToken.signal.aborted) {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, getResultTimeouts.requestsInterval));
    }

    return new CaptchaResult<TSolution>({ error: ErrorType.Timeout });
  }
}
