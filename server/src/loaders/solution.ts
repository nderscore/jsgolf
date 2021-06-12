import { ChallengeStatus } from '@prisma/client';
import type { MercuriusLoaders } from 'mercurius';

import { toGQLChallenge } from '../serializers/challenge';
import { toGQLUser } from '../serializers/user';

export const solution: MercuriusLoaders = {
  Solution: {
    async author(queries, { prisma }) {
      const batch = queries.map(async ({ obj: { authorId } }) => {
        const result = await prisma.user.findUnique({
          where: { id: authorId },
        });

        if (!result || result.disabled === true) {
          throw new Error('User not found');
        }

        return toGQLUser(result);
      });

      return Promise.all(batch);
    },

    async challenge(queries, { prisma }) {
      const batch = queries.map(async ({ obj: { challengeId } }) => {
        const result = await prisma.challenge.findUnique({
          where: { id: challengeId },
        });

        if (!result || result.status === ChallengeStatus.DELETED) {
          throw new Error('Challenge not found');
        }

        return toGQLChallenge(result);
      });

      return Promise.all(batch);
    },
  },
};
