import React, { FC } from 'react';

import { useUser, AuthenticationStatus } from '~/contexts/User';
import { paths } from '~/router/paths';
import { Box } from '~/components/Box';
import { Link } from '~/components/Link';
import * as Dropdown from '~/components/Dropdown';
import { Avatar } from '~/components/Avatar';

export const UserNavigation: FC = () => {
  const user = useUser();
  const isAuthenticated = user.status === AuthenticationStatus.AUTHENTICATED;
  const isUnauthenticated =
    user.status === AuthenticationStatus.UNAUTHENTICATED;

  return (
    <Box css={{ flexShrink: 0 }}>
      {isAuthenticated && (
        <Dropdown.Root>
          <Dropdown.ImageTrigger aria-label="User Menu">
            <Avatar user={user} />
          </Dropdown.ImageTrigger>
          <Dropdown.Content sideOffset={8}>
            <Dropdown.LinkItem>
              <Link to={paths.profile} params={{ id: user.id }}>
                My Profile
              </Link>
            </Dropdown.LinkItem>
            <Dropdown.LinkItem>
              <Link to={paths.sandbox}>Sandbox</Link>
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
