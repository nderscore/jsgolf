import type { IResolvers } from 'mercurius';
import type { MutationResolvers } from '../graphql';
import { ChallengeStatus, VoteValue } from '@prisma/client';

import { getAuthenticatedUserIdOrFail } from '../constants/utils';

export const vote: IResolvers['Mutation'] & MutationResolvers = {
  async upvote(
    _root,
    { challenge: challengeId },
    { authentication, prisma },
    _info,
  ) {
    const userId = getAuthenticatedUserIdOrFail(authentication);

    const challenge = await prisma.challenge.findUnique({
      where: { id: challengeId },
    });

    if (!challenge || challenge.status !== ChallengeStatus.PROPOSED) {
      throw new Error('Invalid challenge');
    }

    await prisma.vote.upsert({
      where: {
        challengeId_userId: {
          challengeId,
          userId,
        },
      },
      update: {
        value: VoteValue.UP,
        reason: null,
      },
      create: {
        userId,
        challengeId,
        value: VoteValue.UP,
      },
    });

    return true;
  },

  async downvote(
    _root,
    { challenge: challengeId, reason },
    { authentication, prisma },
    _info,
  ) {
    const userId = getAuthenticatedUserIdOrFail(authentication);

    const challenge = await prisma.challenge.findUnique({
      where: { id: challengeId },
    });

    if (!challenge || challenge.status !== ChallengeStatus.PROPOSED) {
      throw new Error('Invalid challenge');
    }

    await prisma.vote.upsert({
      where: {
        challengeId_userId: {
          challengeId,
          userId,
        },
      },
      update: {
        value: VoteValue.DOWN,
        reason,
      },
      create: {
        userId,
        challengeId,
        value: VoteValue.DOWN,
        reason,
      },
    });

    return true;
  },
};
