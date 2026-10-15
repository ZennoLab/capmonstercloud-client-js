import { CaptchaRequestBase, CaptchaRequestBaseIn } from '../CaptchaRequestBase';

export type TSPDMetadata = {
  /**
   * Cookies obtained on the TSPD challenge page.
   */
  tspdCookie: string;
  /**
   * The entire TSPD page encoded in base64.
   */
  htmlPageBase64: string;
};

export type TSPDRequestBaseIn = {
  /**
   * The URL of the page where the TSPD challenge is located.
   */
  websiteURL: string;
  /**
   * Browser User-Agent.
   * Provide only the current Windows UA.
   */
  userAgent?: string;
  /**
   * Additional metadata required to solve TSPD.
   */
  metadata: TSPDMetadata;
  _class: string;
} & CaptchaRequestBaseIn;

/**
 * Base TSPD recognition request
 */
export abstract class TSPDRequestBase extends CaptchaRequestBase {
  /**
   * Address of a webpage with TSPD.
   */
  public websiteURL!: string;

  /**
   * Browser User-Agent.
   */
  public userAgent?: string;

  /**
   * Additional data about the captcha challenge (tspdCookie, htmlPageBase64).
   */
  public metadata!: TSPDMetadata;

  /**
   * Class of captcha object
   */
  public class!: string;

  constructor({ type, nocache, websiteURL, userAgent, metadata, _class }: TSPDRequestBaseIn) {
    super({ type, nocache });
    this.websiteURL = this.validateWebsiteURL(websiteURL);
    this.userAgent = userAgent;
    this.metadata = metadata;
    this.class = _class;
  }
}
