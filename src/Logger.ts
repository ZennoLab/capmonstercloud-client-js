let createDebugger = (_: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any[]) => ({
    [_]: args,
  });
};
if (typeof process === 'object' && 'env' in process && process.env.DEBUG) {
  // require('debug') hide require call from browser bundler, e.g. webpack
  createDebugger = module[`require`].call(module, 'debug');
}

export const debugNet = createDebugger('cmc-net');
export const debugHttp = createDebugger('cmc-http');
export const debugTask = createDebugger('cmc-task');
export const debugErrorConverter = createDebugger('cmc-errconv');

export default { debugNet, debugHttp, debugTask, debugErrorConverter };
