import { FunCaptchaRequest } from './FunCaptchaRequest';
import { GeeTestRequest } from './GeeTestRequest';
import { HCaptchaRequest } from './HCaptchaRequest';
import { ImageToTextRequest } from './ImageToTextRequest';
import { RecaptchaV2EnterpriseRequest } from './RecaptchaV2EnterpriseRequest';
import { RecaptchaV2Request } from './RecaptchaV2Request';
import { RecaptchaV3ProxylessRequest } from './RecaptchaV3ProxylessRequest';
import { ComplexImageHCaptchaRequest } from './ComplexImageHCaptchaRequest';
import { ComplexImageRecaptchaRequest } from './ComplexImageRecaptchaRequest';
import { ComplexImageFunCaptchaRequest } from './ComplexImageFunCaptchaRequest';
import { DataDomeRequest } from './DataDomeRequest';
import { BasiliskRequest } from './BasiliskRequest';
import { ImpervaRequest } from './ImpervaRequest';
import { BinanceRequest } from './BinanceRequest';

/**
 * Universal type for recognition request
 */
export type Task =
  | FunCaptchaRequest
  | GeeTestRequest
  | HCaptchaRequest
  | ImageToTextRequest
  | RecaptchaV2EnterpriseRequest
  | RecaptchaV2Request
  | RecaptchaV3ProxylessRequest
  | ComplexImageHCaptchaRequest
  | ComplexImageRecaptchaRequest
  | ComplexImageFunCaptchaRequest
  | DataDomeRequest
  | BasiliskRequest
  | ImpervaRequest
  | BinanceRequest;
