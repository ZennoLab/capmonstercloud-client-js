import { TaskType } from '../../TaskType';
import { BinanceRequestBase, BinanceRequestBaseIn } from './BinanceRequestBase';
import { ProxyInfo, ProxyInfoIn } from '../ProxyInfo';

export type BinanceRequestIn = Pick<BinanceRequestBaseIn, Exclude<keyof BinanceRequestBaseIn, 'type'>> & { proxy?: ProxyInfoIn };
/**
 * Binance recognition request (with proxy).
 * {@link https://zenno.link/doc-binance-en}
 */
export class BinanceRequest extends BinanceRequestBase {
  constructor({ proxy, ...restArgsObj }: BinanceRequestIn) {
    super({ type: TaskType.BinanceTask, ...restArgsObj });

    if (proxy) {
      Object.assign(this, new ProxyInfo(proxy));
    }
  }
}
