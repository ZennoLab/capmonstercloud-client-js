import http, { Server } from 'http';
import { AddressInfo, Socket } from 'net';

export type ResponseListener = () => void;

type CaughtRequest = {
  contentType?: string;
  userAgent?: string;
  body?: string;
};

export type ServerMock = {
  caughtRequests: Array<CaughtRequest>;
  address: AddressInfo;
  destroy: () => Promise<void>;
  server?: Server;
  lastSocketKey: number;
  socketMap: Record<string, Socket>;
};

type MockResponse = {
  statusCode?: number;
  contentType?: string;
  responseBody?: string;
};

const DEFAULT_responseStatusCode = 200;
const DEFAULT_responseContentType = 'text/plain';
const DEFAULT_responseBody = '{}';

export function createServerMock(params: { responses?: Array<MockResponse> }): Promise<ServerMock> {
  // Set defaults input object
  const { responses = [] } = params;
  return new Promise((resolve, reject) => {
    const srv: ServerMock = {
      caughtRequests: [],
      address: {
        port: 0,
        family: 'IPv4',
        address: '0.0.0.0',
      },
      destroy(): Promise<void> {
        return new Promise((resolve, reject) => {
          if (srv.server) {
            /* loop through all sockets and destroy them */
            Object.keys(srv.socketMap).forEach((socketKey) => {
              srv.socketMap[socketKey].destroy();
            });

            /* after all the sockets are destroyed, we may close the server! */
            srv.server.on('error', reject);
            return srv.server.close((err) => {
              if (err) {
                return reject(err);
              }
              resolve();
            });
          }
          return reject(new Error('server is not defined'));
        });
      },
      lastSocketKey: 0,
      socketMap: {},
    };
    srv.server = http.createServer((req, res) => {
      const caughtRequest: CaughtRequest = { contentType: req.headers['content-type'], userAgent: req.headers['user-agent'] };
      srv.caughtRequests.push(caughtRequest);
      const chunks: Array<Uint8Array> = [];
      req.on('data', (chunk) => chunks.push(chunk));
      req.on('end', () => {
        const requestBody = Buffer.concat(chunks).toString('utf8');
        caughtRequest.body = requestBody;

        const response = responses.shift();
        res.writeHead((response && response.statusCode) || DEFAULT_responseStatusCode, {
          'Content-Type': (response && response.contentType) || DEFAULT_responseContentType,
        });
        res.end((response && response.responseBody) || DEFAULT_responseBody);
      });
    });
    srv.server.on('listening', () => {
      if (srv.server) {
        const address = srv.server.address();
        if (address && typeof address === 'object') {
          srv.address = address;
          return resolve(srv);
        }
        return reject(new Error('Could not get server address'));
      }
      return reject(new Error('server is not defined'));
    });
    srv.server.on('error', reject);
    srv.server.listen();
    srv.server.on('connection', function (socket) {
      /* generate a new, unique socket-key */
      const socketKey = ++srv.lastSocketKey;
      /* add socket when it is connected */
      srv.socketMap[socketKey] = socket;
      socket.on('close', function () {
        /* remove socket when it is closed */
        delete srv.socketMap[socketKey];
      });
    });
  });
}
