'use strict';

var gulp = require('gulp');
var karma = require('gulp-karma');
var footer = require('gulp-footer');
var header = require('gulp-header');
var concat = concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var buildConfig = require('./build.conf');
var del = require('del');

var testFiles = [
  'bower_components/jquery/dist/jquery.min.js',
  'bower_components/angular/angular.min.js',
  'bower_components/angular-mocks/angular-mocks.js',
  'src/**/*.js',
  'template/**/*.html'
];

gulp.task('test', function () {
  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run',
      browsers: ['Chrome']
    }));
});

gulp.task('build', function () {

  gulp.src(buildConfig.templateFiles)
  .pipe(gulp.dest(buildConfig.demo.ngNephilaTemplates));

  return gulp.src(buildConfig.pluginFiles)
    .pipe(concat('ng-nephila.js'))
    .pipe(header(buildConfig.closureStart))
    .pipe(footer(buildConfig.closureEnd))
    .pipe(header(buildConfig.banner))
    .pipe(gulp.dest(buildConfig.dist))
    .pipe(gulp.dest(buildConfig.demo.ngNephila))
    .pipe(uglify())
    .pipe(header(buildConfig.banner))
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest(buildConfig.dist))
    .pipe(gulp.dest(buildConfig.demo.ngNephila));
});

gulp.task('jshint', function () {
  return gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('clean', function () {
  return del('dist');
});

gulp.task('travis', function () {
  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run',
      reporters: ['dots', 'coverage', 'coveralls'],
      browsers: ['Firefox'],
      coverageReporter: {
        type: 'lcov',
        dir: 'coverage/',
        subdir: '.',
      }
    }));
});
