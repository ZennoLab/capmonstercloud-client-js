export type AlibabaResponse = {
  /** Cookies returned when metadata.cookieRequired is enabled. */
  domains?: Record<string, { cookies: Record<string, string> }>;
  data?: {
    tokens: string;
  };
};
