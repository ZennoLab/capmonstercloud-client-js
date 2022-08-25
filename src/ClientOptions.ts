import { ClientURL } from './ClientURL';

export type ClientOptionsIn = {
  serviceUrl?: URL;
  ClientKey: string;
  SoftId?: number;
};

export class ClientOptions {
  private DefaultSoftId = 53;
  public serviceUrl: ClientURL;
  public ClientKey: string;
  public SoftId?: number;
  constructor(clientOptions: ClientOptionsIn) {
    this.serviceUrl = new ClientURL(clientOptions.serviceUrl || 'https://api.capmonster.cloud');
    this.ClientKey = clientOptions.ClientKey;
    this.SoftId = clientOptions.SoftId;
  }
}
