var gulp = require("gulp");
var path = require("path");
var karma = require("karma").server;

var karmaConfPath = path.join(process.cwd(), "test/karma.conf.js");

gulp.task("test", function (done) {
    karma.start({
        configFile: karmaConfPath
        //singleRun:true,
        //autoWatch:false
    }, done);
});

gulp.task("testInCI", function (done) {
    karma.start({
        configFile: karmaConfPath,
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
