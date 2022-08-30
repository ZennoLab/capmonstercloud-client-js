import { createServerMock } from '../tests/helpers';
import { ClientURL } from './ClientURL';
import { HttpClient } from './HttpClient';

describe('Check HttpClient()', () => {
  it('should be created', () => {
    const clientURL = new ClientURL('http://localhost:9999');
    const httpClient = new HttpClient({ url: clientURL });

    expect(httpClient).toBeDefined();
  });

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

    const srv = await createServerMock({ responseBody: '{}' });

    expect(srv).toHaveProperty('address.port', expect.any(Number));

    const clientURL = new ClientURL(`http://localhost:${srv.address.port}`);
    const httpClient = new HttpClient({ url: clientURL });

    expect(clientURL.clientPort).toBe(srv.address.port);

    const response = await httpClient.post('getBalance', '{}');

    expect(response).toMatchObject({});

    expect(await srv.destroy()).toBeUndefined();
  });
});
