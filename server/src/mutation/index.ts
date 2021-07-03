import type { IResolvers } from 'mercurius';
import type { MutationResolvers } from '../graphql';

import { challenge } from './challenge';
import { solution } from './solution';
import { vote } from './vote';
import { user } from './user';

export const Mutation: IResolvers['Mutation'] & MutationResolvers = {
  ...challenge,
  ...solution,
  ...vote,
  ...user,
};
