import { CaptchaRequestBase } from './CaptchaRequestBase';

/**
 * Base FunCaptcha recognition request
 */
export abstract class FunCaptchaRequestBase extends CaptchaRequestBase {
  /**
   * Address of a webpage with FunCaptcha
   * @example
   * https://funcaptcha.com/fc/api/nojs/?pkey=69A21A01-CC7B-B9C6-0F9A-E7FA06677FFC
   */
  public websiteURL!: string;

  /**
   * FunCaptcha website key.
   * @example
   * <![CDATA[<div id="funcaptcha" data-pkey="THAT_ONE"></div>]]>
   * 69A21A01-CC7B-B9C6-0F9A-E7FA06677FFC
   */
  public websitePublicKey!: string;

  /**
   * A special subdomain of funcaptcha.com, from which the JS captcha widget should be loaded.
   * Most FunCaptcha installations work from shared domains, so this option is only needed in certain rare cases.
   * @example
   * mywebsite-api.funcaptcha.com
   */
  public funcaptchaApiJSSubdomain?: string;

  /**
   * Additional parameter that may be required by FunCaptcha implementation.
   * Use this property to send "blob" value as a stringified array. See example how it may look like.
   * @example
   * <![CDATA[{"\blob\":\"HERE_COMES_THE_blob_VALUE\"}]]>
   * "{\"blob\":\"dyXvXANMbHj1iDyz.Qj97JtSqR2n%2BuoY1V%2FbdgbrG7p%2FmKiqdU9AwJ6MifEt0np4vfYn6TTJDJEfZDlcz9Q1XMn9przeOV%2FCr2%2FIpi%2FC1s%3D\"}"
   */
  public data?: string;

  /**
   * Additional cookies which we must use during interaction with target page.
   */
  public cookies?: string;
}
