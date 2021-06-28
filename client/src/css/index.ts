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

      brownred000: '#35151c',
      brownred100: '#4c1f29',
      brownred200: '#632a35',
      brownred300: '#7b3642',
      brownred400: '#93434f',
      brownred500: '#ab525c',
      brownred600: '#c26169',
      brownred700: '#d67478',
      brownred800: '#e38b8b',
      brownred900: '#e9a4a1',
      brownred1000: '#eebdb9',
      brownred1100: '#f4d6d2',

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
      bgPrimary: '$white',
      bgSecondary: '$manatee1100',
      bgTertiary: '$manatee1000',
      bgContrast: '$manatee100',

      textPrimary: '$manatee000',
      textContrast: '$manatee1100',

      textLinkPrimary: '$indigo400',
      textLinkPrimaryHover: '$indigo500',
      textLinkContrast: '$indigo1000',
      textLinkContrastHover: '$indigo1100',

      borderPrimary: '$manatee1000',
      borderSecondary: '$manatee900',
      borderTertiary: '$manatee800',
      borderContrast: '$manatee700',
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
      1: '8px',
      2: '16px',
      3: '32px',
      4: '48px',
    },
    fontSizes: {
      1: '12px',
      2: '14px',
      3: '16px',
      4: '18px',
      5: '21px',
      6: '24px',
      7: '30px',
      8: '36px',
      9: '48px',
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
    xs: '(max-width: 419px)',
    sm: '(min-width: 420px)',
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
        paddingInlineStart: value,
        paddingInlineEnd: value,
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
        paddingInlineEnd: value,
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
        paddingInlineStart: value,
      }),
    px:
      config =>
      (
        value:
          | `$${keyof typeof config['theme']['space']}`
          | (string & Record<string, unknown>),
      ) => ({
        paddingInlineStart: value,
        paddingInlineEnd: value,
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
          | 'auto'
          | `$${keyof typeof config['theme']['space']}`
          | (string & Record<string, unknown>),
      ) => ({
        marginTop: value,
        marginBottom: value,
        marginInlineStart: value,
        marginInlineEnd: value,
      }),
    mt:
      config =>
      (
        value:
          | 'auto'
          | `$${keyof typeof config['theme']['space']}`
          | (string & Record<string, unknown>),
      ) => ({
        marginTop: value,
      }),
    mr:
      config =>
      (
        value:
          | 'auto'
          | `$${keyof typeof config['theme']['space']}`
          | (string & Record<string, unknown>),
      ) => ({
        marginInlineEnd: value,
      }),
    mb:
      config =>
      (
        value:
          | 'auto'
          | `$${keyof typeof config['theme']['space']}`
          | (string & Record<string, unknown>),
      ) => ({
        marginBottom: value,
      }),
    ml:
      config =>
      (
        value:
          | 'auto'
          | `$${keyof typeof config['theme']['space']}`
          | (string & Record<string, unknown>),
      ) => ({
        marginInlineStart: value,
      }),
    mx:
      config =>
      (
        value:
          | 'auto'
          | `$${keyof typeof config['theme']['space']}`
          | (string & Record<string, unknown>),
      ) => ({
        marginInlineStart: value,
        marginInlineEnd: value,
      }),
    my:
      config =>
      (
        value:
          | 'auto'
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
