import React, { FC } from 'react';
import { createClient, Provider } from 'urql';

import { config } from '~/constants/config';

const client = createClient({
  url: config.GRAPHQL_PATH,
  suspense: true,
});

export const GraphQLProvider: FC = ({ children }) => {
  return <Provider value={client}>{children}</Provider>;
};
