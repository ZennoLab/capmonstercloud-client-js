type SiteResponseType = {
  cookies: {
    ___utmvc: string;
    reese84: string;
  };
};

type DomainsProps = {
  [site: string]: SiteResponseType;
};

/**
 * Imperva recognition response base
 */
export type ImpervaResponse = {
  domains: DomainsProps;
};
