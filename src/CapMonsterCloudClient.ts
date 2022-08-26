import { CaptchaResult } from './CaptchaResult';
import { ClientOptions } from './ClientOptions';
import { CreateTaskResponse, CreateTaskResponseError } from './CreateTask';
import { ErrorCodeConverter } from './ErrorCodeConverter';
import { ErrorType } from './ErrorType';
import { GetBalanceError, GetBalanceResponse, GetBalanceResponseError, GetBalanceResponseSuccess } from './GetBalance';
import {
  FunCaptchaTimeouts,
  GeeTestTimeouts,
  GetResultTimeouts,
  GetTaskResultResponse,
  GetTaskResultResponseError,
  GetTaskResultResponseSuccess,
  HCaptchaTimeouts,
  ImageToTextTimeouts,
  RecaptchaV2EnterpriseTimeouts,
  RecaptchaV2Timeouts,
  RecaptchaV3Timeouts,
  TaskResult,
  TaskResultStatus,
  TaskResultType,
} from './GetTaskResult';
import { HttpClient, HttpStatusCode, HttpStatusError, JSONParseError } from './HttpClient';
import { AnyObject } from './Utils';
import { Task } from './Requests/Task';
import { debugTask } from './Logger';
import { TaskType } from './TaskType';

export class CapmonsterCloudClientError extends Error {}

export class CapMonsterCloudClient {
  constructor(private _options: ClientOptions, private _httpClient: HttpClient) {}

  private calcJSONData(options: { task?: Task; softId?: number; taskId?: number } = {}) {
    return { clientKey: this._options.clientKey, ...options };
  }

  public async getBalance(cancellationController: AbortController = new AbortController()): Promise<GetBalanceResponseSuccess> {
    try {
      const response = await this._httpClient.post<GetBalanceResponse>(
        'getBalance',
        JSON.stringify(this.calcJSONData()),
        cancellationController,
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

  private async CreateTask(task: Task, cancellationController: AbortController = new AbortController()): Promise<CreateTaskResponse> {
    try {
      const response = await this._httpClient.post<CreateTaskResponse>(
        'createTask',
        JSON.stringify(this.calcJSONData({ task, softId: this._options.softId || ClientOptions.defaultSoftId })),
        cancellationController,
      );
      debugTask('create task response', response);

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

  private async GetTaskResult(taskId: number, cancellationController: AbortController = new AbortController()): Promise<TaskResult> {
    try {
      const response = await this._httpClient.post<GetTaskResultResponse>(
        'getTaskResult',
        JSON.stringify(this.calcJSONData({ taskId })),
        cancellationController,
      );
      debugTask('GetTaskResult() response', response);

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

  private detectResultTimeouts(task: Task) {
    switch (task.type) {
      case TaskType.FunCaptchaTaskProxyless:
      case TaskType.FunCaptchaTask:
        return FunCaptchaTimeouts;
      case TaskType.GeeTestTaskProxyless:
      case TaskType.GeeTestTask:
        return GeeTestTimeouts;
      case TaskType.HCaptchaTaskProxyless:
      case TaskType.HCaptchaTask:
        return HCaptchaTimeouts;
      case TaskType.ImageToText:
        return ImageToTextTimeouts;
      case TaskType.RecaptchaV2EnterpriseTaskProxyless:
      case TaskType.RecaptchaV2EnterpriseTask:
        return RecaptchaV2EnterpriseTimeouts;
      case TaskType.NoCaptchaTaskProxyless:
      case TaskType.NoCaptchaTask:
        return RecaptchaV2Timeouts;
      case TaskType.RecaptchaV3TaskProxyless:
        return RecaptchaV3Timeouts;
      default:
        throw new CaptchaResult({ error: ErrorType.UnknownTask });
    }
  }

  public async Solve<TSolution extends AnyObject>(
    task: Task,
    resultTimeouts: GetResultTimeouts = this.detectResultTimeouts(task),
    cancellationController: AbortController = new AbortController(),
  ): Promise<CaptchaResult<TSolution>> {
    debugTask('task in', task);
    debugTask('resultTimeouts in', resultTimeouts);
    const createdTask = await this.CreateTask(task, cancellationController);
    if (createdTask.errorId !== 0) {
      return { error: ErrorCodeConverter.convert((createdTask as CreateTaskResponseError).errorCode) };
    }

    const firstRequestDelay = task.nocache ? resultTimeouts.firstRequestNoCacheDelay : resultTimeouts.firstRequestDelay;
    debugTask('firstRequestDelay', firstRequestDelay);
    await new Promise((resolve) => setTimeout(resolve, firstRequestDelay));

    setTimeout(() => {
      cancellationController.abort();
      debugTask('cancellationController abort()');
    }, resultTimeouts.timeout);

    while (!cancellationController.signal.aborted) {
      try {
        const result = await this.GetTaskResult(createdTask.taskId, cancellationController);
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
        if (cancellationController.signal.aborted) {
          break;
        }

        throw err;
      }

      if (cancellationController.signal.aborted) {
        break;
      }
      debugTask('requestsInterval', resultTimeouts.requestsInterval);
      await new Promise((resolve) => setTimeout(resolve, resultTimeouts.requestsInterval));
    }

    return new CaptchaResult<TSolution>({ error: ErrorType.Timeout });
  }
}
