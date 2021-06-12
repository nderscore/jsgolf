import { setupGraphQL } from './graphql';
import { setupAltair } from './altair';

export const plugins = [setupGraphQL, setupAltair];
