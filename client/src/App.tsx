import React from 'react';

import { globalStyles } from '~/css/globalStyles';
import { Box } from '~/components/Box';
import { Flex } from '~/components/Flex';
import { Image } from '~/components/Image';

export const App = () => {
  globalStyles();

  return (
    <Flex
      css={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}
    >
      <Flex direction="column" gap="normal" css={{ alignItems: 'center' }}>
        <Box>
          <Image src="/android-chrome-192x192.png" alt="" />
        </Box>
        <Box>js.golf</Box>
      </Flex>
    </Flex>
  );
};
