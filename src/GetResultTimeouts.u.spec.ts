import { detectResultTimeouts } from './GetResultTimeouts';
import { Task } from './Requests/Task';
import { TaskType } from './TaskType';

describe('Check unit tests for detectResultTimeouts()', () => {
  Object.keys(TaskType).forEach((key) => {
    it(`should detect result timeouts for ${key} task type`, () => {
      const resultTimeouts = detectResultTimeouts({ type: key } as Task);
      expect(resultTimeouts).toBeDefined();
      expect(resultTimeouts).toHaveProperty('firstRequestDelay');
      expect(resultTimeouts).toHaveProperty('requestsInterval');
      expect(resultTimeouts).toHaveProperty('timeout');
    });
  });

  it(`should throw error for unknown task type`, () => {
    let resultTimeouts;
    try {
      resultTimeouts = detectResultTimeouts({} as Task);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
    expect(resultTimeouts).toBeUndefined();
  });
});
