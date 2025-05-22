import { CaptchaRequestBase, CaptchaRequestBaseIn } from '../CaptchaRequestBase';

export type HCaptchaRequestBaseIn = {
  websiteURL: string;
  websiteKey: string;
  isInvisible?: boolean;
  data?: string;
  userAgent?: string;
  cookies?: string;
  fallbackToActualUA?: boolean;
} & CaptchaRequestBaseIn;

/**
 * Base HCaptcha recognition request
 */
export abstract class HCaptchaRequestBase extends CaptchaRequestBase {
  /**
   * Address of a webpage with hCaptcha.
   */
  public websiteURL!: string;

  /**
   * hCaptcha website key.
   */
  public websiteKey!: string;

  /**
   * Set true for invisible version of hCaptcha
   */
  public isInvisible?: boolean;

  /**
   * Custom data that is used in some implementations of hCaptcha, mostly with @type {Invisible}=true.
   * In most cases you see it as <![CDATA[rqdata]]> inside network requests.
   * IMPORTANT: you MUST provide @type {UserAgent} if you submit captcha with data parameter.
   * The value should match the User-Agent you use when interacting with the target website.
   */
  public data?: string;

  /**
   * Browser's User-Agent which is used in emulation.
   * It is required that you use a signature of a modern browser.
   */
  public userAgent?: string;

  /**
   * Additional cookies which we must use during interaction with target page.
   */
  public cookies?: string;

  /* true - when specifying this parameter, we ignore the irrelevant User Agent
  that users send in the request, and return our own (relevant) one with
  getTaskResult. This will improve the acceptance of tokens.
  false - we insert the User Agent that is specified in the request. If the User
  Agent is invalid, you will receive an error ERROR_WRONG_USERAGENT (USERAGENT IS EXPIRED in the log).
  null - we insert the User Agent that is specified in the request, but we don’t validate it */
  public fallbackToActualUA?: boolean;

  constructor({ type, nocache, websiteURL, websiteKey, isInvisible, data, userAgent, cookies, fallbackToActualUA }: HCaptchaRequestBaseIn) {
    super({ type, nocache });
    this.websiteURL = websiteURL;
    this.websiteKey = websiteKey;
    this.isInvisible = isInvisible;
    this.data = data;
    this.userAgent = userAgent;
    this.cookies = cookies;
    this.fallbackToActualUA = fallbackToActualUA;
  }
}
