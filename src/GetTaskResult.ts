import { ErrorType } from './ErrorType';
import { AnyObject } from './Utils';

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

export type TaskCompleted = {
  type: TaskResultType.Completed;
  solution: AnyObject;
};

export type TaskResult = TaskInProgress | TaskFailed | TaskCompleted;

export enum TaskResultStatus {
  processing = 'processing',
  ready = 'ready',
}

export type GetTaskResultResponseSuccess = {
  errorId: 0;
  status: TaskResultStatus;
  solution: AnyObject;
};

export type GetTaskResultResponseError = {
  errorId: number;
  errorCode: string;
};

export type GetTaskResultResponse = GetTaskResultResponseSuccess | GetTaskResultResponseError;

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
