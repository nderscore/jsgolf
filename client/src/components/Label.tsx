import * as LabelPrimitive from '@radix-ui/react-label';

import { styled } from '~/css';

export const Label = styled(LabelPrimitive.Root, {
  userSelect: 'none',

  defaultVariants: {
    type: 'normal',
    elevated: 'false',
  },

  variants: {
    type: {
      normal: {
        fontSize: '$2',
        color: '$textPrimaryTint',
      },
      input: {
        position: 'absolute',
        insetInlineStart: '$$inputPadding',
        top: '$$inputPadding',
        transition: 'transform $shortOut, fontSize $shortOut',
      },
    },
    elevated: {
      false: {},
      true: {},
    },
  },

  compoundVariants: [
    {
      type: 'input',
      elevated: false,
      css: {
        color: '$textPrimary',
        cursor: 'text',
        fontSize: '$$inputFontSize',
        transform: 'translateY(calc($$inputPadding + $$labelElevationSize))',
      },
    },
    {
      type: 'input',
      elevated: true,
      css: {
        color: '$textPrimaryTint',
        fontSize: '$$labelElevationFontSize',
        transform: 'translateY(0)',
      },
    },
  ],
});
