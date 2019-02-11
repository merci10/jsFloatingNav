import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';

// 各種設定を読み込む
const $      = gulpLoadPlugins();
const config = require('../config').sass;


// sass実行タスク
gulp.task('sass', () => {
  gulp.src(config.src, !config.exceptionSrc)
    .pipe($.plumber({
      errorHandler: $.notify.onError('<%= error.message %>')
    }))
    .pipe($.sass(config.sass))
    .pipe($.autoprefixer(config.autoprefixer))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({
      stream: true
    }));
});
