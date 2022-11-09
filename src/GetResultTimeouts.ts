import { Task } from './Requests/Task';
import { TaskType } from './TaskType';

export type GetResultTimeouts = {
  firstRequestDelay: number;
  firstRequestNoCacheDelay?: number;
  requestsInterval: number;
  timeout: number;
};

export const RecaptchaV2Timeouts = {
  firstRequestDelay: 1000 * 1,
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

export function detectResultTimeouts(task: Task): GetResultTimeouts {
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
    case TaskType.ImageToTextTask:
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
      throw new Error(`Could not detect result timeouts for provided task type = ${task.type}`);
  }
}
