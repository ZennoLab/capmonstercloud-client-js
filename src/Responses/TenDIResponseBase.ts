type TenDIData = {
  randstr: string;
  ticket: string;
};

type UserAgent = {
  'User-Agent': string;
};

/**
 * TenDI recognition response base
 */
export type TenDIResponseBase = {
  data: TenDIData;
  headers: UserAgent;
};
