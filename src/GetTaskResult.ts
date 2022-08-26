import { ErrorType } from './ErrorType';
import { FunCaptchaResponse } from './Responses/FunCaptchaResponse';
import { GeeTestResponse } from './Responses/GeeTestResponse';
import { HCaptchaResponse } from './Responses/HCaptchaResponse';
import { ImageToTextResponse } from './Responses/ImageToTextResponse';
import { RecaptchaV2EnterpriseResponse } from './Responses/RecaptchaV2EnterpriseResponse';
import { RecaptchaV2Response } from './Responses/RecaptchaV2Response';
import { RecaptchaV3Response } from './Responses/RecaptchaV3Response';

export enum TaskResultType {
  Failed = 'Failed',
  Completed = 'Completed',
  InProgress = 'InProgress',
}

export type TaskInProgress = {
  type: TaskResultType.InProgress;
};

export type TaskFailed = {
  type: TaskResultType.Failed;
  error: ErrorType;
};

export type TaskCompletedSolution =
  | FunCaptchaResponse
  | GeeTestResponse
  | HCaptchaResponse
  | ImageToTextResponse
  | RecaptchaV2EnterpriseResponse
  | RecaptchaV2Response
  | RecaptchaV3Response;

export type TaskCompleted<S extends TaskCompletedSolution> = {
  type: TaskResultType.Completed;
  solution: S;
};

export type TaskResult<S extends TaskCompletedSolution> = TaskInProgress | TaskFailed | TaskCompleted<S>;

export enum TaskResultStatus {
  processing = 'processing',
  ready = 'ready',
}

export type GetTaskResultResponse<S extends TaskCompletedSolution> = {
  errorId: number;
  errorCode: string;
  errorDescription: string | null;
  status: TaskResultStatus;
  solution: S | null;
};

export class GetTaskResultError extends Error {
  constructor(public errorType: ErrorType) {
    super(`Cannot create task. Error was ${errorType}`);
  }
}

export type GetResultTimeouts = {
  firstRequestDelay: number;
  firstRequestNoCacheDelay?: number;
  requestsInterval: number;
  timeout: number;
};

export const RecaptchaV2Timeouts = {
  firstRequestDelay: 1000,
  firstRequestNoCacheDelay: 1000 * 10,
  requestsInterval: 1000 * 3,
  timeout: 1000 * 180,
} as GetResultTimeouts;

export const RecaptchaV2EnterpriseTimeouts = {
  firstRequestDelay: 1000 * 1,
  firstRequestNoCacheDelay: 1000 * 10,
  requestsInterval: 1000 * 3,
  timeout: 1000 * 180,
} as GetResultTimeouts;

export const RecaptchaV3Timeouts = {
  firstRequestDelay: 1000 * 1,
  firstRequestNoCacheDelay: 1000 * 10,
  requestsInterval: 1000 * 3,
  timeout: 1000 * 180,
} as GetResultTimeouts;

export const ImageToTextTimeouts = {
  firstRequestDelay: 350,
  requestsInterval: 200,
  timeout: 1000 * 10,
} as GetResultTimeouts;

export const FunCaptchaTimeouts = {
  firstRequestDelay: 1000 * 1,
  firstRequestNoCacheDelay: 1000 * 10,
  requestsInterval: 1000 * 1,
  timeout: 1000 * 80,
} as GetResultTimeouts;

export const HCaptchaTimeouts = {
  firstRequestDelay: 1000 * 1,
  firstRequestNoCacheDelay: 1000 * 10,
  requestsInterval: 1000 * 3,
  timeout: 1000 * 180,
} as GetResultTimeouts;

export const GeeTestTimeouts = {
  firstRequestDelay: 1000 * 1,
  requestsInterval: 1000 * 1,
  timeout: 1000 * 80,
} as GetResultTimeouts;
