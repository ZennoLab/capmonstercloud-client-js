import { CaptchaResult } from './CaptchaResult';
import { ClientOptions } from './ClientOptions';
import { CreateTaskResponse, CreateTaskResponseError } from './CreateTask';
import { ErrorCodeConverter } from './ErrorCodeConverter';
import { ErrorType } from './ErrorType';
import { GetBalanceError, GetBalanceResponse, GetBalanceResponseError, GetBalanceResponseSuccess } from './GetBalance';
import { GetTaskResultResponse, TaskCompletedSolution, TaskResult, TaskResultStatus, TaskResultType } from './GetTaskResult';
import { detectResultTimeouts, GetResultTimeouts } from './GetResultTimeouts';
import { HttpClient, HttpStatusCode, HttpStatusError, JSONParseError } from './HttpClient';
import { Task } from './Requests/Task';
import { debugTask } from './Logger';

import { FunCaptchaResponse } from './Responses/FunCaptchaResponse';
import { FunCaptchaRequest } from './Requests/FunCaptchaRequest';
import { GeeTestResponse } from './Responses/GeeTestResponse';
import { GeeTestRequest } from './Requests/GeeTestRequest';
import { HCaptchaResponse } from './Responses/HCaptchaResponse';
import { HCaptchaRequest } from './Requests/HCaptchaRequest';
import { TurnstileRequest } from './Requests/TurnstileRequest';
import { ImageToTextRequest } from './Requests/ImageToTextRequest';
import { ImageToTextResponse } from './Responses/ImageToTextResponse';
import { RecaptchaV2EnterpriseResponse } from './Responses/RecaptchaV2EnterpriseResponse';
import { RecaptchaV2EnterpriseRequest } from './Requests/RecaptchaV2EnterpriseRequest';
import { RecaptchaV2Response } from './Responses/RecaptchaV2Response';
import { RecaptchaV2Request } from './Requests/RecaptchaV2Request';
import { RecaptchaV3ProxylessRequest } from './Requests/RecaptchaV3ProxylessRequest';
import { RecaptchaV3Response } from './Responses/RecaptchaV3Response';
import { TurnstileResponse } from './Responses/TurnstileResponse';
import { SerializeObject } from './Requests/RequestsSerialization';
import { ComplexImageRecaptchaRequest } from './Requests/ComplexImageRecaptchaRequest';
import { ComplexImageResponse } from './Responses/ComplexImageResponse';
import { ComplexImageHCaptchaRequest } from './Requests/ComplexImageHCaptchaRequest';
import { ComplexImageFunCaptchaRequest } from './Requests/ComplexImageFunCaptchaRequest';
import { DataDomeResponse } from './Responses/DataDomeResponse';
import { DataDomeRequest } from './Requests/DataDomeRequest';
import { TenDIRequest } from './Requests/TenDIRequest';
import { TenDIResponse } from './Responses/TenDIResponse';
import { AmazonResponse } from './Responses/AmazonResponse';
import { AmazonRequest } from './Requests/AmazonRequest';
import { BasiliskRequest } from './Requests/BasiliskRequest';
import { BasiliskResponse } from './Responses/BasiliskResponse';
import { ImpervaRequest } from './Requests/ImpervaRequest';
import { ImpervaResponse } from './Responses/ImpervaResponse';
import { BinanceRequest } from './Requests/BinanceRequest';
import { BinanceResponse } from './Responses/BinanceResponse';
import { ComplexImageTaskRecognitionRequest } from './Requests/ComplexImageTaskRecognitionRequest';
import { ComplexImageRecognitionResponse } from './Responses/ComplexImageRecognitionResponse';
import { ProsopoRequest } from './Requests/ProsopoRequest';
import { ProsopoResponse } from './Responses/ProsopoResponse';

/**
 * Base type for capmonster.cloud Client exceptions
 */
export class CapmonsterCloudClientError extends Error {}

/**
 * CapMonsterCloud client
 */
export class CapMonsterCloudClient {
  constructor(private _options: ClientOptions, private _httpClient: HttpClient) {}

