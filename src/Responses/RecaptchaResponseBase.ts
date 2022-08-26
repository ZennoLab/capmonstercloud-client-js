/**
 * Recaptcha recognition response base
 */
export type RecaptchaResponseBase = {
  /**
   * Hash which should be inserted into Recaptcha2 submit form in
   * @example
   * <![CDATA[
   * <textarea id="g-recaptcha-response" ..></textarea>
   * ]]>
   * @description
   * It has a length of 500 to 2190 bytes.
   * @example
   * <![CDATA[3AHJ_VuvYIBNBW5yyv0zRYJ75VkOKvhKj9_xGBJKnQimF72rfoq3Iy-DyGHMwLAo6a3]]>
   */
  gRecaptchaResponse: string;
};
