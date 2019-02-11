import gulp from 'gulp';
import runSequence from 'run-sequence';

// 各種設定を読み込む
const config = require('../config').default;


// default実行タスク
gulp.task('default', () => {

  // 各タスクを実行する
  runSequence(...config.runTasks);

});
