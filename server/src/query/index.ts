import type { IResolvers } from 'mercurius';
import type { QueryResolvers } from '../graphql';

import { user } from './user';
import { challenge } from './challenge';

export const Query: IResolvers['Query'] & QueryResolvers = {
  ...user,
  ...challenge,
};
