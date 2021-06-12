import type { IResolvers } from 'mercurius';
import type { MutationResolvers } from '../graphql';

import { challenge } from './challenge';

export const Mutation: IResolvers['Mutation'] & MutationResolvers = {
  ...challenge,
};
