import { TaskType } from '../TaskType';
import { BinanceRequestBase, BinanceRequestBaseIn } from './BinanceRequestBase';

export type BinanceProxylessRequestIn = Pick<BinanceRequestBaseIn, Exclude<keyof BinanceRequestBaseIn, 'type'>>;
/**
 * Binance recognition request.
 * {@link https://zenno.link/doc-binance}
 */
export class BinanceProxylessRequest extends BinanceRequestBase {
  constructor(argsObj: BinanceProxylessRequestIn) {
    super({ type: TaskType.BinanceTaskProxyless, ...argsObj });
  }
}
