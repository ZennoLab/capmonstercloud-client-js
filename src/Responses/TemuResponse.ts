// type Domains = Record<string, DomainCookies>;

// type DomainCookies = {
//   cookies: Cookies;
// };

type Cookies = {
  privacy_setting_detail: string;
  region: string;
  language: string;
  currency: string;
  api_uid: string;
  webp: string;
  _nano_fp: string;
  verifyAuthToken: string;
  timezone: string;
  _bee: string;
  ___utmvc: string;
  reese84: string;
};

/**
 * Temu recognition response base
 */

type SiteResponseType = {
  cookies: Cookies;
};

type DomainsProps = {
  [site: string]: SiteResponseType;
};

/**
 * Imperva recognition response base
 */
export type TemuResponse = {
  domains: DomainsProps;
};
