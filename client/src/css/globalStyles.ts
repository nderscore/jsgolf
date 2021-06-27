import { globalCss } from '~/css';

export const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
  },
  'html, body': {
    padding: 0,
    margin: 0,
    height: '100%',
    fontFamily: '$body',
    fontSize: '$3',
    backgroundColor: '$bgBase',
    color: '$textBase',
  },
  '#root': {
    height: '100%',

    // global CSS variables:

    $$containerWidth: '100%',

    '@xs': {},

    '@sm': {},

    '@md': {},

    '@lg': {
      $$containerWidth: '1200px',
    },

    '@xl': {
      $$containerWidth: '1800px',
    },
  },
});
