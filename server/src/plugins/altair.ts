import type { FastifyInstance } from 'fastify';
import AltairFastify from 'altair-fastify-plugin';
import { config } from '../constants/config';

export const setupAltair = (app: FastifyInstance) => {
  if (config.DEV) {
    app.register(AltairFastify, {
      path: '/altair',
      baseURL: '/altair/',
      endpointURL: '/graphql',
    });
  }
};
