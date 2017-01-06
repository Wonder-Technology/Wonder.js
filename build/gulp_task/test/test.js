var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);
var path = require("path");
var karma = require("karma").server;

var karmaConfPath = path.join(process.cwd(), "test/karma.conf.js");
var liteKarmaConfPath = path.join(process.cwd(), "test/liteKarma.conf.js");
var ciKarmaConfPath = path.join(process.cwd(), "karma.conf.js");
var renderTestkarmaConfPath = path.join(process.cwd(), "test/renderTestKarma.conf.js");
var renderTestToolkarmaConfPath = path.join(process.cwd(), "test/renderToolKarma.conf.js");


require("../package/package");


gulp.task("testByKarma", function (done) {
    karma.start({
        configFile: karmaConfPath
        //singleRun:true,
        //autoWatch:false
    }, done);
});


gulp.task("liteTestByKarma", function (done) {
    karma.start({
        configFile: liteKarmaConfPath
    }, done);
});




gulp.task("testSingleRunByKarma", function (done) {
    karma.start({
        configFile: karmaConfPath,
        singleRun:true,
        autoWatch:false
    }, done);
});


gulp.task("test", gulpSync.sync(["testByKarma"]));


gulp.task("liteTest", gulpSync.sync(["liteTestByKarma"]));



gulp.task("renderTest", gulpSync.sync(["renderTestByKarma"]));

gulp.task("renderTestTool", gulpSync.sync(["renderTestToolByKarma"]));


gulp.task("renderTestByKarma", function (done) {
    karma.start({
        configFile: renderTestkarmaConfPath
        //singleRun:true,
        //autoWatch:false
    }, done);
});


gulp.task("renderTestToolByKarma", function (done) {
    karma.start({
        configFile: renderTestToolkarmaConfPath
        //singleRun:true,
        //autoWatch:false
    }, done);
});


gulp.task("testInCI", function (done) {
    karma.start({
        configFile: ciKarmaConfPath,
        singleRun:true,
        autoWatch:false
    }, done);
});


