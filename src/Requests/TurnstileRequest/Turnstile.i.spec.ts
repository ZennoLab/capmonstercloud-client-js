import { createServerMock } from '../../../tests/helpers';
import { CapMonsterCloudClientFactory } from '../../CapMonsterCloudClientFactory';
import { ClientOptions } from '../../ClientOptions';

import { TurnstileRequest } from './TurnstileRequest';

describe('Check integration tests for TurnstileTask', () => {
  it('should send TurnstileRequest', async () => {
    expect.assertions(5);

    const srv = await createServerMock({
      responses: [
        { responseBody: '{"errorId":0,"taskId":7654322}' },
        { responseBody: '{"errorId":0,"status":"ready","solution":{"token":"answer"}}' },
      ],
    });

    const cmcClient = CapMonsterCloudClientFactory.Create(
      new ClientOptions({ clientKey: '<your capmonster.cloud API key>', serviceUrl: `http://localhost:${srv.address.port}` }),
    );

    const request = new TurnstileRequest({
      websiteURL: 'https://tsinvisble.zlsupport.com',
      websiteKey: '0x4AAAAAAABUY0VLtOUMAHxE',
      cloudflareTaskType: 'cf_clearance',
      proxy: {
        proxyType: 'http',
        proxyAddress: '8.8.8.8',
        proxyPort: 8080,
        proxyLogin: 'proxyLoginHere',
        proxyPassword: 'proxyPasswordHere',
      },
      pageData: 'pageDataHere',
      data: 'dataHere',
      htmlPageBase64: 'htmlPageBase64Here',
      userAgent: 'userAgentHere',
    });

    const task = await cmcClient.Solve(request);

    expect(srv.caughtRequests[0]).toHaveProperty(
      'body',
      '{"clientKey":"<your capmonster.cloud API key>","task":{"type":"TurnstileTask","websiteURL":"https://tsinvisble.zlsupport.com","websiteKey":"0x4AAAAAAABUY0VLtOUMAHxE","cloudflareTaskType":"cf_clearance","userAgent":"userAgentHere","htmlPageBase64":"htmlPageBase64Here","data":"dataHere","pageData":"pageDataHere","proxyType":"http","proxyAddress":"8.8.8.8","proxyPort":8080,"proxyLogin":"proxyLoginHere","proxyPassword":"proxyPasswordHere"},"softId":54}',
    );
    expect(srv.caughtRequests[1]).toHaveProperty('body', '{"clientKey":"<your capmonster.cloud API key>","taskId":7654322}');
    expect(task).toHaveProperty('solution');
    expect(task).toHaveProperty('solution.token', 'answer');

    expect(await srv.destroy()).toBeUndefined();
  });

  it('should send Turnstile without proxy', async () => {
    expect.assertions(5);

    const srv = await createServerMock({
      responses: [
        { responseBody: '{"errorId":0,"taskId":7654321}' },
        { responseBody: '{"errorId":0,"status":"ready","solution":{"token":"answer"}}' },
      ],
    });

    const cmcClient = CapMonsterCloudClientFactory.Create(
      new ClientOptions({ clientKey: '<your capmonster.cloud API key>', serviceUrl: `http://localhost:${srv.address.port}` }),
    );

    const request = new TurnstileRequest({
      websiteURL: 'https://tsinvisble.zlsupport.com',
      websiteKey: '0x4AAAAAAABUY0VLtOUMAHxE',
    });

    const task = await cmcClient.Solve(request);

    expect(srv.caughtRequests[0]).toHaveProperty(
      'body',
      '{"clientKey":"<your capmonster.cloud API key>","task":{"type":"TurnstileTask","websiteURL":"https://tsinvisble.zlsupport.com","websiteKey":"0x4AAAAAAABUY0VLtOUMAHxE"},"softId":54}',
    );
    expect(srv.caughtRequests[1]).toHaveProperty('body', '{"clientKey":"<your capmonster.cloud API key>","taskId":7654321}');
    expect(task).toHaveProperty('solution');
    expect(task).toHaveProperty('solution.token', 'answer');

    expect(await srv.destroy()).toBeUndefined();
  });
});
