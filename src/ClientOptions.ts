import { ClientURL } from './ClientURL';

export type ClientOptionsIn = {
  serviceUrl?: URL;
  clientKey: string;
  softId?: number;
};

export class ClientOptions {
  static defaultSoftId = 53;
  public serviceUrl: ClientURL;
  public clientKey: string;
  public softId?: number;
  constructor(clientOptions: ClientOptionsIn) {
    this.serviceUrl = new ClientURL(clientOptions.serviceUrl || 'https://api.capmonster.cloud');
    this.clientKey = clientOptions.clientKey;
    this.softId = clientOptions.softId;
  }
}
