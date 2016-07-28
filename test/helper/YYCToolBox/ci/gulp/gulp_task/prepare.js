require("./compile/compile");

var gulp = require('gulp');

var clean = require('gulp-clean');

gulp.task('clean', function () {
    return gulp.src('dist/*', {read: false})
        .pipe(clean());
});



var gulpCopy = require('gulp-copy');

gulp.task('copy', function () {
    return gulp.src('views/**/*')
        .pipe(gulpCopy('dist_views/', {prefix: 1}));
});

gulp.task("prepare", ["clean", "compile", "copy"]);
