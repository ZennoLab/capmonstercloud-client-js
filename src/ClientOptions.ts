export type ClientOptionsIn = {
  ServiceUri?: URL;
  ClientKey: string;
  SoftId?: number;
};

export class ClientOptions {
  private DefaultSoftId = 53;
  public ServiceUri: URL;
  public ClientKey: string;
  public SoftId?: number;
  constructor(clientOptions: ClientOptionsIn) {
    this.ServiceUri = clientOptions.ServiceUri || new URL('https://api.capmonster.cloud');
    this.ClientKey = clientOptions.ClientKey;
    this.SoftId = clientOptions.SoftId;
  }
}
