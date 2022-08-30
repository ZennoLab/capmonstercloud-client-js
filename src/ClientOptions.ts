import { ClientURL } from './ClientURL';

export type ClientOptionsIn = {
  serviceUrl?: URL | string;
  clientKey: string;
  softId?: number;
};

export class ClientOptions {
  static defaultSoftId = 53;
  public serviceUrl: ClientURL;
  public clientKey: string;
  public softId?: number;
  constructor(clientOptions: ClientOptionsIn) {
    const { serviceUrl = 'https://api.capmonster.cloud' } = clientOptions;
    this.serviceUrl = new ClientURL(serviceUrl);
    this.clientKey = clientOptions.clientKey;
    this.softId = clientOptions.softId;
  }
}
