import { CaptchaRequestBase, CaptchaRequestBaseIn } from '../CaptchaRequestBase';

export type AmazonRequestBaseIn = {
  websiteURL: string;
  challengeScript: string;
  captchaScript: string;
  websiteKey: string;
  context: string;
  iv: string;
  cookieSolution?: boolean;
} & CaptchaRequestBaseIn;

/**
 * Base GeeTest recognition request
 */
export abstract class AmazonRequestBase extends CaptchaRequestBase {
  /**
   * Address of the page on which the captcha is recognized
   */
  public websiteURL!: string;

  /**
   * Link to challenge.js
   */
  public challengeScript!: string;

  /**
   * Link to captcha.js
   */
  public captchaScript!: string;

  /**
   * A string that can be retrieved from an html page with a captcha or with javascript by executing the window.gokuProps.key
   */
  public websiteKey!: string;

  /**
   * A string that can be retrieved from an html page with a captcha or with javascript by executing the window.gokuProps.context
   */
  public context!: string;

  /**
   * A string that can be retrieved from an html page with a captcha or with javascript by executing the window.gokuProps.iv
   */
  public iv!: string;

  /**
   * By default false. If you need to use cookies "aws-waf-token", specify the value true. Otherwise, what you will get in return is "captcha_voucher" and "existing_token".
   */
  public cookieSolution?: boolean = false;

  constructor({ type, nocache, websiteURL, challengeScript, captchaScript, websiteKey, context, iv, cookieSolution }: AmazonRequestBaseIn) {
    super({ type, nocache });
    this.websiteURL = websiteURL;
    this.challengeScript = challengeScript;
    this.captchaScript = captchaScript;
    this.websiteKey = websiteKey;
    this.context = context;
    this.iv = iv;
    this.cookieSolution = cookieSolution;
  }
}
