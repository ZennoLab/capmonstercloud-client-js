type BasiliskData = {
  captcha_response: string;
};

type UserAgent = {
  'User-Agent': string;
};

/**
 * Basilisk recognition response base
 */
export type BasiliskResponse = {
  data: BasiliskData;
  headers: UserAgent;
};
