var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);

require("./build/gulp_task/clean/clean");
require("./build/gulp_task/compile/compileTs");
require("./build/gulp_task/compile/combineInnerLib");

require("./build/gulp_task/createDefinitionFile/bowser/create");
require("./build/gulp_task/test/test");

gulp.task("build", gulpSync.sync(["clean", "compileTs", "combineInnerLib"]));





