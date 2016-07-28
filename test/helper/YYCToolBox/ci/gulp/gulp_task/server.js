require("./compile/sass");
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var reload = browserSync.reload;
var port = require("../../setting").serverPort;

// Static Server + watching scss/html files
gulp.task('server', ['sass'], function () {

    browserSync.init({
        proxy: "localhost:" + port + "/pc"
    });

    gulp.watch(["public/css/*.scss", "public/css/**/*.scss"], ['sass'])
        .on("change", reload);
    //gulp.watch("app/*.html").on('change', reload);
});

//// Compile sass into CSS & auto-inject into browsers
//gulp.task('sass', function() {
//    return gulp.src("app/scss/*.scss")
//        .pipe(sass())
//        .pipe(gulp.dest("app/css"))
//        .pipe(reload({stream: true}));
//});

//gulp.task('default', ['serve']);
