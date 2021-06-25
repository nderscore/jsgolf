import type { ComponentPropsWithRef } from 'react';

import { CSS, StitchesVariants, styled } from '~/css';

export type FlexVariants = StitchesVariants<typeof Flex>;

export type FlexProps = ComponentPropsWithRef<'div'> &
  FlexVariants & {
    css?: CSS;
  };

const _notFirstChild = '& > *:not(:first-child)';

export const Flex = styled('div', {
  display: 'flex',

  defaultVariants: {
    direction: 'row',
    gap: 'none',
  },

  variants: {
    direction: {
      column: {
        [_notFirstChild]: {
          marginInlineStart: '0',
          marginTop: '$$flexGap',
        },
        flexDirection: 'column',
      },
      row: {
        [_notFirstChild]: {
          marginInlineStart: '$$flexGap',
          marginTop: '0',
        },
        flexDirection: 'row',
      },
    },

    gap: {
      none: {
        [_notFirstChild]: {
          $$flexGap: '0',
        },
      },
      thin: {
        [_notFirstChild]: {
          $$flexGap: '$space$2',
        },
      },
      normal: {
        [_notFirstChild]: {
          $$flexGap: '$space$3',
        },
      },
      thick: {
        [_notFirstChild]: {
          $$flexGap: '$space$4',
        },
      },
    },
  },
});
