var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);

require("./packageAll");
require("./packageLite");

gulp.task("package", gulpSync.sync(["packageAll", "packageLite"]));

