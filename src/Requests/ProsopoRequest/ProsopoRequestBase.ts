import { CaptchaRequestBase, CaptchaRequestBaseIn } from '../CaptchaRequestBase';

export type ProsopoRequestBaseIn = {
  websiteURL: string;
  websiteKey: string;
} & CaptchaRequestBaseIn;

/**
 * Base Prosopo recognition request
 */
export abstract class ProsopoRequestBase extends CaptchaRequestBase {
  /**
   * The full URL of the CAPTCHA page.
   */
  public websiteURL!: string;

  /**
   * The value of the siteKey parameter found on the page.
   */
  public websiteKey!: string;

  constructor({ type, nocache, websiteURL, websiteKey }: ProsopoRequestBaseIn) {
    super({ type, nocache });
    this.websiteURL = websiteURL;
    this.websiteKey = websiteKey;
  }
}
