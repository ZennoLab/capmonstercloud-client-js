import { TaskType } from '../TaskType';
import { applyMixins } from '../Utils';
import { FunCaptchaRequestBase, FunCaptchaRequestBaseIn } from './FunCaptchaRequestBase';
import { ProxyInfo, ProxyInfoIn } from './ProxyInfo';

export type FunCaptchaRequestIn = Pick<FunCaptchaRequestBaseIn, Exclude<keyof FunCaptchaRequestBaseIn, 'type'>> & ProxyInfoIn;

/**
 * FunCaptcha recognition request (with proxy).
 * {@link https://zennolab.atlassian.net/wiki/spaces/APIS/pages/735805497/FunCaptchaTask+solving+FunCaptcha}
 */
export class FunCaptchaRequest extends FunCaptchaRequestBase {
  constructor(argsObj: FunCaptchaRequestIn) {
    super({ type: TaskType.NoCaptchaTask, ...argsObj });
  }
}

applyMixins(FunCaptchaRequest, [ProxyInfo]);
