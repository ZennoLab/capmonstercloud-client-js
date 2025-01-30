import { CaptchaRequestBase, CaptchaRequestBaseIn } from './CaptchaRequestBase';

export type BasiliskRequestBaseIn = {
  websiteURL: string;
  websiteKey: string;
  userAgent?: string;
  _class: string;
} & CaptchaRequestBaseIn;

/**
 * Base Basilisk recognition request
 */
export abstract class BasiliskRequestBase extends CaptchaRequestBase {
  /**
   * Address of a webpage with Basilisk.
   */
  public websiteURL!: string;

  /**
   * Can be found in the html code in the attribute data-sitekey of the captcha container or in the payload of a POST request to the https://basiliskcaptcha.com/challenge/check-site in the field site_key
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

  constructor({ type, nocache, websiteURL, userAgent, websiteKey, _class }: BasiliskRequestBaseIn) {
    super({ type, nocache });
    this.websiteURL = websiteURL;
    this.websiteKey = websiteKey;
    this.userAgent = userAgent;
    this.class = _class;
  }
}
