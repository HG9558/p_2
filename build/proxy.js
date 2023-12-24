const { createProxyMiddleware } = require('http-proxy-middleware');

// proxy middleware options
const options = {
  // target: 'https://admin.ex6uusv9la.com/', 
  target: 'http://admin.cyestari.com/', 
  changeOrigin: true, // needed for virtual hosted site-components
  ws: true, // proxy websockets
  pathRewrite: {
    '^/dev': '' // rewrite path1
  },
  router: {
    // when request.headers.host == 'dev.localhost:3000',
    // override target 'http://www.example.org' to 'http://localhost:8000'
    // 'dev.localhost:3000': 'http://localhost:8000',
  }
};

// create the proxy (without context)
const dev = createProxyMiddleware(options);
// const api = createProxyMiddleware({
//   target: 'http://34.92.245.49:3131',
//   changeOrigin: true, // needed for virtual hosted site-components
//   pathRewrite: {
//     '/api': '' // rewrite path1
//   },
// });
module.exports = {
  dev
};
