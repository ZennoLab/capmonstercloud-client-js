import { TaskType } from '../TaskType';
import { Mixin } from 'ts-mixer';
import { ProxyInfo, ProxyInfoIn } from './ProxyInfo';
import { TurnstileRequestBase, TurnstileRequestBaseIn } from './TurnstileRequestBase';

export type TurnstileRequestIn = Pick<TurnstileRequestBaseIn, Exclude<keyof TurnstileRequestBaseIn, 'type'>> & ProxyInfoIn;

/**
 * Recaptcha V2 recognition request (with proxy).
 * {@link https://zennolab.atlassian.net/wiki/spaces/APIS/pages/373161985/NoCaptchaTaskProxyless+solving+Google+recaptcha}
 */
export class TurnstileRequest extends Mixin(TurnstileRequestBase, ProxyInfo) {
  constructor(argsObj: TurnstileRequestIn) {
    super({ type: TaskType.TurnstileTask, ...argsObj });
  }
}