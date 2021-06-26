import { createCss, StitchesCss } from '@stitches/react';

export type { StitchesVariants } from '@stitches/react';

const stitches = createCss({
  theme: {
    colors: {
      blueviolet000: '#171e3c',
      blueviolet100: '#242c55',
      blueviolet200: '#323a6f',
      blueviolet300: '#434888',
      blueviolet400: '#5557a2',
      blueviolet500: '#6966bb',
      blueviolet600: '#7f75d3',
      blueviolet700: '#9686e5',
      blueviolet800: '#ac99ec',
      blueviolet900: '#c1adf0',
      blueviolet1000: '#d4c2f4',
      blueviolet1100: '#e5d8f8',

      forestgreen000: '#13230e',
      forestgreen100: '#193416',
      forestgreen200: '#214520',
      forestgreen300: '#2a562d',
      forestgreen400: '#35683b',
      forestgreen500: '#3e7b49',
      forestgreen600: '#498e58',
      forestgreen700: '#54a169',
      forestgreen800: '#66b47d',
      forestgreen900: '#7cc694',
      forestgreen1000: '#95d8ac',
      forestgreen1100: '#b0eac6',

      fuchsia000: '#2c1834',
      fuchsia100: '#40234a',
      fuchsia200: '#552e60',
      fuchsia300: '#6c3a75',
      fuchsia400: '#84468b',
      fuchsia500: '#9c539f',
      fuchsia600: '#b461b3',
      fuchsia700: '#ca72c4',
      fuchsia800: '#dc86d2',
      fuchsia900: '#ee9bdf',
      fuchsia1000: '#f4b6e5',
      fuchsia1100: '#f8d2ed',

      indigo000: '#11212f',
      indigo100: '#1a3044',
      indigo200: '#26405a',
      indigo300: '#315071',
      indigo400: '#3c618a',
      indigo500: '#4872a4',
      indigo600: '#5583bf',
      indigo700: '#6595d9',
      indigo800: '#86a6df',
      indigo900: '#a3b7e6',
      indigo1000: '#bdcaed',
      indigo1100: '#d6ddf3',

      manatee000: '#1e2022',
      manatee100: '#2c2e32',
      manatee200: '#3b3d43',
      manatee300: '#4a4d54',
      manatee400: '#5b5d66',
      manatee500: '#6b6e78',
      manatee600: '#7d808b',
      manatee700: '#8f919c',
      manatee800: '#a2a3ad',
      manatee900: '#b5b6be',
      manatee1000: '#c9c9cf',
      manatee1100: '#dcdce0',

      slate000: '#35151c',
      slate100: '#4c1f29',
      slate200: '#632a35',
      slate300: '#7b3642',
      slate400: '#93434f',
      slate500: '#ab525c',
      slate600: '#c26169',
      slate700: '#d67478',
      slate800: '#e38b8b',
      slate900: '#e9a4a1',
      slate1000: '#eebdb9',
      slate1100: '#f4d6d2',

      yelloworange000: '#2d1c00',
      yelloworange100: '#402902',
      yelloworange200: '#543702',
      yelloworange300: '#674600',
      yelloworange400: '#7a5602',
      yelloworange500: '#8d6700',
      yelloworange600: '#a07903',
      yelloworange700: '#b38b01',
      yelloworange800: '#c39f2c',
      yelloworange900: '#d3b34b',
      yelloworange1000: '#e2c76b',
      yelloworange1100: '#f1db8d',

      black: '#000000',
      white: '#ffffff',

      // add base theme pallete (FIXME)
      bg0: '$white',

      fg0: '$slate000',
    },
    fonts: {
      body: '-apple-system, system-ui, sans-serif',
      mono: 'monospace',
    },
    sizes: {
      0: '0',
      1: '12px',
      2: '16px',
      3: '24px',
      4: '32px',
      5: '48px',
      6: '64px',
      7: '96px',
      8: '128px',
      9: '192px',
    },
    space: {
      0: '0',
      1: '4px',
      2: '8px',
      3: '16px',
      4: '32px',
    },
    fontSizes: {
      1: '12px',
      2: '13px',
      3: '15px',
      4: '17px',
      5: '19px',
      6: '21px',
      7: '27px',
      8: '35px',
      9: '59px',
    },
    radii: {
      1: '3px',
      2: '5px',
      3: '7px',
      round: '50%',
      pill: '9999px',
    },
    zIndices: {
      1: '100',
      2: '200',
      3: '300',
      4: '400',
      max: '999',
    },
  },
  prefix: 'jsgolf',
  media: {
    xs: '(max-width: 519px)',
    sm: '(min-width: 520px)',
    md: '(min-width: 900px)',
    lg: '(min-width: 1200px)',
    xl: '(min-width: 1800px)',
    motion: '(prefers-reduced-motion: no-preference)',
    noMotion: '(prefers-reduced-motion: reduce)',
    hover: '(any-hover: hover)',
    noHover: '(any-hover: none)',
  },
  utils: {
    p:
      config =>
      (
        value:
          | `$${keyof typeof config['theme']['space']}`
          | (string & Record<string, unknown>),
      ) => ({
        paddingTop: value,
        paddingBottom: value,
        paddingLeft: value,
        paddingRight: value,
      }),
    pt:
      config =>
      (
        value:
          | `$${keyof typeof config['theme']['space']}`
          | (string & Record<string, unknown>),
      ) => ({
        paddingTop: value,
      }),
    pr:
      config =>
      (
        value:
          | `$${keyof typeof config['theme']['space']}`
          | (string & Record<string, unknown>),
      ) => ({
        paddingRight: value,
      }),
    pb:
      config =>
      (
        value:
          | `$${keyof typeof config['theme']['space']}`
          | (string & Record<string, unknown>),
      ) => ({
        paddingBottom: value,
      }),
    pl:
      config =>
      (
        value:
          | `$${keyof typeof config['theme']['space']}`
          | (string & Record<string, unknown>),
      ) => ({
        paddingLeft: value,
      }),
    px:
      config =>
      (
        value:
          | `$${keyof typeof config['theme']['space']}`
          | (string & Record<string, unknown>),
      ) => ({
        paddingLeft: value,
        paddingRight: value,
      }),
    py:
      config =>
      (
        value:
          | `$${keyof typeof config['theme']['space']}`
          | (string & Record<string, unknown>),
      ) => ({
        paddingTop: value,
        paddingBottom: value,
      }),
    m:
      config =>
      (
        value:
          | `$${keyof typeof config['theme']['space']}`
          | (string & Record<string, unknown>),
      ) => ({
        marginTop: value,
        marginBottom: value,
        marginLeft: value,
        marginRight: value,
      }),
    mt:
      config =>
      (
        value:
          | `$${keyof typeof config['theme']['space']}`
          | (string & Record<string, unknown>),
      ) => ({
        marginTop: value,
      }),
    mr:
      config =>
      (
        value:
          | `$${keyof typeof config['theme']['space']}`
          | (string & Record<string, unknown>),
      ) => ({
        marginRight: value,
      }),
    mb:
      config =>
      (
        value:
          | `$${keyof typeof config['theme']['space']}`
          | (string & Record<string, unknown>),
      ) => ({
        marginBottom: value,
      }),
    ml:
      config =>
      (
        value:
          | `$${keyof typeof config['theme']['space']}`
          | (string & Record<string, unknown>),
      ) => ({
        marginLeft: value,
      }),
    mx:
      config =>
      (
        value:
          | `$${keyof typeof config['theme']['space']}`
          | (string & Record<string, unknown>),
      ) => ({
        marginLeft: value,
        marginRight: value,
      }),
    my:
      config =>
      (
        value:
          | `$${keyof typeof config['theme']['space']}`
          | (string & Record<string, unknown>),
      ) => ({
        marginTop: value,
        marginBottom: value,
      }),
  },
});

export type CSS = StitchesCss<typeof stitches>;

export const {
  styled,
  css,
  theme,
  getCssString,
  global: globalCss,
  keyframes,
  config,
} = stitches;
