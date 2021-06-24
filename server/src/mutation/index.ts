import type { IResolvers } from 'mercurius';
import type { MutationResolvers } from '../graphql';

import { challenge } from './challenge';
import { solution } from './solution';
import { vote } from './vote';

export const Mutation: IResolvers['Mutation'] & MutationResolvers = {
  ...challenge,
  ...solution,
  ...vote,
};
