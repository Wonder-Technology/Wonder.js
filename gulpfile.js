var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);

require("./build/gulp_task/clean/clean");
require("./build/gulp_task/compress/compress");
require("./build/gulp_task/compile/compileTs");
require("./build/gulp_task/compile/combineInnerLib");

require("./build/gulp_task/createDefinitionFile/index");
require("./build/gulp_task/createInnerFile/index");

require("./build/gulp_task/test/test");

gulp.task("build", gulpSync.sync(["clean", "createInnerFile", "compileTsConfig", "compileDTS", "compileTs", "compileTsDebug", "combineInnerLib", "removeReference", "compress"]));

gulp.task("buildCI", gulpSync.sync(["clean", "createInnerFile", "compileTsConfig", "compileTsDebug", "combineInnerLib", "removeReference", "compress"]));


var tsFilePaths = ["src/*.ts", "src/**/*.ts"];
var glslFilePaths = ["src/renderer/shader/chunk/glsl/**/*.glsl", "src/lib/**/*.glsl"];

gulp.task("watch", function(){
    var totalPaths = tsFilePaths.concat(glslFilePaths);

    gulp.watch(totalPaths, gulpSync.sync(["createShaderChunk", "compileTsConfig", "compileTsDebug"]));
});


