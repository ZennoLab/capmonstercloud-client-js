import { ComplexImageRequestBase, ComplexImageRequestBaseIn } from './ComplexImageRequestBase';
import { TaskType } from '../TaskType';

export type ComplexImageRecaptchaRequestIn = Pick<ComplexImageRequestBaseIn, Exclude<keyof ComplexImageRequestBaseIn, 'type' | '_class'>>;

export class ComplexImageRecaptchaRequest extends ComplexImageRequestBase {
  constructor(argsObjs: ComplexImageRecaptchaRequestIn) {
    super({ type: TaskType.ComplexImageTask, _class: 'recaptcha', ...argsObjs });
  }
}
