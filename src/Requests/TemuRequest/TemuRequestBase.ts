import { CaptchaRequestBase, CaptchaRequestBaseIn } from '../CaptchaRequestBase';

type MetadataWithCookie = {
  cookie: string;
};
export type TemuRequestBaseIn = {
  websiteURL: string;
  userAgent?: string;
  metadata: MetadataWithCookie;
  _class: string;
} & CaptchaRequestBaseIn;

/**
 * Base Temu recognition request
 */
export abstract class TemuRequestBase extends CaptchaRequestBase {
  /**
   * The full URL of the page where the CAPTCHA is loaded
   */
  public websiteURL!: string;

  /**
   * Browser User-Agent. Pass only the actual UA from Windows OS
   */
  public userAgent?: string;

  /**
   * Class of captcha object
   */
  public class: string;

  /**
   * Cookies obtained via document.cookie on the page where the CAPTCHA is loaded
   */
  public metadata: MetadataWithCookie;

  constructor({ type, nocache, websiteURL, userAgent, metadata, _class }: TemuRequestBaseIn) {
    super({ type, nocache });
    this.websiteURL = websiteURL;
    this.metadata = metadata;
    this.userAgent = userAgent;
    this.class = _class;
  }
}
