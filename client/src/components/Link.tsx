import React, { forwardRef, ComponentProps } from 'react';
import { styled, CSS, StitchesVariants } from '~/css';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  generatePath,
} from 'react-router-dom';

const StyledLink = styled('a', {
  textDecoration: 'none',
  '@hover': {
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
  variants: {
    color: {
      primary: {
        color: '$textLinkPrimary',
        '@hover': {
          '&:hover': {
            color: '$textLinkPrimaryHover',
          },
        },
      },
      contrast: {
        color: '$textLinkContrast',
        '@hover': {
          '&:hover': {
            color: '$textLinkContrastHover',
          },
        },
      },
    },
  },
});

export type LinkProps = RouterLinkProps &
  ComponentProps<typeof StyledLink> & {
    params?: Record<string, string>;
    external?: boolean;
    userGenerated?: boolean;
  };

const LinkWrapper = forwardRef<
  HTMLAnchorElement,
  ComponentProps<typeof StyledLink> & { navigate: unknown }
>(function LinkWrapper(props, ref) {
  const { navigate: _, ...restProps } = props;

  return <StyledLink {...restProps} ref={ref} />;
});

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  props,
  ref,
) {
  const {
    params,
    external,
    userGenerated,
    to,
    component: _,
    replace,
    innerRef,
    ...restProps
  } = props;

  let toProp = to;
  if (params) {
    if (typeof to === 'string') {
      toProp = generatePath(to, params);
    } else if (typeof to === 'object') {
      toProp = {
        ...to,
        pathname: generatePath(to.pathname as string, params),
      };
    } else if (typeof to === 'function') {
      toProp = location => generatePath(to(location) as string, params);
    }
  }

  if (external) {
    const rel = `nofollow${userGenerated ? ' ugc' : ''}`;

    return <StyledLink href={toProp as string} rel={rel} {...restProps} />;
  }

  return (
    <RouterLink
      ref={ref}
      component={LinkWrapper}
      to={toProp}
      replace={replace}
      innerRef={innerRef}
      {...restProps}
    />
  );
});
