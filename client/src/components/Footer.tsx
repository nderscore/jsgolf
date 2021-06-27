import React, { FC } from 'react';

import { Container } from '~/components/Container';
import { Flex } from '~/components/Flex';
import { Box } from '~/components/Box';

export const Footer: FC = () => {
  return (
    <Box
      as="nav"
      css={{
        backgroundColor: '$bgSecondary',
        boxShadow: '0 -1px 0 0 $colors$borderPrimary',
      }}
    >
      <Container css={{ padding: '$1' }}>
        <Flex css={{ justifyContent: 'center' }}>
          © 2021 js.golf, _nderscore
        </Flex>
      </Container>
    </Box>
  );
};
