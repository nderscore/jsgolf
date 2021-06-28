import React, { forwardRef, ComponentProps, MouseEvent } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { styled } from '~/css';
import { StyledLink } from '~/components/Link';

export const Content = styled(DropdownMenu.Content, {
  minWidth: '$8',
  backgroundColor: '$bgPrimary',
  color: '$textPrimary',
  borderRadius: '$1',
  padding: '$1',
  boxShadow: '0px 0px 0px 1px $colors$borderPrimary',
});

export const Item = styled(DropdownMenu.Item, {
  cursor: 'pointer',
  fontSize: '$2',
  padding: '$1 $2',
  borderRadius: '$1',

  '&:focus': {
    outline: 'none',
    backgroundColor: '$bgContrast',
    color: '$textContrast',
  },
});

const StyledLinkItem = styled(DropdownMenu.Item, {
  cursor: 'pointer',

  '&:focus': {
    outline: 'none',
  },

  [`& > ${StyledLink}`]: {
    backgroundColor: '$bgPrimary',
    color: '$textLinkPrimary',
    display: 'block',
    fontSize: '$2',
    padding: '$1 $2',
    borderRadius: '$1',

    '&:hover': {
      textDecoration: 'none',
    },
  },

  [`&:focus > ${StyledLink}`]: {
    backgroundColor: '$bgContrast',
    color: '$textContrast',
  },
});

const linkSelectHandler = (e: Event) => {
  const target = (e.target as HTMLElement)?.querySelector?.(
    `:scope > ${StyledLink}`,
  ) as HTMLAnchorElement;

  target?.click?.();
};

export const LinkItem = forwardRef<HTMLDivElement, ComponentProps<typeof Item>>(
  function LinkItem(props, ref) {
    return <StyledLinkItem {...props} ref={ref} onSelect={linkSelectHandler} />;
  },
);

export const TriggerItem = styled(DropdownMenu.TriggerItem, {
  cursor: 'pointer',
  fontSize: '$2',
  padding: '$1 $2',
  borderRadius: '$1',

  '&:focus': {
    outline: 'none',
    backgroundColor: '$bgContrast',
    color: '$textContrast',
  },
});

export const Arrow = styled(DropdownMenu.Arrow, {
  fill: '$bgPrimary',
  dropShadow: '0px 0px 0px 1px $colors$borderPrimary',
});

export const Separator = styled(DropdownMenu.Separator, {
  height: 1,
  backgroundColor: '$borderPrimary',
  margin: '$1',
});

export const Trigger = styled(DropdownMenu.Trigger, {
  cursor: 'pointer',
  appearance: 'none',
  border: 'none',
  margin: '$0',
  padding: '$0',
});

export const Root = DropdownMenu.Root;
