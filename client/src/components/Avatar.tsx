import React, { ComponentProps, forwardRef } from 'react';

import { styled } from '~/css';
import { Image } from '~/components/Image';
import { getGitHubAvatar } from '~/utils/getGitHubAvatar';

const StyledAvatar = styled(Image, {
  borderRadius: '$round',
  width: '$$avatarSize',
  height: '$$avatarSize',

  defaultVariants: {
    size: '5',
  },

  variants: {
    size: {
      1: {
        $$avatarSize: '$sizes$1',
      },
      2: {
        $$avatarSize: '$sizes$2',
      },
      3: {
        $$avatarSize: '$sizes$3',
      },
      4: {
        $$avatarSize: '$sizes$4',
      },
      5: {
        $$avatarSize: '$sizes$5',
      },
      6: {
        $$avatarSize: '$sizes$6',
      },
      7: {
        $$avatarSize: '$sizes$7',
      },
      8: {
        $$avatarSize: '$sizes$8',
      },
      9: {
        $$avatarSize: '$sizes$9',
      },
    },
  },
});

interface UserInfo {
  name: string;
  githubId: number;
}

type AvatarProps = ComponentProps<typeof StyledAvatar> & {
  user: UserInfo;
};

export const Avatar = forwardRef<HTMLImageElement, AvatarProps>(function Avatar(
  props,
  ref,
) {
  const {
    user: { name, githubId },
    ...restProps
  } = props;

  return (
    <StyledAvatar
      {...restProps}
      ref={ref}
      alt={`Avatar, ${name}`}
      src={getGitHubAvatar(githubId)}
    />
  );
});
