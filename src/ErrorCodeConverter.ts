import { ErrorType, ErrorTypeKey } from './ErrorType';

export class ErrorCodeConverter {
  static convert(errorCode: string): ErrorType {
    const prefix = 'ERROR_';
    const prefixLen = prefix.length;

    if (errorCode.startsWith(prefix)) {
      errorCode = errorCode.substring(prefixLen);
    }

    const errorType = ErrorType[errorCode as ErrorTypeKey];
    if (errorType) {
      return errorType;
    }

    if (errorCode === 'WRONG_CAPTCHA_ID') {
      return ErrorType.NO_SUCH_CAPCHA_ID;
    }

    return ErrorType.Unknown;
  }
}
