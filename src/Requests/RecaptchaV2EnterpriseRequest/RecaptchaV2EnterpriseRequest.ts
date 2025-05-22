import { TaskType } from '../../TaskType';
import { ProxyInfo, ProxyInfoIn } from '../ProxyInfo';
import { RecaptchaV2EnterpriseRequestBase, RecaptchaV2EnterpriseRequestBaseIn } from './RecaptchaV2EnterpriseRequestBase';

export type RecaptchaV2EnterpriseRequestIn = Pick<
  RecaptchaV2EnterpriseRequestBaseIn,
  Exclude<keyof RecaptchaV2EnterpriseRequestBaseIn, 'type'>
> & { proxy?: ProxyInfoIn };

/**
 * Recaptcha V2 Enterprise recognition request.
 * {@link https://zenno.link/doc-recaptcha2e-proxy-en}
 */

export class RecaptchaV2EnterpriseRequest extends RecaptchaV2EnterpriseRequestBase {
  constructor({ proxy, ...restArgsObj }: RecaptchaV2EnterpriseRequestIn) {
    super({ type: TaskType.RecaptchaV2EnterpriseTask, ...restArgsObj });

    if (proxy) {
      Object.assign(this, new ProxyInfo(proxy));
    }
  }
}
