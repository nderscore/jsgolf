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
    '~jsgolf': './src',
  },
  mount: {
    public: { static: true, url: '/' },
    src: { url: '/dist' },
  },
  plugins: [],
  routes: [
    { dest: apiProxy, src: '/(graphql|login|logout|altair).*' },
    { dest: '/index.html', match: 'routes', src: '.*' },
  ],
};
