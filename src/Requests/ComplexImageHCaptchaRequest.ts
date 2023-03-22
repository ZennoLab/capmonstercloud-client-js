import { ComplexImageRequestBase, ComplexImageRequestBaseIn } from './ComplexImageRequestBase';
import { TaskType } from '../TaskType';

export type ComplexImageHCaptchaRequestIn = Pick<ComplexImageRequestBaseIn, Exclude<keyof ComplexImageRequestBaseIn, 'type' | '_class'>>;

export class ComplexImageHCaptchaRequest extends ComplexImageRequestBase {
  constructor(argsObjs: ComplexImageHCaptchaRequestIn) {
    super({ type: TaskType.ComplexImageTask, _class: 'hcaptcha', ...argsObjs });
  }
}
