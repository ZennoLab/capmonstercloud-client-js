import { CaptchaRequestBase, CaptchaRequestBaseIn } from '../CaptchaRequestBase';

export type DataDomeRequestBaseIn = {
  websiteURL: string;
  userAgent?: string;
  _class: string;
  metadata: MetadataWithHtml | MetadataCaptchaUrl;
} & CaptchaRequestBaseIn;

export type MetadataWithHtml = {
  [key: string]: string;
  htmlPageBase64: string;
  datadomeCookie: string;
};

export type MetadataCaptchaUrl = {
  [key: string]: string;
  captchaUrl: string;
  datadomeCookie: string;
};

/**
 * Base DataDome recognition request
 */
export abstract class DataDomeRequestBase extends CaptchaRequestBase {
  /**
   * Address of a webpage with DataDome.
   */
  public websiteURL!: string;

  /**
   * DataDome website key.
   */
  public websiteKey!: string;

  /**
   * The object that contains additional data about the captcha - captchaUrl: "captchaUrl": "..."
   * You can take the link from the page with the captcha.
   * Often it looks like https://geo.captcha-delivery.com/captcha/?initialCid=...
   */
  public metadata!: Record<string, string>;

  /**
   * Browser User-Agent. Pass only the actual UA from Windows OS
   */
  public userAgent?: string;

  /**
   * Class of captcha object
   */
  public class: string;

  constructor({ type, nocache, websiteURL, userAgent, metadata, _class }: DataDomeRequestBaseIn) {
    super({ type, nocache });
    this.websiteURL = websiteURL;
    this.metadata = metadata;
    this.userAgent = userAgent;
    this.class = _class;
  }
}
