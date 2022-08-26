import { TaskType } from '../TaskType';

/**
 * Base captcha recognition request
 */
export abstract class CaptchaRequestBase {
  /**
   * Gets recognition task type
   */
  abstract type: TaskType;

  /**
   * Set true if the site only accepts a portion of the tokens from CapMonster Cloud.
   * {@link https://zennolab.atlassian.net/wiki/spaces/APIS/pages/1832714243/What+if+the+site+only+accepts+a+portion+of+the+tokens+from+CapMonster+Cloud}
   */
  public nocache!: boolean;
}
