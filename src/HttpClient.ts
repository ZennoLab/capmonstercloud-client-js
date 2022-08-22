import { IncomingMessage } from 'http';
import https from 'https';
import net, { Socket } from 'net';

export type MethodT = 'getBalance' | 'createTask' | 'getTaskResult';

export type JSONResponseT = Record<string, unknown>;

export class HttpStatusError extends Error {
  constructor(public statusMessage?: string, public statusCode?: number) {
    super(statusMessage);
  }
}

export class JSONParseError extends Error {
  constructor(public message: string, public responseBody: string) {
    super(message);
  }
}

export class HttpClient {
  private _socket: Socket | undefined;
  public Timeout = 0;
  public DefaultRequestHeaders = {
    UserAgent: '',
  };
  constructor(public url: URL) {}

  async post<T extends JSONResponseT>(method: MethodT, data: string): Promise<T> {
    await this.netConnectOrUse();
    return this.postJSON<T>(method, data);
  }

  private netConnect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this._socket = net.connect(Number(this.url.port), this.url.hostname);
      this._socket.on('error', reject);
      this._socket.on('end', reject);
      this._socket.on('connect', () => {
        if (this._socket) {
          this._socket.setTimeout(this.Timeout);
          resolve();
        } else {
          reject();
        }
      });
    });
  }

  private netConnectOrUse(): Promise<void> {
    if (this._socket) {
      return Promise.resolve();
    }
    return this.netConnect();
  }

  private responseHandler(res: IncomingMessage): Promise<IncomingMessage> {
    return new Promise((resolve, reject) => {
      if (res.statusCode === 200) {
        resolve(res);
      } else {
        reject(new HttpStatusError(res.statusMessage, res.statusCode));
      }
    });
  }

  private requestHandler(method: MethodT, data: string): Promise<IncomingMessage> {
    return new Promise((resolve, reject) => {
      const agent = new https.Agent({ socket: this._socket });
      https
        .request(
          {
            host: this.url.host,
            port: this.url.port,
            path: `/${method}`,
            headers: {
              'user-agent': this.DefaultRequestHeaders.UserAgent,
            },
            agent: agent,
          },
          (res) => {
            this.responseHandler(res).then(resolve).catch(reject);
          },
        )
        .on('error', reject)
        .write(data);
    });
  }

  private async postJSON<T extends JSONResponseT>(method: MethodT, data: string): Promise<T> {
    const res = await this.requestHandler(method, data);
    const contentType = res.headers['content-type'];
    if (contentType) {
      const isJSON = contentType.includes('application/json');
      if (isJSON) {
        const chunks: Array<Uint8Array> = [];
        return new Promise((resolve, reject) => {
          res.on('data', (chunk) => chunks.push(chunk));
          res.on('end', () => {
            const responseBody = Buffer.concat(chunks).toString('utf8');
            try {
              resolve(JSON.parse(responseBody));
            } catch (err) {
              if (err instanceof SyntaxError) {
                reject(new JSONParseError(err.message, responseBody));
              } else {
                reject(new JSONParseError('Unknown JSON parse error', responseBody));
              }
            }
          });
          res.on('error', reject);
        });
      } else {
        throw new Error('Unexpected content type');
      }
    } else {
      throw new Error('Unknown content type');
    }
  }
}
