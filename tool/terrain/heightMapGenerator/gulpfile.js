var gulp = require("gulp");
var gs = require("glob-stream");
var fs = require("fs-extra");
var gulpTs = require("gulp-typescript");
var merge = require("merge2");
var del = require("del");
var wdFrp = require("wdfrp");
var path = require("path");


gulp.task("generateHeightMap", function (done) {
    var Generator = require("./dist/Generator");
    var method = parseOption("--method") || "fault",
        iterationCount = Number(parseOption("--iterationCount")) || 100,
        width = Number(parseOption("--width")) || 256,
        height = Number(parseOption("--height")) || 256,
        smoothLevel = Number(parseOption("--smoothLevel")) || 0,
        method = parseOption("--method") || "fault",
        destDir = parseOption("--destDir") || "./dest/",
        generator = Generator.create();

    if(smoothLevel < 0 || smoothLevel > 5){
        throw new Error("smoothLevel should in [0,5]");
    }

    destDir = path.join(__dirname, destDir);

    /*!
    //todo why
    wdFrp.fromArray([
       wdFrp.fromNodeCallback(fs.remove)(destDir),
       wdFrp.fromNodeCallback(fs.mkdirs)(destDir),
       wdFrp.fromReadableStream(
            generator.generateHeightMap(method, iterationCount, width, height, smoothLevel, destDir)
        )
    ])

    or
    wdFrp.fromNodeCallback(fs.remove)(destDir)
     .concat(wdFrp.fromNodeCallback(fs.mkdirs)(destDir),
     wdFrp.fromReadableStream(
         generator.generateHeightMap(method, iterationCount, width, height, smoothLevel, destDir)
     ))

    error???
    (the "wdFrp.fromNodeCallback(fs.mkdirs)(destDir)" exec after "wdFrp.fromReadableStream" ???)
    ???
    */

    wdFrp.fromArray([
       fs.removeSync(destDir),
       fs.mkdirsSync(destDir)
    ])
        .concat(
    generator.generateHeightMap(method, iterationCount, width, height, smoothLevel, destDir)
        )
        .subscribe(function (data) {
            //console.log("data", data);
        }, function (e) {
            console.log("error:", e);
            done();
        }, function () {
            console.log("completed");
            done();
        });
});

function parseOption(name) {
    var value = null,
        i = process.argv.indexOf(name);

    if (i > -1) {
        value = process.argv[i + 1];
    }

    return value;
}


var distDir = path.join(__dirname, "./dist/");

var tsconfigFile = [
    "./tsconfig.json"
];

gulp.task("compileTs", function () {
    var tsProject = gulpTs.createProject(path.join(process.cwd(), tsconfigFile[0]), {
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


require("../../gulp_task/common");



