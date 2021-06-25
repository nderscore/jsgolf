import { globalCss } from '~/css';

export const globalStyles = globalCss({
  'html, body': {
    padding: 0,
    margin: 0,
    height: '100%',
    fontFamily: '$body',
    backgroundColor: '$bg0',
    color: '$fg0',
  },
  '#root': {
    height: '100%',
  },
});
