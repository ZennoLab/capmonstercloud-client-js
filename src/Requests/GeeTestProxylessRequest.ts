import { TaskType } from '../TaskType';
import { GeeTestRequestBase } from './GeeTestRequestBase';

/**
 * GeeTest recognition request (without proxy).
 * {@link https://zennolab.atlassian.net/wiki/spaces/APIS/pages/1940291626/GeeTestTaskProxyless+GeeTest+captcha+recognition+without+proxy}
 */
export class GeeTestProxylessRequest extends GeeTestRequestBase {
  /**
   * Recognition task type
   */
  public type = TaskType.GeeTestTaskProxyless;
}
