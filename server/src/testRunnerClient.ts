import WebSocket from 'ws';
import { v4 as uuidv4 } from 'uuid';

import { config } from './constants/config';

type Callback = (value: true | string) => void;

type TestResult = {
  id: string;
  result: true | string;
};

const offlineMessage = 'Error: Test Runner Offline';

const callbacks: Record<string, Callback> = {};

let client: WebSocket | undefined;

const reconnect = () => {
  client?.terminate?.();
  client = undefined;
  Object.entries(callbacks).forEach(([id, callback]) => {
    callback(offlineMessage);
    delete callbacks[id];
  });
  setTimeout(connect, 1e3);
};

const connect = () => {
  let timeout: NodeJS.Timeout;
  const heartbeat = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      console.error('TestRunner Websocket timed out.');
      client?.close();
    }, 90e3);
  };

  client = new WebSocket(config.TESTRUNNER_URL, {
    headers: {
      Authorization: config.TESTRUNNER_SECRET,
    },
  });

  client.on('open', () => {
    console.log('TestRunner Websocket connected.');
    heartbeat();
  });

  client.on('ping', () => {
    heartbeat();
  });

  client.on('error', e => {
    console.error('TestRunner Websocket error', e);
  });

  client.on('close', () => {
    console.log('TestRunner Websocket disconnected.');
    clearTimeout(timeout);
    reconnect();
  });

  client.on('message', data => {
    heartbeat();

    let testResult;
    try {
      testResult = JSON.parse(data.toString()) as TestResult;
    } catch {
      return;
    }

    if (!testResult) {
      return;
    }

    const { id, result } = testResult;

    callbacks[id]?.(result);

    delete callbacks[id];
  });
};

connect();

export const runTest = (
  setup: string,
  test: string,
  solution: string,
): Promise<true | string> =>
  new Promise(resolve => {
    if (!client) {
      return resolve(offlineMessage);
    }

    const id = uuidv4();
    callbacks[id] = resolve;

    client.send(
      JSON.stringify({
        id,
        setup,
        test,
        solution,
      }),
    );
  });
