import { ComplexImageFunCaptchaRequest } from './ComplexImageFunCaptchaRequest';
import { DataDomeRequest } from './DataDomeRequest';
import { FunCaptchaProxylessRequest } from './FunCaptchaProxylessRequest';
import { FunCaptchaRequest } from './FunCaptchaRequest';
import { GeeTestProxylessRequest } from './GeeTestProxylessRequest';
import { GeeTestRequest } from './GeeTestRequest';
import { HCaptchaProxylessRequest } from './HCaptchaProxylessRequest';
import { HCaptchaRequest } from './HCaptchaRequest';
import { ImageToTextRequest } from './ImageToTextRequest';
import { RecaptchaV2EnterpriseProxylessRequest } from './RecaptchaV2EnterpriseProxylessRequest';
import { RecaptchaV2EnterpriseRequest } from './RecaptchaV2EnterpriseRequest';
import { RecaptchaV2ProxylessRequest } from './RecaptchaV2ProxylessRequest';
import { RecaptchaV2Request } from './RecaptchaV2Request';
import { RecaptchaV3ProxylessRequest } from './RecaptchaV3ProxylessRequest';
import { ComplexImageHCaptchaRequest } from './ComplexImageHCaptchaRequest';
import { ComplexImageRecaptchaRequest } from './ComplexImageRecaptchaRequest';

/**
 * Universal type for recognition request
 */
export type Task =
  | FunCaptchaProxylessRequest
  | FunCaptchaRequest
  | GeeTestProxylessRequest
  | GeeTestRequest
  | HCaptchaProxylessRequest
  | HCaptchaRequest
  | ImageToTextRequest
  | RecaptchaV2EnterpriseProxylessRequest
  | RecaptchaV2EnterpriseRequest
  | RecaptchaV2ProxylessRequest
  | RecaptchaV2Request
  | RecaptchaV3ProxylessRequest
  | ComplexImageHCaptchaRequest
  | ComplexImageRecaptchaRequest
  | ComplexImageFunCaptchaRequest
  | DataDomeRequest;
