/* eslint @typescript-eslint/no-var-requires: 0 */
const { createMockApi } = require('./lib/mock-api');
const assert = require('assert').strict;
const ok = { responseBody: JSON.stringify({ errorId: 0, taskId: 7 }) };
const ready = { responseBody: JSON.stringify({ errorId: 0, status: 'ready', solution: { token: 'expected' } }) };
const cases = [
  {
    name: 'Alibaba cookies response',
    alibaba: true,
    responses: [
      ok,
      {
        responseBody: JSON.stringify({
          errorId: 0,
          status: 'ready',
          solution: { domains: { 'example.com': { cookies: { x5sec: 'cookie' } } } },
        }),
      },
    ],
  },
  { name: 'processing then ready', responses: [ok, { responseBody: '{"errorId":0,"status":"processing"}' }, ready], solution: true },
  {
    name: 'CAPTCHA_NOT_READY then ready',
    responses: [ok, { responseBody: '{"errorId":1,"errorCode":"ERROR_CAPTCHA_NOT_READY"}' }, ready],
    solution: true,
  },
  { name: '503 polling retry', responses: [ok, { statusCode: 503 }, ready], solution: true },
  { name: 'polling API error', responses: [ok, { responseBody: '{"errorId":1,"errorCode":"ERROR_ZERO_BALANCE"}' }], error: 'ZERO_BALANCE' },
  { name: 'create HTTP failure', responses: [{ statusCode: 500 }], throws: /Cannot create task/ },
  { name: 'create malformed JSON', responses: [{ responseBody: '{' }], throws: /Cannot parse create task/ },
  { name: 'poll HTTP failure', responses: [ok, { statusCode: 500 }], throws: /Cannot get task result/ },
  { name: 'poll malformed JSON', responses: [ok, { responseBody: '{' }], throws: /Cannot parse get task result/ },
  { name: 'wrong content type', responses: [{ contentType: 'text/html' }], throws: /Unexpected content type/ },
  { name: 'balance HTTP failure', balance: true, responses: [{ statusCode: 500 }], throws: /Cannot get balance/ },
  { name: 'balance malformed JSON', balance: true, responses: [{ responseBody: '{' }], throws: /Cannot parse get balance/ },
  { name: 'poll timeout', responses: [ok, { responseBody: '{"errorId":0,"status":"processing"}' }], timeout: 0, error: 'Timeout' },
];
async function runErrorMatrix(sdk, kind) {
  const checks = [];
  for (const scenario of cases) {
    const mock = await createMockApi(scenario.responses);
    try {
      const client = sdk.CapMonsterCloudClientFactory.Create(new sdk.ClientOptions({ clientKey: 'test-key', serviceUrl: mock.url }));
      const run = () =>
        scenario.balance
          ? client.getBalance()
          : client.Solve(
              scenario.alibaba
                ? new sdk.AlibabaRequest({
                    websiteURL: 'https://example.com',
                    metadata: { punishUrl: 'https://example.com/punish', cookieRequired: true },
                  })
                : new sdk.RecaptchaV2Request({ websiteURL: 'https://example.com', websiteKey: 'key' }),
              { firstRequestDelay: 0, requestsInterval: 0, timeout: scenario.timeout === undefined ? 1000 : scenario.timeout },
            );
      if (scenario.throws) {
        await assert.rejects(run, scenario.throws);
      } else {
        const result = await run();
        if (scenario.alibaba) assert.equal(result.solution.domains['example.com'].cookies.x5sec, 'cookie');
        else if (scenario.solution) assert.equal(result.solution.token, 'expected');
        else assert.equal(result.error, scenario.error);
      }
      checks.push({
        name: `${kind}:${scenario.name}`,
        kind: 'executed',
        docs: 'https://docs.capmonster.cloud/docs/methods/',
        status: 'pass',
      });
    } catch (err) {
      checks.push({
        name: `${kind}:${scenario.name}`,
        kind: 'executed',
        docs: 'https://docs.capmonster.cloud/docs/methods/',
        status: 'fail',
        error: String(err),
        reproduction: 'node tools/self-verify/run-module-matrix.js',
      });
    } finally {
      await mock.close();
    }
  }
  return checks;
}
module.exports = { runErrorMatrix };
