import { TaskType } from '../TaskType';
import { CaptchaRequestBase } from './CaptchaRequestBase';

/**
 * Recaptcha V3 recognition request (without proxy).
 * {@link https://zennolab.atlassian.net/wiki/spaces/APIS/pages/566853650/RecaptchaV3TaskProxyless+solving+Google+ReCaptcha+v.3}
 */
export class RecaptchaV3ProxylessRequest extends CaptchaRequestBase {
  /**
   * Recognition task type
   */
  public type = TaskType.RecaptchaV3TaskProxyless;

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
  public pageAction = 'verify';
}
