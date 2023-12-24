const gulp = require('gulp');
const gulpUtil = require('gulp-util');
const gulpReplace = require('gulp-replace');
const webpack = require('webpack');

function buildWebpack(webpackConfig, cb) {
  return webpack(webpackConfig, (err, stats) => {
    if (err) {
      throw new gulpUtil.PluginError('webpack', err);
    }
    gulpUtil.log(
      '[webpack-demo1]',
      stats.toString({
        colors: true,
        chunks: false
      })
    );
    if (cb) {
      cb();
    }
  });
}

gulp.task('webpack-demo1-prod', cb => {
  const webpackConfig = require('./webpack.prod');
  return buildWebpack(webpackConfig, cb);
});

// 替换静态资源版本hash值
gulp.task('replace-hash', cb => {
  const time = new Date().getTime();

  gulp.src(['../dist/**/*.*'])
    .pipe(gulpReplace(/__static_hash__/g, `vh=${time}`))
    .pipe(gulp.dest('../dist/'));
  return cb();
})

// 生产环境打包
gulp.task(
  'prod',
  gulp.series('webpack-demo1-prod', 'replace-hash')
);