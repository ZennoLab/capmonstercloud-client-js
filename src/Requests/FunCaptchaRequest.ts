import { TaskType } from '../TaskType';
import { applyMixins } from '../Utils';
import { FunCaptchaRequestBase } from './FunCaptchaRequestBase';
import { ProxyInfo } from './ProxyInfo';

/**
 * FunCaptcha recognition request (with proxy).
 * {@link https://zennolab.atlassian.net/wiki/spaces/APIS/pages/735805497/FunCaptchaTask+solving+FunCaptcha}
 */
export class FunCaptchaRequest {
  /**
   * Recognition task type
   */
  public type = TaskType.FunCaptchaTask;
}

export interface FunCaptchaRequest extends FunCaptchaRequestBase, ProxyInfo {}

applyMixins(FunCaptchaRequest, [FunCaptchaRequestBase, ProxyInfo]);
