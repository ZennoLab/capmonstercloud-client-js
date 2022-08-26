import { CapMonsterCloudClient } from './CapMonsterCloudClient';
import { ClientOptions } from './ClientOptions';
import { ClientURL } from './ClientURL';
import { CsMap } from './Utils';
import { HttpClient } from './HttpClient';

export class CapMonsterCloudClientFactory {
  static httpTimeout = 1000 * 21;
  static httpClients = new CsMap<string, HttpClient>();

  static Create(options: ClientOptions) {
    return new CapMonsterCloudClient(
      options,
      //   HttpClients.GetOrAdd(options.ServiceUri, (uri) => CreateHttpClient(uri, httpMessageHandlerFactory, configureClient)),
      CapMonsterCloudClientFactory.httpClients.GetOrAdd(
        options.serviceUrl.href,
        CapMonsterCloudClientFactory.CreateHttpClient(options.serviceUrl),
      ),
    );
  }

  static CreateHttpClient(url: ClientURL) {
    const httpClient = new HttpClient(url);

    httpClient.timeout = CapMonsterCloudClientFactory.httpTimeout;

    httpClient.defaultRequestHeaders.UserAgent = CapMonsterCloudClientFactory.CreateUserAgentString();

    return httpClient;
  }

  static CreateUserAgentString() {
    const ProductName = 'ProductName';
    const ProductVersion = 'ProductVersion';

    return `${ProductName}/${ProductVersion}`;
  }
}
