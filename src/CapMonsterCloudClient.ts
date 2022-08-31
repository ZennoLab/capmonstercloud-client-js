import { CaptchaResult } from './CaptchaResult';
import { ClientOptions } from './ClientOptions';
import { CreateTaskResponse, CreateTaskResponseError } from './CreateTask';
import { ErrorCodeConverter } from './ErrorCodeConverter';
import { ErrorType } from './ErrorType';
import { GetBalanceError, GetBalanceResponse, GetBalanceResponseError, GetBalanceResponseSuccess } from './GetBalance';
import { GetTaskResultResponse, TaskCompletedSolution, TaskResult, TaskResultStatus, TaskResultType } from './GetTaskResult';
import {
  FunCaptchaTimeouts,
  GeeTestTimeouts,
  GetResultTimeouts,
  HCaptchaTimeouts,
  ImageToTextTimeouts,
  RecaptchaV2EnterpriseTimeouts,
  RecaptchaV2Timeouts,
  RecaptchaV3Timeouts,
} from './GetResultTimeouts';
import { HttpClient, HttpStatusCode, HttpStatusError, JSONParseError } from './HttpClient';
import { Task } from './Requests/Task';
import { debugTask } from './Logger';
import { TaskType } from './TaskType';
import { FunCaptchaProxylessRequest } from './Requests/FunCaptchaProxylessRequest';
import { FunCaptchaResponse } from './Responses/FunCaptchaResponse';
import { FunCaptchaRequest } from './Requests/FunCaptchaRequest';
import { GeeTestProxylessRequest } from './Requests/GeeTestProxylessRequest';
import { GeeTestResponse } from './Responses/GeeTestResponse';
import { GeeTestRequest } from './Requests/GeeTestRequest';
import { HCaptchaProxylessRequest } from './Requests/HCaptchaProxylessRequest';
import { HCaptchaResponse } from './Responses/HCaptchaResponse';
import { HCaptchaRequest } from './Requests/HCaptchaRequest';
import { ImageToTextRequest } from './Requests/ImageToTextRequest';
import { ImageToTextResponse } from './Responses/ImageToTextResponse';
import { RecaptchaV2EnterpriseProxylessRequest } from './Requests/RecaptchaV2EnterpriseProxylessRequest';
import { RecaptchaV2EnterpriseResponse } from './Responses/RecaptchaV2EnterpriseResponse';
import { RecaptchaV2EnterpriseRequest } from './Requests/RecaptchaV2EnterpriseRequest';
import { RecaptchaV2ProxylessRequest } from './Requests/RecaptchaV2ProxylessRequest';
import { RecaptchaV2Response } from './Responses/RecaptchaV2Response';
import { RecaptchaV2Request } from './Requests/RecaptchaV2Request';
import { RecaptchaV3ProxylessRequest } from './Requests/RecaptchaV3ProxylessRequest';
import { RecaptchaV3Response } from './Responses/RecaptchaV3Response';

export class CapmonsterCloudClientError extends Error {}

export class CapMonsterCloudClient {
  constructor(private _options: ClientOptions, private _httpClient: HttpClient) {}

  private calcJSONData(options: { task?: Task; softId?: number; taskId?: number } = {}) {
    return { clientKey: this._options.clientKey, ...options };
  }

