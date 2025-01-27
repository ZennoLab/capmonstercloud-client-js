import { CaptchaRequestBase, CaptchaRequestBaseIn } from './CaptchaRequestBase';

type metaData = {
  Task: string;
  TaskArgument?: string;
};

export type ComplexImageRecognitionRequestBaseIn = {
  _class: string;
  imagesBase64?: Array<string>;
  metaData: metaData;
} & CaptchaRequestBaseIn;

export class ComplexImageRecognitionRequestBase extends CaptchaRequestBase {
  /**
   * Class of captcha object
   */
  public class!: string;
  /**
   * List of images
   */
  public imagesBase64?: Array<string>;
  /**
   * Browser's User-Agent which is used in emulation.
   * It is required that you use a signature of a modern browser.
   */
  public metadata: metaData;

  constructor({ type, nocache, _class, imagesBase64, metaData }: ComplexImageRecognitionRequestBaseIn) {
    super({ type, nocache });
    this.class = _class;
    this.imagesBase64 = imagesBase64;
    this.metadata = metaData;
  }
}
