import type { IResolvers } from 'mercurius';
import { MutationResolvers } from '../graphql';
import { Role } from '@prisma/client';

import { getAuthenticatedUserIdOrFail } from '../constants/utils';

export const user: IResolvers['Mutation'] & MutationResolvers = {
  async becomeCreator(
    _root,
    { answerCode },
    { authentication, prisma },
    _info,
  ) {
    const id = getAuthenticatedUserIdOrFail(authentication);
    const roles = authentication?.roles ?? [];

    if (roles.includes(Role.CREATOR)) {
      throw new Error('User is already a creator.');
    }

    if (answerCode !== '!0') {
      return false;
    }

    await prisma.user.update({
      where: { id },
      data: {
        roles: [...roles, Role.CREATOR],
      },
    });

    return true;
  },
};
