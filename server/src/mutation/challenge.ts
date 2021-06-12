import type { IResolvers } from 'mercurius';
import type { MutationResolvers } from '../graphql';

import { toGQLResult } from '../serializers/result';

export const challenge: IResolvers['Mutation'] & MutationResolvers = {
  async testChallenge(
    _root,
    { setupCode, testCode, solution },
    { runTest },
    _info,
  ) {
    try {
      const result = await runTest(setupCode, testCode, solution);
      return toGQLResult(result);
    } catch (e) {
      return toGQLResult('Unexpected Error');
    }
  },
};
