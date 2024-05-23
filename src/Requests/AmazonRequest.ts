import { Mixin } from 'ts-mixer';
import { TaskType } from '../TaskType';
import { AmazonRequestBase, AmazonRequestBaseIn } from './AmazonRequestBase';
import { ProxyInfo, ProxyInfoIn } from './ProxyInfo';

export type AmazonRequestIn = Pick<AmazonRequestBaseIn, Exclude<keyof AmazonRequestBaseIn, 'type'>> & ProxyInfoIn;

/**
 * Amazon recognition request (without proxy).
 * {@link https://zenno.link/doc-amazon}
 */
export class AmazonRequest extends Mixin(AmazonRequestBase, ProxyInfo) {
  constructor(argsObj: AmazonRequestIn) {
    super({ type: TaskType.AmazonTask, ...argsObj });
  }
}
