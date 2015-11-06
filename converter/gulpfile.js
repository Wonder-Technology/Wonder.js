var gulp = require("gulp");
var gs = require("glob-stream");
var fs = require("fs-extra");
//var gulpSourcemaps = require("gulp-sourcemaps");
var gulpTs = require("gulp-typescript");
var merge = require("merge2");
var gulpConcat = require("gulp-concat");
var del = require("del");
var gulpSync = require("gulp-sync")(gulp);
var dyRt = require("dyrt");
var path = require("path");
//var plumber = require("gulp-plumber");
//var Converter = require("Converter");



gulp.task("convert", function(done){
var Converter = require("./dist/Converter");
//todo support combine multi dy files to one file(according to command line param)

    var sourceDir = parseOption("--sourceDir") || "./source/",
        destDir = parseOption("--destDir") || "./dest/",
        //destFileName = parseOption("--destDir") || "combine",
        //resultDyFiles = [],
        converter = Converter.create();






    //dyRt.fromNodeCallback()([path.join(sourceDir, "*"), path.join(sourceDir, "**")])
    //    .subscribe(function(data){
    //        converter.convert(data, resultDyFiles);
    //    }, function(e){
    //        console.log(e);
    //
    //        done();
    //    }, function(){
    //        converter.write(destDir, destFileName, resultDyFiles);
    //
    //        done();
    //    });
    //

    //dyRt.fromNodeCallback(glob)([path.join(sourceDir, "*"), path.join(sourceDir, "**")], {}) .

    //glob([path.join(sourceDir, "*"), path.join(sourceDir, "**")])

//dyRt.fromNodeCallback(fs.readFile)
//("/Users/y/Github/DYEngine/converter/common/Vector3.ts")
//.subscribe(function(data){
//    console.log(data)
//})


    dyRt.fromNodeCallback(fs.remove)(destDir)
        .concat(
            dyRt.fromStream(gs.create([path.join(sourceDir, "*"), path.join(sourceDir, "**")], {nodir:true}))
                .flatMap(function(data){
                    //console.log(path.extname(data.path));
                    return dyRt.fromNodeCallback(fs.readFile)(data.path, "utf8")
                        //.map(function(fileContent){
                        //    return converter.convert(fileContent, filePath);
                        //})
                        .flatMap(function(fileContent){
                            //return [fileContent, data.path];
                            var filePath = data.path;

                            //converter.convert(fileContent, filePath);
                            return converter.write(converter.convert(fileContent, filePath), sourceDir, destDir, filePath);
                        })
                })
        )
    //.map(function(dataArr){
    //    var fileContent = dataArr[0],
    //        filePath = dataArr[1];
    //
    //    converter.convert(fileContent, filePath);
    //
    //    return converter.write(sourceDir, destDir, filePath);
    //})
    .subscribe(function(dataArr){
        //console.log(arguments[0])
        //var fileContent = dataArr[0],
        //    filePath = dataArr[1];
        //
        //converter.convert(fileContent, filePath);
        //converter.writeSync(sourceDir, destDir, filePath);
        //console.log(data);
    }, function(e){
        console.log(e);
        done();
    }, function(){
        //converter.writeSync(destDir, destFileName);
        //converter.writeSync(destDir);

        console.log("completed");
        done();
    });




    //return gulp.src([path.join(sourceDir, "*"), path.join(sourceDir, "**")])
    //    .pipe(plumber())
    //    .pipe(converter.convert())
    //    .pipe(gulp.dest(path.join(destDir, destFileName)));
});

function parseOption(name){
    var value = null,
        i = process.argv.indexOf(name);

    if (i > -1) {
        value = process.argv[i+1];
    }

    return value;
}



var tsFilePaths = [
    "*.ts",
    "**/*.ts"
];
var distPath = "./dist/";
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




    //var tsResult = gulp.src(tsFilePaths)
    return gulp.src(tsFilePaths)
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
            //moduleResolution: "node",
            //sortOutput:true,
            noEmitOnError: true,
            //out: "converter.js",
            //"isolatedModules": true,
            typescript: require("typescript")
        }))
        .pipe(gulp.dest("./dist"))



    //return merge([
    //    tsResult.js
    //        //.pipe(gulpConcat("converter.js"))
    //        //.pipe(gulpSourcemaps.write())
    //        .pipe(gulp.dest("dist"))
    //])
});


gulp.task("clean", function() {
    return del.sync([distPath], {
        force: true
    });
});


gulp.task("build", gulpSync.sync(["clean", "compileTs"]));


gulp.task("watch", function(){
    gulp.watch(tsFilePaths, ["build"]);
});

