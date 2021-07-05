import { apiProxy } from './apiProxy.mjs';

const isDev = process.env.NODE_ENV === 'development';

/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  devOptions: {
    open: 'none',
    port: 3000,
  },
  workspaceRoot: '../',
  alias: {
    '~': './src',
    '~public': './public',
  },
  optimize: {
    entrypoints: ['./public/index.html'],
    bundle: true,
    splitting: true,
    treeshake: true,
    minify: true,
    target: 'es2020',
  },
  mount: {
    public: { static: true, url: '/' },
    src: { url: '/' },
  },
  exclude: isDev
    ? ['**/node_modules/**/*']
    : [
        '**/node_modules/**/*',
        '**/__fixtures__/**/*',
        '**/*.fixture.*',
        '**/cosmos.*',
        '**/*.cosmos.*',
      ],
  packageOptions: {
    polyfillNode: true,
  },
  plugins: [
    ['@snowpack/plugin-react-refresh'],
    ['@snowpack/plugin-dotenv'],
    ['@snowpack/plugin-typescript'],
  ],
  routes: [
    { src: '/(graphql|login|logout|altair).*', dest: apiProxy },
    { src: '/_cosmos-renderer.html', dest: '/index.cosmos.html' },
    { src: '.*', dest: '/index.html', match: 'routes' },
  ],
};
