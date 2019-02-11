import gulp from 'gulp';
import browserSync from 'browser-sync';

// 各種設定を読み込む
const config = require('../config').httpd;


// サーバ起動
gulp.task('httpd', () => {

  browserSync.init(config);

});
