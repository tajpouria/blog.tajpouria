import AniLink from 'gatsby-plugin-transition-link/AniLink';
import * as React from 'react';
import { ComponentProps } from 'react';

type Props = ComponentProps<typeof AniLink>;

export const SwipeLink = (props: Props) => {
  const { children, ...linkProps } = props;

  return (
    <AniLink swipe={true} duration={0.5} {...linkProps}>
      {children}
    </AniLink>
  );
};
