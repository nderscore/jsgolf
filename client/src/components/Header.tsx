import React, { FC } from 'react';

import { Container } from '~/components/Container';
import { Flex } from '~/components/Flex';
import { Box } from '~/components/Box';
import { Image } from '~/components/Image';

import logo from '~public/images/logo.svg';

export const Header: FC = () => {
  return (
    <Box
      as="nav"
      css={{
        backgroundColor: '$bgContrast',
        color: '$textContrast',
        position: 'sticky',
        top: '0',
        boxShadow: '0 2px 0 0 $colors$borderContrast',
      }}
    >
      <Container css={{ padding: '$2', '@xs': { padding: '$1' } }}>
        <Flex
          gap="2"
          css={{ alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Box>
            <Image
              src={logo}
              alt="js.golf"
              css={{
                height: '$5',
                width: '$5',
              }}
            />
          </Box>
          <Box>Navigation Here</Box>
        </Flex>
      </Container>
    </Box>
  );
};
