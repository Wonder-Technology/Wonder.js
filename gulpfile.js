var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);

require("./build/gulp_task/create_inner_file/shaderChunk.js");
require("./build/gulp_task/compile/compileReason.js");
require("./build/gulp_task/rollup/rollup.js");
require("./build/gulp_task/performance/generateData");




var generate = require("wonder-generate-index");
var path = require("path");

gulp.task("generateIndex", function (done) {
    var rootDir = path.join(process.cwd(), "src"),
        destDir = "./src/";

    generate.generate("/", rootDir, ["**/api/*.re", "**/api/**/*.re"], destDir, {
        exclude: ["System.re", "Utils.re", "Common.re"]
    });

    done();
});

















gulp.task("build", gulpSync.sync(["createShaderChunkSystemFile", "compileReason", "generateIndex", "rollup"]));





