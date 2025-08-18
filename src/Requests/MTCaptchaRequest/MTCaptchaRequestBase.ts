import { CaptchaRequestBase, CaptchaRequestBaseIn } from '../CaptchaRequestBase';

export type MTCaptchaRequestBaseIn = {
  websiteURL: string;
  websiteKey: string;
  userAgent?: string;
  pageAction?: string;
  isInvisible?: boolean;
} & CaptchaRequestBaseIn;

/**
 * Base MTCaptcha recognition request
 */
export abstract class MTCaptchaRequestBase extends CaptchaRequestBase {
  /**
   * Full URL of the page with the captcha.
   */
  public websiteURL!: string;

  /**
   * The MTcaptcha key, passed in the request parameters as sk
   */
  public websiteKey!: string;

  /**
   * Browser User-Agent. Pass only the actual UA from Windows OS
   */
  public userAgent?: string;

  /**
   * The action parameter is passed in the request as act and displayed when validating the token.
   */
  public pageAction?: string;

  /**
   * true if the captcha is invisible, i.e., has a hidden confirmation field. If bot suspicion occurs, an additional verification is triggered.
   */
  public isInvisible?: boolean;

  constructor({ type, nocache, websiteURL, websiteKey, userAgent, pageAction, isInvisible }: MTCaptchaRequestBaseIn) {
    super({ type, nocache });
    this.websiteURL = websiteURL;
    this.websiteKey = websiteKey;
    this.userAgent = userAgent;
    this.pageAction = pageAction;
    this.isInvisible = isInvisible;
  }
}
