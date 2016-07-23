var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);
var path = require("path");
var karma = require("karma").server;

var karmaConfPath = path.join(process.cwd(), "test/karma.conf.js");
var ciKarmaConfPath = path.join(process.cwd(), "karma.conf.js");
var renderTestkarmaConfPath = path.join(process.cwd(), "test/karmaRenderTest.conf.js");
var renderTestToolkarmaConfPath = path.join(process.cwd(), "test/karmaRenderTool.conf.js");


require("../compile/parseTsconfigFilesGlob");
require("../compile/removeTsconfigFiles");
require("../compile/compileTs");
require("../compile/combineInnerLib");


gulp.task("testByKarma", function (done) {
    karma.start({
        configFile: karmaConfPath
        //singleRun:true,
        //autoWatch:false
    }, done);
});


var tsFilePaths = ["src/*.ts", "src/**/*.ts"];
var glslFilePaths = ["src/renderer/shader/chunk/glsl/**/*.glsl", "src/lib/**/*.glsl"];


gulp.task("compileForTest", gulpSync.sync(["createShaderChunk", "parseTsconfigFilesGlob", "compileTsDebugForTest", "removeTsconfigFiles"]));

gulp.task("watchForTest", function(){
    var totalPaths = tsFilePaths.concat(glslFilePaths);

    gulp.watch(totalPaths, gulpSync.sync(["createShaderChunk", "parseTsconfigFilesGlob", "compileTsDebugForTest", "removeTsconfigFiles"]));
});


gulp.task("test", gulpSync.sync(["compileForTest", "watchForTest", "testByKarma"]));


gulp.task("renderTest", gulpSync.sync(["compileForTest", "watchForTest", "renderTestByKarma"]));


gulp.task("renderTestByKarma", function (done) {
    karma.start({
        configFile: renderTestkarmaConfPath
        //singleRun:true,
        //autoWatch:false
    }, done);
});


gulp.task("renderTestTool", function (done) {
    karma.start({
        configFile: renderTestToolkarmaConfPath,
        singleRun:true,
        autoWatch:false
    }, done);
});


gulp.task("testInCI", function (done) {
    karma.start({
        configFile: ciKarmaConfPath,
        singleRun:true,
        autoWatch:false
    }, done);
});

var karmaSyncConfPath= path.join(process.cwd(), "test/karmaSync.conf.js");

gulp.task("testSync", function (done) {
    karma.start({
        configFile: karmaSyncConfPath
    }, done);
});


gulp.task("testRenderer", function (done) {
    karma.start({
        configFile: path.join(process.cwd(), "test/karmaRenderer.conf.js")
    }, done);
});
