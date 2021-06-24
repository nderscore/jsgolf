import type { MercuriusLoaders } from 'mercurius';

import { user } from './user';
import { challenge } from './challenge';
import { solution } from './solution';
import { vote } from './vote';

export const loaders: MercuriusLoaders = {
  ...user,
  ...challenge,
  ...solution,
  ...vote,
};
