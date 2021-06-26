import React, { FC } from 'react';
import { useQuery } from 'urql';

import { Box } from '~/components/Box';
import { Flex } from '~/components/Flex';
import { Image } from '~/components/Image';

import { getChallengesDocument } from '@jsgolf/server/src/graphql';

const Home: FC = () => {
  const [{ data }] = useQuery({ query: getChallengesDocument });

  const challenges = data?.getChallenges;

  return (
    <Flex
      css={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}
    >
      <Flex direction="column" gap="2" css={{ alignItems: 'center' }}>
        <Box>
          <Image src="/android-chrome-192x192.png" alt="" />
        </Box>
        <Box>
          {challenges?.map(({ id, title, author: { name } }) => {
            return (
              <Flex gap="2" key={id}>
                <Box>{title}</Box>
                <Box>{name}</Box>
              </Flex>
            );
          })}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Home;
