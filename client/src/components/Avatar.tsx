import React, { ComponentProps, forwardRef } from 'react';

import { styled } from '~/css';
import { Image } from '~/components/Image';
import { getGitHubAvatar } from '~/utils/getGitHubAvatar';

const StyledAvatar = styled(Image, {
  borderRadius: '$round',
  width: '$$avatarSize',
  height: '$$avatarSize',

  defaultVariants: {
    size: 'normal',
  },

  variants: {
    size: {
      small: {
        $$avatarSize: '$sizes$2',
      },
      normal: {
        $$avatarSize: '$sizes$4',
      },
      large: {
        $$avatarSize: '$sizes$7',
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
