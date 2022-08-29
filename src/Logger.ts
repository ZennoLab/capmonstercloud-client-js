import { isNode } from './Utils';
let createDebugger = (_: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any[]) => ({
    [_]: args,
  });
};
if (isNode) {
  createDebugger = require('debug');
}

export const debugNet = createDebugger('cmc-net');
export const debugHttps = createDebugger('cmc-https');
export const debugTask = createDebugger('cmc-task');
export const debugErrorConverter = createDebugger('cmc-errconv');

export default { debugNet, debugHttps, debugTask, debugErrorConverter };
