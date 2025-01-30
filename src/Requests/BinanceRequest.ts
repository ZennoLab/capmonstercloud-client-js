import { Mixin } from 'ts-mixer';
import { TaskType } from '../TaskType';
import { BinanceRequestBase, BinanceRequestBaseIn } from './BinanceRequestBase';
import { ProxyInfo, ProxyInfoIn } from './ProxyInfo';

export type BinanceRequestIn = Pick<BinanceRequestBaseIn, Exclude<keyof BinanceRequestBaseIn, 'type'>> & ProxyInfoIn;
/**
 * Binance recognition request (with proxy).
 * {@link https://zenno.link/doc-binance}
 */
export class BinanceRequest extends Mixin(BinanceRequestBase, ProxyInfo) {
  constructor(argsObj: BinanceRequestIn) {
    super({ type: TaskType.BinanceTaskProxyless, ...argsObj });
  }
}
