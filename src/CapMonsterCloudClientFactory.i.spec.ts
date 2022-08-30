import { createServerMock } from '../tests/helpers';
import { CapMonsterCloudClientFactory } from './CapMonsterCloudClientFactory';
import { ClientOptions } from './ClientOptions';
import { RecaptchaV2ProxylessRequest } from './Requests/RecaptchaV2ProxylessRequest';
import { RecaptchaV2Request } from './Requests/RecaptchaV2Request';

describe('Check integration tests for CapMonsterCloudClientFactory()', () => {
  it('should call getBalance method with specified object', async () => {
    expect.assertions(3);

    const srv = await createServerMock({ responses: [{ responseBody: '{"errorId":0,"balance":345.678}' }] });

    const cmcClient = CapMonsterCloudClientFactory.Create(
      new ClientOptions({ clientKey: '<your capmonster.cloud API key>', serviceUrl: `http://localhost:${srv.address.port}` }),
    );

    await cmcClient.getBalance();

    expect(srv.caughtRequests[0]).toHaveProperty('userAgent', CapMonsterCloudClientFactory.CreateUserAgentString());
    expect(srv.caughtRequests[0]).toHaveProperty('body', '{"clientKey":"<your capmonster.cloud API key>"}');

    expect(await srv.destroy()).toBeUndefined();
  });

  it('should call createTask and getTaskResult methods with specified objects', async () => {
    expect.assertions(6);

    const srv = await createServerMock({
      responses: [
        { responseBody: '{"errorId":0,"taskId":7654321}' },
        { responseBody: '{"errorId":0,"status":"ready","solution":{"gRecaptchaResponse":"answer"}}' },
      ],
    });

    const cmcClient = CapMonsterCloudClientFactory.Create(
      new ClientOptions({ clientKey: '<your capmonster.cloud API key>', serviceUrl: `http://localhost:${srv.address.port}` }),
    );

    const recaptchaV2ProxylessRequest = new RecaptchaV2ProxylessRequest({
      websiteURL: 'https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=high',
      websiteKey: '6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd',
    });

    const task = await cmcClient.Solve(recaptchaV2ProxylessRequest);

    expect(srv.caughtRequests[0]).toHaveProperty('userAgent', CapMonsterCloudClientFactory.CreateUserAgentString());
    expect(srv.caughtRequests[0]).toHaveProperty(
      'body',
      '{"clientKey":"<your capmonster.cloud API key>","task":{"type":"NoCaptchaTaskProxyless","websiteURL":"https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=high","websiteKey":"6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd"},"softId":53}',
    );
    expect(srv.caughtRequests[1]).toHaveProperty('body', '{"clientKey":"<your capmonster.cloud API key>","taskId":7654321}');
    expect(task).toHaveProperty('solution');
    expect(task).toHaveProperty('solution.gRecaptchaResponse', 'answer');

    expect(await srv.destroy()).toBeUndefined();
  });

  it('should call createTask with proxy parameters', async () => {
    expect.assertions(6);

    const srv = await createServerMock({
      responses: [
        { responseBody: '{"errorId":0,"taskId":1234567}' },
        { responseBody: '{"errorId":0,"status":"ready","solution":{"gRecaptchaResponse":"answer"}}' },
      ],
    });

    const cmcClient = CapMonsterCloudClientFactory.Create(
      new ClientOptions({ clientKey: '<your capmonster.cloud API key>', serviceUrl: `http://localhost:${srv.address.port}` }),
    );

    const recaptchaV2Request = new RecaptchaV2Request({
      websiteURL: 'https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=high',
      websiteKey: '6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd',
      proxyType: 'http',
      proxyAddress: '8.8.8.8',
      proxyPort: 8080,
      proxyLogin: 'proxyLoginHere',
      proxyPassword: 'proxyPasswordHere',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.132 Safari/537.36',
    });

    const task = await cmcClient.Solve(recaptchaV2Request);

    expect(srv.caughtRequests[0]).toHaveProperty('userAgent', CapMonsterCloudClientFactory.CreateUserAgentString());
    expect(srv.caughtRequests[0]).toHaveProperty(
      'body',
      '{"clientKey":"<your capmonster.cloud API key>","task":{"type":"NoCaptchaTask","websiteURL":"https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=high","websiteKey":"6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd","userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.132 Safari/537.36","proxyType":"http","proxyAddress":"8.8.8.8","proxyPort":8080,"proxyLogin":"proxyLoginHere","proxyPassword":"proxyPasswordHere"},"softId":53}',
    );
    expect(srv.caughtRequests[1]).toHaveProperty('body', '{"clientKey":"<your capmonster.cloud API key>","taskId":1234567}');
    expect(task).toHaveProperty('solution');
    expect(task).toHaveProperty('solution.gRecaptchaResponse', 'answer');

    expect(await srv.destroy()).toBeUndefined();
  });
});
