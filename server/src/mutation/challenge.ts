import type { IResolvers } from 'mercurius';
import type { MutationResolvers } from '../graphql';
import { ChallengeStatus } from '@prisma/client';

import {
  testCodeSizeConstraints,
  getAuthenticatedUserIdOrFail,
} from '../constants/utils';
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
    { auth, prisma },
    _info,
  ) {
    testCodeSizeConstraints(setupCode, testCode, solutionCode);

    const authorId = getAuthenticatedUserIdOrFail(auth);

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

    return toGQLChallengeResult(true, challenge);
  },

  async editDraftChallenge(
    _root,
    {
      id: challengeId,
      title,
      description,
      tags,
      setupCode,
      testCode,
      solutionCode,
    },
    { auth, prisma },
    _info,
  ) {
    testCodeSizeConstraints(setupCode, testCode, solutionCode);

    const authorId = getAuthenticatedUserIdOrFail(auth);

    const existingChallenge = await prisma.challenge.findUnique({
      where: {
        id: challengeId,
      },
    });

    if (
      !existingChallenge ||
      existingChallenge.status !== ChallengeStatus.DRAFT ||
      existingChallenge.authorId !== authorId
    ) {
      throw new Error('Invalid challenge');
    }

    const challenge = await prisma.challenge.update({
      where: { id: challengeId },
      data: {
        title,
        description,
        tags: tags || [],
        setupCode,
        testCode,
        status: ChallengeStatus.DRAFT,
        solutions: {
          update: {
            where: {
              challengeId_authorId: {
                challengeId,
                authorId,
              },
            },
            data: {
              code: solutionCode,
              size: 0,
              timestamp: new Date(),
            },
          },
        },
      },
    });

    return toGQLChallengeResult(true, challenge);
  },

  async proposeChallenge(
    _root,
    { id: challengeId },
    { auth, prisma, runTest },
    _info,
  ) {
    const authorId = getAuthenticatedUserIdOrFail(auth);

    const challenge = await prisma.challenge.findUnique({
      where: {
        id: challengeId,
      },
    });

    if (
      !challenge ||
      challenge.status !== ChallengeStatus.DRAFT ||
      challenge.authorId !== authorId
    ) {
      throw new Error('Invalid challenge');
    }

    const solution = await prisma.solution.findUnique({
      where: {
        challengeId_authorId: {
          challengeId,
          authorId,
        },
      },
    });

    if (!solution) {
      throw new Error('Unexpected error.');
    }

    const { setupCode, testCode } = challenge;
    const { code: solutionCode } = solution;

    let result;
    try {
      result = await runTest(setupCode, testCode, solutionCode);
    } catch (e) {
      throw new Error('Unexpected Error');
    }

    if (result !== true) {
      return toGQLResult(result);
    }

    await prisma.solution.delete({
      where: {
        challengeId_authorId: {
          challengeId,
          authorId,
        },
      },
    });

    await prisma.challenge.update({
      where: {
        id: challengeId,
      },
      data: {
        status: ChallengeStatus.PROPOSED,
      },
    });

    return toGQLResult(true);
  },

  async deleteOwnChallenge(
    _root,
    { id: challengeId },
    { auth, prisma },
    _info,
  ) {
    const authorId = getAuthenticatedUserIdOrFail(auth);

    const challenge = await prisma.challenge.findUnique({
      where: {
        id: challengeId,
      },
    });

    if (
      !challenge ||
      !(
        challenge.status === ChallengeStatus.DRAFT ||
        challenge.status === ChallengeStatus.REJECTED
      ) ||
      challenge.authorId !== authorId
    ) {
      throw new Error('Invalid challenge');
    }

    await prisma.challenge.update({
      where: {
        id: challengeId,
      },
      data: {
        status: ChallengeStatus.DELETED,
      },
    });

    return true;
  },
};
