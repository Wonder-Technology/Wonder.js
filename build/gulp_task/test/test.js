var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);
var path = require("path");
var karma = require("karma").server;
var fs = require("fs-extra");

var webgl1NoWorkerKarmaConfPath = path.join(process.cwd(), "test/karma.conf.webgl1.noWorker.js");
var webgl2NoWorkerKarmaConfPath = path.join(process.cwd(), "test/karma.conf.webgl2.noWorker.js");
var webgl1RenderWorkerKarmaConfPath = path.join(process.cwd(), "test/karma.conf.webgl1.renderWorker.js");
var webgl2RenderWorkerKarmaConfPath = path.join(process.cwd(), "test/karma.conf.webgl2.renderWorker.js");

var ciWebGL1NoWorkerKarmaConfPath = path.join(process.cwd(), "karma.conf.webgl1.noWorker.js");
var ciWebGL2NoWorkerKarmaConfPath = path.join(process.cwd(), "karma.conf.webgl2.noWorker.js");
var ciWebGL1RenderWorkerKarmaConfPath = path.join(process.cwd(), "karma.conf.webgl1.renderWorker.js");
var ciWebGL2RenderWorkerKarmaConfPath = path.join(process.cwd(), "karma.conf.webgl2.renderWorker.js");


gulp.task("webgl1NoWorkerTestByKarma", function (done) {
    karma.start({
        configFile: webgl1NoWorkerKarmaConfPath
    }, done);
});

gulp.task("webgl2NoWorkerTestByKarma", function (done) {
    karma.start({
        configFile: webgl2NoWorkerKarmaConfPath
    }, done);
});

gulp.task("webgl1RenderWorkerTestByKarma", function (done) {
    karma.start({
        configFile: webgl1RenderWorkerKarmaConfPath
    }, done);
});

gulp.task("webgl2RenderWorkerTestByKarma", function (done) {
    karma.start({
        configFile: webgl2RenderWorkerKarmaConfPath
    }, done);
});

/*!
 because "rollup" gulp task will first set wd.js file to be empty and after a while fill it, it needs to wait for wd.js file is be filled and then notice karma's watcher
 */
gulp.task("updateWDForTestFile", function (done) {
    var wdFilePath = path.join(process.cwd(), "dist/wd.js");
    var wdFileForTestPath = path.join(process.cwd(), "dist/wd.forTest.js");
    var wait = function(){
        setTimeout(function(){
            var content = fs.readFileSync(wdFilePath).toString();

            if(content.length === 0){
                wait();
                return;
            }

            fs.writeFileSync(wdFileForTestPath, content);

            done();
        }, 100);
    };

    wait();
});


gulp.task("watchWDFile", function(){
    var wdFilePath = path.join(process.cwd(), "dist/wd.js");

    gulp.watch(wdFilePath, ["updateWDForTestFile"]);
});

//todo add test
// gulp.task("test", gulpSync.sync(["updateWDForTestFile", "watchWDFile", "testByKarma", "renderWorkerTestByKarma"]));


gulp.task("testWebGL1NoWorker", gulpSync.sync(["updateWDForTestFile", "watchWDFile", "webgl1NoWorkerTestByKarma"]));

gulp.task("testWebGL2NoWorker", gulpSync.sync(["updateWDForTestFile", "watchWDFile", "webgl2NoWorkerTestByKarma"]));





gulp.task("testWebGL1RenderWorker", gulpSync.sync(["updateWDForTestFile", "watchWDFile", "webgl1RenderWorkerTestByKarma"]));

gulp.task("testWebGL2RenderWorker", gulpSync.sync(["updateWDForTestFile", "watchWDFile", "webgl2RenderWorkerTestByKarma"]));



gulp.task("webgl1NoWorkerTestInCI", function (done) {
    karma.start({
        configFile: ciWebGL1NoWorkerKarmaConfPath
    }, done);
});

gulp.task("webgl2NoWorkerTestInCI", function (done) {
    karma.start({
        configFile: ciWebGL2NoWorkerKarmaConfPath
    }, done);
});

gulp.task("webgl1RenderWorkerTestInCI", function (done) {
    karma.start({
        configFile: ciWebGL1RenderWorkerKarmaConfPath
    }, done);
});

gulp.task("webgl2RenderWorkerTestInCI", function (done) {
    karma.start({
        configFile: ciWebGL2RenderWorkerKarmaConfPath
    }, done);
});

// gulp.task("testInCI", gulpSync.sync(["webgl1RenderWorkerTestInCI", "webgl2RenderWorkerTestInCI", "webgl1NoWorkerTestInCI", "webgl2NoWorkerTestInCI"]));
// gulp.task("testInCI", gulpSync.sync(["webgl1NoWorkerTestInCI", "webgl2NoWorkerTestInCI"]));
gulp.task("testInCI", gulpSync.sync(["webgl1NoWorkerTestInCI"));

