var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);

require("../clean/clean");

require("../package/packageLite");



gulp.task("buildLite", gulpSync.sync(["clean", "packageLite"]));

