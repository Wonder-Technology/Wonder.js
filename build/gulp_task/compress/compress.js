var gulp = require("gulp");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var distFilePath = "dist/wd.js";
var destDirPath = "dist/";

gulp.task("compress", function () {
    return gulp.src(distFilePath)
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest(destDirPath));
});

