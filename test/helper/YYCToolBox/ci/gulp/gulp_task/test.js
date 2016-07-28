var gulp = require('gulp');
var plumber = require('gulp-plumber');
var gulpShell = require("gulp-shell");
var fs = require("fs");
var buildConfigOperator = require("../gulp_plugin/lib/buildConfigOperator");

var buildConfig  = buildConfigOperator.read();

var karma = require("karma").server;

gulp.task("clientTest", function (done) {
    karma.start({
        configFile: process.cwd() + buildConfig.karmaConfPath,
        singleRun:true,
        autoWatch:false
    }, done);
});


gulp.task("serverTest",["clientTest"], function () {
    return gulp.src("")
        .pipe(plumber())
        .pipe(gulpShell([
            "jasmine-node " + buildConfig.jasmineNodeTestDir
        ]))
});

gulp.task("test", ["serverTest"]);
