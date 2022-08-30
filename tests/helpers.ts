import http, { Server } from 'http';
import { AddressInfo, Socket } from 'net';

export type ResponseListener = () => void;

export type ServerMock = {
  pushResponseListener: (responseListener: ResponseListener) => void;
  requestsCount: number;
  responseListeners: Array<ResponseListener>;
  address: AddressInfo;
  destroy: () => Promise<void>;
  server?: Server;
  lastSocketKey: number;
  socketMap: Record<string, Socket>;
};

export function createServerMock(params: {
  responseStatusCode?: number;
  responseContentType?: string;
  responseBody?: string;
}): Promise<ServerMock> {
  // Set defaults input object
  const { responseStatusCode = 200, responseContentType = 'text/plain', responseBody = '{}' } = params;
  return new Promise((resolve, reject) => {
    const srv: ServerMock = {
      pushResponseListener,
      requestsCount: 0,
      responseListeners: [],
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
    function pushResponseListener(responseListener: ResponseListener) {
      srv.responseListeners.push(responseListener);
    }
    srv.server = http.createServer((req, res) => {
      srv.requestsCount++;
      res.writeHead(responseStatusCode, {
        'Content-Type': responseContentType,
      });
      res.end(responseBody);
      const responseListener = srv.responseListeners.shift();
      if (responseListener) {
        responseListener();
      }
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
