import ivm from 'isolated-vm';

import { config } from './config';
import { renderTemplate } from './renderTemplate';
import { testEqual, testDeepEqual } from './testFns';

type JailFns = Record<string, (...args: unknown[]) => void>;

export const execute = async (
  setup: string,
  test: string,
  solution: string,
) => {
  const isolate = new ivm.Isolate({ memoryLimit: config.WORKER_MEMORY });
  const context = await isolate.createContext();

  const jail = context.global;

  jail.setSync('global', jail.derefInto());

  const jailFns: JailFns = {
    testEqual,
    testDeepEqual,
  };

  await Promise.all(
    Object.entries(jailFns).map(([name, fn]) =>
      context.evalClosure(
        `
          const ref = $0;
          global.${name} = (...args) => {
            ref.applySync(
              undefined,
              args,
              { arguments: { copy: true } }
            );
          };
        `,
        [(...args: unknown[]) => fn(...args)],
        { arguments: { reference: true } },
      ),
    ),
  );

  const script = await isolate.compileScript(
    renderTemplate(setup, test, solution),
  );

  const result = await new Promise<true | Error>(resolve => {
    jail.setSync('_finished', () => resolve(true));

    script
      .run(context, {
        timeout: config.WORKER_TIMEOUT,
      })
      .catch(e => {
        if (e instanceof Error) {
          resolve(e);
        } else {
          resolve(new Error(e));
        }
      });
  });

  script.release();
  context.release();
  isolate.dispose();

  return result;
};
