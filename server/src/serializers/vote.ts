import type { Vote } from '@prisma/client';
import { VoteValue as GQLVoteValue } from '../graphql';

export const toGQLVote = (vote: Vote) => {
  return {
    userId: vote.userId,
    value: GQLVoteValue[vote.value],
    reason: vote.reason,
  };
};
