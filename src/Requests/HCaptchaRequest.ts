import { TaskType } from '../TaskType';
import { applyMixins } from '../Utils';
import { HCaptchaRequestBase } from './HCaptchaRequestBase';
import { ProxyInfo } from './ProxyInfo';

/**
 * HCaptcha recognition request (with proxy).
 * {@link https://zennolab.atlassian.net/wiki/spaces/APIS/pages/1203240988/HCaptchaTask+hCaptcha+puzzle+solving}
 */
export class HCaptchaRequest {
  /**
   * Recognition task type
   */
  public type = TaskType.HCaptchaTask;
}

export interface HCaptchaRequest extends HCaptchaRequestBase, ProxyInfo {}

applyMixins(HCaptchaRequest, [HCaptchaRequestBase, ProxyInfo]);
