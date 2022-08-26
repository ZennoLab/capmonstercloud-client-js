import { TaskType } from '../TaskType';
import { HCaptchaRequestBase, HCaptchaRequestBaseIn } from './HCaptchaRequestBase';

export type HCaptchaProxylessRequestIn = Pick<HCaptchaRequestBaseIn, Exclude<keyof HCaptchaRequestBaseIn, 'type'>>;

/**
 * HCaptcha recognition request (without proxy).
 * {@link https://zennolab.atlassian.net/wiki/spaces/APIS/pages/1203240977/HCaptchaTaskProxyless+hCaptcha+puzzle+solving}
 */
export class HCaptchaProxylessRequest extends HCaptchaRequestBase {
  constructor(argsObj: HCaptchaProxylessRequestIn) {
    super({ type: TaskType.HCaptchaTaskProxyless, ...argsObj });
  }
}
