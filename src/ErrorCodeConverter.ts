import { ErrorType, ErrorTypeKey } from './ErrorType';
import { debugErrorConverter } from './Logger';

export class ErrorCodeConverter {
  static convert(errorCode: string): ErrorType {
    debugErrorConverter('errorCode passed', errorCode);
    const prefix = 'ERROR_';
    const prefixLen = prefix.length;

    if (errorCode.startsWith(prefix)) {
      errorCode = errorCode.substring(prefixLen);
    }
    debugErrorConverter('errorCode prepared', errorCode);

    const errorType = ErrorType[errorCode as ErrorTypeKey];
    debugErrorConverter('errorType found', errorType);
    if (errorType) {
      return errorType;
    }

    if (errorCode === 'WRONG_CAPTCHA_ID') {
      return ErrorType.NO_SUCH_CAPCHA_ID;
    }

    return ErrorType.Unknown;
  }
}
