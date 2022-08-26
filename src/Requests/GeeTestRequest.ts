import { TaskType } from '../TaskType';
import { applyMixins } from '../Utils';
import { GeeTestRequestBase } from './GeeTestRequestBase';
import { ProxyInfo } from './ProxyInfo';

/**
 * GeeTest recognition request (with proxy).
 * {@link https://zennolab.atlassian.net/wiki/spaces/APIS/pages/1940357159/GeeTestTask+GeeTest+captcha+recognition}
 */
export class GeeTestRequest {
  /**
   * Recognition task type
   */
  public type = TaskType.GeeTestTask;
}

export interface GeeTestRequest extends GeeTestRequestBase, ProxyInfo {}

applyMixins(GeeTestRequest, [GeeTestRequestBase, ProxyInfo]);
