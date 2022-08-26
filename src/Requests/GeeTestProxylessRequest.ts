import { TaskType } from '../TaskType';
import { GeeTestRequestBase, GeeTestRequestBaseIn } from './GeeTestRequestBase';

export type GeeTestProxylessRequestIn = Pick<GeeTestRequestBaseIn, Exclude<keyof GeeTestRequestBaseIn, 'type'>>;

/**
 * GeeTest recognition request (without proxy).
 * {@link https://zennolab.atlassian.net/wiki/spaces/APIS/pages/1940291626/GeeTestTaskProxyless+GeeTest+captcha+recognition+without+proxy}
 */
export class GeeTestProxylessRequest extends GeeTestRequestBase {
  constructor(argsObj: GeeTestProxylessRequestIn) {
    super({ type: TaskType.GeeTestTaskProxyless, ...argsObj });
  }
}
