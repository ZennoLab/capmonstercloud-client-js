import { CaptchaRequestBase, CaptchaRequestBaseIn } from './CaptchaRequestBase';

export type GeeTestRequestBaseIn = {
  websiteURL: string;
  gt: string;
  challenge: string;
  geetestApiServerSubdomain?: string;
  geetestGetLib?: string;
  userAgent?: string;
} & CaptchaRequestBaseIn;

/**
 * Base GeeTest recognition request
 */
export abstract class GeeTestRequestBase extends CaptchaRequestBase {
  /**
   * Address of the page on which the captcha is recognized
   * @example
   * https://example.com/geetest.php
   */
  public websiteURL!: string;

  /**
   * The GeeTest identifier key for the domain.
   * Static value, rarely updated.
   * @example
   * 81dc9bdb52d04dc20036dbd8313ed055
   */
  public gt!: string;

  /**
   * A dynamic key.
   * Each time our API is called, we need to get a new key value.
   * If the captcha is loaded on the page, then the challenge value is no longer valid and you will get @type {ErrorType.TOKEN_EXPIRED} error.
   * IMPORTANT. You will be charged for tasks with @type {ErrorType.TOKEN_EXPIRED} error!
   *
   * It is necessary to examine the requests and find the one in which this value is returned and,
   * before each creation of the recognition task, execute this request and parse the <![CDATA[challenge]]> from it.
   * @example
   * d93591bdf7860e1e4ee2fca799911215
   */
  public challenge!: string;

  /**
   * May be required for some sites.
   */
  public geetestApiServerSubdomain?: string;

  /**
   * May be required for some sites.
   * Send JSON as a string.
   */
  public geetestGetLib?: string;

  /**
   * Browser's User-Agent which is used in emulation.
   * It is required that you use a signature of a modern browser,
   * otherwise Google will ask you to "update your browser".
   */
  public userAgent?: string;

  constructor({ type, nocache, websiteURL, gt, challenge, geetestApiServerSubdomain, geetestGetLib, userAgent }: GeeTestRequestBaseIn) {
    super({ type, nocache });
    this.websiteURL = websiteURL;
    this.gt = gt;
    this.challenge = challenge;
    this.geetestApiServerSubdomain = geetestApiServerSubdomain;
    this.geetestGetLib = geetestGetLib;
    this.userAgent = userAgent;
  }
}
