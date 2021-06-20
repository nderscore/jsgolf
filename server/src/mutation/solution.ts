import type { IResolvers } from 'mercurius';
import type { MutationResolvers } from '../graphql';
import { ChallengeStatus } from '@prisma/client';

import { getCodeSize, testCodeSizeConstraints } from '../constants/utils';
import { toGQLResult } from '../serializers/result';
import { toGQLSolutionResult } from '../serializers/solution';

export const solution: IResolvers['Mutation'] & MutationResolvers = {
  async testSolution(
    _root,
    { challenge: challengeId, solutionCode },
    { prisma, runTest },
    _info,
  ) {
    testCodeSizeConstraints(solutionCode);

    const challenge = await prisma.challenge.findUnique({
      where: { id: challengeId },
    });

    if (
      !challenge ||
      challenge.status === ChallengeStatus.DELETED ||
      challenge.status === ChallengeStatus.REJECTED
    ) {
      throw new Error('Invalid Challenge');
    }

    const { setupCode, testCode } = challenge;

    try {
      const result = await runTest(setupCode, testCode, solutionCode);
      return toGQLResult(result);
    } catch (e) {
      return toGQLResult('Unexpected Error');
    }
  },

  async createSolution(
    _root,
    { challenge: challengeId, solutionCode },
    { auth, prisma, runTest },
    _info,
  ) {
    testCodeSizeConstraints(solutionCode);

    const challenge = await prisma.challenge.findUnique({
      where: { id: challengeId },
    });

    if (!challenge || challenge.status !== ChallengeStatus.PUBLISHED) {
      throw new Error('Invalid Challenge');
    }

    const { setupCode, testCode } = challenge;

    try {
      const result = await runTest(setupCode, testCode, solutionCode);
      if (result !== true) {
        return toGQLSolutionResult(result);
      }
    } catch (e) {
      return toGQLSolutionResult('Unexpected error');
    }

    const authorId = auth?.userId;

    if (!authorId) {
      throw new Error('Missing auth.');
    }

    const size = getCodeSize(solutionCode);
    const timestamp = new Date();

    const existingSolution = await prisma.solution.findUnique({
      where: {
        challengeId_authorId: {
          challengeId,
          authorId,
        },
      },
    });

    if (existingSolution && existingSolution.size <= size) {
      return toGQLSolutionResult(
        `Solution is valid, but not smaller than your current solution's size: ${existingSolution.size}`,
      );
    }

    const solution = await prisma.solution.upsert({
      where: {
        challengeId_authorId: {
          challengeId,
          authorId,
        },
      },
      update: {
        size,
        timestamp,
        code: solutionCode,
      },
      create: {
        authorId,
        challengeId,
        size,
        timestamp,
        code: solutionCode,
      },
    });

    return toGQLSolutionResult(true, solution, { userId: authorId });
  },
};
