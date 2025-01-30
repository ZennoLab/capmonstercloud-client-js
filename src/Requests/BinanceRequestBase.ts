import { CaptchaRequestBase, CaptchaRequestBaseIn } from './CaptchaRequestBase';

export type BinanceRequestBaseIn = {
  websiteURL: string;
  websiteKey: string;
  validateId: string;
  userAgent?: string;
} & CaptchaRequestBaseIn;

/**
 * Base Binance recognition request
 */
export abstract class BinanceRequestBase extends CaptchaRequestBase {
  /**
   * Address of a webpage with Binance.
   */
  public websiteURL!: string;

  /**
   * A unique parameter for your website's section. The value of the parameter bizId, bizType, or bizCode. It can be taken from the traffic (see the description below
   */
  public websiteKey!: string;

  /**
   * A dynamic key. The value of the parameter validateId, securityId, or securityCheckResponseValidateId. It can be taken from the traffic (see the description below).
   */
  public validateId!: string;

  /**
   * Browser User-Agent. Pass only the actual UA from Windows OS
   */
  public userAgent?: string;

  constructor({ type, nocache, websiteURL, userAgent, websiteKey, validateId }: BinanceRequestBaseIn) {
    super({ type, nocache });
    this.websiteURL = websiteURL;
    this.websiteKey = websiteKey;
    this.validateId = validateId;
    this.userAgent = userAgent;
  }
}
