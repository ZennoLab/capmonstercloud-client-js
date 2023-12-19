import { ComplexImageRequestBase, ComplexImageRequestBaseIn } from './ComplexImageRequestBase';
import { TaskType } from '../TaskType';

export type ComplexImageHCaptchaRequestIn = Pick<ComplexImageRequestBaseIn, Exclude<keyof ComplexImageRequestBaseIn, 'type' | '_class'>> & {
  exampleImagesBase64?: Array<string>;
  exampleImageUrls?: Array<string>;
};

export class ComplexImageHCaptchaRequest extends ComplexImageRequestBase {
  /**
   * List of exampleImagesBase64
   */
  public exampleImagesBase64?: Array<string>;

  /**
   * List of exampleImageUrls
   */
  public exampleImageUrls?: Array<string>;

  constructor({ exampleImagesBase64, exampleImageUrls, ...argsObjs }: ComplexImageHCaptchaRequestIn) {
    super({ type: TaskType.ComplexImageTask, _class: 'hcaptcha', ...argsObjs });
    this.exampleImagesBase64 = exampleImagesBase64;
    this.exampleImageUrls = exampleImageUrls;
  }
}
