import { TaskType } from '../TaskType';
import { ComplexImageRecognitionRequestBase, ComplexImageRecognitionRequestBaseIn } from './ComplexImageTaskRecognitionRequestBase';

export type ComplexImageRecognitionRequestIn = Pick<
  ComplexImageRecognitionRequestBaseIn,
  Exclude<keyof ComplexImageRecognitionRequestBaseIn, 'type' | '_class'>
>;
/**
 * ComplexImageTaskRecognition recognition request.
 * {@link https://zenno.link/doc-complex-image-recognition}
 */
export class ComplexImageTaskRecognitionRequest extends ComplexImageRecognitionRequestBase {
  constructor(argsObj: ComplexImageRecognitionRequestIn) {
    super({ type: TaskType.ComplexImageTask, _class: 'recognition', ...argsObj });
  }
}
