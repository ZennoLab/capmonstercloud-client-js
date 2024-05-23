import { TaskType } from '../TaskType';
import { TenDIRequestBase, TenDIRequestBaseIn } from './TenDIRequestBase';

export type TenDIRequestIn = Pick<TenDIRequestBaseIn, Exclude<keyof TenDIRequestBaseIn, 'type' | '_class'>>;
/**
 * TenDI recognition request.
 * {@link https://zenno.link/doc-tendi}
 */
export class TenDIRequest extends TenDIRequestBase {
  constructor(argsObj: TenDIRequestIn) {
    super({ type: TaskType.CustomTask, _class: 'TenDI', ...argsObj });
  }
}
