/* eslint @typescript-eslint/no-var-requires: 0 */
const config = require('./jest.config');
config.testRegex = 'i\\.spec\\.ts$';
config.setupFilesAfterEnv = ['./jest.timeout.setup.js'];
console.log('\x1b[36mRUNNING INTEGRATION TESTS\x1b[0m');
module.exports = config;
