const gulp = require('gulp');
const typescript = require('gulp-typescript');
const plumber = require('gulp-plumber');
const notify  = require('gulp-notify');
const watch = require('gulp-watch');

// ファイルパスの定義
const paths = {
  "src": "dest/**/*.ts",
  "dest": "src/",
  "tsconfig": "./tsconfig.json"
};

/**
 * TypeScriptのファイルをビルドする
 */
gulp.task('ts-build', function() {

  gulp.src(paths.src)
      .pipe(plumber({
        errorHandler: notify.onError("Error: <%= error.message %>")
      }))
      .pipe(typescript(paths.tsconfig))
      .pipe(gulp.dest(paths.dest));
});

/**
 * 変更を監視する
 */
gulp.task('watch', function() {
  watch(paths.src, function() {
    gulp.run('ts-build');
  });
});