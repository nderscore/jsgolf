import React, { FC } from 'react';

import { Container } from '~/components/Container';
import { Flex } from '~/components/Flex';
import { Box } from '~/components/Box';
import { Image } from '~/components/Image';
import { Link } from '~/components/Link';
import { UserNavigation } from '~/components/UserNavigation';
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
      <Container css={{ padding: '$2', '@xs': { padding: '$1 $2' } }}>
        <Flex
          as="nav"
          gap={{ '@initial': '2', '@xs': '1' }}
          css={{ alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Flex
            gap={{ '@initial': '2', '@xs': '1' }}
            css={{
              alignItems: 'center',
              '@xs': { flexWrap: 'wrap' },
            }}
          >
            <Link
              color="contrast"
              to={paths.home}
              css={{ display: 'inline-flex', alignItems: 'center' }}
            >
              <Image
                src={logo}
                alt="js.golf"
                css={{
                  mr: '$2',
                  height: '$5',
                  width: '$5',
                  '@xs': {
                    mr: '$1',
                  },
                }}
              />
              Challenges
            </Link>
            <Link color="contrast" to={paths.proposals}>
              Proposals
            </Link>
            <Link color="contrast" to={paths.about}>
              About
            </Link>
          </Flex>
          <UserNavigation />
        </Flex>
      </Container>
    </Box>
  );
};
