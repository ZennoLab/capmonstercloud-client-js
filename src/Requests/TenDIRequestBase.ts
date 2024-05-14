import { CaptchaRequestBase, CaptchaRequestBaseIn } from './CaptchaRequestBase';

export type TenDIRequestBaseIn = {
  websiteURL: string;
  websiteKey: string;
  userAgent?: string;
  _class: string;
} & CaptchaRequestBaseIn;

/**
 * Base TenDI recognition request
 */
export abstract class TenDIRequestBase extends CaptchaRequestBase {
  /**
   * Address of a webpage with TenDI.
   */
  public websiteURL!: string;

  /**
   * TenDI website key.
   */
  public websiteKey!: string;

  /**
   * Browser User-Agent. Pass only the actual UA from Windows OS
   */
  public userAgent?: string;

  /**
   * Class of captcha object
   */
  public class: string;

  constructor({ type, nocache, websiteURL, userAgent, websiteKey, _class }: TenDIRequestBaseIn) {
    super({ type, nocache });
    this.websiteURL = websiteURL;
    this.websiteKey = websiteKey;
    this.userAgent = userAgent;
    this.class = _class;
  }
}
