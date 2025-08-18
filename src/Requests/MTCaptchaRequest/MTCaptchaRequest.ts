import { TaskType } from '../../TaskType';
import { MTCaptchaRequestBase, MTCaptchaRequestBaseIn } from './MTCaptchaRequestBase';
import { ProxyInfo, ProxyInfoIn } from '../ProxyInfo';

export type MTCaptchaRequestIn = Pick<MTCaptchaRequestBaseIn, Exclude<keyof MTCaptchaRequestBaseIn, 'type'>> & { proxy?: ProxyInfoIn };
/**
 * MTCaptcha recognition request (with proxy).
 * {@link https://zenno.link/doc-mt-captcha-en}
 */
export class MTCaptchaRequest extends MTCaptchaRequestBase {
  constructor({ proxy, ...restArgsObj }: MTCaptchaRequestIn) {
    super({ type: TaskType.MTCaptchaTask, ...restArgsObj });

    if (proxy) {
      Object.assign(this, new ProxyInfo(proxy));
    }
  }
}
