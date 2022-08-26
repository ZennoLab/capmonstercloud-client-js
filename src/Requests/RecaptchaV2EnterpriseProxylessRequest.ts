import { TaskType } from '../TaskType';
import { RecaptchaV2EnterpriseRequestBase, RecaptchaV2EnterpriseRequestBaseIn } from './RecaptchaV2EnterpriseRequestBase';

export type RecaptchaV2EnterpriseProxylessRequestIn = Pick<
  RecaptchaV2EnterpriseRequestBaseIn,
  Exclude<keyof RecaptchaV2EnterpriseRequestBaseIn, 'type'>
>;
/**
 * Recaptcha V2 Enterprise recognition request (without proxy).
 */
export class RecaptchaV2EnterpriseProxylessRequest extends RecaptchaV2EnterpriseRequestBase {
  constructor(argsObj: RecaptchaV2EnterpriseProxylessRequestIn) {
    super({ type: TaskType.RecaptchaV2EnterpriseTaskProxyless, ...argsObj });
  }
}
