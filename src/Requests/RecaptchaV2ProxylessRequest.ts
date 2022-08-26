import { TaskType } from '../TaskType';
import { RecaptchaV2RequestBase } from './RecaptchaV2RequestBase';

/**
 * Recaptcha V2 recognition request (without proxy).
 * {@link https://zennolab.atlassian.net/wiki/spaces/APIS/pages/680689685/NoCaptchaTask+solving+Google+recaptcha}
 */
export class RecaptchaV2ProxylessRequest extends RecaptchaV2RequestBase {
  /**
   * Recognition task type
   */
  public type = TaskType.NoCaptchaTaskProxyless;
}
