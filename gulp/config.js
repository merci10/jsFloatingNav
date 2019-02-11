const nodeEnv    = process.env.NODE_ENV; // 使用するビルド環境
const isProduction = nodeEnv === 'production'; // 本番環境かどうか
const documentRootDir = isProduction ? './build' : './temp';
const destRootDir = `${documentRootDir}`
const srcRootDir = './src'; // ソースディレクトリパス
const assetsDir  = 'assets'; // アセットディレクトリ名
const viewsDir   = 'views'; // ビュー格納先ディレクトリ名
const cssDir     = 'stylesheets'; // CSS格納先ディレクトリ
const jsDir      = 'javascripts';

// 各種タスクの設定を定義する
module.exports = {

  // defaultタスク設定情報
  default: {

    runTasks: [
      ['pug', 'sass', 'script'],
      'watch',
      'httpd',
    ],

  },

  // buildタスク設定情報
  build: {

    outputDir: documentRootDir,
    runTasks: [
      'pug',
      'sass',
      'script'
    ]

  },

  // httpdタスク設定情報
  httpd: {

    // サーバ情報
    server: {
      // ドキュメントルート
      baseDir: destRootDir
    },
    // デフォルト起動時の使用ポート番号
    port: 8000,
    // 通知表示をオフにする
    notify: false,
    // 自動でブラウザを起動しない
    open: false,

  },

  // pugタスク設定情報
  pug: {

    src: `${srcRootDir}/${assetsDir}/${viewsDir}/**/!(_)*.pug`,
    dest: destRootDir,
    watch: `${srcRootDir}/${assetsDir}/${viewsDir}/**/*.pug`,
    pug: {
      pretty: true
    }

  },

  // sassタスク設定情報
  sass: {

    src: `${srcRootDir}/${assetsDir}/${cssDir}/**/*.sass`,
    exceptionSrc: `${srcRootDir}/${assetsDir}/${cssDir}/**/_*.sass`,
    dest: `${destRootDir}/${assetsDir}/${cssDir}`,
    watch: `${srcRootDir}/${assetsDir}/${cssDir}/**/*`,
    sass: {
      indentSyntax: true,
      outputStyle: 'expanded'
    },
    autoprefixer: {
      browsers: [
        'last 3 versions',
        'IE >= 11',
        'iOS >= 7',
        'Android >= 4'
      ]
    }

  },

  // scriptタスク設定情報
  script: {

    src: `${srcRootDir}/${assetsDir}/${jsDir}/**`,
    dest: `${destRootDir}/${assetsDir}/${jsDir}`,
    watch: `${srcRootDir}/${assetsDir}/${jsDir}/**`,
    babel: {
      presets: ['env']
    }
  }

}
