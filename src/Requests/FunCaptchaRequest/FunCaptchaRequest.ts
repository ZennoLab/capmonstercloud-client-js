import { TaskType } from '../../TaskType';
import { FunCaptchaRequestBase, FunCaptchaRequestBaseIn } from './FunCaptchaRequestBase';
import { ProxyInfo, ProxyInfoIn } from '../ProxyInfo';

export type FunCaptchaRequestIn = Pick<FunCaptchaRequestBaseIn, Exclude<keyof FunCaptchaRequestBaseIn, 'type'>> & {
  proxy: ProxyInfoIn & { proxyLogin: string; proxyPassword: string };
};

/**
 * FunCaptcha recognition request.
 * Own proxy is required: proxyType, proxyAddress, proxyPort, proxyLogin and proxyPassword.
 * {@link https://docs.capmonster.cloud/docs/captchas/funcaptcha-task/}
 */
export class FunCaptchaRequest extends FunCaptchaRequestBase {
  constructor({ proxy, ...restArgs }: FunCaptchaRequestIn) {
    super({ type: TaskType.FunCaptchaTask, ...restArgs });
    Object.assign(this, new ProxyInfo(proxy));
  }
}
