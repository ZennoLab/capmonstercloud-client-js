import { TaskType } from '../../TaskType';
import { ProsopoRequestBase, ProsopoRequestBaseIn } from './ProsopoRequestBase';
import { ProxyInfo, ProxyInfoIn } from '../ProxyInfo';

export type ProsopoRequestIn = Pick<ProsopoRequestBaseIn, Exclude<keyof ProsopoRequestBaseIn, 'type'>> & { proxy?: ProxyInfoIn };
/**
 * Prosopo recognition request (with proxy).
 * {@link https://zenno.link/doc-prosopo-en}
 */
export class ProsopoRequest extends ProsopoRequestBase {
  constructor({ proxy, ...restArgsObj }: ProsopoRequestIn) {
    super({ type: TaskType.ProsopoTask, ...restArgsObj });

    if (proxy) {
      Object.assign(this, new ProxyInfo(proxy));
    }
  }
}
