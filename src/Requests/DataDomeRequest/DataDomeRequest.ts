import { TaskType } from '../../TaskType';
import { DataDomeRequestBase, DataDomeRequestBaseIn } from './DataDomeRequestBase';
import { ProxyInfo, ProxyInfoIn } from '../ProxyInfo';

export type DataDomeRequestIn = Pick<DataDomeRequestBaseIn, Exclude<keyof DataDomeRequestBaseIn, 'type' | '_class'>> & {
  proxy?: ProxyInfoIn;
};
/**
 * DataDome recognition request.
 * {@link https://zenno.link/doc-datadome}
 */
export class DataDomeRequest extends DataDomeRequestBase {
  constructor({ proxy, ...argsObj }: DataDomeRequestIn) {
    super({ type: TaskType.CustomTask, _class: 'DataDome', ...argsObj });

    if (proxy) {
      Object.assign(this, new ProxyInfo(proxy));
    }
  }
}
