var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);
var path = require("path");


var wonderPackage = require("wonder-package");

var bundleDTS = wonderPackage.bundleDTS;
var compileTs = wonderPackage.compileTs;
var package = wonderPackage.package;
var format = wonderPackage.format;


var config = require("./build/gulp_task/common/config");




var tsFilePaths = config.tsFilePaths;
var tsFileDir = config.tsFileDir;
var distPath = config.distPath;
var tsconfigFile = config.tsconfigFile;
var indexFileDir = config.indexFileDir;
var glslFilePaths = config.glslFilePaths;




var createShaderChunk = require("./build/gulp_task/createInnerFile/ShaderChunk/create").createShaderChunk;


require("./build/gulp_task/clean/clean");




gulp.task("compileTsES2015", function(done) {
    compileTs.compileTsES2015(path.join(process.cwd(), tsconfigFile), {
        sourceDir: tsFileDir,
        cwd:"/",
        targetDir:path.join(distPath, "./es2015/")
    }, done);
});

gulp.task("generateDTS", function(done) {
    var indexDTSPath = path.join(indexFileDir, "index.d.ts"),
        name = "wonder.js/dist/es2015";

    bundleDTS.generateDTS(indexDTSPath, name, path.join(distPath, "wd.d.ts"), path.join(distPath, "wd.noDelcareModule.d.ts"));

    done();
});

gulp.task("rollup", function(done) {
    package.rollup(path.join(process.cwd(), "./rollup.config.js"), done);
});

gulp.task("formatTs", function(done) {
    format.formatTs(tsFilePaths, "/", done);
});


gulp.task("createShaderChunk", function() {
    return createShaderChunk(glslFilePaths);
});



gulp.task("build", gulpSync.sync(["clean", "createShaderChunk", "compileTsES2015", "generateDTS", "generateDTS", "rollup", "formatTs"]));



gulp.task("watch", function(){
    var totalPaths = tsFilePaths.concat(glslFilePaths);

    gulp.watch(totalPaths, gulpSync.sync(["createShaderChunk", "compileTsES2015", "rollup"]));
});
