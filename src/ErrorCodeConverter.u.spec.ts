import { ErrorCodeConverter } from './ErrorCodeConverter';
import { ErrorType } from './ErrorType';

describe('Check unit tests for ErrorCodeConverter()', () => {
  const testCases = [
    { errorCode: 'ERROR_KEY_DOES_NOT_EXIST', toBe: ErrorType.KEY_DOES_NOT_EXIST },
    { errorCode: 'ERROR_ZERO_CAPTCHA_FILESIZE', toBe: ErrorType.ZERO_CAPTCHA_FILESIZE },
    { errorCode: 'ERROR_TOO_BIG_CAPTCHA_FILESIZE', toBe: ErrorType.TOO_BIG_CAPTCHA_FILESIZE },
    { errorCode: 'ERROR_ZERO_BALANCE', toBe: ErrorType.ZERO_BALANCE },
    { errorCode: 'ERROR_IP_NOT_ALLOWED', toBe: ErrorType.IP_NOT_ALLOWED },
    { errorCode: 'ERROR_CAPTCHA_UNSOLVABLE', toBe: ErrorType.CAPTCHA_UNSOLVABLE },
    { errorCode: 'ERROR_NO_SUCH_CAPCHA_ID', toBe: ErrorType.NO_SUCH_CAPCHA_ID },
    { errorCode: 'WRONG_CAPTCHA_ID', toBe: ErrorType.NO_SUCH_CAPCHA_ID },
    { errorCode: 'CAPTCHA_NOT_READY', toBe: ErrorType.Unknown },
    { errorCode: 'ERROR_IP_BANNED', toBe: ErrorType.IP_BANNED },
    { errorCode: 'ERROR_NO_SUCH_METHOD', toBe: ErrorType.NO_SUCH_METHOD },
    { errorCode: 'ERROR_TOO_MUCH_REQUESTS', toBe: ErrorType.TOO_MUCH_REQUESTS },
    { errorCode: 'ERROR_DOMAIN_NOT_ALLOWED', toBe: ErrorType.DOMAIN_NOT_ALLOWED },
    { errorCode: 'ERROR_TOKEN_EXPIRED', toBe: ErrorType.TOKEN_EXPIRED },
    { errorCode: 'ERROR_NO_SLOT_AVAILABLE', toBe: ErrorType.NO_SLOT_AVAILABLE },
  ];
  testCases.forEach(({ errorCode, toBe }) => {
    it(`should convert ${errorCode} to ${toBe}`, () => {
      const converted = ErrorCodeConverter.convert(errorCode);
      expect(converted).toBe(toBe);
    });
  });
});
