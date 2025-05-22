import { TaskType } from '../../TaskType';
import { AmazonRequestBase, AmazonRequestBaseIn } from './AmazonRequestBase';
import { ProxyInfo, ProxyInfoIn } from '../ProxyInfo';

export type AmazonRequestIn = Pick<AmazonRequestBaseIn, Exclude<keyof AmazonRequestBaseIn, 'type'>> & { proxy?: ProxyInfoIn };

/**
 * Amazon recognition request.
 * {@link https://zenno.link/doc-amazon-en}
 */
export class AmazonRequest extends AmazonRequestBase {
  constructor({ proxy, ...restArgsObj }: AmazonRequestIn) {
    super({ type: TaskType.AmazonTask, ...restArgsObj });

    if (proxy) {
      Object.assign(this, new ProxyInfo(proxy));
    }
  }
}
