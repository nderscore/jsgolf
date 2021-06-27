import React, { FC } from 'react';

import { Box } from '~/components/Box';
import { Flex } from '~/components/Flex';
import { Header } from '~/components/Header';
import { Footer } from '~/components/Footer';

export const Layout: FC = ({ children }) => {
  return (
    <Flex direction="column" gap="2" css={{ height: '100%' }}>
      <Header />
      <Box css={{ flexGrow: 1 }}>{children}</Box>
      <Footer />
    </Flex>
  );
};
