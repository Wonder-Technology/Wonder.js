var gulp = require("gulp");
var gulpTs = require("gulp-typescript");
var del = require("del");
var gulpSync = require("gulp-sync")(gulp);
var path = require("path");
var getPathInfo = require("./tool/getPathInfo");

var tsFilePaths = [
    path.join(getPathInfo.getProjectDir(), "tool", "**/*.ts")
];



var distDir = path.join(getPathInfo.getWorkingDir(), "./dist/");

console.log(distDir);

var tsconfigFile = [
    "./tsconfig.json"
];

gulp.task("compileTs", function () {
    var tsProject = gulpTs.createProject(path.join(getPathInfo.getWorkingDir(), tsconfigFile[0]), {
        typescript: require('typescript')
    });

    var tsResult = tsProject.src()
        .pipe(gulpTs(tsProject))
        .pipe(gulp.dest(distDir));

    return tsResult;
});


gulp.task("clean", function () {
    return del.sync([distDir], {
        force: true
    });
});




gulp.task("build", gulpSync.sync(["clean", "compileTs"]));


gulp.task("watch", function () {
    gulp.watch(tsFilePaths, ["build"]);
});
