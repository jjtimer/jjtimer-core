var gulp = require('gulp');

var jshint = require('gulp-jshint');

var mocha = require('gulp-mocha');

gulp.task('lint', function() {
  return gulp.src('src/*.js').
    pipe(jshint()).
    pipe(jshint.reporter('default'));
});

gulp.task('test', function() {
  return gulp.src('test/*.js').pipe(mocha());
});
