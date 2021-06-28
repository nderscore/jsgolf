import { apiProxy } from './apiProxy.mjs';

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
  plugins: [
    ['@snowpack/plugin-react-refresh'],
    ['@snowpack/plugin-dotenv'],
    ['@snowpack/plugin-typescript'],
  ],
  routes: [
    { dest: apiProxy, src: '/(graphql|login|logout|altair).*' },
    { dest: '/index.html', match: 'routes', src: '.*' },
  ],
};
