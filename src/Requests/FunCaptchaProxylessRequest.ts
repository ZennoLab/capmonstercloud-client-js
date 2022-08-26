import { TaskType } from '../TaskType';
import { FunCaptchaRequestBase } from './FunCaptchaRequestBase';

/**
 * FunCaptcha recognition request (without proxy).
 * {@link https://zennolab.atlassian.net/wiki/spaces/APIS/pages/643629079/FunCaptchaTaskProxyless+solving+FunCaptcha}
 */
export class FunCaptchaProxylessRequest extends FunCaptchaRequestBase {
  /**
   * Recognition task type
   */
  public type = TaskType.FunCaptchaTaskProxyless;
}
