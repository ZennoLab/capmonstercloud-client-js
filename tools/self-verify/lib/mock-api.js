/* eslint @typescript-eslint/no-var-requires: 0 */
const http = require('http');

const DEFAULTS = {
  '/getBalance': '{"errorId":0,"balance":1.23}',
  '/createTask': '{"errorId":0,"taskId":1}',
  '/getTaskResult': '{"errorId":0,"status":"ready","solution":{"gRecaptchaResponse":"mock-token"}}',
};

function createMockApi(responses) {
  const caughtRequests = [];
  let taskType;
  const queue = Array.isArray(responses) ? responses.slice() : [];

  const server = http.createServer((req, res) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => {
      const body = Buffer.concat(chunks).toString('utf8');
      const route = (req.url || '').split('?')[0];
      caughtRequests.push({ method: req.method, url: req.url, body, userAgent: req.headers['user-agent'] });

      if (route === '/createTask') {
        try {
          taskType = JSON.parse(body).task.type;
        } catch {
          /* malformed test request */
        }
      }
      const queued = queue.length ? queue.shift() : null;
      const defaultBody =
        route === '/getTaskResult' && /Turnstile/.test(taskType || '')
          ? '{"errorId":0,"status":"ready","solution":{"token":"mock-token"}}'
          : DEFAULTS[route];
      const responseBody = (queued && queued.responseBody) || defaultBody || '{"errorId":0}';
      const statusCode = (queued && queued.statusCode) || 200;
      const contentType = (queued && queued.contentType) || 'application/json';

      res.writeHead(statusCode, { 'Content-Type': contentType });
      res.end(responseBody);
    });
  });

  return new Promise((resolve, reject) => {
    server.on('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      resolve({
        url: `http://127.0.0.1:${address.port}`,
        caughtRequests,
        async close() {
          await new Promise((closeResolve, closeReject) => {
            server.close((err) => (err ? closeReject(err) : closeResolve()));
            // SDK uses keep-alive agents; idle test sockets must not delay teardown.
            if (server.closeIdleConnections) server.closeIdleConnections();
          });
        },
      });
    });
  });
}

module.exports = { createMockApi };
