import { CaptchaRequestBase, CaptchaRequestBaseIn } from '../CaptchaRequestBase';

export type YidunRequestBaseIn = {
  websiteURL: string;
  websiteKey: string;
  userAgent?: string;
  yidunGetLib?: string;
  yidunApiServerSubdomain?: string;
  challenge?: string;
  hcg?: string;
  hct?: number;
} & CaptchaRequestBaseIn;

/**
 * Base Yidun recognition request
 */
export abstract class YidunRequestBase extends CaptchaRequestBase {
  /**
   * Full URL of the page with the captcha.
   */
  public websiteURL!: string;

  /**
   * The siteKey value found on the page.
   */
  public websiteKey!: string;

  /**
   * Browser User-Agent. Pass only the actual UA from Windows OS
   */
  public userAgent?: string;

  /**
   * Path to the JavaScript file responsible for loading the captcha on the page.
   */
  public yidunGetLib?: string;

  /**
   * Subdomain of the Yidun API server.
   */
  public yidunApiServerSubdomain?: string;

  /**
   * Unique identifier of the current captcha.
   */
  public challenge?: string;

  /**
   * Captcha hash used in the request.
   */
  public hcg?: string;

  /**
   * Numeric timestamp used in Enterprise version validation.
   */
  public hct?: number;

  constructor({
    type,
    nocache,
    websiteURL,
    websiteKey,
    userAgent,
    yidunGetLib,
    yidunApiServerSubdomain,
    challenge,
    hcg,
    hct,
  }: YidunRequestBaseIn) {
    super({ type, nocache });
    this.websiteURL = websiteURL;
    this.websiteKey = websiteKey;
    this.userAgent = userAgent;
    this.yidunGetLib = yidunGetLib;
    this.yidunApiServerSubdomain = yidunApiServerSubdomain;
    this.challenge = challenge;
    this.hcg = hcg;
    this.hct = hct;
  }
}
