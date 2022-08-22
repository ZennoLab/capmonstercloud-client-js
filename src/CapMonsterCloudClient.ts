import { ClientOptions } from './ClientOptions';
import { ErrorCodeConverter } from './ErrorCodeConverter';
import { ErrorType } from './ErrorType';
import { HttpClient, HttpStatusError, JSONParseError } from './HttpClient';

export type GetBalanceResponseT = {
  errorId: number;
  errorCode: string;
  balance: number;
};

export class CapmonsterCloudClientError extends Error {}

export class GetBalanceError extends CapmonsterCloudClientError {
  constructor(public errorType: ErrorType) {
    super(`Cannot get balance. Error was ${errorType}`);
  }
}

export class CapMonsterCloudClient {
  constructor(private _options: ClientOptions, private _httpClient: HttpClient) {}

  private calcJSONData() {
    return { clientKey: this._options.ClientKey };
  }

  public async getBalance() {
    try {
      const response = await this._httpClient.post<GetBalanceResponseT>('getBalance', JSON.stringify(this.calcJSONData()));

      if (response.errorId != 0) {
        throw new GetBalanceError(ErrorCodeConverter.convert(response.errorCode));
      }
      return response.balance;
    } catch (err) {
      if (err instanceof HttpStatusError) {
        throw new CapmonsterCloudClientError(`Cannot get balance. Status code was ${err.statusCode}`);
      } else if (err instanceof JSONParseError) {
        throw new CapmonsterCloudClientError(`Cannot parse get balance response. Response was: ${err.responseBody}`);
      }
      throw err;
    }
  }
}
