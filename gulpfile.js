'use strict';

var gulp = require('gulp');
var karma = require('gulp-karma');
var footer = require('gulp-footer');
var header = require('gulp-header');
var concat = concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var html2js = require('gulp-ng-html2js');
var rename = require('gulp-rename');
var buildConfig = require('./build.conf');
var del = require('del');
var runSequence = require('run-sequence');

var testFiles = [
  'bower_components/moment/min/moment-with-locales.min.js',
  'bower_components/jquery/dist/jquery.min.js',
  'bower_components/angular/angular.min.js',
  'bower_components/angular-mocks/angular-mocks.js',
  'src/**/*.js',
  'template/**/*.html.js'
];

gulp.task('test-src', function () {
  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run',
      browsers: ['Chrome']
    }));
});

gulp.task('test', function () {
  runSequence('html2js',
              'jshint',
              'test-src');
});

gulp.task('html2js', function () {
  return gulp.src('template/**/*.html')
    .pipe(html2js({
      moduleName: function (file) {
        var path = file.path.split('/'),
            folder = path[path.length - 2],
            fileName = path[path.length - 1].split('.')[0];
        var name = 'ngNephila.tpls.' + folder;
        return name + '.' + fileName;
      },
      prefix: "template/"
    }))
    .pipe(rename({
      extname: ".html.js"
    }))
    .pipe(gulp.dest('template'))
});

gulp.task('build-dist', function () {
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

gulp.task('build', function () {
  return runSequence('clean',
              'html2js',
              'build-dist');
});

gulp.task('copy-bower', function () {
  gulp.src(['template/**/*.html']).pipe(gulp.dest('bower_pkg/template'));
  gulp.src(['dist/**/*']).pipe(gulp.dest('bower_pkg'));
  gulp.src([
    'README.md', 'LICENSE'
  ]).pipe(gulp.dest('bower_pkg'));

});

gulp.task('pkg-bower', function () {
  return runSequence('clean', 'html2js', 'build-dist', 'copy-bower');
});

gulp.task('jshint', function () {
  return gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('clean', function () {
  return del(['dist', 'template/**/*.html.js']);
});

gulp.task('travis-src', function () {
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

gulp.task('travis', function () {
  runSequence('html2js',
              'jshint',
              'travis-src');
});
