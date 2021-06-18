import { FastifyReply, FastifyRequest, FastifyInstance } from 'fastify';
import mercurius from 'mercurius';
import mercuriusCodegen, { loadSchemaFiles } from 'mercurius-codegen';
import { buildSchema } from 'graphql';
import { config } from '../constants/config';
import path from 'path';
import { prisma } from '../prisma';
import { Query } from '../query';
import { Mutation } from '../mutation';
import { loaders } from '../loaders';

import { runTest } from '../testRunnerClient';

const BASE_PATH = path.resolve(__dirname, '../graphql');

const buildContext = async (request: FastifyRequest, _reply: FastifyReply) => {
  return {
    authorization: request.headers.authorization,
    prisma,
    runTest,
  };
};

type PromiseType<T> = T extends PromiseLike<infer U> ? U : T;

declare module 'mercurius' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface MercuriusContext
    extends PromiseType<ReturnType<typeof buildContext>> {}
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

  app.register(mercurius, {
    schema,
    resolvers,
    loaders,
    context: buildContext,
  });

  mercuriusCodegen(app, {
    targetPath: `${BASE_PATH}/generated.ts`,
    operationsGlob: `${BASE_PATH}/operations/*.gql`,
    watchOptions: {
      enabled: config.DEV,
    },
  }).catch(console.error);
};
