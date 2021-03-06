import type { IResolvers } from 'mercurius';
import { ChallengeStatus } from '@prisma/client';
import type { QueryResolvers } from '../graphql';
import { toGQLChallenge } from '../serializers/challenge';

import { getAuthenticatedUserIdOrFail } from '../constants/utils';

export const challenge: IResolvers['Query'] & QueryResolvers = {
  async getChallenge(_root, { id }, { prisma }, _info) {
    const result = await prisma.challenge.findUnique({
      where: { id },
    });

    if (!result || result.status === ChallengeStatus.DELETED) {
      throw new Error('Challenge not found');
    }

    return toGQLChallenge(result);
  },

  async getChallenges(_root, _args, { prisma }, _info) {
    const results = await prisma.challenge.findMany({
      where: { status: ChallengeStatus.PUBLISHED },
      orderBy: { published: 'desc' },
    });

    return results.map(result => toGQLChallenge(result));
  },

  async getProposedChallenges(_root, _args, { prisma }, _info) {
    const results = await prisma.challenge.findMany({
      where: { status: ChallengeStatus.PROPOSED },
      orderBy: { updated: 'desc' },
    });

    return results.map(result => toGQLChallenge(result));
  },

  async getOwnDraftChallenges(_root, _args, { authentication, prisma }, _info) {
    const userId = getAuthenticatedUserIdOrFail(authentication);

    const results = await prisma.challenge.findMany({
      where: { authorId: userId, status: ChallengeStatus.DRAFT },
      orderBy: { updated: 'desc' },
    });

    return results.map(result => toGQLChallenge(result));
  },
};
