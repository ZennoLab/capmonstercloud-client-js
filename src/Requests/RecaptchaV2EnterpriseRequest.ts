import { TaskType } from '../TaskType';
import { applyMixins } from '../Utils';
import { ProxyInfo } from './ProxyInfo';
import { RecaptchaV2EnterpriseRequestBase } from './RecaptchaV2EnterpriseRequestBase';

/**
 * Recaptcha V2 Enterprise recognition request (with proxy).
 */
export class RecaptchaV2EnterpriseRequest {
  /**
   * Recognition task type
   */
  public type = TaskType.RecaptchaV2EnterpriseTask;
}

export interface RecaptchaV2EnterpriseRequest extends RecaptchaV2EnterpriseRequestBase, ProxyInfo {}

applyMixins(RecaptchaV2EnterpriseRequest, [RecaptchaV2EnterpriseRequestBase, ProxyInfo]);
