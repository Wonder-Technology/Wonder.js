var gulp = require("gulp");
var gulpTs = require("gulp-typescript");
var del = require("del");
var gulpSync = require("gulp-sync")(gulp);
var path = require("path");

var tsFilePaths = [
    "**/*.ts"
];


gulp.task("build", gulpSync.sync(["clean", "compileTs"]));


gulp.task("watch", function () {
    gulp.watch(tsFilePaths, ["build"]);
});
