import type { MercuriusLoaders } from 'mercurius';

import { toGQLUser } from '../serializers/user';

export const vote: MercuriusLoaders = {
  Vote: {
    async user(queries, { prisma }) {
      const batch = queries.map(async ({ obj: { userId } }) => {
        const result = await prisma.user.findUnique({
          where: { id: userId },
        });

        if (!result) {
          throw new Error('User not found.');
        }

        return toGQLUser(result);
      });

      return Promise.all(batch);
    },
  },
};
