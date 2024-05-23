import { TaskType } from '../TaskType';
import { AmazonRequestBase, AmazonRequestBaseIn } from './AmazonRequestBase';

export type AmazonProxylessRequestIn = Pick<AmazonRequestBaseIn, Exclude<keyof AmazonRequestBaseIn, 'type'>>;

/**
 * Amazon recognition request (without proxy).
 * {@link https://zenno.link/doc-amazon}
 */
export class AmazonProxylessRequest extends AmazonRequestBase {
  constructor(argsObj: AmazonProxylessRequestIn) {
    super({ type: TaskType.AmazonTaskProxyless, ...argsObj });
  }
}
