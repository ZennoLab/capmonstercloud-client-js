import { TaskType } from '../TaskType';
import { BinanceRequestBase, BinanceRequestBaseIn } from './BinanceRequestBase';

export type BinanceRequestIn = Pick<BinanceRequestBaseIn, Exclude<keyof BinanceRequestBaseIn, 'type'>>;
/**
 * Binance recognition request.
 * {@link https://zenno.link/doc-binance}
 */
export class BinanceRequest extends BinanceRequestBase {
  constructor(argsObj: BinanceRequestIn) {
    super({ type: TaskType.BinanceTaskProxyless, ...argsObj });
  }
}
