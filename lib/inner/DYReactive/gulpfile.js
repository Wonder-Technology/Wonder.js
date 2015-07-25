var gulp = require('gulp');
var gulpTs = require('gulp-typescript');
var gulpSourcemaps = require('gulp-sourcemaps');
var gulpConcat = require('gulp-concat');
var del = require('del');
var gulpSync = require('gulp-sync')(gulp);
var merge = require('merge2');
var path = require('path');

var tsFilePaths = [
    'src/*.ts',
    'src/**/*.ts'
];
var distPath = path.join(process.cwd(), "dist");

gulp.task('clean', function() {
    return del.sync([distPath], {
        force: true
    });
});

gulp.task('compileTs', function() {
    var tsResult = gulp.src(tsFilePaths)
        .pipe(gulpTs({
            declarationFiles: true,
            target: 'ES5',
            sortOutput:true,
            //out: 'dyR.js'
            typescript: require('typescript')
        }));


    return  merge([
        tsResult.dts
            .pipe(gulpConcat('dyRt.d.ts'))
            .pipe(gulp.dest(distPath)),
        tsResult.js
            .pipe(gulpConcat('dyRt.js'))
            .pipe(gulp.dest(distPath))
    ])
});


gulp.task('compileTsDebug', function() {
    var tsResult = gulp.src(tsFilePaths)
        .pipe(gulpSourcemaps.init())
        .pipe(gulpTs({
            declarationFiles: true,
            target: 'ES5',
            sortOutput:true,
            //out: 'dyR.js'
            typescript: require('typescript')
        }));


    return tsResult.js
        .pipe(gulpConcat('dyRt.debug.js'))
        .pipe(gulpSourcemaps.write())
        .pipe(gulp.dest(distPath));
});


//var gulp = require("gulp");
//var gulpSync = require("gulp-sync")(gulp);
//var path = require("path");
var fs = require("fs-extra");

//gulp.task("combineInnerLib", function(done){
//
//    done();
//});


gulp.task("buildMultiDistFiles", function(done){
    buildCoreFile();
    buildAllFile();
    createInnerLibJs();
    removeOriginFile();

    done();
});

function buildCoreFile(){
    fs.copySync(path.join(distPath, "dyRt.d.ts"),path.join(distPath, "dyRt.core.d.ts"));
    fs.copySync(path.join(distPath, "dyRt.js"),path.join(distPath, "dyRt.core.js"));
}

function buildAllFile(){
    fs.copySync(path.join(distPath, "dyRt.d.ts"),path.join(distPath, "dyRt.all.d.ts"));
    fs.copySync(path.join(distPath, "dyRt.js"),path.join(distPath, "dyRt.all.js"));

    combineInnerLib(
        path.join(distPath, "dyRt.all.js"),
        path.join(process.cwd(), "src/definitions.d.ts")
    );
}


function createInnerLibJs(){
    fs.createFileSync( path.join(distPath, "dyRt.innerLib.js") );

    combineInnerLib(
        path.join(distPath, "dyRt.innerLib.js"),
        path.join(process.cwd(), "src/definitions.d.ts")
    );
}

function combineInnerLib(mainFilePath, definitionDTsPath){
    getInnerLibDTsPathArr(definitionDTsPath).forEach(function(innerLibDtsPath){
        fs.writeFileSync(
            mainFilePath,
            fs.readFileSync(innerLibDtsPath.replace("d.ts", "js"), "utf8")
            + "\n"
            + fs.readFileSync(mainFilePath, "utf8")
        );
    });
}

function getInnerLibDTsPathArr(definitionDTsPath){
    var regex = /"[^"]+\.d\.ts"/g,
        content = null,
        result = null,
        resultArr = [];

    content = fs.readFileSync(definitionDTsPath, "utf8");

    while((result = regex.exec(content)) !== null){
        resultArr.push(
            parseInnerLibDTsPath(result[0].slice(1, -1))
        );
    }

    //to make finial file is build based on definitions.d.ts's sequence
    return resultArr.reverse();
}

function parseInnerLibDTsPath(pathInDefinitionFile){
    return path.join(process.cwd(), pathInDefinitionFile.slice(3));
}



function removeOriginFile(){
    fs.removeSync(path.join(distPath, "dyRt.d.ts"));
    fs.removeSync(path.join(distPath, "dyRt.js"));
}



//todo removeReference
gulp.task("build", gulpSync.sync(["clean", "compileTs",  "compileTsDebug", "buildMultiDistFiles"]));
















var karma = require("karma").server;
var karmaConfPath = path.join(process.cwd(), "test/karma.conf.js");



gulp.task("test", gulpSync.sync(["build"]), function (done) {
    karma.start({
        configFile: karmaConfPath
    }, done);
});


//ci test(single test)

//todo if test failed, the "singleTest" task will error and it will log error info!how to eliminate it?
//reference:https://github.com/lazd/gulp-karma-test, https://github.com/lazd/gulp-karma/issues/21

gulp.task("singleTest", gulpSync.sync(["build"]), function (done) {
    karma.start({
        configFile: karmaConfPath,
        singleRun:true
    }, done);
});

gulp.task("test", function (done) {
    karma.start({
        configFile: karmaConfPath
        //singleRun:true,
        //autoWatch:false
    }, done);
});


//var testFilePaths = ["test/unit/*Spec.js", "test/unit/**/*Spec.js"];

//gulp.task("watch", function(){
//    var watcher = gulp.watch(tsFilePaths.concat(testFilePaths), ["singleTest"]);
//    //var watcher = gulp.watch(tsFilePaths, function(){
//    //    try{
//    //        gulp.run("test");
//    //    }
//    //    catch(e){
//    //
//    //    }
//    //});
//    //
//    //watcher.on("error", function(e){
//    //    //console.log(e);
//    //})
//});
gulp.task("watch", function(){
    gulp.watch(tsFilePaths, ["compileTsDebug"]);
});

//
//
//var karma = require('gulp-karma')({
//    configFile: karmaConfPath
//});
//
////// Run tests once
//gulp.task('test', gulpSync.sync(["build"]), function(done) {
//    console.log(karma);
//    // Override configuration for CI, etc
//    //return karma.once({
//    //    // reporters: ['coverage']
//    //});
//    karma.stop();
//    return karma.start({
//        //autoWatch: true
//    }, done);
//
//
//
//    //karma.run();
//    //done();
//    //karma.start({
//    //    configFile: karmaConfPath
//    //}, done);
//});
//
//// WATCH OPTION 1: gulp.watch style
//var watcher = gulp.task('watch', function() {
//    // Start a server, then, once it's ready, run tests
//    //karma.start().then(karma.run);
//
//    // Watch for changes with gulp and run tests accordingly
//    gulp.watch(tsFilePaths, function() {
//        //karma.run();
//        gulp.run("test")
//    });
//});
//
//watcher.on("error", function(){
//
//});

