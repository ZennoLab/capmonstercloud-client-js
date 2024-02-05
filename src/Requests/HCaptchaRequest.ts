import { TaskType } from '../TaskType';
import { Mixin } from 'ts-mixer';
import { HCaptchaRequestBase, HCaptchaRequestBaseIn } from './HCaptchaRequestBase';
import { ProxyInfo, ProxyInfoIn } from './ProxyInfo';

export type HCaptchaRequestIn = Pick<HCaptchaRequestBaseIn, Exclude<keyof HCaptchaRequestBaseIn, 'type'>> & ProxyInfoIn;

/**
 * HCaptcha recognition request (with proxy).
 * {@link https://docs.capmonster.cloud/docs/captchas/hcaptcha-task}
 */
export class HCaptchaRequest extends Mixin(HCaptchaRequestBase, ProxyInfo) {
  constructor(argsObj: HCaptchaRequestIn) {
    super({ type: TaskType.HCaptchaTask, ...argsObj });
  }
}
