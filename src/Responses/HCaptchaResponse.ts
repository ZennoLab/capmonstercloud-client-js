import { RecaptchaResponseBase } from './RecaptchaResponseBase';

/**
 * HCaptcha recognition response
 */
export type HCaptchaResponse = RecaptchaResponseBase & { respKey: string; userAgent: string };
