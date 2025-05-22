import { CaptchaRequestBase, CaptchaRequestBaseIn } from '../CaptchaRequestBase';

export type TurnstileRequestBaseIn = {
  websiteURL: string;
  websiteKey: string;
} & CaptchaRequestBaseIn;

/**
 * Base Turnstile recognition request
 */
export abstract class TurnstileRequestBase extends CaptchaRequestBase {
  /**
   * Address of a webpage
   */
  public websiteURL!: string;

  /**
   * Turnstile website key.
   */
  public websiteKey!: string;

  constructor({ type, nocache, websiteURL, websiteKey }: TurnstileRequestBaseIn) {
    super({ type, nocache });
    this.websiteURL = websiteURL;
    this.websiteKey = websiteKey;
  }
}
