import { createCss, StitchesCss } from '@stitches/react';

export type { StitchesVariants } from '@stitches/react';

const stitches = createCss({
  theme: {
    colors: {
      gray100: 'hsl(0 0% 98.8%)',
      gray200: 'hsl(0 0% 96.0%)',
      gray300: 'hsl(0 0% 93.7%)',
      gray400: 'hsl(0 0% 92.0%)',
      gray500: 'hsl(0 0% 89.5%)',
      gray600: 'hsl(0 0% 85.2%)',
      gray700: 'hsl(0 0% 80.0%)',
      gray800: 'hsl(0 0% 56.1%)',
      gray900: 'hsl(0 0% 43.9%)',
      gray1000: 'hsl(0 0% 7%)',

      quartz100: 'hsl(252 17% 98.8%)',
      quartz200: 'hsl(252 11% 96.0%)',
      quartz300: 'hsl(252 9% 93.7%)',
      quartz400: 'hsl(252 9% 92.0%)',
      quartz500: 'hsl(252 8% 89.5%)',
      quartz600: 'hsl(252 8% 85.2%)',
      quartz700: 'hsl(252 8% 80.0%)',
      quartz800: 'hsl(252 4% 56.1%)',
      quartz900: 'hsl(252 4% 43.9%)',
      quartz1000: 'hsl(252 10% 7%)',

      slate100: 'hsl(206 20% 98.8%)',
      slate200: 'hsl(206 14% 96.0%)',
      slate300: 'hsl(206 13% 93.7%)',
      slate400: 'hsl(206 12% 92.0%)',
      slate500: 'hsl(206 12% 89.5%)',
      slate600: 'hsl(206 11% 85.2%)',
      slate700: 'hsl(206 10% 80.0%)',
      slate800: 'hsl(206 6% 56.1%)',
      slate900: 'hsl(206 6% 43.9%)',
      slate1000: 'hsl(206 12% 7%)',

      sand100: 'hsl(50 20% 98.8%)',
      sand200: 'hsl(50 14% 96.0%)',
      sand300: 'hsl(50 13% 93.7%)',
      sand400: 'hsl(50 12% 92.0%)',
      sand500: 'hsl(50 12% 89.5%)',
      sand600: 'hsl(50 11% 85.2%)',
      sand700: 'hsl(50 10% 80.0%)',
      sand800: 'hsl(50 6% 56.1%)',
      sand900: 'hsl(50 6% 43.9%)',
      sand1000: 'hsl(50 10% 8%)',

      red100: 'hsl(351 100% 98.5%)',
      red200: 'hsl(351 89% 96.0%)',
      red300: 'hsl(352 86% 93.4%)',
      red400: 'hsl(352 85% 90.3%)',
      red500: 'hsl(353 84% 86.4%)',
      red600: 'hsl(354 83% 80.7%)',
      red700: 'hsl(355 82% 71.7%)',
      red800: 'hsl(356 91% 59.0%)',
      red900: 'hsl(356 80% 47.1%)',
      red1000: 'hsl(356 80% 27.1%)',

      crimson100: 'hsl(332 100% 98.5%)',
      crimson200: 'hsl(332 87% 96.0%)',
      crimson300: 'hsl(333 84% 93.3%)',
      crimson400: 'hsl(333 83% 90.2%)',
      crimson500: 'hsl(334 82% 86.3%)',
      crimson600: 'hsl(335 81% 80.3%)',
      crimson700: 'hsl(336 80% 70.0%)',
      crimson800: 'hsl(336 88% 56.3%)',
      crimson900: 'hsl(336 79% 46.1%)',
      crimson1000: 'hsl(336 79% 26.1%)',

      pink100: 'hsl(322 100% 98.5%)',
      pink200: 'hsl(322 90% 95.8%)',
      pink300: 'hsl(322 87% 93.0%)',
      pink400: 'hsl(322 86% 89.9%)',
      pink500: 'hsl(322 85% 86.2%)',
      pink600: 'hsl(322 85% 80.3%)',
      pink700: 'hsl(322 84% 68.9%)',
      pink800: 'hsl(322 75% 60.0%)',
      pink900: 'hsl(322 80% 43.9%)',
      pink1000: 'hsl(322 80% 23.9%)',

      purple100: 'hsl(280 100% 99.0%)',
      purple200: 'hsl(279 75% 95.7%)',
      purple300: 'hsl(278 71% 92.4%)',
      purple400: 'hsl(278 69% 89.0%)',
      purple500: 'hsl(277 68% 85.2%)',
      purple600: 'hsl(275 67% 80.2%)',
      purple700: 'hsl(272 66% 68.1%)',
      purple800: 'hsl(272 53% 50.0%)',
      purple900: 'hsl(272 62% 44.1%)',
      purple1000: 'hsl(272 62% 24.1%)',

      violet100: 'hsl(252 100% 99.0%)',
      violet200: 'hsl(252 87% 96.4%)',
      violet300: 'hsl(252 85% 93.7%)',
      violet400: 'hsl(252 84% 90.7%)',
      violet500: 'hsl(252 83% 86.8%)',
      violet600: 'hsl(252 83% 80.8%)',
      violet700: 'hsl(252 82% 72.2%)',
      violet800: 'hsl(252 62% 54.9%)',
      violet900: 'hsl(250 55% 48.0%)',
      violet1000: 'hsl(250 55% 28.0%)',

      indigo100: 'hsl(226 100% 99.0%)',
      indigo200: 'hsl(226 83% 96.3%)',
      indigo300: 'hsl(226 80% 93.3%)',
      indigo400: 'hsl(226 79% 89.8%)',
      indigo500: 'hsl(226 78% 85.4%)',
      indigo600: 'hsl(226 77% 79.1%)',
      indigo700: 'hsl(226 76% 70.2%)',
      indigo800: 'hsl(226 69% 54.1%)',
      indigo900: 'hsl(226 70% 44.1%)',
      indigo1000: 'hsl(226 70% 24.1%)',

      blue100: 'hsl(206 100% 98.8%)',
      blue200: 'hsl(206 98% 95.8%)',
      blue300: 'hsl(206 97% 92.6%)',
      blue400: 'hsl(206 97% 88.9%)',
      blue500: 'hsl(206 97% 83.9%)',
      blue600: 'hsl(206 97% 76.7%)',
      blue700: 'hsl(206 97% 68.3%)',
      blue800: 'hsl(206 100% 50.0%)',
      blue900: 'hsl(211 100% 43.9%)',
      blue1000: 'hsl(211 73% 12%)',

      cyan100: 'hsl(185 78% 97.8%)',
      cyan200: 'hsl(185 73% 93.2%)',
      cyan300: 'hsl(186 71% 88.2%)',
      cyan400: 'hsl(186 71% 82.8%)',
      cyan500: 'hsl(187 70% 76.4%)',
      cyan600: 'hsl(187 69% 68.2%)',
      cyan700: 'hsl(188 68% 59.2%)',
      cyan800: 'hsl(190 88% 40.0%)',
      cyan900: 'hsl(190 90% 30.0%)',
      cyan1000: 'hsl(190 63% 8.0%)',

      teal100: 'hsl(165 100% 97.5%)',
      teal200: 'hsl(166 73% 93.1%)',
      teal300: 'hsl(166 66% 88.1%)',
      teal400: 'hsl(167 63% 82.3%)',
      teal500: 'hsl(168 60% 75.1%)',
      teal600: 'hsl(170 57% 65.2%)',
      teal700: 'hsl(172 54% 50.0%)',
      teal800: 'hsl(173 79% 36.7%)',
      teal900: 'hsl(174 100% 24.5%)',
      teal1000: 'hsl(174 70% 7%)',

      green100: 'hsl(130 100% 97.5%)',
      green200: 'hsl(131 72% 94.0%)',
      green300: 'hsl(132 63% 89.8%)',
      green400: 'hsl(134 58% 84.6%)',
      green500: 'hsl(136 55% 78.0%)',
      green600: 'hsl(139 52% 69.0%)',
      green700: 'hsl(144 48% 55.8%)',
      green800: 'hsl(145 62% 41.0%)',
      green900: 'hsl(148 69% 30.0%)',
      green1000: 'hsl(148 69% 10.0%)',

      lime100: 'hsl(85 86% 96.5%)',
      lime200: 'hsl(84 79% 92.6%)',
      lime300: 'hsl(83 76% 87.3%)',
      lime400: 'hsl(82 74% 80.7%)',
      lime500: 'hsl(81 73% 72.6%)',
      lime600: 'hsl(79 72% 62.8%)',
      lime700: 'hsl(76 74% 48.9%)',
      lime800: 'hsl(81 91% 40.0%)',
      lime900: 'hsl(78 80% 25.1%)',
      lime1000: 'hsl(78 80% 5.1%)',

      yellow100: 'hsl(55 100% 95.5%)',
      yellow200: 'hsl(55 93% 89.9%)',
      yellow300: 'hsl(54 90% 83.6%)',
      yellow400: 'hsl(54 89% 76.5%)',
      yellow500: 'hsl(53 88% 67.5%)',
      yellow600: 'hsl(52 88% 57.1%)',
      yellow700: 'hsl(52 88% 51.7%)',
      yellow800: 'hsl(49 97% 48.0%)',
      yellow900: 'hsl(40 80% 32.0%)',
      yellow1000: 'hsl(40 80% 12.0%)',

      orange100: 'hsl(40 100% 97.0%)',
      orange200: 'hsl(40 97% 93.2%)',
      orange300: 'hsl(39 97% 88.7%)',
      orange400: 'hsl(39 96% 83.0%)',
      orange500: 'hsl(38 96% 75.5%)',
      orange600: 'hsl(37 96% 65.5%)',
      orange700: 'hsl(36 96% 53.9%)',
      orange800: 'hsl(38 100% 53.9%)',
      orange900: 'hsl(27 65% 35.9%)',
      orange1000: 'hsl(27 65% 15.9%)',

      brown100: 'hsl(30 75% 98.0%)',
      brown200: 'hsl(30 67% 94.0%)',
      brown300: 'hsl(30 66% 90.0%)',
      brown400: 'hsl(29 64% 85.7%)',
      brown500: 'hsl(29 64% 80.5%)',
      brown600: 'hsl(29 62% 72.6%)',
      brown700: 'hsl(28 61% 61.6%)',
      brown800: 'hsl(28 48% 52.0%)',
      brown900: 'hsl(20 50% 37.1%)',
      brown1000: 'hsl(20 50% 17.1%)',

      bronze100: 'hsl(18 100% 98.5%)',
      bronze200: 'hsl(18 57% 94.1%)',
      bronze300: 'hsl(18 50% 89.8%)',
      bronze400: 'hsl(17 46% 85.3%)',
      bronze500: 'hsl(17 44% 80.0%)',
      bronze600: 'hsl(17 42% 73.0%)',
      bronze700: 'hsl(16 39% 64.0%)',
      bronze800: 'hsl(17 28% 52.0%)',
      bronze900: 'hsl(15 30% 43.1%)',
      bronze1000: 'hsl(15 30% 23.1%)',

      gold100: 'hsl(50 75% 98.0%)',
      gold200: 'hsl(49 52% 93.8%)',
      gold300: 'hsl(47 48% 89.6%)',
      gold400: 'hsl(46 45% 85.1%)',
      gold500: 'hsl(44 43% 79.6%)',
      gold600: 'hsl(41 41% 71.4%)',
      gold700: 'hsl(36 37% 60.0%)',
      gold800: 'hsl(36 30% 52.0%)',
      gold900: 'hsl(36 26% 40.0%)',
      gold1000: 'hsl(36 26% 20.0%)',

      black: '#000000',
      white: '#ffffff',

      // add base theme pallete (FIXME)
      bg0: '$white',

      fg0: '$gray1000',
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
  prefix: 'jsgolf-',
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
