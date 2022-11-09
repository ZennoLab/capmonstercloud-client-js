import { CapMonsterModules } from '../CapMonsterModules';
import { CaptchaRequestBase, CaptchaRequestBaseIn } from './CaptchaRequestBase';
import { TaskType } from '../TaskType';

type ImageToTextRequestBaseIn = {
  body: string;
  CapMonsterModule?: CapMonsterModules;
  recognizingThreshold?: number;
  Case?: boolean;
  numeric?: 1 | 0;
  math?: boolean;
} & CaptchaRequestBaseIn;

export type ImageToTextRequestIn = Pick<ImageToTextRequestBaseIn, Exclude<keyof ImageToTextRequestBaseIn, 'type'>>;

/**
 * ImageToText recognition request
 * {@link https://zennolab.atlassian.net/wiki/spaces/APIS/pages/655469/ImageToTextTask+solve+image+captcha}
 */
export class ImageToTextRequest extends CaptchaRequestBase {
  /**
   * File body encoded in base64. Make sure to send it without line breaks.
   */
  public body!: string;

  /**
   * Name of recognizing module. Supported module names are
   */
  public CapMonsterModule?: CapMonsterModules;

  /**
   * Captcha recognition threshold with a possible value from 0 to 100.
   * If recognizingThreshold was set to 90 and the task was solved with a confidence of 80, you won't be charged.
   * In this case the user will get a response @type {ErrorType.CAPTCHA_UNSOLVABLE}
   */
  public recognizingThreshold?: number;

  /**
   * Set true if captcha is case sensitive.
   */
  public Case?: boolean;

  /**
   * Set true if captcha contains numbers only
   */
  public numeric?: 1 | 0;

  /**
   * Set true if captcha requires a mathematical operation.
   * Captcha 2 + 6 = will return a value of 8
   */
  public math?: boolean;

  constructor({ nocache, body, CapMonsterModule, recognizingThreshold, Case, numeric, math }: ImageToTextRequestIn) {
    super({ type: TaskType.ImageToTextTask, nocache });
    this.body = body;
    this.CapMonsterModule = CapMonsterModule;
    this.recognizingThreshold = recognizingThreshold;
    this.Case = Case;
    this.numeric = numeric;
    this.math = math;
  }
}
