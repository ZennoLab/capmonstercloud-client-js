import { createServerMock } from '../tests/helpers';
import { CapMonsterCloudClientFactory } from './CapMonsterCloudClientFactory';
import { ClientOptions } from './ClientOptions';

import { TurnstileRequest } from './Requests/TurnstileRequest';
import { TurnstileProxylessRequest } from './Requests/TurnstileRequestProxyless';

describe("Check integration tests for TurnstileTask and TurnstileTaskProxyless", () => {
    it("should send TurnstileRequest", async () => {
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
            websiteURL: "https://tsinvisble.zlsupport.com",
            websiteKey: "0x4AAAAAAABUY0VLtOUMAHxE",
            proxyType: 'http',
            proxyAddress: '8.8.8.8',
            proxyPort: 8080,
            proxyLogin: 'proxyLoginHere',
            proxyPassword: 'proxyPasswordHere',
        });

        const task = await cmcClient.Solve(request);

        expect(srv.caughtRequests[0]).toHaveProperty(
            'body',
            '{"clientKey":"<your capmonster.cloud API key>","task":{"type":"TurnstileTask","websiteURL":"https://tsinvisble.zlsupport.com","websiteKey":"0x4AAAAAAABUY0VLtOUMAHxE","proxyType":"http","proxyAddress":"8.8.8.8","proxyPort":8080,"proxyLogin":"proxyLoginHere","proxyPassword":"proxyPasswordHere"},"softId":54}',
        );
        expect(srv.caughtRequests[1]).toHaveProperty('body', '{"clientKey":"<your capmonster.cloud API key>","taskId":7654322}');
        expect(task).toHaveProperty('solution');
        expect(task).toHaveProperty('solution.token', 'answer');

        expect(await srv.destroy()).toBeUndefined();
    });

  it('should send TurnstileProxylessRequest', async () => {
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

    const request = new TurnstileProxylessRequest({
        websiteURL: "https://tsinvisble.zlsupport.com",
        websiteKey: "0x4AAAAAAABUY0VLtOUMAHxE",
    });

    const task = await cmcClient.Solve(request);

    expect(srv.caughtRequests[0]).toHaveProperty(
        'body',
        '{"clientKey":"<your capmonster.cloud API key>","task":{"type":"TurnstileTaskProxyless","websiteURL":"https://tsinvisble.zlsupport.com","websiteKey":"0x4AAAAAAABUY0VLtOUMAHxE"},"softId":54}',
    );
    expect(srv.caughtRequests[1]).toHaveProperty('body', '{"clientKey":"<your capmonster.cloud API key>","taskId":7654321}');
    expect(task).toHaveProperty('solution');
    expect(task).toHaveProperty('solution.token', 'answer');

    expect(await srv.destroy()).toBeUndefined();
  });
})