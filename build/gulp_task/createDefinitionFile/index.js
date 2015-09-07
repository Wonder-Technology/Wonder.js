var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);

require("./bowser/create");

gulp.task("createDefinitionFile", gulpSync.async(["createBowserDefinitionFile"]));

