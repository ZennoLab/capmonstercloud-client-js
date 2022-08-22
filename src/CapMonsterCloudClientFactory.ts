import { CapMonsterCloudClient } from './CapMonsterCloudClient';
import { ClientOptions } from './ClientOptions';
import { CsMap } from './CsMap';
import { HttpClient } from './HttpClient';

export class CapMonsterCloudClientFactory {
  static HttpTimeout = 21 * 1000;
  static HttpClients = new CsMap<string, HttpClient>();

  static Create(options: ClientOptions) {
    return new CapMonsterCloudClient(
      options,
      //   HttpClients.GetOrAdd(options.ServiceUri, (uri) => CreateHttpClient(uri, httpMessageHandlerFactory, configureClient)),
      CapMonsterCloudClientFactory.HttpClients.GetOrAdd(options.ServiceUri.href, new HttpClient(options.ServiceUri)),
    );
  }

  static CreateHttpClient(url: URL) {
    const httpClient = new HttpClient(url);

    httpClient.Timeout = CapMonsterCloudClientFactory.HttpTimeout;

    httpClient.DefaultRequestHeaders.UserAgent = CapMonsterCloudClientFactory.CreateUserAgentString();

    return httpClient;
  }

  static CreateUserAgentString() {
    const ProductName = 'ProductName';
    const ProductVersion = 'ProductVersion';

    return `${ProductName}/${ProductVersion}`;
  }
}
