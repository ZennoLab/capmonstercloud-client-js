import { IncomingMessage } from 'http';
import { Agent } from 'https';

import { isNode } from './Utils';
import { debugHttp, debugNet } from './Logger';
import { ClientURL } from './ClientURL';

type APIMethod = 'getBalance' | 'createTask' | 'getTaskResult';

export type JSONResponseT = Record<string, unknown>;

export enum ResponseContentType {
  json = 'application/json',
  text = 'text/plain',
}

export class HttpClientError extends Error {}

export class HttpStatusError extends HttpClientError {
  public statusMessage?: string;
  public statusCode?: number;
  constructor({ statusMessage, statusCode }: { statusMessage?: string; statusCode?: number }) {
    super(statusMessage);
    this.statusMessage = statusMessage;
    this.statusCode = statusCode;
  }
}

export class HttpContentTypeError extends HttpClientError {
  constructor(public statusMessage?: string, public contentType?: string | null) {
    super(statusMessage);
  }
}

export class JSONParseError extends Error {
  constructor(public message: string, public responseBody?: string) {
    super(message);
  }
}

export enum HttpStatusCode {
  ServiceUnavailable = 503,
}

export type IsomorphicResponse = IncomingMessage | Response;

export class HttpClient {
  private _agent?: Agent;
  public url: ClientURL;
  public timeout?: number;
  public requestHeaders!: {
    userAgent: string;
    contentType: string;
  };
  constructor({
    url,
    timeout,
    requestHeaders,
  }: {
    url: ClientURL;
    timeout?: number;
    requestHeaders?: {
      userAgent?: string;
      contentType?: string;
    };
  }) {
    const { userAgent = '', contentType = 'application/json' } = requestHeaders || {};
    this.url = url;
    this.timeout = timeout;
    this.requestHeaders = {
      userAgent,
      contentType,
    };
  }

  async post<T extends JSONResponseT>(method: APIMethod, data: string, cancellationController?: AbortController): Promise<T> {
    if (isNode) {
      await this.netAgentUse();
    }
    return await this.postJSON<T>(method, data, cancellationController);
  }

  private createAgent(): Promise<void> {
    return new Promise((resolve) => {
      debugNet('Try create agent instance');
      // require('http') or require('https') hide require call from browser bundler, e.g. webpack
      const requester = module[`require`].call(module, this.url.protocol === 'https:' ? 'https' : 'http');
      this._agent = new requester.Agent({ keepAlive: true, timeout: this.timeout });
      resolve();
    });
  }

  private netAgentUse(): Promise<void> {
    if (this._agent) {
      debugNet('Reuse agent instance');
      return Promise.resolve();
    }
    return this.createAgent();
  }

  private responseStatusHandler(res: IsomorphicResponse, expectedStatus: number): Promise<IsomorphicResponse> {
    return new Promise((resolve, reject) => {
      let statusCode;
      let statusMessage;
      if (isNode) {
        statusCode = (res as IncomingMessage).statusCode;
        statusMessage = (res as IncomingMessage).statusMessage;
      } else {
        statusCode = (res as Response).status;
        statusMessage = (res as Response).statusText;
      }
      if (statusCode === expectedStatus) {
        resolve(res);
      } else {
        reject(new HttpStatusError({ statusCode, statusMessage }));
      }
    });
  }

  private responseContentTypeHandler(
    res: IsomorphicResponse,
    expectedContentTypes: Array<ResponseContentType> | ResponseContentType,
  ): Promise<IsomorphicResponse> {
    return new Promise((resolve, reject) => {
      let contentType: string | undefined | null;
      if (isNode) {
        contentType = (res as IncomingMessage).headers['content-type'];
      } else {
        contentType = (res as Response).headers.get('Content-Type');
      }
      if (contentType) {
        if (
          Array.isArray(expectedContentTypes)
            ? expectedContentTypes.some((expectedContentType) => (contentType as string).includes(expectedContentType))
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
        debugHttp('Response body received', responseBody);
        resolve(responseBody);
      });
      res.on('error', reject);
    });
  }

  private async responseJSONHandler<T extends JSONResponseT>(res: IsomorphicResponse): Promise<T> {
    let responseBody;
    try {
      if (isNode) {
        responseBody = await this.responseBodyHandler(res as IncomingMessage);
        return JSON.parse(responseBody);
      } else {
        return (res as Response).json();
      }
    } catch (err) {
      if (err instanceof SyntaxError) {
        throw new JSONParseError(err.message, responseBody);
      }
      throw new JSONParseError('Unknown JSON parse error', responseBody);
    }
  }

  private requestHandler(method: APIMethod, data: string, cancellationController?: AbortController): Promise<IsomorphicResponse> {
    return new Promise((resolve, reject) => {
      const headers = {
        'user-agent': this.requestHeaders.userAgent,
        'content-type': this.requestHeaders.contentType,
      };
      const options = {
        headers,
        method: 'POST',
        signal: cancellationController && cancellationController.signal,
      };
      if (isNode) {
        Object.assign(options, {
          host: this.url.hostname,
          port: this.url.port,
          path: `/${method}`,
          agent: this._agent,
        });
      } else {
        Object.assign(options, {
          mode: 'cors',
          body: data,
        });
      }
      debugHttp('Request options', options);
      debugHttp('Request body', data);
      if (isNode) {
        // require('http') or require('https') hide require call from browser bundler, e.g. webpack
        const requester = module[`require`].call(module, this.url.protocol === 'https:' ? 'https' : 'http');
        requester
          .request(options, (res: IncomingMessage) => {
            debugHttp('Response headers received', res.statusCode, res.statusMessage);
            resolve(res);
          })
          .on('error', (err: Error) => {
            debugHttp('Response error', err);
            reject(err);
          })
          .end(data);
      } else {
        fetch(`${this.url.href}${method}`, options)
          .then((res) => resolve(res))
          .catch(reject);
      }
    });
  }

  private async postJSON<T extends JSONResponseT>(method: APIMethod, data: string, cancellationController?: AbortController): Promise<T> {
    const res = await this.requestHandler(method, data, cancellationController);
    await this.responseStatusHandler(res, 200);
    await this.responseContentTypeHandler(res, [ResponseContentType.json, ResponseContentType.text]);
    return await this.responseJSONHandler(res);
  }
}
