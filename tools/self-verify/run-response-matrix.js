/* eslint @typescript-eslint/no-var-requires: 0 */
const assert = require('assert').strict;
const { createMockApi } = require('./lib/mock-api');
const base = 'https://docs.capmonster.cloud/docs/captchas/';
const scenarios = [
  {
    name: 'Amazon cookie solution',
    docs: 'amazon-task/',
    request: (sdk) =>
      new sdk.AmazonRequest({
        websiteURL: 'https://example.com',
        websiteKey: 'key',
        captchaScript: 'https://example.com/jsapi.js',
        cookieSolution: true,
      }),
    solution: { cookies: { 'aws-waf-token': 'cookie' }, userAgent: 'ua' },
  },
  {
    name: 'Amazon token solution',
    docs: 'amazon-task/',
    request: (sdk) =>
      new sdk.AmazonRequest({ websiteURL: 'https://example.com', websiteKey: 'key', captchaScript: 'https://example.com/jsapi.js' }),
    solution: { captcha_voucher: 'voucher', existing_token: 'token' },
  },
  {
    name: 'Altcha nested solution',
    docs: 'altcha-task/',
    request: (sdk) =>
      new sdk.AltchaRequest({
        websiteURL: 'https://example.com',
        websiteKey: '',
        metadata: { challenge: 'hash', iterations: '5000', salt: 'salt', signature: 'signature' },
      }),
    solution: { data: { token: 'token', number: 42 } },
  },
  {
    name: 'reCAPTCHA response context',
    docs: 'no-captcha-task/',
    request: (sdk) => new sdk.RecaptchaV2Request({ websiteURL: 'https://example.com', websiteKey: 'key' }),
    solution: { gRecaptchaResponse: 'token', userAgent: 'ua', cookies: { nocookies: 'true' } },
  },
  ...[
    ['shein', [{ X: 69, Y: 201.9 }], 'Coordinate', 'coordinate/shein/'],
    ['dli_ensemble', '1', 'Text', 'text/dli_ensemble/'],
    ['mathsum', '109', 'Text', 'text/mathsum/'],
    ['bills_audio', [6, 8, 4], 'Text', 'audio/bills_audio/'],
    ['bls_3x3', [true, false], 'Grid', 'grid/bls/'],
    ['oocl_rotate_new', [130.9], 'NumericArray', 'rotation/oocl_rotate_new/'],
  ].map(([task, answer, answerType, docs]) => ({
    name: `recognition ${task}`,
    docs: `compleximage/${docs}`,
    request: (sdk) =>
      new sdk.ComplexImageTaskRecognitionRequest({
        imagesBase64: ['base64'],
        metaData: {
          Task: task,
          ...(task === 'bills_audio' ? { PayloadType: 'Audio' } : {}),
          ...(task === 'bls_3x3' ? { TaskArgument: '42' } : {}),
        },
      }),
    solution: { answer, metadata: { AnswerType: answerType } },
  })),
  ...['bls_text', 'my_custom_module'].map((module) => ({
    name: `ImageToText module ${module}`,
    docs: 'ImageToText/module-name/',
    request: (sdk) => new sdk.ImageToTextRequest({ body: 'base64', CapMonsterModule: module }),
    solution: { text: '42' },
    check: (task) => assert.equal(task.CapMonsterModule, module),
  })),
  {
    name: 'TSPD optional userAgent',
    docs: 'tspd-task/',
    request: (sdk) =>
      new sdk.TSPDRequest({
        websiteURL: 'https://example.com',
        metadata: { tspdCookie: 'cookie', htmlPageBase64: 'base64' },
        proxy: { proxyType: 'http', proxyAddress: '1.2.3.4', proxyPort: 8080 },
      }),
    solution: { Domains: { 'example.com': { Cookies: { TSPD_101_DID: 'cookie' } } } },
    check: (task) => assert.equal(Object.hasOwn(task, 'userAgent'), false),
  },
];
async function runResponseMatrix(sdk, kind) {
  const checks = [];
  for (const scenario of scenarios) {
    const mock = await createMockApi([
      { responseBody: '{"errorId":0,"taskId":7}' },
      { responseBody: JSON.stringify({ errorId: 0, status: 'ready', solution: scenario.solution }) },
    ]);
    try {
      const client = sdk.CapMonsterCloudClientFactory.Create(new sdk.ClientOptions({ clientKey: 'test-key', serviceUrl: mock.url }));
      const result = await client.Solve(scenario.request(sdk), { firstRequestDelay: 0, requestsInterval: 0, timeout: 1000 });
      assert.equal(result.error, undefined);
      assert.deepEqual(result.solution, scenario.solution);
      if (scenario.check) scenario.check(JSON.parse(mock.caughtRequests[0].body).task);
      checks.push({ name: `${kind}:${scenario.name}`, kind: 'executed', status: 'pass', docs: base + scenario.docs });
    } catch (err) {
      checks.push({
        name: `${kind}:${scenario.name}`,
        kind: 'executed',
        status: 'fail',
        docs: base + scenario.docs,
        error: String(err),
        reproduction: 'npm run test-modules',
      });
    } finally {
      await mock.close();
    }
  }
  return checks;
}
module.exports = { runResponseMatrix };
