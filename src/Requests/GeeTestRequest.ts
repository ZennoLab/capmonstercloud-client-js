import { TaskType } from '../TaskType';
import { Mixin } from 'ts-mixer';
import { GeeTestRequestBase, GeeTestRequestBaseIn } from './GeeTestRequestBase';
import { ProxyInfo, ProxyInfoIn } from './ProxyInfo';

export type GeeTestRequestIn = Pick<GeeTestRequestBaseIn, Exclude<keyof GeeTestRequestBaseIn, 'type'>> & ProxyInfoIn;

/**
 * GeeTest recognition request (with proxy).
 * {@link https://zennolab.atlassian.net/wiki/spaces/APIS/pages/1940357159/GeeTestTask+GeeTest+captcha+recognition}
 */
export class GeeTestRequest extends Mixin(GeeTestRequestBase, ProxyInfo) {
  constructor(argsObj: GeeTestRequestIn) {
    super({ type: TaskType.GeeTestTask, ...argsObj });
  }
}
