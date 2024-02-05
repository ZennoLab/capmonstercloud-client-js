import { TaskType } from '../TaskType';
import { Mixin } from 'ts-mixer';
import { GeeTestRequestBase, GeeTestRequestBaseIn } from './GeeTestRequestBase';
import { ProxyInfo, ProxyInfoIn } from './ProxyInfo';

export type GeeTestRequestIn = Pick<GeeTestRequestBaseIn, Exclude<keyof GeeTestRequestBaseIn, 'type'>> & ProxyInfoIn;

/**
 * GeeTest recognition request (with proxy).
 * {@link https://docs.capmonster.cloud/docs/captchas/geetest-task}
 */
export class GeeTestRequest extends Mixin(GeeTestRequestBase, ProxyInfo) {
  constructor(argsObj: GeeTestRequestIn) {
    super({ type: TaskType.GeeTestTask, ...argsObj });
  }
}
