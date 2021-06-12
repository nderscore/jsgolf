import type { User } from '@prisma/client';

export const toGQLUser = (user: User) => {
  return {
    id: user.id,
    githubId: user.githubId,
    name: user.username,
  };
};
