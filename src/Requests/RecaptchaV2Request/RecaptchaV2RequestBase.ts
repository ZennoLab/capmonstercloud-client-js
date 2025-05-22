import { CaptchaRequestBase, CaptchaRequestBaseIn } from '../CaptchaRequestBase';

export type RecaptchaV2RequestBaseIn = {
  websiteURL: string;
  websiteKey: string;
  recaptchaDataSValue?: string;
  userAgent?: string;
  cookies?: string;
} & CaptchaRequestBaseIn;

/**
 * Base Recaptcha V2 recognition request
 */
export abstract class RecaptchaV2RequestBase extends CaptchaRequestBase {
  /**
   * Address of a webpage with Google ReCaptcha
   */
  public websiteURL!: string;

  /**
   * Recaptcha website key.
   * @example
   * <![CDATA[<div class="g-recaptcha" data-sitekey="THAT_ONE"></div>]]>
   */
  public websiteKey!: string;

  /**
   * Some custom implementations may contain additional "data-s" parameter in ReCaptcha2 div, which is in fact a one-time token and must be grabbed every time you want to solve a ReCaptcha2.
   * @example
   * <![CDATA[<div class="g-recaptcha" data-sitekey="some sitekey" data-s="THIS_ONE"></div>]]>
   */
  public recaptchaDataSValue?: string;

  /**
   * Browser's User-Agent which is used in emulation.
   * It is required that you use a signature of a modern browser,
   * otherwise Google will ask you to "update your browser".
   */
  public userAgent?: string;

  /**
   * Additional cookies which we must use during interaction with target page or Google.
   */
  public cookies?: string;

  constructor({ type, nocache, websiteURL, websiteKey, recaptchaDataSValue, userAgent, cookies }: RecaptchaV2RequestBaseIn) {
    super({ type, nocache });
    this.websiteURL = websiteURL;
    this.websiteKey = websiteKey;
    this.recaptchaDataSValue = recaptchaDataSValue;
    this.userAgent = userAgent;
    this.cookies = cookies;
  }
}
