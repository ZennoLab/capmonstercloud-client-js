import { ErrorType } from './ErrorType';
import { AnyObject } from './Utils';

/**
 * General captcha recognition result
 * @template TSolution Concrete captcha result type
 */
export class CaptchaResult<TSolution extends AnyObject> {
  /**
   * Error code
   */
  public error?: ErrorType;
  /**
   * Task result. Different for each type of task.
   */
  public solution?: TSolution;
  constructor({ error, solution }: { error?: ErrorType; solution?: TSolution }) {
    this.error = error;
    this.solution = solution;
  }
}
