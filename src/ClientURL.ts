export class ClientURL extends URL {
  public clientPort = 0;
  constructor(url: string | URL, base?: string | URL) {
    super(url, base);
    if (this.port) {
      this.clientPort = Number(this.port);
    } else {
      if (this.protocol === 'https:') {
        this.clientPort = 443;
      } else if (this.protocol === 'http:') {
        this.clientPort = 80;
      }
    }
  }
}
