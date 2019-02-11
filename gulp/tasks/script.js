import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';

// 各種設定を読み込む
const $      = gulpLoadPlugins();
const config = require('../config').script;


// scriptタスクを定義
gulp.task('script', () => {

  return gulp.src(config.src)
    .pipe($.plumber({
      errorHandler: $.notify.onError('<%= error.message %>')
    }))
    .pipe($.babel())
    .pipe($.uglify())
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({
      stream: true
    }));

});
