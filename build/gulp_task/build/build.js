var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);

require("../clean/clean");

require("../package/package");


gulp.task("build", gulpSync.sync(["clean", "package"]));

