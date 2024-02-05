import { TaskType } from '../TaskType';
import { GeeTestRequestBase, GeeTestRequestBaseIn } from './GeeTestRequestBase';

export type GeeTestProxylessRequestIn = Pick<GeeTestRequestBaseIn, Exclude<keyof GeeTestRequestBaseIn, 'type'>>;

/**
 * GeeTest recognition request (without proxy).
 * {@link https://docs.capmonster.cloud/docs/captchas/geetest-task#geetesttaskproxyless-without-proxy}
 */
export class GeeTestProxylessRequest extends GeeTestRequestBase {
  constructor(argsObj: GeeTestProxylessRequestIn) {
    super({ type: TaskType.GeeTestTaskProxyless, ...argsObj });
  }
}
