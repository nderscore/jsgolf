import { VoteValue } from '@prisma/client';
import type { MercuriusLoaders } from 'mercurius';

import { toGQLUser } from '../serializers/user';
import { toGQLSolution } from '../serializers/solution';
import { ChallengeStatus } from '../graphql';

export const challenge: MercuriusLoaders = {
  Challenge: {
    async author(queries, { prisma }) {
      const batch = queries.map(async ({ obj: { id } }) => {
        const result = await prisma.challenge
          .findUnique({
            where: { id },
          })
          .author();

        if (!result) {
          throw new Error('User not found.');
        }

        return toGQLUser(result);
      });

      return Promise.all(batch);
    },

    async upvotes(queries, { prisma }) {
      const batch = queries.map(async ({ obj }) => {
        if (obj.status !== ChallengeStatus.PROPOSED) {
          return null;
        }

        const count = await prisma.vote.count({
          where: {
            challengeId: obj.id,
            value: VoteValue.UP,
          },
        });

        return count;
      });

      return Promise.all(batch);
    },

    async downvotes(queries, { prisma }) {
      const batch = queries.map(async ({ obj }) => {
        if (obj.status !== ChallengeStatus.PROPOSED) {
          return null;
        }

        const count = await prisma.vote.count({
          where: {
            challengeId: obj.id,
            value: VoteValue.DOWN,
          },
        });

        return count;
      });

      return Promise.all(batch);
    },

    async solutions(queries, { auth, prisma }) {
      const batch = queries.map(async ({ obj: { id } }) => {
        const results = await prisma.challenge
          .findUnique({
            where: { id },
          })
          .solutions({
            orderBy: [{ size: 'desc' }, { timestamp: 'desc' }],
          });

        return results.map(result => toGQLSolution(result, auth));
      });

      return Promise.all(batch);
    },
  },
};
