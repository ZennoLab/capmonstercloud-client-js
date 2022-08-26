import { TaskType } from '../TaskType';
import { applyMixins } from '../Utils';
import { ProxyInfo } from './ProxyInfo';
import { RecaptchaV2RequestBase } from './RecaptchaV2RequestBase';

/**
 * Recaptcha V2 recognition request (with proxy).
 * {@link https://zennolab.atlassian.net/wiki/spaces/APIS/pages/373161985/NoCaptchaTaskProxyless+solving+Google+recaptcha}
 */
export class RecaptchaV2Request {
  /**
   * Recognition task type
   */
  public type = TaskType.NoCaptchaTask;
}

export interface RecaptchaV2Request extends RecaptchaV2RequestBase, ProxyInfo {}

applyMixins(RecaptchaV2Request, [RecaptchaV2RequestBase, ProxyInfo]);
