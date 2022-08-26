import { IncomingMessage } from 'http';
import https from 'https';
import net, { Socket } from 'net';

import { debugHttps, debugNet } from './Logger';
import { ClientURL } from './ClientURL';

export type MethodT = 'getBalance' | 'createTask' | 'getTaskResult';

export type JSONResponseT = Record<string, unknown>;

export enum ResponseContentType {
  json = 'application/json',
  text = 'text/plain',
}

export class HttpClientError extends Error {}

export class HttpSocketError extends HttpClientError {}

export class HttpStatusError extends HttpClientError {
  constructor(public statusMessage?: string, public statusCode?: number) {
    super(statusMessage);
  }
}

export class HttpContentTypeError extends HttpClientError {
  constructor(public statusMessage?: string, public contentType?: string) {
    super(statusMessage);
  }
}

export class JSONParseError extends Error {
  constructor(public message: string, public responseBody: string) {
    super(message);
  }
}

export enum HttpStatusCode {
  ServiceUnavailable = 503,
}

export class HttpClient {
  private _socket: Socket | undefined;
  private _agent: https.Agent | undefined;
  public timeout: number | undefined;
  public defaultRequestHeaders = {
    UserAgent: '',
    ContentType: 'application/json',
  };
  constructor(public url: ClientURL) {}

  async post<T extends JSONResponseT>(method: MethodT, data: string, cancellationController: AbortController): Promise<T> {
    await this.netConnectOrUse();
    return await this.postJSON<T>(method, data, cancellationController);
  }

  private netConnect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this._socket = net.connect(this.url.clientPort, this.url.hostname);
      this._socket.on('error', (err) => {
        debugNet('Got Socket error', err);
        this._socket = undefined;
        this._agent = undefined;
        reject(err);
      });
      this._socket.on('close', (err) => {
        debugNet('Socket closed', err);
        this._socket = undefined;
        this._agent = undefined;
        reject(err);
      });
      this._socket.on('connect', () => {
        debugNet('Socket connected');
        if (this._socket) {
          this._agent = new https.Agent({ socket: this._socket, keepAlive: true, timeout: this.timeout });
          resolve();
        } else {
          reject();
        }
      });
    });
  }

  private netConnectOrUse(): Promise<void> {
    if (this._socket) {
      debugNet('Reuse socket instance');
      return Promise.resolve();
    }
    return this.netConnect();
  }

  private responseStatusHandler(res: IncomingMessage, expectedStatus: number): Promise<IncomingMessage> {
    return new Promise((resolve, reject) => {
      if (res.statusCode === expectedStatus) {
        resolve(res);
      } else {
        reject(new HttpStatusError(res.statusMessage, res.statusCode));
      }
    });
  }

  private responseContentTypeHandler(
    res: IncomingMessage,
    expectedContentTypes: Array<ResponseContentType> | ResponseContentType,
  ): Promise<IncomingMessage> {
    return new Promise((resolve, reject) => {
      const contentType = res.headers['content-type'];
      if (contentType) {
        if (
          Array.isArray(expectedContentTypes)
            ? expectedContentTypes.some((expectedContentType) => contentType.includes(expectedContentType))
            : contentType.includes(expectedContentTypes)
        ) {
          resolve(res);
        } else {
          reject(new HttpContentTypeError(`Unexpected content type. Got ${contentType}`, contentType));
        }
      } else {
        reject(new HttpContentTypeError('Unknown content type', contentType));
      }
    });
  }

  private responseBodyHandler(res: IncomingMessage): Promise<string> {
    return new Promise((resolve, reject) => {
      const chunks: Array<Uint8Array> = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const responseBody = Buffer.concat(chunks).toString('utf8');
        debugHttps('Response body received', responseBody);
        resolve(responseBody);
      });
      res.on('error', reject);
    });
  }

  private async responseJSONHandler<T extends JSONResponseT>(res: IncomingMessage): Promise<T> {
    const responseBody = await this.responseBodyHandler(res);
    try {
      return JSON.parse(responseBody);
    } catch (err) {
      if (err instanceof SyntaxError) {
        throw new JSONParseError(err.message, responseBody);
      }
      throw new JSONParseError('Unknown JSON parse error', responseBody);
    }
  }

  private requestHandler(method: MethodT, data: string, cancellationController: AbortController): Promise<IncomingMessage> {
    return new Promise((resolve, reject) => {
      const headers = {
        'user-agent': this.defaultRequestHeaders.UserAgent,
        'content-type': this.defaultRequestHeaders.ContentType,
      };
      debugHttps('Request headers', headers);
      debugHttps('Request body', data);
      https
        .request(
          {
            host: this.url.host,
            port: this.url.port,
            path: `/${method}`,
            headers,
            agent: this._agent,
            method: 'POST',
            signal: cancellationController.signal,
          },
          (res) => {
            debugHttps('Response headers received', res.statusCode, res.statusMessage);
            resolve(res);
          },
        )
        .on('error', (err) => {
          debugHttps('Response error', err);
          reject(err);
        })
        .end(data);
    });
  }

  private async postJSON<T extends JSONResponseT>(method: MethodT, data: string, cancellationController: AbortController): Promise<T> {
    const res = await this.requestHandler(method, data, cancellationController);
    await this.responseStatusHandler(res, 200);
    await this.responseContentTypeHandler(res, [ResponseContentType.json, ResponseContentType.text]);
    return await this.responseJSONHandler(res);
  }
}
