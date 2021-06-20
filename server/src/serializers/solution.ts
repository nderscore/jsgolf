import { Solution } from '@prisma/client';

import { toGQLResult } from './result';

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

export const toGQLSolutionResult = (
  result: true | string,
  solution?: Solution,
  options: SolutionSerializerOptions = {},
) => {
  return {
    solution: solution && toGQLSolution(solution, options),
    result: toGQLResult(result),
  };
};
