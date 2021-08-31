import React, { ComponentProps, ReactElement, FC } from 'react';

import { StyledSvg as Icon } from '~/components/Icon';
import { Text } from '~/components/Text';
import { styled } from '~/css';

const _disabled = '&:disabled';
const _hoverNotDisabled = '&:not(:disabled):hover';

// selectors for nested Icon components
const _icon = `& > ${Icon}`;
const _iconBeforeChild = `${_icon}:first-child:not(:last-child)`;
const _iconAfterChild = `${_icon}:last-child:not(:first-child)`;
const _iconOnlyChild = `${_icon}:last-child:first-child`;

export const StyledButton = styled('button', {
  alignItems: 'center',
  display: 'inline-flex',
  justifyContent: 'center',
  border: 'none',

  [_disabled]: {
    backgroundColor: '$disabled',
    color: '$textPrimary',
    fontStyle: 'italic',
  },

  [_hoverNotDisabled]: {
    cursor: 'pointer',
  },

  [_iconAfterChild]: {
    ml: '$$iconMargin',
    mr: '-$$iconMargin',
  },
  [_iconBeforeChild]: {
    ml: '-$$iconMargin',
    mr: '$$iconMargin',
  },
  [_iconOnlyChild]: {
    ml: '-$$iconMargin',
    mr: '-$$iconMargin',
  },

  defaultVariants: {
    appearance: 'normal',
    intent: 'neutral',
    size: 'normal',
  },

  variants: {
    appearance: {
      clear: {
        [_hoverNotDisabled]: {
          color: '$$btnTint',
        },
        backgroundColor: 'transparent',
        color: '$$btnColor',
      },
      normal: {
        [_hoverNotDisabled]: {
          backgroundColor: '$$btnShade',
          borderColor: '$$btnColor',
          textShadow: '0 1px 3px 0 $$btnTint',
        },
        backgroundColor: '$$btnColor',
        boxShadow: '0 0 0 1px $$btnShade',
        color: '$textContrast',
      },
    },
    intent: {
      action: {
        $$btnColor: '$colors$action',
        $$btnShade: '$colors$actionShade',
        $$btnTint: '$colors$actionTint',
      },
      danger: {
        $$btnColor: '$colors$danger',
        $$btnShade: '$colors$dangerShade',
        $$btnTint: '$colors$dangerTint',
      },
      neutral: {
        $$btnColor: '$colors$bgSecondary',
        $$btnShade: '$colors$bgTertiary',
        $$btnTint: '$colors$bgPrimary',
      },
    },
    size: {
      small: {
        $$iconMargin: '$space$1',
        [_icon]: {
          $$svgSize: '$sizes$1',
        },
        borderRadius: '$1',
        fontSize: '$1',
        lineHeight: 1,
        px: '$2',
        py: '$1',
      },
      normal: {
        $$iconMargin: '$space$2',
        borderRadius: '$2',
        fontSize: '$2',
        lineHeight: '$sizes$2',
        px: '$3',
        py: '$2',
      },
      large: {
        $$iconMargin: '$space$3',
        [_icon]: {
          $$svgSize: '$sizes$3',
        },
        borderRadius: '$2',
        fontSize: '$4',
        lineHeight: '$sizes$3',
        fontWeight: 'bold',
        px: '$4',
        py: '$3',
      },
    },
  },

  compoundVariants: [
    {
      appearance: 'clear',
      intent: 'neutral',
      css: {
        $$btnColor: '$colors$textPrimary',
        $$btnTint: '$colors$textPrimaryTint',
      },
    },
    {
      appearance: 'normal',
      intent: 'neutral',
      css: {
        color: '$colors$textPrimary',
        [_hoverNotDisabled]: {
          color: '$colors$textPrimaryTint',
        },
      },
    },
  ],
});

export type ButtonProps = ComponentProps<typeof StyledButton> & {
  iconAfter?: ReactElement<typeof Icon>;
  iconBefore?: ReactElement<typeof Icon>;
  iconOnly?: boolean;
  label: string;
};

export const Button: FC<ButtonProps> = ({
  iconAfter,
  iconBefore,
  iconOnly = false,
  label,
  ...restProps
}) => {
  return (
    <StyledButton aria-label={label} {...restProps}>
      {iconBefore}
      {iconOnly ? null : <Text>{label}</Text>}
      {iconAfter}
    </StyledButton>
  );
};
