import { Challenge } from '@prisma/client';
import { ChallengeStatus as GQLChallengeStatus } from '../graphql';

export const toGQLChallenge = (challenge: Challenge) => {
  return {
    id: challenge.id,
    created: challenge.created,
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
