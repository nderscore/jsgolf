import { Challenge } from '@prisma/client';

import { ChallengeStatus as GQLChallengeStatus } from '../graphql';
import { toGQLResult } from './result';

export const toGQLChallenge = (challenge: Challenge) => {
  return {
    id: challenge.id,
    updated: challenge.updated,
    published: challenge.published,
    title: challenge.title,
    description: challenge.description,
    authorId: challenge.authorId,
    status: GQLChallengeStatus[challenge.status],
    setupCode: challenge.setupCode,
    testCode: challenge.testCode,
    tags: challenge.tags,
    rejectionReason: challenge.rejectionReason,
  };
};

export const toGQLChallengeResult = (
  result: true | string,
  challenge?: Challenge,
) => {
  return {
    challenge: challenge && toGQLChallenge(challenge),
    result: toGQLResult(result),
  };
};
