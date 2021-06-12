import ivm from 'isolated-vm';

import { config } from './config';
import { renderTemplate } from './renderTemplate';
import { testEqual, testDeepEqual } from './testFns';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JailFns = Record<string, (...args: any[]) => void>;

export const execute = async (
  setup: string,
  test: string,
  solution: string,
) => {
  const isolate = new ivm.Isolate({ memoryLimit: config.WORKER_MEMORY });
  const context = await isolate.createContext();

  const jail = context.global;

  jail.setSync('global', jail.derefInto());

  jail.setSync('_ivm', ivm);

  const setupJailedFns = (jailFns: JailFns) => {
    const entries = Object.entries(jailFns);

    entries.forEach(([name, fn]) => {
      jail.setSync(`_${name}`, new ivm.Reference(fn));
    });

    return Promise.all(
      entries.map(([name]) =>
        context.evalClosure(
          `
            const ivm = global._ivm;
            const ref = global._${name};
            global.${name} = (...args) =>
              ref.applySync(
                undefined,
                args.map(arg => new ivm.ExternalCopy(arg).copyInto()),
                { arguments: { copy: true } }
              );
            delete global._${name};
          `,
        ),
      ),
    );
  };

  await setupJailedFns({
    testEqual,
    testDeepEqual,
  });

  await context.evalClosure(`delete global._ivm;`);

  const script = await isolate.compileScript(
    renderTemplate(setup, test, solution),
  );

  const result = await new Promise<true | Error>(resolve => {
    jail.setSync('_finished', () => resolve(true));

    script
      .run(context, {
        timeout: config.WORKER_TIMEOUT,
      })
      .catch(e => resolve(e));
  });

  script.release();
  context.release();
  isolate.dispose();

  return result;
};
