var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);

require("./build/gulp_task/clean/clean");
require("./build/gulp_task/compile/compileTs");
require("./build/gulp_task/compile/combineInnerLib");

require("./build/gulp_task/createDefinitionFile/index");


require("./build/gulp_task/package/package");

require("./build/gulp_task/test/test");

require("./build/gulp_task/build/buildCustom");

require("./build/gulp_task/build/build");
require("./build/gulp_task/build/buildAll");
require("./build/gulp_task/build/buildLite");











gulp.task("testAll", gulpSync.sync(["build", "testSingleRunByKarma", "renderTest"]));





gulp.task("watchAll", gulpSync.sync(["watchPackageAll"]));

gulp.task("watchLite", gulpSync.sync(["watchPackageLite"]));
