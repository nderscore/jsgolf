import type { IResolvers } from 'mercurius';
import type { MutationResolvers } from '../graphql';

import { challenge } from './challenge';
import { solution } from './solution';
import { voting } from './voting';

export const Mutation: IResolvers['Mutation'] & MutationResolvers = {
  ...challenge,
  ...solution,
  ...voting,
};
