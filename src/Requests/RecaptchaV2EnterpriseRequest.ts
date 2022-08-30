import { TaskType } from '../TaskType';
import { Mixin } from 'ts-mixer';
import { ProxyInfo, ProxyInfoIn } from './ProxyInfo';
import { RecaptchaV2EnterpriseRequestBase, RecaptchaV2EnterpriseRequestBaseIn } from './RecaptchaV2EnterpriseRequestBase';

export type RecaptchaV2EnterpriseRequestIn = Pick<
  RecaptchaV2EnterpriseRequestBaseIn,
  Exclude<keyof RecaptchaV2EnterpriseRequestBaseIn, 'type'>
> &
  ProxyInfoIn;

/**
 * Recaptcha V2 Enterprise recognition request (with proxy).
 */
export class RecaptchaV2EnterpriseRequest extends Mixin(RecaptchaV2EnterpriseRequestBase, ProxyInfo) {
  constructor(argsObj: RecaptchaV2EnterpriseRequestIn) {
    super({ type: TaskType.RecaptchaV2EnterpriseTask, ...argsObj });
  }
}
