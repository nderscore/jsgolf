import React, { FC } from 'react';

import { useUser, AuthenticationStatus } from '~/contexts/User';
import { paths } from '~/router/paths';
import { Flex } from '~/components/Flex';
import { Image } from '~/components/Image';
import { Link } from '~/components/Link';
import * as Dropdown from '~/components/Dropdown';
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
        <Dropdown.Root>
          <Dropdown.Trigger>
            <Image
              src={getGitHubAvatar(user.githubId)}
              alt={`User menu, ${user.name}`}
              css={{
                height: '$5',
                width: '$5',
              }}
            />
          </Dropdown.Trigger>
          <Dropdown.Content>
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
                Log out
              </Link>
            </Dropdown.LinkItem>
            <Dropdown.Arrow />
          </Dropdown.Content>
        </Dropdown.Root>
      )}
      {isUnauthenticated && (
        <Link color="contrast" external to={paths.login}>
          Log in
        </Link>
      )}
    </Flex>
  );
};
