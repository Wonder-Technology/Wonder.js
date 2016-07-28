var sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    gulp = require('gulp');

gulp.task('sass', function () {
    return gulp.src(['public/css/*.scss', 'public/css/**/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/css/'));
});

