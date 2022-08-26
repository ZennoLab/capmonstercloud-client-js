import { TaskType } from '../TaskType';
import { HCaptchaRequestBase } from './HCaptchaRequestBase';

/**
 * HCaptcha recognition request (without proxy).
 * {@link https://zennolab.atlassian.net/wiki/spaces/APIS/pages/1203240977/HCaptchaTaskProxyless+hCaptcha+puzzle+solving}
 */
export class HCaptchaProxylessRequest extends HCaptchaRequestBase {
  /**
   * Recognition task type
   */
  public type = TaskType.HCaptchaTaskProxyless;
}
