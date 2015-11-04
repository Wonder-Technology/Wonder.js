var gulp = require("gulp");
//var gulpSourcemaps = require("gulp-sourcemaps");
var gulpTs = require("gulp-typescript");
var merge = require("merge2");
var gulpConcat = require("gulp-concat");
//var plumber = require("gulp-plumber");
//var Converter = require("Converter");

//gulp.task("convert", function(){
//    //todo get sourceDir, destDir from commandLine
//    return gulp.src()
//        .pipe(plumber())
//        .pipe(Converter.convert());
//});



var tsFilePaths = [
    "*.ts",
    "**/*.ts"
];
//var distFilePaths = [
//    'dist/*.ts',
//    'dist/*.js'
//];

gulp.task("compileTs", function() {
    //return gulp.src(tsFilePaths)
    //    //.pipe(gulpSourcemaps.init())
    //    .pipe(gulpTs({
    //        declarationFiles: true,
    //        target: "ES5",
    //        //module: "commonjs",
    //        //moduleResolution: "node",
    //        experimentalDecorators: true,
    //        //sortOutput:true,
    //        //noEmitOnError: true,
    //        removeComments:true,
    //        out: "converter.js",
    //        typescript: require("typescript")
    //    }))
    //    .pipe(gulp.dest("./dist"))




    var tsResult = gulp.src(tsFilePaths)
    //return gulp.src(tsFilePaths)
        //.pipe(gulpSourcemaps.init())
        .pipe(gulpTs({
            "experimentalDecorators": true,
            "emitDecoratorMetadata": true,
            "declaration": false,
            //"noImplicitAny": true,
            "removeComments": true,
            //"noLib": false,
            "preserveConstEnums": true,
            //noExternalResolve:true,
            "suppressImplicitAnyIndexErrors": true,
            target: "ES5",
            module: "commonjs",
            moduleResolution: "node",
            sortOutput:true,
            noEmitOnError: true,
            //out: "converter.js",
            //"isolatedModules": true,
            typescript: require("typescript")
        }))
        //.pipe(gulp.dest("./dist"))



    return merge([
        tsResult.js
            .pipe(gulpConcat("converter.js"))
            //.pipe(gulpSourcemaps.write())
            .pipe(gulp.dest("dist"))
    ])
});

gulp.task("watch", function(){
    gulp.watch(tsFilePaths, gulpSync.sync(["compileTs"]));
});

