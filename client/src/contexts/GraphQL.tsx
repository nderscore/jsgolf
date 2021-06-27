import React, { FC } from 'react';
import {
  createClient,
  Provider,
  dedupExchange,
  fetchExchange,
  cacheExchange,
} from 'urql';
import { persistedFetchExchange } from '@urql/exchange-persisted-fetch';
import { config } from '~/constants/config';

const client = createClient({
  url: config.GRAPHQL_PATH,
  suspense: true,
  exchanges: [
    dedupExchange,
    cacheExchange,
    persistedFetchExchange({
      preferGetForPersistedQueries: true,
    }),
    fetchExchange,
  ],
});

export const GraphQLProvider: FC = ({ children }) => {
  return <Provider value={client}>{children}</Provider>;
};
