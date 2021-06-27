import type { IResolvers } from 'mercurius';
import type { QueryResolvers } from '../graphql';
import { toGQLUser } from '../serializers/user';

import { getAuthenticatedUserIdOrFail } from '../constants/utils';

export const user: IResolvers['Query'] & QueryResolvers = {
  async getUser(_root, { id }, { prisma }, _info) {
    const result = await prisma.user.findUnique({
      where: { id },
    });

    if (!result || result.disabled) {
      throw new Error('User not found');
    }

    return toGQLUser(result);
  },

  async getOwnUser(_root, _args, { authentication, prisma }, _info) {
    const userId = getAuthenticatedUserIdOrFail(authentication);

    const result = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!result || result.disabled) {
      throw new Error('User not found');
    }

    return toGQLUser(result);
  },
};
