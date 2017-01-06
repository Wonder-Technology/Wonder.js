var through = require("through-gulp");
var gulp = require("gulp");
var gulpTs = require("gulp-typescript");
var gulpSourcemaps = require("gulp-sourcemaps");
var gulpConcat = require("gulp-concat");
var gutil = require("gulp-util");

var merge = require("merge2");
var fs = require("fs-extra");
var path = require("path");



function compileDTS(tsconfigPath, fileName) {
    var compilerOptions = {
        "target": "es5",
        "noImplicitAny": false,
        "sourceMap": false,
        "declaration": true,
        "noEmitOnError": false,
        "removeComments": true,
        "experimentalDecorators": true,

        "typescript": require('typescript')
    };
    var tsProject = gulpTs.createProject(tsconfigPath, compilerOptions);

    var tsResult = tsProject.src()
        .pipe(tsProject());

    return merge([
        tsResult.dts
            .pipe(gulpConcat(fileName))
            .pipe(gulp.dest("dist/"))
    ])
}


function compileTs(tsconfigPath, fileName) {
    var compilerOptions = {
        "target": "es5",
        "noImplicitAny": false,
        "sourceMap": false,
        "declaration": false,
        "noEmitOnError": true,
        "removeComments": true,
        "experimentalDecorators": true,


        "outFile": fileName,
        "typescript": require('typescript')
    };
    var tsProject = gulpTs.createProject(tsconfigPath, compilerOptions);

    var tsResult = tsProject.src()
        .pipe(tsProject())
        .pipe(gulp.dest("dist/"));

    return tsResult;
}

function compileTsDebug(tsconfigPath, fileName) {
    var compilerOptions = {
        "target": "es5",
        "noImplicitAny": false,
        "sourceMap": false,
        "declaration": false,
        "noEmitOnError": true,
        "removeComments": true,
        "experimentalDecorators": true,


        "outFile": fileName,
        "typescript": require('typescript')
    };
    var tsProject = gulpTs.createProject(tsconfigPath, compilerOptions);

    var tsResult = tsProject.src()
        .pipe(gulpSourcemaps.init())
        .pipe(tsProject())
        .pipe(gulpSourcemaps.write("./"))
        .pipe(gulp.dest("dist/"));


    return tsResult;
}


var PLUGIN_NAME = "changeDistFilePath";

gulp.task("changeDistFilePath", function() {
    return gulp.src("dist/src/*")
        .pipe(through(function (file, encoding, callback) {
            var map = null;

            if (file.isNull()) {
                this.emit("error", new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
                return callback();
            }
            if (file.isBuffer()) {
                this.push(file);

                fs.writeFileSync(file.path.replace("src/", ""), file.contents.toString(), "utf8");

                callback();
            }
            if (file.isStream()) {
                this.emit("error", new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
                return callback();
            }
        }, function (callback) {
            fs.removeSync("dist/src");

            callback();
        }));
});



module.exports = {
    compileDTS: compileDTS,
    compileTs: compileTs,
    compileTsDebug: compileTsDebug
};

