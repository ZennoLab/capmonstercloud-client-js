import { TaskType } from '../TaskType';
import { applyMixins } from '../Utils';
import { GeeTestRequestBase, GeeTestRequestBaseIn } from './GeeTestRequestBase';
import { ProxyInfo, ProxyInfoIn } from './ProxyInfo';

export type GeeTestRequestIn = Pick<GeeTestRequestBaseIn, Exclude<keyof GeeTestRequestBaseIn, 'type'>> & ProxyInfoIn;

/**
 * GeeTest recognition request (with proxy).
 * {@link https://zennolab.atlassian.net/wiki/spaces/APIS/pages/1940357159/GeeTestTask+GeeTest+captcha+recognition}
 */
export class GeeTestRequest extends GeeTestRequestBase {
  constructor(argsObj: GeeTestRequestIn) {
    super({ type: TaskType.GeeTestTask, ...argsObj });
  }
}

applyMixins(GeeTestRequest, [ProxyInfo]);
