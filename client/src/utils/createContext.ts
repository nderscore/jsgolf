import { createContext as createCtx, Provider, useContext } from 'react';

export const createContext = <A extends unknown | null>(
  name: string,
): [() => A, Provider<A | undefined>] => {
  const ctx = createCtx<A | undefined>(undefined);
  ctx.displayName = name;

  const useHook = () => {
    const c = useContext(ctx);

    if (c === undefined) {
      throw new Error('Context initialized without a value');
    }

    return c;
  };

  return [useHook, ctx.Provider];
};
