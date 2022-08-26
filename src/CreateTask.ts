import { CaptchaRequestBase } from './Requests/CaptchaRequestBase';

export type CreateTaskResponseSuccess = {
  errorId: 0;
  taskId: number;
};

export type CreateTaskResponseError = {
  errorId: number;
  errorCode: string;
  errorDescription: string;
  taskId: number;
};

export type CreateTaskResponse = CreateTaskResponseSuccess | CreateTaskResponseError;

export class CreateTaskRequest {
  public clientKey!: string;

  public task!: CaptchaRequestBase;

  public softId?: number;
}
