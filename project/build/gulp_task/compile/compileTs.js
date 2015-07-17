var gulp = require("gulp");
var gulpTs = require("gulp-typescript");
var gulpSourcemaps = require("gulp-sourcemaps");
var gulpConcat = require("gulp-concat");
var merge = require("merge2");


var tsFilePaths = [
    "engine/*.ts",
    "engine/**/*.ts"
    //"engine/Camera.ts",
    //"engine/math/*.ts"
    //"engine/structure/Point.ts"
];

//todo remove "///reference" of d.ts file?
gulp.task("compileTs", function() {
    var tsResult = gulp.src(tsFilePaths)
        .pipe(gulpSourcemaps.init())
        .pipe(gulpTs({
            declarationFiles: true,
            target: "ES5",
            sortOutput:true,
            noEmitOnError: true,
            //noExternalResolve: true
            //out: "dyR.js"
            typescript: require("typescript")
        }));


    return merge([
        tsResult.dts
            .pipe(gulpConcat("Engine.d.ts"))
            .pipe(gulp.dest("dist")),
        tsResult.js
            .pipe(gulpConcat("Engine.js"))
            .pipe(gulpSourcemaps.write("./"))
            .pipe(gulp.dest("dist/"))
    ])
});

