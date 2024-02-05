import { TaskType } from '../TaskType';
import { DataDomeRequestBase, DataDomeRequestBaseIn } from './DataDomeRequestBase';

export type DataDomeRequestIn = Pick<DataDomeRequestBaseIn, Exclude<keyof DataDomeRequestBaseIn, 'type' | '_class'>>;
/**
 * DataDome recognition request.
 * {@link https://docs.capmonster.cloud/docs/captchas/datadome}
 */
export class DataDomeRequest extends DataDomeRequestBase {
  constructor(argsObj: DataDomeRequestIn) {
    super({ type: TaskType.CustomTask, _class: 'DataDome', ...argsObj });
  }
}
