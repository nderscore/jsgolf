import React, { FC } from 'react';

import { useUser, AuthenticationStatus } from '~/contexts/User';
import { paths } from '~/router/paths';
import { Flex } from '~/components/Flex';
import { Image } from '~/components/Image';
import { Link } from '~/components/Link';
import { getGitHubAvatar } from '~/utils/getGitHubAvatar';

export const Navigation: FC = () => {
  const user = useUser();
  const isAuthenticated = user.status === AuthenticationStatus.AUTHENTICATED;
  const isUnauthenticated =
    user.status === AuthenticationStatus.UNAUTHENTICATED;

  return (
    <Flex as="nav" gap="2" css={{ alignItems: 'center' }}>
      <Link color="contrast" to={paths.home}>
        Challenges
      </Link>
      <Link color="contrast" to={paths.proposals}>
        Proposals
      </Link>
      {isAuthenticated && (
        <>
          <Link color="contrast" to={paths.sandbox}>
            Sandbox
          </Link>
          <Link color="contrast" external to={paths.logout}>
            Log out
          </Link>
          <Link color="contrast" to={paths.profile} params={{ id: user.id }}>
            <Image
              src={getGitHubAvatar(user.githubId)}
              alt={user.name}
              css={{
                height: '$5',
                width: '$5',
              }}
            />
          </Link>
        </>
      )}
      {isUnauthenticated && (
        <Link color="contrast" external to={paths.login}>
          Log in
        </Link>
      )}
    </Flex>
  );
};
