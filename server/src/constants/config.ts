const { env } = process;

export const config = {
  DEV: env.NODE_ENV !== 'production',
  PORT: Number(env.JSGOLF_SERVER_PORT ?? 3000),
  PGSQL: env.JSGOLF_SERVER_DATABASE_URL ?? '',
  BASE_URL: env.JSGOLF_SERVER_BASE_URL ?? '',
  TESTRUNNER_URL: env.JSGOLF_SERVER_TESTRUNNER_URL ?? '',
  TESTRUNNER_SECRET: env.JSGOLF_SERVER_TESTRUNNER_SECRET ?? '',
  GITHUB_CLIENTID: env.JSGOLF_SERVER_GITHUB_CLIENTID ?? '',
  GITHUB_SECRET: env.JSGOLF_SERVER_GITHUB_SECRET ?? '',
  SESSION_SECRET: env.JSGOLF_SERVER_SESSION_SECRET ?? '',
};
