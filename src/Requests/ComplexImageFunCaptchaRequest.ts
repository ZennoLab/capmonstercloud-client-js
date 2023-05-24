import { ComplexImageRequestBase, ComplexImageRequestBaseIn } from './ComplexImageRequestBase';
import { TaskType } from '../TaskType';

export type ComplexImageFunCaptchaRequestIn = Pick<ComplexImageRequestBaseIn, Exclude<keyof ComplexImageRequestBaseIn, 'type' | '_class'>>;

export class ComplexImageFunCaptchaRequest extends ComplexImageRequestBase {
  constructor(argsObjs: ComplexImageFunCaptchaRequestIn) {
    super({ type: TaskType.ComplexImageTask, _class: 'funcaptcha', ...argsObjs });
  }
}
