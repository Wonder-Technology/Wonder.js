var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);

require("../clean/clean");

require("../package/packageAll");


gulp.task("buildAll", gulpSync.sync(["clean", "packageAll"]));

