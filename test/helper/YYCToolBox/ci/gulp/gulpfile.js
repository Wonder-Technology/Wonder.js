var gulp = require('gulp');
var gulpSync = require('gulp-sync')(gulp);

require("./gulp_task/rewrite");
require("./gulp_task/pack");
require("./gulp_task/server");
require("./gulp_task/test");

gulp.task("build", gulpSync.async(["pack", "rewrite"]));
gulp.task("default", gulpSync.sync(["test", "build"]));
