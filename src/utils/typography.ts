import { CSSObject } from 'styled-components';
import Typography from 'typography';
import Wordpress2016 from 'typography-theme-wordpress-2016';

import '../global.css';

Wordpress2016.overrideThemeStyles = () => {
  return {
    'a.gatsby-resp-image-link': {
      boxShadow: `none`,
    },

    body: {
      color: 'var(--textNormal)',
    },

    a: {
      color: 'var(--textLink)',
    },

    blockquote: {
      borderLeftColor: 'var(--hr)',
      color: 'var(--textNormal)',
    },

    hr: {
      backgroundColor: 'var(--hr)',
    },
  };
};

delete Wordpress2016.googleFonts;

const typography = new Typography(Wordpress2016);

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;

type StyledScale = (values: number) => CSSObject;
export const styledScale = scale as StyledScale;
