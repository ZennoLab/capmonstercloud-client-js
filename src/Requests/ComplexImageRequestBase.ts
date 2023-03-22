import { CaptchaRequestBase, CaptchaRequestBaseIn } from './CaptchaRequestBase';

type metaData = {
  Grid?: string;
  Task?: string;
  TaskDefinition?: string;
};

export type ComplexImageRequestBaseIn = {
  _class: string;
  imageUrls?: Array<string>;
  imagesBase64?: Array<string>;
  metaData: metaData;
  userAgent?: string;
  websiteURL?: string;
} & CaptchaRequestBaseIn;

export class ComplexImageRequestBase extends CaptchaRequestBase {
  /**
   * Class of captcha object
   */
  public class!: string;
  /**
   * List of images
   * It is required if imagesBase64 is empty
   */
  public imageUrls?: Array<string>;
  /**
   * List of images in base64
   * It is required if imageUrls is empty
   */
  public imagesBase64?: Array<string>;
  /**
   * Browser's User-Agent which is used in emulation.
   * It is required that you use a signature of a modern browser.
   */
  public metaData: metaData;
  public userAgent?: string;
  /**
   * Address of a webpage with Captcha.
   */
  public websiteURL?: string;

  constructor({ type, nocache, imageUrls, _class, imagesBase64, metaData, userAgent, websiteURL }: ComplexImageRequestBaseIn) {
    super({ type, nocache });
    this.class = _class;
    this.imageUrls = imageUrls;
    this.imagesBase64 = imagesBase64;
    this.metaData = metaData;
    this.userAgent = userAgent;
    this.websiteURL = websiteURL;
  }
}
