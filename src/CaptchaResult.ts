import { ErrorType } from './ErrorType';
import { TaskCompletedSolution } from './GetTaskResult';

/**
 * General captcha recognition result
 * @template TSolution Concrete captcha result type
 */
export class CaptchaResult<S extends TaskCompletedSolution> {
  /**
   * Error code
   */
  public error?: ErrorType;
  /**
   * Task result. Different for each type of task.
   */
  public solution?: S;
  constructor({ error, solution }: { error?: ErrorType; solution?: S }) {
    this.error = error;
    this.solution = solution;
  }
}
