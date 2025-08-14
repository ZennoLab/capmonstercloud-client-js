import { TaskType } from '../../TaskType';
import { TemuRequestBase, TemuRequestBaseIn } from './TemuRequestBase';
import { ProxyInfo, ProxyInfoIn } from '../ProxyInfo';

export type TemuRequestIn = Pick<TemuRequestBaseIn, Exclude<keyof TemuRequestBaseIn, 'type' | '_class'>> & {
  proxy?: ProxyInfoIn;
};
/**
 * Temu recognition request.
 * {@link https://zenno.link/doc-temu-en}
 */
export class TemuRequest extends TemuRequestBase {
  constructor({ proxy, ...argsObj }: TemuRequestIn) {
    super({ type: TaskType.CustomTask, _class: 'Temu', ...argsObj });

    if (proxy) {
      Object.assign(this, new ProxyInfo(proxy));
    }
  }
}
