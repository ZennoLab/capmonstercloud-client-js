import { TaskType } from '../TaskType';

export type CaptchaRequestBaseIn = { type: TaskType; nocache?: boolean };

/**
 * Base captcha recognition request
 */
export abstract class CaptchaRequestBase {
  /**
   * Gets recognition task type
   */
  public type: TaskType;

  /**
   * Set true if the site only accepts a portion of the tokens from CapMonster Cloud.
   * {@link https://zennolab.atlassian.net/wiki/spaces/APIS/pages/1832714243/What+if+the+site+only+accepts+a+portion+of+the+tokens+from+CapMonster+Cloud}
   */
  public nocache?: boolean;

  constructor({ type, nocache }: CaptchaRequestBaseIn) {
    this.type = type;
    this.nocache = nocache;
  }
}
