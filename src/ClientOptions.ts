import { ClientURL } from './ClientURL';

export type ClientOptionsIn = {
  serviceUrl?: URL | string;
  clientKey: string;
  softId?: number;
};

/**
 * Client options
 */
export class ClientOptions {
  static defaultSoftId = 53;
  /**
   * capmonster.cloud API URI.
   * By default https://api.capmonster.cloud
   */
  public serviceUrl: ClientURL;
  /**
   * capmonster.cloud API key
   */
  public clientKey: string;
  /**
   * SoftId
   */
  public softId?: number;
  constructor(clientOptions: ClientOptionsIn) {
    const { serviceUrl = 'https://api.capmonster.cloud' } = clientOptions;
    this.serviceUrl = new ClientURL(serviceUrl);
    this.clientKey = clientOptions.clientKey;
    this.softId = clientOptions.softId;
  }
}
