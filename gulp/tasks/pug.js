import gulp from'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';

// 各種設定を読み込む
const $      = gulpLoadPlugins();
const config = require('../config').pug;


// pug実行タスク
gulp.task('pug', () => {

  // pugのコンパイル
  return gulp.src(config.src)
    .pipe($.plumber({
      errorHandler: $.notify.onError('<%= error.message %>')
    }))
    .pipe($.pug(config.pug))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({
      stream: true
    }));

});
