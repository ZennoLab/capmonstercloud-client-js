import { ErrorType } from './ErrorType';

export type GetBalanceResponseSuccess = {
  errorId: 0;
  balance: number;
};

export type GetBalanceResponseError = {
  errorId: number;
  errorCode: string;
};

export type GetBalanceResponse = GetBalanceResponseSuccess | GetBalanceResponseError;

/**
 * Exception on getting balance
 */
export class GetBalanceError extends Error {
  /**
   * @param errorType Gets occured error
   */
  constructor(public errorType: ErrorType) {
    super(`Cannot get balance. Error was ${errorType}`);
  }
}
