import { TaskType } from '../TaskType';
import { BasiliskRequestBase, BasiliskRequestBaseIn } from './BasiliskRequestBase';

export type BasiliskRequestIn = Pick<BasiliskRequestBaseIn, Exclude<keyof BasiliskRequestBaseIn, 'type' | '_class'>>;
/**
 * Basilisk recognition request.
 * {@link https://zenno.link/doc-basilisk}
 */
export class BasiliskRequest extends BasiliskRequestBase {
  constructor(argsObj: BasiliskRequestIn) {
    super({ type: TaskType.CustomTask, _class: 'Basilisk', ...argsObj });
  }
}
