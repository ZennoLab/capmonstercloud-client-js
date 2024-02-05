import { TaskType } from '../TaskType';
import { TurnstileRequestBase, TurnstileRequestBaseIn } from './TurnstileRequestBase';

export type TurnstileProxylessRequestIn = Pick<TurnstileRequestBaseIn, Exclude<keyof TurnstileRequestBaseIn, 'type'>>;

/**
 * TurnstileTaskProxyless recognition request (without proxy).
 * {@link https://docs.capmonster.cloud/docs/captchas/tunrstile-task#turnstiletaskproxyless-without-a-proxy}
 */
export class TurnstileProxylessRequest extends TurnstileRequestBase {
  constructor(argsObj: TurnstileProxylessRequestIn) {
    super({ type: TaskType.TurnstileTaskProxyless, ...argsObj });
  }
}
