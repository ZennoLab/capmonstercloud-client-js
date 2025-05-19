import { TaskType } from '../../TaskType';
import { BasiliskRequestBase, BasiliskRequestBaseIn } from './BasiliskRequestBase';
import { ProxyInfo, ProxyInfoIn } from '../ProxyInfo';

export type BasiliskRequestIn = Pick<BasiliskRequestBaseIn, Exclude<keyof BasiliskRequestBaseIn, 'type' | '_class'>> & {
  proxy?: ProxyInfoIn;
};
/**
 * Basilisk recognition request.
 * {@link https://zenno.link/doc-basilisk}
 */
export class BasiliskRequest extends BasiliskRequestBase {
  constructor({ proxy, ...argsObj }: BasiliskRequestIn) {
    super({ type: TaskType.CustomTask, _class: 'Basilisk', ...argsObj });

    if (proxy) {
      Object.assign(this, new ProxyInfo(proxy));
    }
  }
}
