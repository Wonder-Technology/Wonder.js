var gulp = require("gulp");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var distFilePath = "dist/wd.js";
var destDirPath = "dist/";
var pump = require("pump");

gulp.task("compress", function (cb) {
    pump([
            gulp.src(distFilePath),
            uglify({
                /*!
                because clone.ts use ClassUtils.getClassName to find class name(exactly find the function name of the class), so the name shouldn't be mangle

                //todo use closure compiler to compress!
                 */

                mangle:{keep_fnames: true}
            }),
        rename({
            extname: '.min.js'
        }),
            gulp.dest(destDirPath)
        ],
        cb
    );
});

