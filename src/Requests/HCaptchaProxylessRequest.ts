import { TaskType } from '../TaskType';
import { HCaptchaRequestBase, HCaptchaRequestBaseIn } from './HCaptchaRequestBase';

export type HCaptchaProxylessRequestIn = Pick<HCaptchaRequestBaseIn, Exclude<keyof HCaptchaRequestBaseIn, 'type'>>;

/**
 * HCaptcha recognition request (without proxy).
 * {@link https://docs.capmonster.cloud/docs/captchas/hcaptcha-task#hcaptchataskproxyless-without-a-proxy}
 */
export class HCaptchaProxylessRequest extends HCaptchaRequestBase {
  constructor(argsObj: HCaptchaProxylessRequestIn) {
    super({ type: TaskType.HCaptchaTaskProxyless, ...argsObj });
  }
}
