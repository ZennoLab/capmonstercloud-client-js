import { CaptchaRequestBase, CaptchaRequestBaseIn } from './CaptchaRequestBase';

export type ImpervaRequestBaseIn = {
  websiteURL: string;
  metadata: {
    incapsulaScriptBase64: string;
    incapsulaSessionCookie: string;
    reese84UrlEndpoint?: string;
  };
  userAgent?: string;
  _class: string;
} & CaptchaRequestBaseIn;

/**
 * Base Imperva recognition request
 */
export abstract class ImpervaRequestBase extends CaptchaRequestBase {
  /**
   * Address of a webpage with Imperva.
   */
  public websiteURL!: string;

  public metadata: {
    incapsulaScriptBase64: string;
    incapsulaSessionCookie: string;
    reese84UrlEndpoint?: string;
  };

  /**
   * Browser User-Agent. Pass only the actual UA from Windows OS
   */
  public userAgent?: string;

  /**
   * Class of captcha object
   */
  public class: string;

  constructor({ type, nocache, websiteURL, userAgent, metadata, _class }: ImpervaRequestBaseIn) {
    super({ type, nocache });
    this.websiteURL = websiteURL;
    this.metadata = metadata;
    this.userAgent = userAgent;
    this.class = _class;
  }
}
