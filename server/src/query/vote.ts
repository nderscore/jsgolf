import type { IResolvers } from 'mercurius';
import type { QueryResolvers } from '../graphql';

import { toGQLVote } from '../serializers/vote';

export const vote: IResolvers['Query'] & QueryResolvers = {
  async getVotes(_root, { id: challengeId }, { prisma }, _info) {
    const result = await prisma.vote.findMany({
      where: { challengeId },
    });

    return result.map(toGQLVote);
  },
};
