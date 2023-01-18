import { TaskType } from '../TaskType';
import { TurnstileRequestBase, TurnstileRequestBaseIn } from './TurnstileRequestBase';

export type TurnstileProxylessRequestIn = Pick<TurnstileRequestBaseIn, Exclude<keyof TurnstileRequestBaseIn, 'type'>>;

/**
 * Recaptcha V2 recognition request (without proxy).
 * {@link https://zennolab.atlassian.net/wiki/spaces/APIS/pages/2256764929/TurnstileTaskProxyless+Turnstile}
 */
export class TurnstileProxylessRequest extends TurnstileRequestBase {
  constructor(argsObj: TurnstileProxylessRequestIn) {
    super({ type: TaskType.TurnstileTaskProxyless, ...argsObj });
  }
}