import { TaskType } from '../../TaskType';
import { YidunRequestBase, YidunRequestBaseIn } from './YuidunRequestBase';
import { ProxyInfo, ProxyInfoIn } from '../ProxyInfo';

export type YidunRequestIn = Pick<YidunRequestBaseIn, Exclude<keyof YidunRequestBaseIn, 'type'>> & { proxy?: ProxyInfoIn };
/**
 * Yidun recognition request (with proxy).
 * {@link https://zenno.link/doc-yidun-en}
 */
export class YidunRequest extends YidunRequestBase {
  constructor({ proxy, ...restArgsObj }: YidunRequestIn) {
    super({ type: TaskType.YidunTask, ...restArgsObj });

    if (proxy) {
      Object.assign(this, new ProxyInfo(proxy));
    }
  }
}
