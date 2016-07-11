var through = require("through-gulp");
var gulp = require("gulp");
var gulpTs = require("gulp-typescript");
var gulpSourcemaps = require("gulp-sourcemaps");
var gulpConcat = require("gulp-concat");

var merge = require("merge2");
var fs = require("fs-extra");
var path = require("path");

var tsconfigFile = [
    "src/tsconfig.json"
];


gulp.task("compileDTS", function() {
    var tsProject = gulpTs.createProject(path.join(process.cwd(), tsconfigFile[0]), {
        sortOutput: true,
        declaration: true,
        typescript: require('typescript')
    });

    var tsResult = tsProject.src()
        .pipe(gulpTs(tsProject));

    return merge([
        tsResult.dts
            .pipe(gulpConcat("wd.d.ts"))
            .pipe(gulp.dest("dist"))
    ])
});


gulp.task("compileTs", function() {
    var tsProject = gulpTs.createProject(path.join(process.cwd(), tsconfigFile[0]), {
        outFile: "wd.js",
        typescript: require('typescript')
    });

    var tsResult = tsProject.src()
        .pipe(gulpTs(tsProject))
        .pipe(gulp.dest("dist/"));

    //var tsResult = tsProject.src()
    //    .pipe(gulpTs(tsProject));
    //
    //return merge([
    //    tsResult.js
    //        .pipe(gulpConcat("wd.js"))
    //        .pipe(gulp.dest("dist"))
    //])


    return tsResult;
});

gulp.task("compileTsDebug", function() {
    var tsProject = gulpTs.createProject(path.join(process.cwd(), tsconfigFile[0]), {
        outFile: "wd.debug.js",
        //outDir:"dist/",
        typescript: require('typescript')
    });
    var tsResult = tsProject.src()
        .pipe(gulpSourcemaps.init())
        .pipe(gulpTs(tsProject))
        .pipe(gulpSourcemaps.write("./"))
        .pipe(gulp.dest("dist/"));

    return tsResult;


    //    var tsProject = gulpTs.createProject(path.join(process.cwd(), tsconfigFile[0]), {
    //    outFile: "wd.debug.js",
    //    typescript: require('typescript')
    //});
    //
    //var tsResult = tsProject.src()
    //    .pipe(gulpTs(tsProject))
    //    .pipe(gulp.dest("dist/"));
    //
    ////var tsResult = tsProject.src()
    ////    .pipe(gulpTs(tsProject));
    ////
    ////return merge([
    ////    tsResult.js
    ////        .pipe(gulpConcat("wd.js"))
    ////        .pipe(gulp.dest("dist"))
    ////])
    //
    //
    //return tsResult;
});

gulp.task("compileTsDebugForTest", function() {
    var tsProject = gulpTs.createProject(path.join(process.cwd(), tsconfigFile[0]), {
        outFile: "wd.debug.js",
        typescript: require('typescript')
    });
    var tsResult = tsProject.src()
        .pipe(gulpSourcemaps.init())
        .pipe(gulpTs(tsProject))
        .pipe(gulpSourcemaps.write())
        .pipe(gulp.dest("dist/"));

    return tsResult;
});

//gulp.task("removeReference", function(){
//    return gulp.src(distFilePaths)
//        .pipe(through(function (file, encoding, callback) {
//            var map = null;
//
//            if (file.isNull()) {
//                this.emit("error", new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
//                return callback();
//            }
//            if (file.isBuffer()) {
//                file.contents = new Buffer(file.contents.toString().replace(
//                    /\/\/\/\s*<reference[^>]+>/mg, ""
//                ));
//                this.push(file);
//
//                fs.writeFileSync(file.path, file.contents.toString(), "utf8");
//
//                callback();
//            }
//            if (file.isStream()) {
//                this.emit("error", new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
//                return callback();
//            }
//        }, function (callback) {
//            callback();
//        }));
//
//});
