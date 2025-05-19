import { TaskType } from '../../TaskType';
import { HCaptchaRequestBase, HCaptchaRequestBaseIn } from './HCaptchaRequestBase';
import { ProxyInfo, ProxyInfoIn } from '../ProxyInfo';

export type HCaptchaRequestIn = Pick<HCaptchaRequestBaseIn, Exclude<keyof HCaptchaRequestBaseIn, 'type'>> & { proxy?: ProxyInfoIn };

/**
 * HCaptcha recognition request.
 * {@link https://zennolab.atlassian.net/wiki/spaces/APIS/pages/1203240988/HCaptchaTask+hCaptcha+puzzle+solving}
 */
export class HCaptchaRequest extends HCaptchaRequestBase {
  constructor({ proxy, ...restArgs }: HCaptchaRequestIn) {
    super({ type: TaskType.HCaptchaTask, ...restArgs });

    if (proxy) {
      Object.assign(this, new ProxyInfo(proxy));
    }
  }
}
