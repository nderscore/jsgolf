/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

const httpProxy = require('http-proxy');

module.exports = (() => {
  const proxy = httpProxy.createServer({
    target: process.env.SNOWPACK_PRIVATE_SERVER_BASE_URL,
  });

  proxy.on('error', (error, _req, res) => {
    console.log('proxy error:', error);

    if (!res.headersSent) {
      res.writeHead(500, { 'content-type': 'application/json' });
    }

    res.end(
      JSON.stringify({
        error: 'proxy_error',
        reason: error.message,
      }),
    );
  });

  return proxy.web.bind(proxy);
})();
