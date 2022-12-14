import { ProxyType } from './ProxyType';

export type ProxyInfoIn = {
  proxyType: ProxyType;
  proxyAddress: string;
  proxyPort: number;
  proxyLogin?: string;
  proxyPassword?: string;
};

/**
 * Interface for captcha recognition with proxy requests
 */
export class ProxyInfo {
  /**
   * Type of the proxy
   */
  public proxyType!: ProxyType;

  /**
   * Proxy IP address IPv4/IPv6. Not allowed to use:
   * - host names instead of IPs
   * - transparent proxies(where client IP is visible)
   * - proxies from local networks(192.., 10.., 127...)
   */
  public proxyAddress!: string;

  /**
   * Proxy port
   */
  public proxyPort!: number;

  /**
   * Login for proxy which requires authorizaiton (basic)
   */
  public proxyLogin?: string;

  /**
   * Proxy password
   */
  public proxyPassword?: string;

  constructor({ proxyType, proxyAddress, proxyPort, proxyLogin, proxyPassword }: ProxyInfoIn) {
    this.proxyType = proxyType;
    this.proxyAddress = proxyAddress;
    this.proxyPort = proxyPort;
    this.proxyLogin = proxyLogin;
    this.proxyPassword = proxyPassword;
  }
}
