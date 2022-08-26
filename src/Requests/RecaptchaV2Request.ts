import { TaskType } from '../TaskType';
import { applyMixins } from '../Utils';
import { ProxyInfo, ProxyInfoIn } from './ProxyInfo';
import { RecaptchaV2RequestBase, RecaptchaV2RequestBaseIn } from './RecaptchaV2RequestBase';

export type RecaptchaV2RequestIn = Pick<RecaptchaV2RequestBaseIn, Exclude<keyof RecaptchaV2RequestBaseIn, 'type'>> & ProxyInfoIn;

/**
 * Recaptcha V2 recognition request (with proxy).
 * {@link https://zennolab.atlassian.net/wiki/spaces/APIS/pages/373161985/NoCaptchaTaskProxyless+solving+Google+recaptcha}
 */
export class RecaptchaV2Request extends RecaptchaV2RequestBase {
  constructor(argsObj: RecaptchaV2RequestIn) {
    super({ type: TaskType.NoCaptchaTask, ...argsObj });
  }
}

applyMixins(RecaptchaV2Request, [ProxyInfo]);
