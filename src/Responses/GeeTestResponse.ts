/**
 * GeeTest recognition response
 */
export type GeeTestResponseV3 = {
  /**
   * @example
   * 0f759dd1ea6c4wc76cedc2991039ca4f23
   */
  challenge: string;

  /**
   * @example
   * 6275e26419211d1f526e674d97110e15
   */
  validate: string;

  /**
   * @example
   * 510cd9735583edcb158601067195a5eb|jordan
   */
  seccode: string;
};

export type GeeTestResponseV4 = {
  captcha_id: string;

  lot_number: string;

  pass_token: string;

  gen_time: string;

  captcha_output: string;
};

export type GeeTestResponse = GeeTestResponseV3 | GeeTestResponseV4;
