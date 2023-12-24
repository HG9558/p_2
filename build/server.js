const express = require('express');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const path = require('path');
const fs = require('fs');
const webpackConfig = require('./webpack.dev');
const {dev} = require('./proxy');
const cp = require('child_process');
var https = require('https');
var http = require('http');
const url = require('url');
const launch = require('launch-editor')

// const privateKey = fs.readFileSync('./ssl/gui.jylkazg.xyz.crt', 'utf-8');
// const certificate = fs.readFileSync('./ssl/gui.jylkazg.xyz.key', 'utf-8');

// const credentials = {
//   key: privateKey,
//   cert: certificate
// };

const app = express();
const compiler = webpack(webpackConfig);
app.use('/__open-in-editor', (req, res, err) => {
  const { file } = url.parse(req.url, true).query || {}
  launch(path.resolve(__dirname.replace('/build', ''), file), 'code', () => {
    console.log('打开编辑器失败')
  })
  res.end()
})


app.use('/dev', dev);
// app.use('/api', api);

// 使用webpack-dev-middleware中间件
app.use(
  devMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
  })
);

// 使用webpack-hot-middleware中间件，配置在console台输出日志
app.use(
  hotMiddleware(compiler, {
    log: false,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  })
);

// 使用静态资源目录
app.use(express.static(webpackConfig.output.path));

// 访问不存在路由全部指向html文件
app.use('*', function (req, res, next) {
  const filename = path.join(compiler.outputPath, 'index.html');

  compiler.outputFileSystem.readFile(filename, function (err, result) {
    if (err) {
      return next(err);
    }
    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
  });
});

let server;

const bootstrap = () => {
  if (!server) {
    // http.createServer(app).listen(1239, function () {
    //   console.log('HTTP Server is running on: http://localhost:%s', 1239);
    // });
    // https.createServer(credentials, app).listen(2352, function () {
    //   console.log('HTTPS Server is running on: https://localhost:%s', 2352);
    // });
    // console.log(https.createServer(credentials, app));
    const appServer = app.listen(5088, () => {
      server = appServer;
      cp.exec('start http://localhost:5088/');
      console.info('成功启动: http://localhost:5088');
    });
  }
};

compiler.hooks.afterCompile.tap('server start', bootstrap);
