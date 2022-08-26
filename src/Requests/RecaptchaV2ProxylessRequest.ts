import { TaskType } from '../TaskType';
import { RecaptchaV2RequestBase, RecaptchaV2RequestBaseIn } from './RecaptchaV2RequestBase';

export type RecaptchaV2ProxylessRequestIn = Pick<RecaptchaV2RequestBaseIn, Exclude<keyof RecaptchaV2RequestBaseIn, 'type'>>;

/**
 * Recaptcha V2 recognition request (without proxy).
 * {@link https://zennolab.atlassian.net/wiki/spaces/APIS/pages/680689685/NoCaptchaTask+solving+Google+recaptcha}
 */
export class RecaptchaV2ProxylessRequest extends RecaptchaV2RequestBase {
  constructor(argsObj: RecaptchaV2ProxylessRequestIn) {
    super({ type: TaskType.NoCaptchaTaskProxyless, ...argsObj });
  }
}
