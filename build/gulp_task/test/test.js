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


