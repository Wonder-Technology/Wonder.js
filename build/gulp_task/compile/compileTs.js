var through = require("through-gulp");
var gulp = require("gulp");
var gulpTs = require("gulp-typescript");
var gulpSourcemaps = require("gulp-sourcemaps");
var gulpConcat = require("gulp-concat");
var merge = require("merge2");
var fs = require("fs-extra");


var tsFilePaths = [
    "src/definitions.d.ts",
    "src/*.ts",
    "src/**/*.ts"
];
var distFilePaths = [
    'dist/*.ts',
    'dist/*.js'
];

gulp.task("compileTs", function() {
    var tsResult = gulp.src(tsFilePaths)
        .pipe(gulpTs({
            declarationFiles: true,
            target: "ES5",
            sortOutput:true,
            noEmitOnError: true,
            removeComments:true,
            //noExternalResolve: true
            //out: "dyR.js"
            typescript: require("typescript")
        }));


    return merge([
        tsResult.dts
            .pipe(gulpConcat("dy.d.ts"))
            .pipe(gulp.dest("dist")),
        tsResult.js
            .pipe(gulpConcat("dy.js"))
            .pipe(gulp.dest("dist/"))
    ])
});

gulp.task("compileTsDebug", function() {
    var tsResult = gulp.src(tsFilePaths)
        .pipe(gulpSourcemaps.init())
        .pipe(gulpTs({
            declarationFiles: true,
            target: "ES5",
            sortOutput:true,
            noEmitOnError: true,
            removeComments:true,
            typescript: require("typescript")
        }));


    return merge([
        tsResult.js
            .pipe(gulpConcat("dy.debug.js"))
            .pipe(gulpSourcemaps.write())
            .pipe(gulp.dest("dist/"))
    ])
});

gulp.task("removeReference", function(){
    return gulp.src(distFilePaths)
        .pipe(through(function (file, encoding, callback) {
            var map = null;

            if (file.isNull()) {
                this.emit("error", new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
                return callback();
            }
            if (file.isBuffer()) {
                file.contents = new Buffer(file.contents.toString().replace(
                    /\/\/\/\s*<reference[^>]+>/mg, ""
                ));
                this.push(file);

                fs.writeFileSync(file.path, file.contents.toString(), "utf8");

                callback();
            }
            if (file.isStream()) {
                this.emit("error", new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
                return callback();
            }
        }, function (callback) {
            callback();
        }));

});
