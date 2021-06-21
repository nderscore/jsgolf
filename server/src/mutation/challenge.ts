import type { IResolvers } from 'mercurius';
import type { MutationResolvers } from '../graphql';
import { ChallengeStatus } from '@prisma/client';

import { testCodeSizeConstraints } from '../constants/utils';
import { toGQLResult } from '../serializers/result';
import { toGQLChallengeResult } from '../serializers/challenge';

export const challenge: IResolvers['Mutation'] & MutationResolvers = {
  async testChallenge(
    _root,
    { setupCode, testCode, solutionCode },
    { runTest },
    _info,
  ) {
    testCodeSizeConstraints(setupCode, testCode, solutionCode);

    try {
      const result = await runTest(setupCode, testCode, solutionCode);
      return toGQLResult(result);
    } catch (e) {
      return toGQLResult('Unexpected Error');
    }
  },

  async createChallenge(
    _root,
    { title, description, tags, setupCode, testCode, solutionCode },
    { auth, prisma, runTest },
    _info,
  ) {
    testCodeSizeConstraints(setupCode, testCode, solutionCode);

    let result;
    try {
      result = await runTest(setupCode, testCode, solutionCode);
    } catch (e) {
      throw new Error('Unexpected Error');
    }

    if (result !== true) {
      return toGQLChallengeResult(result);
    }

    const authorId = auth?.userId;

    if (!authorId) {
      throw new Error('Missing auth.');
    }

    const challenge = await prisma.challenge.create({
      data: {
        authorId,
        title,
        description,
        tags: tags || [],
        setupCode,
        testCode,
        status: ChallengeStatus.DRAFT,
        solutions: {
          create: {
            authorId,
            code: solutionCode,
            size: 0,
            timestamp: new Date(),
          },
        },
      },
    });

    return toGQLChallengeResult(result, challenge);
  },
};
