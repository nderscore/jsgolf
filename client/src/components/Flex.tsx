import type { ComponentPropsWithRef } from 'react';

import { CSS, VariantProps, styled } from '~/css';

export type FlexVariants = VariantProps<typeof Flex>;

export type FlexProps = ComponentPropsWithRef<'div'> &
  FlexVariants & {
    css?: CSS;
  };

const _notFirstChild = '& > *:not(:first-child)';

export const Flex = styled('div', {
  display: 'flex',

  defaultVariants: {
    direction: 'row',
    gap: '0',
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
      0: {
        [_notFirstChild]: {
          $$flexGap: '0',
        },
      },
      1: {
        [_notFirstChild]: {
          $$flexGap: '$space$1',
        },
      },
      2: {
        [_notFirstChild]: {
          $$flexGap: '$space$2',
        },
      },
      3: {
        [_notFirstChild]: {
          $$flexGap: '$space$3',
        },
      },
      4: {
        [_notFirstChild]: {
          $$flexGap: '$space$4',
        },
      },
    },
  },
});
