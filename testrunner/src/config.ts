const { env } = process;

export const config = {
  DEV: env.NODE_ENV !== 'production',
  PORT: Number(env.JSGOLF_TESTRUNNER_PORT ?? 3001),
  SECRET: env.JSGOLF_TESTRUNNER_SECRET ?? '',
  WORKERS: Number(env.JSGOLF_TESTRUNNER_WORKERS ?? 8),
  WORKER_MEMORY: Number(env.JSGOLF_TESTRUNNER_WORKER_MEMORY ?? 128),
  WORKER_TIMEOUT: Number(env.JSGOLF_TESTRUNNER_WORKER_TIMEOUT ?? 10) * 1000,
};
