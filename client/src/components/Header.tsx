import React, { FC } from 'react';

import { Container } from '~/components/Container';
import { Flex } from '~/components/Flex';
import { Box } from '~/components/Box';
import { Image } from '~/components/Image';
import { Link } from '~/components/Link';
import { Navigation } from '~/components/Navigation';
import { paths } from '~/router/paths';
import logo from '~public/images/logo.svg';

export const Header: FC = () => {
  return (
    <Box
      as="header"
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
            <Link color="contrast" to={paths.home}>
              <Image
                src={logo}
                alt="js.golf"
                css={{
                  height: '$5',
                  width: '$5',
                }}
              />
            </Link>
          </Box>
          <Navigation />
        </Flex>
      </Container>
    </Box>
  );
};
