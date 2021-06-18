// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import http from 'http';
import WebSocket from 'ws';

import { config } from './config';
import { queue } from './queue';

const server = http.createServer();

const wss = new WebSocket.Server({ noServer: true });

export type TestMessage = {
  id: string;
  setup: string;
  test: string;
  solution: string;
};

type AliveFlagged = {
  _alive?: boolean;
};

wss.on('connection', (ws: WebSocket & AliveFlagged, request) => {
  console.log(`Received connection from ${request.socket.remoteAddress}`);

  ws._alive = true;

  ws.on('message', async message => {
    let data;
    try {
      data = JSON.parse(message.toString()) as TestMessage;
    } catch (e) {
      void e;
    }

    if (!data?.id) {
      return;
    }

    const { id, setup = '', test = '', solution = '' } = data;

    const result = await queue.push({
      setup,
      test,
      solution,
    });

    ws.send(
      JSON.stringify({
        id,
        result: result === true ? true : String(result.message),
      }),
      e => void e,
    );
  });

  ws.on('pong', () => {
    ws._alive = true;
  });

  ws.on('close', () => {
    console.log('Connection lost.');
  });
});

server.on('upgrade', (request, socket, head) => {
  const authorization = request.headers.authorization;

  if (authorization !== config.SECRET) {
    console.error(`Invalid or missing secret from ${socket.remoteAddress}`);
    socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
    socket.destroy();
    return;
  }

  wss.handleUpgrade(request, socket, head, ws => {
    wss.emit('connection', ws, request);
  });
});

const timeout = setInterval(() => {
  wss.clients.forEach(function each(ws: WebSocket & AliveFlagged) {
    if (ws._alive === false) {
      console.log('Connection lost: timeout.');
      return ws.terminate();
    }

    ws._alive = false;
    ws.ping(() => void 0);
  });
}, 60e3);

wss.on('close', function close() {
  clearInterval(timeout);
});

server.listen(config.PORT);

console.log(
  `JSGolf test runner started listening on ${config.PORT} ${
    config.DEV ? ' (DEV MODE ON)' : ''
  }`,
);
