import { TaskType } from '../../TaskType';
import { FunCaptchaRequestBase, FunCaptchaRequestBaseIn } from './FunCaptchaRequestBase';
import { ProxyInfo, ProxyInfoIn } from '../ProxyInfo';

export type FunCaptchaRequestIn = Pick<FunCaptchaRequestBaseIn, Exclude<keyof FunCaptchaRequestBaseIn, 'type'>> & { proxy?: ProxyInfoIn };

/**
 * FunCaptcha recognition request.
 * {@link https://zennolab.atlassian.net/wiki/spaces/APIS/pages/735805497/FunCaptchaTask+solving+FunCaptcha}
 */
export class FunCaptchaRequest extends FunCaptchaRequestBase {
  constructor({ proxy, ...restArgs }: FunCaptchaRequestIn) {
    super({ type: TaskType.FunCaptchaTask, ...restArgs });

    if (proxy) {
      Object.assign(this, new ProxyInfo(proxy));
    }
  }
}
