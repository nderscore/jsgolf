import React, { FC } from 'react';

import { useUser, AuthenticationStatus } from '~/contexts/User';
import { paths } from '~/router/paths';
import { Box } from '~/components/Box';
import { Image } from '~/components/Image';
import { Link } from '~/components/Link';
import * as Dropdown from '~/components/Dropdown';
import { getGitHubAvatar } from '~/utils/getGitHubAvatar';

export const UserNavigation: FC = () => {
  const user = useUser();
  const isAuthenticated = user.status === AuthenticationStatus.AUTHENTICATED;
  const isUnauthenticated =
    user.status === AuthenticationStatus.UNAUTHENTICATED;

  return (
    <Box css={{ flexShrink: 0 }}>
      {isAuthenticated && (
        <Dropdown.Root>
          <Dropdown.Trigger aria-label="User Menu">
            <Image
              src={getGitHubAvatar(user.githubId)}
              alt={`Avatar, ${user.name}`}
              css={{
                height: '$5',
                width: '$5',
              }}
            />
          </Dropdown.Trigger>
          <Dropdown.Content sideOffset={8}>
            <Dropdown.LinkItem>
              <Link to={paths.profile} params={{ id: user.id }}>
                My Profile
              </Link>
            </Dropdown.LinkItem>
            <Dropdown.LinkItem>
              <Link to={paths.sandbox}>My Sandbox</Link>
            </Dropdown.LinkItem>
            <Dropdown.Separator />
            <Dropdown.LinkItem>
              <Link external to={paths.logout}>
                Log Out
              </Link>
            </Dropdown.LinkItem>
          </Dropdown.Content>
        </Dropdown.Root>
      )}
      {isUnauthenticated && (
        <Link color="contrast" external to={paths.login}>
          Log In
        </Link>
      )}
    </Box>
  );
};
