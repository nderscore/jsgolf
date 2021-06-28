import dotenv from 'dotenv';
dotenv.config();

import httpProxy from 'http-proxy';

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
      error: 'proxy error',
      reason: error.message,
    }),
  );
});

export const apiProxy = proxy.web.bind(proxy);
