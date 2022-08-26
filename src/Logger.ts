import createDebugger from 'debug';

export const debugNet = createDebugger('cmc-net');
export const debugHttps = createDebugger('cmc-https');
export const debugTask = createDebugger('cmc-task');
export const debugErrorConverter = createDebugger('cmc-errconv');

export default { debugNet, debugHttps, debugTask, debugErrorConverter };
