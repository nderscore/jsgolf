import WebSocket from 'ws';
import { v4 as uuidv4 } from 'uuid';

import { config } from '../constants/config';

type Callback = (value: true | string) => void;

type TestResult = {
  id: string;
  result: true | string;
};

const MAX_CALLBACKS = 50;

const offlineMessage = 'Error: Test Runner Offline';

const overloadedMessage = 'Error: Test Runner Overloaded';

const callbacks: Map<string, Callback> = new Map();

let client: WebSocket | undefined;

const reconnect = () => {
  client?.terminate?.();
  client = undefined;
  callbacks.forEach((callback, id) => {
    callback(offlineMessage);
    callbacks.delete(id);
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

    callbacks.get(id)?.(result);

    callbacks.delete(id);
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

    if (callbacks.size >= MAX_CALLBACKS) {
      return resolve(overloadedMessage);
    }

    const id = uuidv4();
    callbacks.set(id, resolve);

    client.send(
      JSON.stringify({
        id,
        setup,
        test,
        solution,
      }),
    );
  });
