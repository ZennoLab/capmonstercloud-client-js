import { TaskType } from '../../TaskType';
import { ImpervaRequestBase, ImpervaRequestBaseIn } from './ImpervaRequestBase';
import { ProxyInfo, ProxyInfoIn } from '../ProxyInfo';

export type ImpervaRequestIn = Pick<ImpervaRequestBaseIn, Exclude<keyof ImpervaRequestBaseIn, 'type' | '_class'>> & { proxy?: ProxyInfoIn };
/**
 * Imperva recognition request.
 * {@link https://zenno.link/doc-imperva}
 */
export class ImpervaRequest extends ImpervaRequestBase {
  constructor({ proxy, ...argsObj }: ImpervaRequestIn) {
    super({ type: TaskType.CustomTask, _class: 'Imperva', ...argsObj });

    if (proxy) {
      Object.assign(this, new ProxyInfo(proxy));
    }
  }
}
