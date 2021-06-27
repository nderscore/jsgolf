import type { Session } from '@mgcrea/fastify-session';
import { FastifyReply, FastifyRequest, FastifyInstance } from 'fastify';
import mercurius, { MercuriusContext } from 'mercurius';
import mercuriusAuth from 'mercurius-auth';
import mercuriusCodegen, { loadSchemaFiles } from 'mercurius-codegen';
import { buildSchema } from 'graphql';
import path from 'path';
import { getGraphQLRateLimiter } from 'graphql-rate-limit';
import NoIntrospection from 'graphql-disable-introspection';

import { config } from '../constants/config';
import { prisma } from '../lib/prisma';
import { Query } from '../query';
import { Mutation } from '../mutation';
import { loaders } from '../loaders';
import { runTest } from '../lib/testRunnerClient';
import { PrismaRateLimitStore } from '../lib/PrismaRateLimitStore';
import { addRateLimitDirectiveToSchema } from '../lib/addRateLimitDirectiveToSchema';

export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

const BASE_PATH = path.resolve(__dirname, '../graphql');

export const buildContext = async (
  request: FastifyRequest,
  _reply: FastifyReply,
) => {
  let authentication;
  const session = request?.session as Session;
  const userId = String(session?.get?.('userId') ?? '');

  if (userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (user && !user.disabled) {
      authentication = {
        userId,
        roles: user.roles,
      };
    }
  }

  return {
    authentication,
    prisma,
    runTest,
  };
};

declare module 'mercurius' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface MercuriusContext
    extends UnwrapPromise<ReturnType<typeof buildContext>> {}
}

export const setupGraphQL = (app: FastifyInstance) => {
  const { schema } = loadSchemaFiles(`${BASE_PATH}/schema/**/*.gql`, {
    watchOptions: {
      enabled: config.DEV,
      onChange(schema) {
        app.graphql.replaceSchema(buildSchema(schema.join('\n')));
        app.graphql.defineResolvers(resolvers);

        mercuriusCodegen(app, {
          targetPath: `${BASE_PATH}/generated.ts`,
          operationsGlob: `${BASE_PATH}/operations/*.gql`,
        }).catch(console.error);
      },
    },
  });

  const resolvers = {
    Query,
    Mutation,
  };

  const validationRules = !config.DEV ? [NoIntrospection] : [];

  app.register(mercurius, {
    schema,
    resolvers,
    loaders,
    context: buildContext,
    queryDepth: config.DEV ? 7 : 3,
    validationRules,
    persistedQueryProvider: mercurius.persistedQueryDefaults.automatic(5000),
    schemaTransforms: [
      addRateLimitDirectiveToSchema(
        getGraphQLRateLimiter({
          identifyContext: (ctx: MercuriusContext) => {
            return ctx.authentication?.userId ?? '';
          },
          store: new PrismaRateLimitStore({ prisma }),
          formatError: ({ fieldName }) =>
            `Rate limit exceeded for '${fieldName}'`,
        }),
      ),
    ],
  });

  app.register(mercuriusAuth, {
    async applyPolicy(
      authDirective,
      _parent,
      _args,
      { authentication },
      _info,
    ) {
      const role =
        (authDirective.arguments?.[0]?.value as { value: string })?.value ??
        'USER';

      const roles = authentication ? ['USER', ...authentication.roles] : [];

      return roles.includes(role);
    },
    authDirective: 'auth',
  });

  mercuriusCodegen(app, {
    targetPath: `${BASE_PATH}/generated.ts`,
    operationsGlob: `${BASE_PATH}/operations/*.gql`,
    watchOptions: {
      enabled: config.DEV,
    },
  }).catch(console.error);
};
