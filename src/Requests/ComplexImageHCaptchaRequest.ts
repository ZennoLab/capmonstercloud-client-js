import { ComplexImageRequestBase, ComplexImageRequestBaseIn } from './ComplexImageRequestBase';
import { TaskType } from '../TaskType';

export type ComplexImageHCaptchaRequestIn = Pick<ComplexImageRequestBaseIn, Exclude<keyof ComplexImageRequestBaseIn, 'type' | '_class'>> & {
  exampleImagesBase64?: Array<string>;
};

export class ComplexImageHCaptchaRequest extends ComplexImageRequestBase {
  /**
   * List of exampleImageUrls in base64
   * It is required if hCaptcha is 3x3 grid
   */
  public exampleImagesBase64?: Array<string>;

  constructor({ exampleImagesBase64, ...argsObjs }: ComplexImageHCaptchaRequestIn) {
    super({ type: TaskType.ComplexImageTask, _class: 'hcaptcha', ...argsObjs });
    this.exampleImagesBase64 = exampleImagesBase64;
  }
}
