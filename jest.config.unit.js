/* eslint @typescript-eslint/no-var-requires: 0 */
const config = require('./jest.config');
config.testRegex = 'u\\.spec\\.ts$';
console.log('\x1b[36mRUNNING UNIT TESTS\x1b[0m');
module.exports = config;
