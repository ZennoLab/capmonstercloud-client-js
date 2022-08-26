import { TaskType } from '../TaskType';
import { RecaptchaV2EnterpriseRequestBase } from './RecaptchaV2EnterpriseRequestBase';

/**
 * Recaptcha V2 Enterprise recognition request (without proxy).
 */
export class RecaptchaV2EnterpriseProxylessRequest extends RecaptchaV2EnterpriseRequestBase {
  /**
   * Recognition task type
   */
  public type = TaskType.RecaptchaV2EnterpriseTaskProxyless;
}
