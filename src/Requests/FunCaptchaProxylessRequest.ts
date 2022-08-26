import { TaskType } from '../TaskType';
import { FunCaptchaRequestBase, FunCaptchaRequestBaseIn } from './FunCaptchaRequestBase';

export type FunCaptchaProxylessRequestIn = Pick<FunCaptchaRequestBaseIn, Exclude<keyof FunCaptchaRequestBaseIn, 'type'>>;

/**
 * FunCaptcha recognition request (without proxy).
 * {@link https://zennolab.atlassian.net/wiki/spaces/APIS/pages/643629079/FunCaptchaTaskProxyless+solving+FunCaptcha}
 */
export class FunCaptchaProxylessRequest extends FunCaptchaRequestBase {
  constructor(argsObj: FunCaptchaProxylessRequestIn) {
    super({ type: TaskType.FunCaptchaTaskProxyless, ...argsObj });
  }
}
