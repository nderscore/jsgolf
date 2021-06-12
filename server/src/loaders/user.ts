import type { MercuriusLoaders } from 'mercurius';
import { ChallengeStatus } from '@prisma/client';

import { toGQLChallenge } from '../serializers/challenge';
import { toGQLSolution } from '../serializers/solution';

export const user: MercuriusLoaders = {
  User: {
    async challenges(queries, { prisma }) {
      const batch = queries.map(async ({ obj: { id } }) => {
        const results = await prisma.challenge.findMany({
          where: {
            authorId: id,
            status: ChallengeStatus.PUBLISHED,
          },
          orderBy: { published: 'desc' },
        });

        return results.map(result => toGQLChallenge(result));
      });

      return Promise.all(batch);
    },

    async solutions(queries, { prisma }) {
      const batch = queries.map(async ({ obj: { id } }) => {
        const results = await prisma.solution.findMany({
          where: { authorId: id },
          orderBy: { timestamp: 'desc' },
        });

        return results.map(result => toGQLSolution(result));
      });

      return Promise.all(batch);
    },
  },
};
