import { TaskType } from '../TaskType';
import { ImpervaRequestBase, ImpervaRequestBaseIn } from './ImpervaRequestBase';

export type ImpervaRequestIn = Pick<ImpervaRequestBaseIn, Exclude<keyof ImpervaRequestBaseIn, 'type' | '_class'>>;
/**
 * Imperva recognition request.
 * {@link https://zenno.link/doc-imperva}
 */
export class ImpervaRequest extends ImpervaRequestBase {
  constructor(argsObj: ImpervaRequestIn) {
    super({ type: TaskType.CustomTask, _class: 'Imperva', ...argsObj });
  }
}
