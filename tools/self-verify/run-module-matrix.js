/* eslint @typescript-eslint/no-var-requires: 0 */
const path = require('path');
const { pathToFileURL } = require('url');
const { createMockApi } = require('./lib/mock-api');
const { runResponseMatrix } = require('./run-response-matrix');
const { runErrorMatrix } = require('./run-error-matrix');
const { buildRequestFixtures } = require('./request-fixtures');

const ROOT = path.resolve(__dirname, '../..');
const CJS_ENTRY = path.join(ROOT, 'dist', 'index.js');
const ESM_ENTRY = path.join(ROOT, 'dist', 'esm', 'index.js');

const FAST_TIMEOUTS = { firstRequestDelay: 0, requestsInterval: 0, timeout: 5000 };

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function collectNamedExports(sdk) {
  return Object.keys(sdk)
    .filter((key) => key !== 'default' && typeof sdk[key] !== 'undefined')
    .sort();
}

async function loadSdk(kind) {
  if (kind === 'cjs') {
    return require('@zennolab_com/capmonstercloud-client');
  }
  return import('@zennolab_com/capmonstercloud-client');
}

async function runConstructAndSerialize(sdk) {
  const checks = [];
  const fixtures = buildRequestFixtures(sdk);
  const exportedRequests = Object.keys(sdk).filter(
    (name) => /Request$/.test(name) && !/Base$/.test(name) && typeof sdk[name] === 'function',
  );
  for (const name of exportedRequests) {
    if (!fixtures.some((f) => f.name === name) && name !== 'CommonCaptchaRequest')
      checks.push({ name: `coverage:${name}`, status: 'fail', kind: 'analysis', error: 'Exported request has no fixture' });
  }

  for (const fixture of fixtures) {
    const started = Date.now();
    try {
      const task = fixture.create();
      assert(task.type === fixture.expected.type, `${fixture.name}: expected type ${fixture.expected.type}, got ${task.type}`);
      if (fixture.expected.class) {
        assert(task.class === fixture.expected.class, `${fixture.name}: expected class ${fixture.expected.class}, got ${task.class}`);
      }
      if (fixture.extra) {
        for (const extraPath of fixture.extra) {
          const value = extraPath.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), task);
          assert(value !== undefined && value !== null && value !== '', `${fixture.name}: missing ${extraPath}`);
        }
      }
      // Exercise the real serializer and transport, not only constructor properties.
      const mock = await createMockApi();
      try {
        const client = sdk.CapMonsterCloudClientFactory.Create(new sdk.ClientOptions({ clientKey: 'test-key', serviceUrl: mock.url }));
        const result = await client.Solve(task, FAST_TIMEOUTS);
        const sent = JSON.parse(mock.caughtRequests[0].body);
        assert(mock.caughtRequests[0].method === 'POST', 'Expected POST');
        assert(mock.caughtRequests[0].url === '/createTask', 'Expected createTask route');
        assert(sent.clientKey === 'test-key', 'Missing clientKey');
        assert(JSON.stringify(sent.task) === JSON.stringify(task), 'Wire payload differs from task');
        assert(JSON.parse(mock.caughtRequests[1].body).taskId === 1, 'Wrong polling taskId');
        assert((result.solution.gRecaptchaResponse || result.solution.token) === 'mock-token', 'Response was not preserved');
        if (fixture.name === 'HuntRequest')
          assert(sent.task.metadata.widgetUrl === 'https://captcha.example.com/widget?hash=widget-hash', 'widgetUrl not sent');
        if (fixture.name === 'AlibabaRequest') {
          assert(sent.task.metadata.cookieRequired === true, 'cookieRequired not sent');
          assert(sent.task.metadata.punishUrl.includes('/punish?'), 'punishUrl not sent');
        }
      } finally {
        await mock.close();
      }
      checks.push({
        name: `construct:${fixture.name}`,
        status: 'pass',
        kind: 'executed',
        docs: fixture.docs,
        durationMs: Date.now() - started,
      });
    } catch (err) {
      checks.push({
        name: `construct:${fixture.name}`,
        status: 'fail',
        kind: 'executed',
        docs: fixture.docs,
        durationMs: Date.now() - started,
        error: err instanceof Error ? err.message : String(err),
        reproduction: `Create ${fixture.name} via ${
          fixture.name === 'CommonCaptcha' ? 'new CommonCaptcha({ task })' : `new ${fixture.name}({...})`
        } and inspect task.type / metadata.`,
      });
    }
  }

  return checks;
}

