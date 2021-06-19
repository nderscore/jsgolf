import type { IResolvers } from 'mercurius';
import type { QueryResolvers } from '../graphql';
import { toGQLUser } from '../serializers/user';

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

  async getOwnUser(_root, _args, { auth, prisma }, _info) {
    if (!auth) {
      throw new Error('Not logged in.');
    }

    const result = await prisma.user.findUnique({
      where: { id: auth.userId },
    });

    if (!result || result.disabled) {
      throw new Error('User not found');
    }

    return toGQLUser(result);
  },
};
