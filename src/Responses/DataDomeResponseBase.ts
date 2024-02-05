type Domains = Record<string, DomainCookies>;

type DomainCookies = {
  cookies: Cookies;
};

type Cookies = {
  datadome: string;
};

/**
 * DataDome recognition response base
 */
export type DataDomeResponseBase = {
  domains: Domains;
};
