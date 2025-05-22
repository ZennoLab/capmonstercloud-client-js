import { TaskType } from '../TaskType';
import { CaptchaRequestBase, CaptchaRequestBaseIn } from './CaptchaRequestBase';

type RecaptchaV3RequestIn = {
  websiteURL: string;
  websiteKey: string;
  minScore?: number;
  pageAction?: string;
} & CaptchaRequestBaseIn;

export type RecaptchaV3ProxylessRequestIn = Pick<RecaptchaV3RequestIn, Exclude<keyof RecaptchaV3RequestIn, 'type'>>;

/**
 * Recaptcha V3 recognition request (without proxy).
 * {@link https://zenno.link/doc-recaptcha3-en}
 */
export class RecaptchaV3ProxylessRequest extends CaptchaRequestBase {
  /**
   * Address of a webpage with Google ReCaptcha
   */
  public websiteURL!: string;

  /**
   * Recaptcha website key.
   * @example
   * <![CDATA[
   * <div class="g-recaptcha" data-sitekey="THAT_ONE"></div>
   * ]]>
   */
  public websiteKey!: string;

  /**
   * Value from 0.1 to 0.9.
   */
  public minScore?: number;

  /**
   * Widget action value.
   * Website owner defines what user is doing on the page through this parameter.
   * Default value: verify
   * @example
   * <![CDATA[
   * grecaptcha.execute('site_key', {action:'login_test'})]]>
   */
  public pageAction: string;

  constructor({ nocache, websiteURL, websiteKey, minScore, pageAction = 'verify' }: RecaptchaV3ProxylessRequestIn) {
    super({ type: TaskType.RecaptchaV3TaskProxyless, nocache });
    this.websiteURL = websiteURL;
    this.websiteKey = websiteKey;
    this.minScore = minScore;
    this.pageAction = pageAction;
  }
}
