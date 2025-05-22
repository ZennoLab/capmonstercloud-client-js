import { TaskType } from '../../TaskType';
import { TenDIRequestBase, TenDIRequestBaseIn } from './TenDIRequestBase';
import { ProxyInfo, ProxyInfoIn } from '../ProxyInfo';

export type TenDIRequestIn = Pick<TenDIRequestBaseIn, Exclude<keyof TenDIRequestBaseIn, 'type' | '_class'>> & { proxy?: ProxyInfoIn };
/**
 * TenDI recognition request.
 * {@link https://zenno.link/doc-tendi}
 */
export class TenDIRequest extends TenDIRequestBase {
  constructor({ proxy, ...argsObj }: TenDIRequestIn) {
    super({ type: TaskType.CustomTask, _class: 'TenDI', ...argsObj });

    if (proxy) {
      Object.assign(this, new ProxyInfo(proxy));
    }
  }
}