  /**
   * Gets current amount of money on balance
   * {@link https://zennolab.atlassian.net/wiki/spaces/APIS/pages/655432/getBalance+retrieve+account+balance}
   */
  public async getBalance(cancellationController?: AbortController): Promise<GetBalanceResponseSuccess> {
    try {
      const response = await this._httpClient.post<GetBalanceResponse>(
        'getBalance',
        JSON.stringify(SerializeObject({ clientKey: this._options.clientKey })),
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

  /**
   * captcha task creating
   * {@link https://zennolab.atlassian.net/wiki/spaces/APIS/pages/393308/createTask+captcha+task+creating}
   */
  private async CreateTask(task: Task, cancellationController?: AbortController): Promise<CreateTaskResponse> {
    try {
      const response = await this._httpClient.post<CreateTaskResponse>(
        'createTask',
        JSON.stringify(
          SerializeObject({ clientKey: this._options.clientKey, task, softId: this._options.softId || ClientOptions.defaultSoftId }),
        ),
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

  /**
   * request task result
   * {@link https://zennolab.atlassian.net/wiki/spaces/APIS/pages/688194/getTaskResult+request+task+result}
   */
  private async GetTaskResult<S extends TaskCompletedSolution>(
    taskId: number,
    cancellationController?: AbortController,
  ): Promise<TaskResult<S>> {
    try {
      const response = await this._httpClient.post<GetTaskResultResponse<S>>(
        'getTaskResult',
        JSON.stringify(SerializeObject({ clientKey: this._options.clientKey, taskId })),
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
  /**
   * Solve FunCaptchaTask task
   * You will get response within 10 - 80 secs period depending on service workload.
   */
  public async Solve(
    task: FunCaptchaRequest,
    resultTimeouts?: GetResultTimeouts,
    cancellationController?: AbortController,
  ): Promise<CaptchaResult<FunCaptchaResponse>>;
  /**
   * Solve GeeTestTask task
   * You will get response within 10 - 80 secs period depending on service workload.
   */
  public async Solve(
    task: GeeTestRequest,
    resultTimeouts?: GetResultTimeouts,
    cancellationController?: AbortController,
  ): Promise<CaptchaResult<GeeTestResponse>>;

  /**
   * Solve HCaptchaTask task
   * You will get response within 10 - 180 secs period depending on service workload.
   */
  public async Solve(
    task: HCaptchaRequest,
    resultTimeouts?: GetResultTimeouts,
    cancellationController?: AbortController,
  ): Promise<CaptchaResult<HCaptchaResponse>>;
  /**
   * Solve ImageToText task
   * You will get response within 300ms to 6s period depending on service workload.
   */
  public async Solve(
    task: ImageToTextRequest,
    resultTimeouts?: GetResultTimeouts,
    cancellationController?: AbortController,
  ): Promise<CaptchaResult<ImageToTextResponse>>;
  /**
   * Solve RecaptchaV2EnterpriseTask task
   * You will get response within 10 - 180 secs period depending on service workload.
   */
  public async Solve(
    task: RecaptchaV2EnterpriseRequest,
    resultTimeouts?: GetResultTimeouts,
    cancellationController?: AbortController,
  ): Promise<CaptchaResult<RecaptchaV2EnterpriseResponse>>;
  /**
   * Solve NoCaptchaTask task
   * You will get response within 10 - 180 secs period depending on service workload.
   */
  public async Solve(
    task: RecaptchaV2Request,
    resultTimeouts?: GetResultTimeouts,
    cancellationController?: AbortController,
  ): Promise<CaptchaResult<RecaptchaV2Response>>;
  /**
   * Solve RecaptchaV3TaskProxyless task
   * You will get response within 10 - 180 secs period depending on service workload.
   */
  public async Solve(
    task: RecaptchaV3ProxylessRequest,
    resultTimeouts?: GetResultTimeouts,
    cancellationController?: AbortController,
  ): Promise<CaptchaResult<RecaptchaV3Response>>;
  /**
   * Solve DataDomeRequest task
   * You will get response within 10 - 180 secs period depending on service workload.
   */
  public async Solve(
    task: DataDomeRequest,
    resultTimeouts?: GetResultTimeouts,
    cancellationController?: AbortController,
  ): Promise<CaptchaResult<DataDomeResponse>>;
  /**
   * Solve TenDI task
   * You will get response within 10 - 180 secs period depending on service workload.
   */
  public async Solve(
    task: TenDIRequest,
    resultTimeouts?: GetResultTimeouts,
    cancellationController?: AbortController,
  ): Promise<CaptchaResult<TenDIResponse>>;
  /**
   * Solve Basilisk task
   * You will get response within 10 - 180 secs period depending on service workload.
   */
  public async Solve(
    task: BasiliskRequest,
    resultTimeouts?: GetResultTimeouts,
    cancellationController?: AbortController,
  ): Promise<CaptchaResult<BasiliskResponse>>;
  /**
   * Solve Imperva task
   * You will get response within 10 - 180 secs period depending on service workload.
   */
  public async Solve(
    task: ImpervaRequest,
    resultTimeouts?: GetResultTimeouts,
    cancellationController?: AbortController,
  ): Promise<CaptchaResult<ImpervaResponse>>;
  /**
   * Solve Binance task
   * You will get response within 10 - 180 secs period depending on service workload.
   */
  public async Solve(
    task: BinanceRequest,
    resultTimeouts?: GetResultTimeouts,
    cancellationController?: AbortController,
  ): Promise<CaptchaResult<BinanceResponse>>;
  /**
   * Solve ComplexImageRecognition task
   * You will get response within 10 - 180 secs period depending on service workload.
   */
  public async Solve(
    task: ComplexImageTaskRecognitionRequest,
    resultTimeouts?: GetResultTimeouts,
    cancellationController?: AbortController,
  ): Promise<CaptchaResult<ComplexImageRecognitionResponse>>;
  /**
   * Solve AmazonProxyless task
   * You will get response within 10 - 180 secs period depending on service workload.
   */
  public async Solve(
    task: AmazonRequest,
    resultTimeouts?: GetResultTimeouts,
    cancellationController?: AbortController,
  ): Promise<CaptchaResult<AmazonResponse>>;
  /**
   * Solve Amazon task
   * You will get response within 10 - 180 secs period depending on service workload.
   */
  public async Solve(
    task: AmazonRequest,
    resultTimeouts?: GetResultTimeouts,
    cancellationController?: AbortController,
  ): Promise<CaptchaResult<AmazonResponse>>;
  /**
   * Solve Turnstile task
   * You will get response within 10 - 180 secs period depending on service workload.
   */
  public async Solve(
    task: TurnstileRequest,
    resultTimeouts?: GetResultTimeouts,
    cancellationController?: AbortController,
  ): Promise<CaptchaResult<TurnstileResponse>>;
  /**
   * Solve Complex Image Recaptcha Task
   * You will get response within 10 - 180 secs period depending on service workload.
   */
  public async Solve(
    task: ComplexImageRecaptchaRequest,
    resultTimeouts?: GetResultTimeouts,
    cancellationController?: AbortController,
  ): Promise<CaptchaResult<ComplexImageResponse>>;
  /**
   * Solve Complex Image HCaptcha Task
   * You will get response within 10 - 180 secs period depending on service workload.
   */
  public async Solve(
    task: ComplexImageHCaptchaRequest,
    resultTimeouts?: GetResultTimeouts,
    cancellationController?: AbortController,
  ): Promise<CaptchaResult<ComplexImageResponse>>;
  /**
   * Solve Prosopo task
   * You will get response within 10 - 180 secs period depending on service workload.
   */
  public async Solve(
    task: ProsopoRequest,
    resultTimeouts?: GetResultTimeouts,
    cancellationController?: AbortController,
  ): Promise<CaptchaResult<ProsopoResponse>>;
  /**
   * Solve Complex Image FunCaptcha Task
   * You will get response within 10 - 180 secs period depending on service workload.
   */
  public async Solve(
    task: ComplexImageFunCaptchaRequest,
    resultTimeouts?: GetResultTimeouts,
    cancellationController?: AbortController,
  ): Promise<CaptchaResult<ComplexImageResponse>>;
  /**
   * Solve {Task} task
   */
  public async Solve(
    task: Task,
    resultTimeouts: GetResultTimeouts = detectResultTimeouts(task),
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
