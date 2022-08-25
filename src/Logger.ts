import createDebugger from 'debug';

export const debugNet = createDebugger('net');
export const debugHttps = createDebugger('https');

export default { debugNet, debugHttps };