  public async getBalance(cancellationController?: AbortController): Promise<GetBalanceResponseSuccess> {
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

  private async CreateTask(task: Task, cancellationController?: AbortController): Promise<CreateTaskResponse> {
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

  private async GetTaskResult<S extends TaskCompletedSolution>(
    taskId: number,
    cancellationController?: AbortController,
  ): Promise<TaskResult<S>> {
    try {
      const response = await this._httpClient.post<GetTaskResultResponse<S>>(
        'getTaskResult',
        JSON.stringify(this.calcJSONData({ taskId })),
        cancellationController,
      );
      debugTask('GetTaskResult() response', response);

      if (response.errorId !== 0) {
        if (response.errorCode.includes('CAPTCHA_NOT_READY')) {
          return { type: TaskResultType.InProgress };
        } else {
          return { type: TaskResultType.Failed, error: ErrorCodeConverter.convert(response.errorCode) };
        }
      }

      if (response.status === TaskResultStatus.ready) {
        return { type: TaskResultType.Completed, solution: response.solution as S };
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

  public async Solve(
    task: FunCaptchaProxylessRequest,
    resultTimeouts?: GetResultTimeouts,
    cancellationController?: AbortController,
  ): Promise<CaptchaResult<FunCaptchaResponse>>;
  public async Solve(
    task: FunCaptchaRequest,
    resultTimeouts?: GetResultTimeouts,
    cancellationController?: AbortController,
  ): Promise<CaptchaResult<FunCaptchaResponse>>;
  public async Solve(
    task: GeeTestProxylessRequest,
    resultTimeouts?: GetResultTimeouts,
    cancellationController?: AbortController,
  ): Promise<CaptchaResult<GeeTestResponse>>;
  public async Solve(
    task: GeeTestRequest,
    resultTimeouts?: GetResultTimeouts,
    cancellationController?: AbortController,
  ): Promise<CaptchaResult<GeeTestResponse>>;
  public async Solve(
    task: HCaptchaProxylessRequest,
    resultTimeouts?: GetResultTimeouts,
    cancellationController?: AbortController,
  ): Promise<CaptchaResult<HCaptchaResponse>>;
  public async Solve(
    task: HCaptchaRequest,
    resultTimeouts?: GetResultTimeouts,
    cancellationController?: AbortController,
  ): Promise<CaptchaResult<HCaptchaResponse>>;
  public async Solve(
    task: ImageToTextRequest,
    resultTimeouts?: GetResultTimeouts,
    cancellationController?: AbortController,
  ): Promise<CaptchaResult<ImageToTextResponse>>;
  public async Solve(
    task: RecaptchaV2EnterpriseProxylessRequest,
    resultTimeouts?: GetResultTimeouts,
    cancellationController?: AbortController,
  ): Promise<CaptchaResult<RecaptchaV2EnterpriseResponse>>;
  public async Solve(
    task: RecaptchaV2EnterpriseRequest,
    resultTimeouts?: GetResultTimeouts,
    cancellationController?: AbortController,
  ): Promise<CaptchaResult<RecaptchaV2EnterpriseResponse>>;
  public async Solve(
    task: RecaptchaV2ProxylessRequest,
    resultTimeouts?: GetResultTimeouts,
    cancellationController?: AbortController,
  ): Promise<CaptchaResult<RecaptchaV2Response>>;
  public async Solve(
    task: RecaptchaV2Request,
    resultTimeouts?: GetResultTimeouts,
    cancellationController?: AbortController,
  ): Promise<CaptchaResult<RecaptchaV2Response>>;
  public async Solve(
    task: RecaptchaV3ProxylessRequest,
    resultTimeouts?: GetResultTimeouts,
    cancellationController?: AbortController,
  ): Promise<CaptchaResult<RecaptchaV3Response>>;
  public async Solve(
    task: Task,
    resultTimeouts: GetResultTimeouts = this.detectResultTimeouts(task),
    cancellationController?: AbortController,
  ): Promise<CaptchaResult<TaskCompletedSolution>> {
    debugTask('task in', task);
    debugTask('resultTimeouts in', resultTimeouts);
    const createdTask = await this.CreateTask(task, cancellationController);
    if (createdTask.errorId !== 0) {
      return new CaptchaResult<TaskCompletedSolution>({
        error: ErrorCodeConverter.convert((createdTask as CreateTaskResponseError).errorCode),
      });
    }

    const firstRequestDelay = task.nocache ? resultTimeouts.firstRequestNoCacheDelay : resultTimeouts.firstRequestDelay;
    debugTask('firstRequestDelay', firstRequestDelay);
    await new Promise((resolve) => setTimeout(resolve, firstRequestDelay));

    let signalAborted = (cancellationController && cancellationController.signal.aborted) || false;
    const wholeTimeoutId = setTimeout(() => {
      signalAborted = true;
      cancellationController && cancellationController.abort();
      debugTask('cancellationController abort()');
    }, resultTimeouts.timeout);

    while (signalAborted === false) {
      try {
        const result = await this.GetTaskResult(createdTask.taskId, cancellationController);
        switch (result.type) {
          case TaskResultType.Failed:
            clearTimeout(wholeTimeoutId);
            return new CaptchaResult<TaskCompletedSolution>({ error: result.error });
          case TaskResultType.Completed:
            clearTimeout(wholeTimeoutId);
            return new CaptchaResult<TaskCompletedSolution>({ solution: result.solution as TaskCompletedSolution });
          case TaskResultType.InProgress:
          default:
            break;
        }
      } catch (err) {
        if (signalAborted) {
          break;
        }

        clearTimeout(wholeTimeoutId);
        throw err;
      }

      if (signalAborted) {
        break;
      }
      debugTask('requestsInterval', resultTimeouts.requestsInterval);
      await new Promise((resolve) => setTimeout(resolve, resultTimeouts.requestsInterval));
    }

    clearTimeout(wholeTimeoutId);
    return new CaptchaResult<TaskCompletedSolution>({ error: ErrorType.Timeout });
  }
}
