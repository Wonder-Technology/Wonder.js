var gulp = require("gulp");
var gulpTs = require("gulp-typescript");
var del = require("del");
var gulpSync = require("gulp-sync")(gulp);
var path = require("path");

var tsFilePaths = [
    path.join(path.dirname(__dirname), "**/*.ts")
];


var distDir = path.join(process.cwd(), "./dist/");

var tsconfigFile = [
    "./tsconfig.json"
];

gulp.task("compileTs", function () {
    var tsProject = gulpTs.createProject(path.join(process.cwd(), tsconfigFile[0]), {
        typescript: require('typescript')
    });

    var tsResult = tsProject.src()
        .pipe(tsProject())
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
