/**
 * Amazon token recognition response
 */
export type AmazonTokenResponse = {
  /**
   * @example
   * eyJ0eXAiO...oQjTnJlBvAW4
   */
  captcha_voucher: string;

  /**
   * @example
   * f8ab5749-f916-...5D8yAA39JtKVbw=
   */
  existing_token: string;
};

export type AmazonWafResponse = {
  'aws-waf-token': string;
};

export type AmazonResponse = AmazonTokenResponse | AmazonWafResponse;
