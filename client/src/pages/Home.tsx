import React, { FC } from 'react';

import { Box } from '~/components/Box';
import { Flex } from '~/components/Flex';
import { Image } from '~/components/Image';

const Error: FC = () => {
  return (
    <Flex
      css={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}
    >
      <Flex direction="column" gap="2" css={{ alignItems: 'center' }}>
        <Box>
          <Image src="/android-chrome-192x192.png" alt="" />
        </Box>
        <Box>js.golf</Box>
      </Flex>
    </Flex>
  );
};

export default Error;
