// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import Fastify from 'fastify';
import { config } from './constants/config';
import { plugins } from './plugins';

const app = Fastify({
  keepAliveTimeout: 30e3,
});

plugins.forEach(plugin => plugin(app));

app.listen(config.PORT);

console.log(
  `JSGolf server started listening on ${config.PORT} ${
    config.DEV ? ' (DEV MODE ON)' : ''
  }`,
);
