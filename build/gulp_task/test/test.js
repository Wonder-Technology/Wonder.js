var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);
var path = require("path");
var karma = require("karma").server;
var fs = require("fs-extra");

var noWorkerKarmaConfPath = path.join(process.cwd(), "test/karma.conf.js");
var renderWorkerKarmaConfPath = path.join(process.cwd(), "test/karma.conf.renderWorker.js");

var ciNoWorkerKarmaConfPath = path.join(process.cwd(), "karma.conf.js");
var ciRenderWorkerKarmaConfPath = path.join(process.cwd(), "karma.conf.renderWorker.js");


gulp.task("noWorkerTestByKarma", function (done) {
    karma.start({
        configFile: noWorkerKarmaConfPath
    }, done);
});

gulp.task("renderWorkerTestByKarma", function (done) {
    karma.start({
        configFile: renderWorkerKarmaConfPath
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


gulp.task("testNoWorker", gulpSync.sync(["updateWDForTestFile", "watchWDFile", "noWorkerTestByKarma"]));


gulp.task("testRenderWorker", gulpSync.sync(["updateWDForTestFile", "watchWDFile", "renderWorkerTestByKarma"]));



gulp.task("noWorkerTestInCI", function (done) {
    karma.start({
        configFile: ciNoWorkerKarmaConfPath
    }, done);
});

gulp.task("renderWorkerTestInCI", function (done) {
    karma.start({
        configFile: ciRenderWorkerKarmaConfPath
    }, done);
});

gulp.task("testInCI", gulpSync.sync(["noWorkerTestInCI", "renderWorkerTestInCI"]));

