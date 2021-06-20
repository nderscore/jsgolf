import type { IResolvers } from 'mercurius';
import type { MutationResolvers } from '../graphql';

import { challenge } from './challenge';
import { solution } from './solution';

export const Mutation: IResolvers['Mutation'] & MutationResolvers = {
  ...challenge,
  ...solution,
};
