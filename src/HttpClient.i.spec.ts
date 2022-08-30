import { createServerMock } from '../tests/helpers';
import { ClientURL } from './ClientURL';
import { HttpClient } from './HttpClient';

describe('Check integration tests for HttpClient()', () => {
  it('should reuse socket(agent) instance', async () => {
    expect.assertions(4);

    const srv = await createServerMock({});

    expect(srv).toHaveProperty('address.port', expect.any(Number));

    const clientURL = new ClientURL(`http://localhost:${srv.address.port}`);
    const httpClient = new HttpClient({ url: clientURL });

    expect(clientURL.clientPort).toBe(srv.address.port);

    await httpClient.post('getBalance', '{}');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await httpClient.post('createTask', '{}');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await httpClient.post('getTaskResult', '{}');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await httpClient.post('getTaskResult', '{}');

    expect(srv.lastSocketKey).toBe(1);

    expect(await srv.destroy()).toBeUndefined();
  });

  it('should call getBalance method and receive empty object', async () => {
    expect.assertions(4);

    const srv = await createServerMock({ responses: [{ responseBody: '{}' }] });

    expect(srv).toHaveProperty('address.port', expect.any(Number));

    const clientURL = new ClientURL(`http://localhost:${srv.address.port}`);
    const httpClient = new HttpClient({ url: clientURL });

    expect(clientURL.clientPort).toBe(srv.address.port);

    const response = await httpClient.post('getBalance', '{}');

    expect(response).toMatchObject({});

    expect(await srv.destroy()).toBeUndefined();
  });

  it('should parse response as JSON with text/plain content type', async () => {
    expect.assertions(4);

    const srv = await createServerMock({ responses: [{ responseBody: '{"errorId":0,"balance":345.678}', contentType: 'text/plain' }] });

    const clientURL = new ClientURL(`http://localhost:${srv.address.port}`);
    const httpClient = new HttpClient({ url: clientURL });

    const response = await httpClient.post('getBalance', '{}');

    expect(response).toMatchObject({ errorId: 0, balance: 345.678 });
    expect(srv.caughtRequests[0]).toBeDefined();
    expect(srv.caughtRequests[0]).toHaveProperty('contentType', 'application/json');

    expect(await srv.destroy()).toBeUndefined();
  });

  it('should parse response as JSON with application/json content type', async () => {
    expect.assertions(4);

    const srv = await createServerMock({
      responses: [{ responseBody: '{"errorId":34,"balance":-244.33}', contentType: 'application/json' }],
    });

    const clientURL = new ClientURL(`http://localhost:${srv.address.port}`);
    const httpClient = new HttpClient({ url: clientURL });

    const response = await httpClient.post('getBalance', '{}');

    expect(response).toMatchObject({ errorId: 34, balance: -244.33 });
    expect(srv.caughtRequests[0]).toBeDefined();
    expect(srv.caughtRequests[0]).toHaveProperty('contentType', 'application/json');

    expect(await srv.destroy()).toBeUndefined();
  });
});