async function runClientFlows(sdk, kind) {
  const checks = [];
  const { CapMonsterCloudClientFactory, ClientOptions, RecaptchaV2Request } = sdk;

  const mock = await createMockApi([
    { responseBody: '{"errorId":0,"balance":12.34}' },
    { responseBody: '{"errorId":0,"taskId":42}' },
    { responseBody: '{"errorId":0,"status":"ready","solution":{"gRecaptchaResponse":"token"}}' },
    { responseBody: '{"errorId":1,"errorCode":"ERROR_KEY_DOES_NOT_EXIST"}' },
    { responseBody: '{"errorId":1,"errorCode":"ERROR_ZERO_BALANCE","errorDescription":"zero","taskId":0}' },
  ]);

  try {
    const client = CapMonsterCloudClientFactory.Create(new ClientOptions({ clientKey: 'test-key', serviceUrl: mock.url }));

    const balance = await client.getBalance();
    assert(balance.balance === 12.34, `getBalance expected 12.34, got ${balance.balance}`);
    assert(
      mock.caughtRequests[0].userAgent && mock.caughtRequests[0].userAgent.includes('Zennolab.CapMonsterCloud.Client.JS'),
      'user-agent header is missing',
    );
    checks.push({
      name: `${kind}:getBalance`,
      status: 'pass',
      kind: 'executed',
      docs: 'https://docs.capmonster.cloud/docs/methods/',
    });

    const solved = await client.Solve(
      new RecaptchaV2Request({
        websiteURL: 'https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=high',
        websiteKey: '6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd',
      }),
      FAST_TIMEOUTS,
    );
    assert(solved.solution && solved.solution.gRecaptchaResponse === 'token', 'Solve did not return expected solution');
    checks.push({
      name: `${kind}:Solve RecaptchaV2Request`,
      status: 'pass',
      kind: 'executed',
      docs: 'https://docs.capmonster.cloud/docs/captchas/recaptcha-v2/',
    });

    try {
      await client.getBalance();
      checks.push({
        name: `${kind}:getBalance error`,
        status: 'fail',
        kind: 'executed',
        error: 'Expected GetBalanceError was not thrown',
        reproduction: 'Call getBalance() against a mock that returns ERROR_KEY_DOES_NOT_EXIST.',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      assert(message.includes('KEY_DOES_NOT_EXIST'), `Unexpected getBalance error: ${message}`);
      checks.push({
        name: `${kind}:getBalance error`,
        status: 'pass',
        kind: 'executed',
        docs: 'https://docs.capmonster.cloud/docs/methods/',
      });
    }

    const failedSolve = await client.Solve(
      new RecaptchaV2Request({
        websiteURL: 'https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=high',
        websiteKey: '6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd',
      }),
      FAST_TIMEOUTS,
    );
    assert(failedSolve.error === 'ZERO_BALANCE', `Expected ZERO_BALANCE, got ${failedSolve.error}`);
    checks.push({
      name: `${kind}:Solve createTask error`,
      status: 'pass',
      kind: 'executed',
      docs: 'https://docs.capmonster.cloud/docs/methods/',
    });
  } catch (err) {
    checks.push({
      name: `${kind}:client flows`,
      status: 'fail',
      kind: 'executed',
      error: err instanceof Error ? err.message : String(err),
      reproduction: `Import the ${kind} build, create CapMonsterCloudClientFactory client against a local mock, then call getBalance() and Solve().`,
    });
  } finally {
    await mock.close();
  }

  try {
    new sdk.RecaptchaV2Request({ websiteURL: 'not-a-url', websiteKey: 'k' });
    checks.push({
      name: `${kind}:invalid websiteURL`,
      status: 'fail',
      kind: 'executed',
      error: 'Expected websiteURL validation error was not thrown',
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    assert(message.includes('websiteURL must be a valid http or https URL'), message);
    checks.push({
      name: `${kind}:invalid websiteURL`,
      status: 'pass',
      kind: 'executed',
    });
  }

  return checks;
}

async function runKind(kind) {
  const started = Date.now();
  try {
    const sdk = await loadSdk(kind);
    const namedExports = collectNamedExports(sdk);
    const checks = [];

    checks.push({
      name: `${kind}:load`,
      status: 'pass',
      kind: 'executed',
      detail: `Loaded ${namedExports.length} named exports`,
    });

    const requiredExports = [
      'CapMonsterCloudClientFactory',
      'ClientOptions',
      'HuntRequest',
      'AlibabaRequest',
      'RecaptchaV2Request',
      'TurnstileRequest',
      'CommonCaptcha',
    ];
    for (const exportName of requiredExports) {
      checks.push({
        name: `${kind}:export ${exportName}`,
        status: typeof sdk[exportName] === 'function' || typeof sdk[exportName] === 'object' ? 'pass' : 'fail',
        kind: 'executed',
        error: sdk[exportName] ? undefined : `Missing export ${exportName}`,
      });
    }

    checks.push(...(await runConstructAndSerialize(sdk)));
    checks.push(...(await runClientFlows(sdk, kind)));
    checks.push(...(await runErrorMatrix(sdk, kind)));
    checks.push(...(await runResponseMatrix(sdk, kind)));

    return {
      module: kind,
      status: checks.some((check) => check.status === 'fail') ? 'fail' : 'pass',
      durationMs: Date.now() - started,
      namedExports,
      checks,
    };
  } catch (err) {
    return {
      module: kind,
      status: 'fail',
      durationMs: Date.now() - started,
      checks: [
        {
          name: `${kind}:load`,
          status: 'fail',
          kind: 'executed',
          error: err instanceof Error ? err.stack || err.message : String(err),
          reproduction:
            kind === 'esm'
              ? `node --input-type=module -e "import('${pathToFileURL(ESM_ENTRY).href}')"`
              : `node -e "require('${CJS_ENTRY}')"`,
        },
      ],
    };
  }
}

async function runModuleMatrix() {
  const cjs = await runKind('cjs');
  const esm = await runKind('esm');
  const exportDiff =
    cjs.namedExports && esm.namedExports
      ? {
          onlyCjs: cjs.namedExports.filter((name) => !esm.namedExports.includes(name)),
          onlyEsm: esm.namedExports.filter((name) => !cjs.namedExports.includes(name)),
        }
      : undefined;

  return {
    status: cjs.status === 'pass' && esm.status === 'pass' && !exportDiff.onlyCjs.length && !exportDiff.onlyEsm.length ? 'pass' : 'fail',
    cjs,
    esm,
    exportDiff,
  };
}

module.exports = { runModuleMatrix, CJS_ENTRY, ESM_ENTRY };

if (require.main === module) {
  runModuleMatrix()
    .then((result) => {
      console.log(JSON.stringify(result, null, 2));
      process.exit(result.status === 'pass' ? 0 : 1);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
