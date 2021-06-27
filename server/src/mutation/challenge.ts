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
    { authentication, prisma },
    _info,
  ) {
    testCodeSizeConstraints(setupCode, testCode, solutionCode);

    const authorId = getAuthenticatedUserIdOrFail(authentication);

    const challenge = await prisma.challenge.create({
      data: {
        authorId,
        title,
        description,
        tags: tags || [],
        setupCode,
        testCode,
        draftSolution: solutionCode,
        status: ChallengeStatus.DRAFT,
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
    { authentication, prisma },
    _info,
  ) {
    testCodeSizeConstraints(setupCode, testCode, solutionCode);

    const authorId = getAuthenticatedUserIdOrFail(authentication);

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
        draftSolution: solutionCode,
        status: ChallengeStatus.DRAFT,
      },
    });

    return toGQLChallengeResult(true, challenge);
  },

  async proposeChallenge(
    _root,
    { id: challengeId },
    { authentication, prisma, runTest },
    _info,
  ) {
    const authorId = getAuthenticatedUserIdOrFail(authentication);

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

    const { setupCode, testCode, draftSolution: solutionCode } = challenge;

    let result;
    try {
      result = await runTest(setupCode, testCode, solutionCode as string);
    } catch (e) {
      throw new Error('Unexpected Error');
    }

    if (result !== true) {
      return toGQLResult(result);
    }

    await prisma.challenge.update({
      where: {
        id: challengeId,
      },
      data: {
        status: ChallengeStatus.PROPOSED,
        draftSolution: null,
      },
    });

    return toGQLResult(true);
  },

  async deleteOwnChallenge(
    _root,
    { id: challengeId },
    { authentication, prisma },
    _info,
  ) {
    const authorId = getAuthenticatedUserIdOrFail(authentication);

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

  async publishChallenge(_root, { id: challengeId }, { prisma }, _info) {
    const challenge = await prisma.challenge.findUnique({
      where: { id: challengeId },
    });

    if (!challenge || challenge.status !== ChallengeStatus.PROPOSED) {
      throw new Error('Invalid challenge');
    }

    await prisma.challenge.update({
      where: {
        id: challengeId,
      },
      data: {
        published: new Date(),
        status: ChallengeStatus.PUBLISHED,
        votes: {
          deleteMany: {},
        },
      },
    });

    return true;
  },

  async rejectChallenge(_root, { id: challengeId, reason }, { prisma }, _info) {
    const challenge = await prisma.challenge.findUnique({
      where: { id: challengeId },
    });

    if (!challenge || challenge.status !== ChallengeStatus.PROPOSED) {
      throw new Error('Invalid challenge');
    }

    await prisma.challenge.update({
      where: {
        id: challengeId,
      },
      data: {
        status: ChallengeStatus.REJECTED,
        rejectionReason: reason,
        votes: {
          deleteMany: {},
        },
      },
    });

    return true;
  },
};
