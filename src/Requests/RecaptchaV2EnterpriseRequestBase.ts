import { CaptchaRequestBase } from './CaptchaRequestBase';

/**
 * Base Recaptcha V2 Enterprise recognition request
 */
export abstract class RecaptchaV2EnterpriseRequestBase extends CaptchaRequestBase {
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
   * Additional parameters which should be passed to "grecaptcha.enterprise.render" method along with sitekey.
   * Example of what you should search for:
   * @example
   * <![CDATA[
   * grecaptcha.enterprise.render("some-div-id", {
   *   sitekey: "6Lc_aCMTAAAAABx7u2N0D1XnVbI_v6ZdbM6rYf16",
   *   theme: "dark",
   *   s: "2JvUXHNTnZl1Jb6WEvbDyBMzrMTR7oQ78QRhBcG07rk9bpaAaE0LRq1ZeP5NYa0N...ugQA"
   *   });
   * ]]>
   * @description
   * In this example, you will notice a parameter "s" which is not documented, but obviously required.
   * Send it to the API, so that we render the Recaptcha widget with this parameter properly.
   */
  public enterprisePayload?: string;

  /**
   * Some custom implementations may contain additional "data-s" parameter in ReCaptcha2 div, which is in fact a one-time token and must be grabbed every time you want to solve a ReCaptcha2.
   * @example
   * <![CDATA[<div class="g-recaptcha" data-sitekey="some sitekey" data-s="THIS_ONE"></div>]]>
   */
  public recaptchaDataSValue?: string;
}
