import { TaskType } from '../TaskType';
import { AmazonRequestBase, AmazonRequestBaseIn } from './AmazaonRequestBase';

export type AmazonProxylessRequestIn = Pick<AmazonRequestBaseIn, Exclude<keyof AmazonRequestBaseIn, 'type'>>;

/**
 * Amazon recognition request (without proxy).
 * {@link https://docs.capmonster.cloud/docs/captchas/amazon-task}
 */
export class AmazonProxylessRequest extends AmazonRequestBase {
  constructor(argsObj: AmazonProxylessRequestIn) {
    super({ type: TaskType.AmazonTaskProxyless, ...argsObj });
  }
}
