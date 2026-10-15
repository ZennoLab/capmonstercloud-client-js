/* eslint @typescript-eslint/no-var-requires: 0 */
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { createMockApi } = require('./lib/mock-api');

const ROOT = path.resolve(__dirname, '../..');
const README = path.join(ROOT, 'README.md');
const TMP = path.join(__dirname, 'tmp', 'readme-examples');

function extractExamples(markdown) {
  const examples = [];
  const fence = /```(\w+)\n([\s\S]*?)```/g;
  let match;
  let index = 0;
  while ((match = fence.exec(markdown))) {
    const language = match[1];
    const code = match[2].trim();
    if (!['ts', 'typescript', 'js', 'javascript'].includes(language)) {
      continue;
    }
    index += 1;
    const isEsm = /\bimport\s+/.test(code) && !/\brequire\s*\(/.test(code);
    examples.push({
      id: `readme-example-${index}`,
      language,
      module: isEsm ? 'esm' : 'cjs',
      code,
    });
  }
  return examples;
}

function rewriteExample(code, { moduleKind, serviceUrl, live }) {
  let next = code;

  if (!live && serviceUrl) {
    next = next.replace(
      /new ClientOptions\(\{\s*clientKey:\s*'YOUR_API_KEY'\s*,?\s*\}\)/g,
      `new ClientOptions({ clientKey: process.env.CMC_CLIENT_KEY || 'test-key', serviceUrl: ${JSON.stringify(serviceUrl)} })`,
    );
  } else {
    next = next.replace(/'YOUR_API_KEY'/g, 'process.env.CMC_CLIENT_KEY || process.env.CAPMONSTER_API_KEY');
  }

  if (moduleKind === 'esm' && !/\bawait\b/.test(next)) {
    return next;
  }

  return next;
}

function runNode(filePath, env) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [filePath], {
      env: { ...process.env, ...env },
      cwd: ROOT,
    });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });
    const timer = setTimeout(() => child.kill(), 60000);
    child.on('error', (err) => {
      clearTimeout(timer);
      resolve({ code: -1, stdout, stderr: String(err) });
    });
    child.on('close', (code) => {
      clearTimeout(timer);
      resolve({ code, stdout, stderr });
    });
  });
}

async function runReadmeExamples(options = {}) {
  const live = Boolean(options.live);
  const liveSolve = Boolean(options.liveSolve);
  const markdown = fs.readFileSync(README, 'utf8');
  const examples = extractExamples(markdown);
  fs.mkdirSync(TMP, { recursive: true });

  const mock = live ? null : await createMockApi();

  const checks = [];
  try {
    for (const example of examples) {
      const fileName = `${example.id}.${example.module === 'esm' ? 'mjs' : 'cjs'}`;
      const filePath = path.join(TMP, fileName);
      const rewritten = rewriteExample(example.code, {
        moduleKind: example.module,
        serviceUrl: mock && mock.url,
        live,
      });
      let compile = { diagnostics: [] };
      if (['ts', 'typescript'].includes(example.language)) {
        const ts = require('typescript');
        const sourcePath = filePath.replace(/\.mjs$/, '.mts');
        fs.writeFileSync(sourcePath, rewritten);
        const program = ts.createProgram([sourcePath], {
          target: ts.ScriptTarget.ES2020,
          module: ts.ModuleKind.NodeNext,
          moduleResolution: ts.ModuleResolutionKind.NodeNext,
          strict: true,
          skipLibCheck: true,
          noEmit: true,
        });
        compile.diagnostics = ts.getPreEmitDiagnostics(program).map((d) => ts.flattenDiagnosticMessageText(d.messageText, '\n'));
        if (compile.diagnostics.length) {
          checks.push({
            name: example.id,
            kind: 'executed',
            status: 'fail',
            error: compile.diagnostics.join('\n'),
            reproduction: `Inspect ${sourcePath}`,
          });
          continue;
        }
        fs.writeFileSync(
          filePath,
          ts.transpileModule(rewritten, { compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ES2020 } }).outputText,
        );
      } else {
        fs.writeFileSync(filePath, rewritten);
      }

      const callsSolve = /\.Solve\s*\(/.test(example.code);
      if (live && callsSolve && !liveSolve) {
        checks.push({
          name: example.id,
          status: 'skip',
          kind: 'skipped',
          reason: 'Live Solve() is disabled by default to avoid spending API balance. Re-run with --live-solve to execute.',
          module: example.module,
          language: example.language,
        });
        continue;
      }

      if (live && !process.env.CMC_CLIENT_KEY && !process.env.CAPMONSTER_API_KEY) {
        checks.push({
          name: example.id,
          status: 'skip',
          kind: 'skipped',
          reason: 'No CMC_CLIENT_KEY / CAPMONSTER_API_KEY provided for live execution.',
          module: example.module,
          language: example.language,
        });
        continue;
      }

      const result = await runNode(filePath, {
        CMC_CLIENT_KEY: process.env.CMC_CLIENT_KEY || process.env.CAPMONSTER_API_KEY || 'test-key',
      });

      const expectedHint = callsSolve ? 'solution' : 'Balance';
      const stdoutMatch = result.stdout.toLowerCase();
      const looksSuccessful =
        result.code === 0 &&
        !result.stderr.trim() &&
        (callsSolve ? (live ? stdoutMatch.includes('token') : stdoutMatch.includes('mock-token')) : stdoutMatch.includes('balance'));

      checks.push({
        name: example.id,
        status: looksSuccessful ? 'pass' : 'fail',
        kind: 'executed',
        module: example.module,
        language: example.language,
        file: path.relative(ROOT, filePath),
        expected: live
          ? `Process exits 0 and prints a ${expectedHint} from the live API.`
          : 'Process exits 0 against the local mock API and prints a solution or balance.',
        exitCode: result.code,
        stdout: result.stdout.trim().slice(0, 2000),
        stderr: result.stderr.trim().slice(0, 2000),
        error: looksSuccessful ? undefined : result.stderr.trim() || `exit ${result.code}`,
        reproduction: `node ${path.relative(ROOT, filePath)}`,
      });
    }
  } finally {
    if (mock) {
      await mock.close();
    }
  }

  return {
    status: checks.some((check) => check.status === 'fail') ? 'fail' : 'pass',
    live,
    checks,
  };
}

module.exports = { runReadmeExamples, extractExamples };

if (require.main === module) {
  const live = process.argv.includes('--live');
  const liveSolve = process.argv.includes('--live-solve');
  runReadmeExamples({ live, liveSolve })
    .then((result) => {
      console.log(JSON.stringify(result, null, 2));
      process.exit(result.status === 'pass' ? 0 : 1);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
