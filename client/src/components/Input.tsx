import React, {
  ComponentProps,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { styled, VariantProps } from '~/css';
import { Button, StyledButton } from '~/components/Button';
import { Label } from '~/components/Label';
import { Icon, StyledSvg as StyledIcon } from '~/components/Icon';

export const StyledInput = styled('input', {
  backgroundColor: '$bgPrimary',
  border: 'none',
  color: '$text',
  fontSize: '$$inputFontSize',
  paddingBottom: '$$inputPadding',
  paddingTop: 'calc($$inputPadding + $$inputPadding + $$labelElevationSize)',
  paddingInlineStart: '$$inputPadding',
  paddingInlineEnd: '$$inputPadding',
  width: '100%',
  boxShadow: 'inset 0 -3px 0 0 $$inputShadow',

  $$inputShadow: '$colors$borderPrimary',

  '&:focus': {
    $$inputShadow: '$colors$borderTertiary',
  },

  defaultVariants: {
    hasIcon: 'false',
  },

  variants: {
    hasIcon: {
      false: {},
      true: {
        paddingInlineEnd: 'calc($$inputPadding + $$iconOffset)',
      },
    },
  },
});

export const Wrapper = styled('div', {
  [`& > ${StyledButton}, & > ${StyledIcon}`]: {
    position: 'absolute',
    top: 'calc($$inputPadding + $$labelElevationSize)',
    insetInlineEnd: '$$inputPadding',
  },

  position: 'relative',

  defaultVariants: {
    inputSize: 'normal',
  },

  variants: {
    inputSize: {
      small: {
        $$iconOffset: 'calc($sizes$1 * 2)',
        $$inputFontSize: '$fontSizes$2',
        $$inputPadding: '$space$1',
        $$labelElevationFontSize: '$fontSizes$1',
        $$labelElevationSize:
          'calc($$labelElevationFontSize * $lineHeights$normal)',
      },
      normal: {
        $$iconOffset: 'calc($sizes$2 * 2)',
        $$inputFontSize: '$fontSizes$3',
        $$inputPadding: '$space$2',
        $$labelElevationFontSize: '$fontSizes$2',
        $$labelElevationSize:
          'calc($$labelElevationFontSize * $lineHeights$normal)',
      },
    },
  },
});

type WrapperVariants = VariantProps<typeof Wrapper>;

type InputType = 'text' | 'password';

export type InputProps = ComponentProps<typeof StyledInput> &
  WrapperVariants & {
    label: string;
    name: string;
    placeholder?: string;
    type?: InputType;
  };

export const Input: FC<InputProps> = ({
  type: typeProp = 'text',
  label,
  name,
  placeholder,
  inputSize,
  ...restProps
}) => {
  const [type, setType] = useState<InputType>(typeProp);
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState<boolean>();
  const [value, setValue] = useState<string>();

  const elevateLabel = !!(placeholder || focused || value);

  const toggleInputType = useCallback<() => void>(
    () => setType(t => (t === 'password' ? 'text' : 'password')),
    [],
  );

  useEffect(() => {
    const el = inputRef.current;
    if (!el) {
      return;
    }

    const focusHandler = () => setFocused(true);
    const blurHandler = () => setFocused(false);
    const onInput = () => setValue(el.value);

    el.addEventListener('focus', focusHandler);
    el.addEventListener('blur', blurHandler);
    el.addEventListener('input', onInput);

    return () => {
      el.removeEventListener('focus', focusHandler);
      el.removeEventListener('blur', blurHandler);
      el.removeEventListener('input', onInput);
    };
  }, []);

  const isInternalPassword = typeProp === 'password';
  const isPassword = type === 'password';

  return (
    <Wrapper inputSize={inputSize}>
      <Label elevated={elevateLabel} type="input" htmlFor={name}>
        {label}
      </Label>
      <StyledInput
        hasIcon={isInternalPassword}
        id={name}
        name={name}
        placeholder={placeholder}
        ref={inputRef}
        type={isInternalPassword ? type : typeProp}
        {...restProps}
      />
      {isInternalPassword && (
        <Button
          appearance="clear"
          iconAfter={<Icon name={type === 'password' ? 'eye' : 'eye-off'} />}
          iconOnly
          label={isPassword ? 'Show Password' : 'Hide Password'}
          onClick={toggleInputType}
          size={inputSize}
        />
      )}
    </Wrapper>
  );
};
