export enum ErrorType {
  /**
   * Captcha recognition timeout is expired
   */
  Timeout = -2,
  /**
   * Unknown error. Maybe client library is outdated
   */
  Unknown = -1,
  /**
   * Account authorization key not found in the system or has incorrect format
   */
  KEY_DOES_NOT_EXIST = 0,
  /**
   * The size of the captcha you are uploading is less than 100 bytes.
   */
  ZERO_CAPTCHA_FILESIZE,
  /**
   * The size of the captcha you are uploading is more than 50,000 bytes.
   */
  TOO_BIG_CAPTCHA_FILESIZE,
  /**
   * Account has zero balance
   */
  ZERO_BALANCE,
  /**
   * Request with current account key is not allowed from your IP
   */
  IP_NOT_ALLOWED,
  /**
   * This type of captchas is not supported by the service or the image does not contain an answer, perhaps it is too noisy.
   * It could also mean that the image is corrupted or was incorrectly rendered.
   */
  CAPTCHA_UNSOLVABLE,
  /**
   * The captcha that you are requesting was not found.
   * Make sure you are requesting a status update only within 5 minutes of uploading.
   */
  NO_SUCH_CAPCHA_ID,
  /**
   * You have exceeded the limit of requests with the wrong api key,
   * check the correctness of your api key in the control panel and after some time, try again
   */
  IP_BANNED,
  /**
   * This method is not supported or empty
   */
  NO_SUCH_METHOD,
  /**
   * You have exceeded the limit of requests to receive an answer for one task.
   * Try to request the result of the task no more than 1 time in 2 seconds.
   */
  TOO_MUCH_REQUESTS,
  /**
   * Captcha from some domains cannot be solved in CapMonster Cloud.
   * If you try to create a task for such a domain, this error will return.
   */
  DOMAIN_NOT_ALLOWED,
  /**
   * Captcha provider server reported that the additional token has expired.
   * Try creating task with a new token.
   */
  TOKEN_EXPIRED,
  /**
   * You have excedded requests rate limit, try to decrease parallel tasks amount.
   */
  NO_SLOT_AVAILABLE,
}

export type ErrorTypeKey = keyof typeof ErrorType;
