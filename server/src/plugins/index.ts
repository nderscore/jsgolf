import { setupAuth } from './auth';
import { setupGraphQL } from './graphql';
import { setupAltair } from './altair';

export const plugins = [setupAuth, setupGraphQL, setupAltair];
