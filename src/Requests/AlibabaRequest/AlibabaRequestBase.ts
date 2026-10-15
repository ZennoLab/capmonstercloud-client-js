import { CaptchaRequestBase, CaptchaRequestBaseIn } from '../CaptchaRequestBase';

export type AlibabaMetadata = {
  /** Standard flow uses sceneId/prefix; punish flow uses punishUrl instead. */
  sceneId?: string;
  prefix?: string;
  userId?: string;
  userUserId?: string;
  verifyType?: string;
  region?: string;
  UserCertifyId?: string;
  apiGetLib?: string;
  punishUrl?: string;
  cookieRequired?: boolean;
};

export type AlibabaRequestBaseIn = {
  websiteURL: string;
  userAgent?: string;
  metadata: AlibabaMetadata;
  _class: string;
} & CaptchaRequestBaseIn;

/**
 * Base Alibaba recognition request
 */
export abstract class AlibabaRequestBase extends CaptchaRequestBase {
  /**
   * Address of a webpage with Alibaba Captcha.
   */
  public websiteURL!: string;

  /**
   * Browser User-Agent. Pass only the actual UA from Windows OS
   */
  public userAgent?: string;

  /**
   * Additional metadata required to solve Alibaba Captcha.
   */
  public metadata!: AlibabaMetadata;

  /**
   * Class of captcha object
   */
  public class: string;

  constructor({ type, nocache, websiteURL, userAgent, metadata, _class }: AlibabaRequestBaseIn) {
    super({ type, nocache });
    this.websiteURL = this.validateWebsiteURL(websiteURL);
    this.userAgent = userAgent;
    this.metadata = metadata;
    this.class = _class;
  }
}
