var through = require("through-gulp");
var gulp = require("gulp");
var gulpTs = require("gulp-typescript");
var gulpSourcemaps = require("gulp-sourcemaps");
var gulpConcat = require("gulp-concat");

var merge = require("merge2");
var fs = require("fs-extra");
var path = require("path");

var gulpHeader = require("gulp-header");
var bowerConfig = require("../../../bower.json");
var banner = require("./banner").banner;


//var tsFilePaths = [
//    "src/filePath.d.ts",
//    "src/*.ts",
//    "src/**/*.ts"
//];
var distFilePaths = [
    'dist/*.ts',
    'dist/*.js'
];
var definitionsPath = "src/filePath.d.ts";
var tsconfigFile = [
    "src/tsconfig.json"
];


gulp.task("compileTsConfig", function(){
    var mapFilePath = function(item){
        var result = /"([^"]+)"/g.exec(item)[1];

        if(result.indexOf(".d.ts") > -1){
            return result;
        }

        return result + ".ts";
    }

    var filterFilePath = function(item){
        return item !== "";
    }

    return gulp.src(tsconfigFile)
        .pipe(through(function (file, encoding, callback) {
            var arr = null,
                tsconfig = null,
                outputConfigStr = null;

            if (file.isNull()) {
                this.emit("error", new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
                return callback();
            }
            if (file.isBuffer()) {
                arr = fs.readFileSync(path.join(process.cwd(), definitionsPath), "utf8").split('\n').filter(filterFilePath).map(mapFilePath);

                tsconfig = JSON.parse(file.contents);
                tsconfig.files = arr;

                outputConfigStr = JSON.stringify(tsconfig,null,"\t");

                fs.writeFileSync(file.path,outputConfigStr);

                this.push(file);

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
        out: "wd.js",
        typescript: require('typescript')
    });

    var tsResult = tsProject.src()
        .pipe(gulpTs(tsProject))
        .pipe(gulp.dest("dist/"));


    //return merge([
    //    tsResult.js
    //        .pipe(gulpConcat("wd.js"))
    //        .pipe(gulpHeader(banner, {bowerConfig:bowerConfig}))
    //        .pipe(gulp.dest("dist/"))
    //])

    return tsResult;
});

gulp.task("compileTsDebug", function() {
    var tsProject = gulpTs.createProject(path.join(process.cwd(), tsconfigFile[0]), {
        out: "wd.debug.js",
        typescript: require('typescript')
    });

    var tsResult = tsProject.src()
        .pipe(gulpSourcemaps.init())
        .pipe(gulpTs(tsProject))

        .pipe(gulpSourcemaps.write("./"))
        .pipe(gulpHeader(banner, {bowerConfig:bowerConfig}))
        .pipe(gulp.dest("dist/"))


    //return merge([
    //    tsResult.js
    //        .pipe(gulpSourcemaps.write("./"))
    //        .pipe(gulp.dest("dist/"))
    //])

    return tsResult;
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
