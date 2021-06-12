import { Solution } from '@prisma/client';

type SolutionSerializerOptions = {
  userId?: string;
};

export const toGQLSolution = (
  solution: Solution,
  { userId }: SolutionSerializerOptions = {},
) => {
  const hideCode = userId === solution.authorId;

  return {
    authorId: solution.authorId,
    timestamp: solution.timestamp,
    code: hideCode ? solution.code : null,
    size: solution.size,
    challengeId: solution.challengeId,
  };
};
