/* eslint-disable @typescript-eslint/no-var-requires */
const apiProxy = require('./apiProxy.js');

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  devOptions: {
    open: 'none',
    port: 3000,
  },
  workspaceRoot: '../',
  alias: {
    '~': './src',
  },
  mount: {
    public: { static: true, url: '/' },
    src: { url: '/dist' },
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
