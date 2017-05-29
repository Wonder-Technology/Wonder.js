var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);
var path = require("path");
var karma = require("karma").server;
var fs = require("fs-extra");

var karmaConfPath = path.join(process.cwd(), "test/karma.conf.js");
var ciKarmaConfPath = path.join(process.cwd(), "karma.conf.js");


gulp.task("testByKarma", function (done) {
    karma.start({
        configFile: karmaConfPath
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


gulp.task("test", gulpSync.sync(["updateWDForTestFile", "watchWDFile", "testByKarma"]));




gulp.task("testInCI", function (done) {
    karma.start({
        configFile: ciKarmaConfPath,
        singleRun:true,
        autoWatch:false
    }, done);
});
