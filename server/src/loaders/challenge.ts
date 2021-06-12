import { VoteValue } from '@prisma/client';
import type { MercuriusLoaders } from 'mercurius';

import { toGQLUser } from '../serializers/user';
import { toGQLSolution } from '../serializers/solution';

export const challenge: MercuriusLoaders = {
  Challenge: {
    async author(queries, { prisma }) {
      const batch = queries.map(async ({ obj: { authorId } }) => {
        const result = await prisma.user.findUnique({
          where: { id: authorId },
        });

        if (!result) {
          throw new Error('User not found.');
        }

        return toGQLUser(result);
      });

      return Promise.all(batch);
    },

    async upvotes(queries, { prisma }) {
      const batch = queries.map(async ({ obj: { id } }) => {
        const count = await prisma.vote.count({
          where: {
            challengeId: id,
            value: VoteValue.UP,
          },
        });

        return count;
      });

      return Promise.all(batch);
    },

    async downvotes(queries, { prisma }) {
      const batch = queries.map(async ({ obj: { id } }) => {
        const count = await prisma.vote.count({
          where: {
            challengeId: id,
            value: VoteValue.DOWN,
          },
        });

        return count;
      });

      return Promise.all(batch);
    },

    async solutions(queries, { prisma }) {
      const batch = queries.map(async ({ obj: { id } }) => {
        const results = await prisma.solution.findMany({
          where: { challengeId: id },
          orderBy: [{ size: 'desc' }, { timestamp: 'desc' }],
        });

        return results.map(result => toGQLSolution(result));
      });

      return Promise.all(batch);
    },
  },
};
