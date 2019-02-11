import gulp from 'gulp';
import del from 'del';
import runSequence from 'run-sequence';

// 各種設定を読み込む
const config = require('../config').build;


// build実行タスク
gulp.task('build', ['clean'], () => {

  // 各タスクを実行する
  runSequence(...config.runTasks);

});

gulp.task('clean', () => {

  // 出力先ディレクトリを削除する
  return del([config.outputDir]);

});
