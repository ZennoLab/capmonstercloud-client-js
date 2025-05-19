import { TaskType } from '../../TaskType';
import { GeeTestRequestBase, GeeTestRequestBaseIn } from './GeeTestRequestBase';
import { ProxyInfo, ProxyInfoIn } from '../ProxyInfo';

export type GeeTestRequestIn = Pick<GeeTestRequestBaseIn, Exclude<keyof GeeTestRequestBaseIn, 'type'>> & { proxy?: ProxyInfoIn };

/**
 * GeeTest recognition request.
 * {@link https://zennolab.atlassian.net/wiki/spaces/APIS/pages/1940357159/GeeTestTask+GeeTest+captcha+recognition}
 */
export class GeeTestRequest extends GeeTestRequestBase {
  constructor({ proxy, ...argsObj }: GeeTestRequestIn) {
    super({ type: TaskType.GeeTestTask, ...argsObj });
    if (proxy) {
      Object.assign(this, new ProxyInfo(proxy));
    }
  }
}
