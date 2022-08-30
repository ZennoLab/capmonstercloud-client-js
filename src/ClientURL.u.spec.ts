import { ClientURL } from './ClientURL';

describe('Check ClientURL()', () => {
  it('should assign default 80 port for http protocol', () => {
    const clientURL = new ClientURL('http://localhost');

    expect(clientURL).toBeDefined();
    expect(clientURL.clientPort).toBe(80);
  });

  it('should assign default 443 port for https protocol', () => {
    const clientURL = new ClientURL('https://example.com');

    expect(clientURL).toBeDefined();
    expect(clientURL.clientPort).toBe(443);
  });

  it('should parse port', () => {
    const clientURL = new ClientURL('https://example.com:9594');

    expect(clientURL).toBeDefined();
    expect(clientURL.clientPort).toBe(9594);
  });
});
