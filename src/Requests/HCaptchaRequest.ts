import { TaskType } from '../TaskType';
import { applyMixins } from '../Utils';
import { HCaptchaRequestBase, HCaptchaRequestBaseIn } from './HCaptchaRequestBase';
import { ProxyInfo, ProxyInfoIn } from './ProxyInfo';

export type HCaptchaRequestIn = Pick<HCaptchaRequestBaseIn, Exclude<keyof HCaptchaRequestBaseIn, 'type'>> & ProxyInfoIn;

/**
 * HCaptcha recognition request (with proxy).
 * {@link https://zennolab.atlassian.net/wiki/spaces/APIS/pages/1203240988/HCaptchaTask+hCaptcha+puzzle+solving}
 */
export class HCaptchaRequest extends HCaptchaRequestBase {
  constructor(argsObj: HCaptchaRequestIn) {
    super({ type: TaskType.HCaptchaTask, ...argsObj });
  }
}

applyMixins(HCaptchaRequest, [ProxyInfo]);
