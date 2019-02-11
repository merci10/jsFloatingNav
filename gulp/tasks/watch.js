import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

// 各種設定を読み込む
const $ = gulpLoadPlugins();
const config = require('../config');

// watch 実行タスク
gulp.task('watch', () => {

  // pug
  gulp.watch(config.pug.watch, ['pug']);

  // sass
  gulp.watch(config.sass.watch, ['sass']);

  // script(js)
  gulp.watch(config.script.watch, ['script']);
});
