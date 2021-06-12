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
};
