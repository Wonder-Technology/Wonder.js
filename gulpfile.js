var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);

require("./build/gulp_task/create_inner_file/shaderChunk");
require("./build/gulp_task/rollup/rollup");
require("./build/gulp_task/performance/testPerformance");
require("./build/gulp_task/render/testRender");
require("./build/gulp_task/e2e/upgradeConfig");




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









gulp.task("buildForRunTest", gulpSync.sync(["createShaderChunkSystemFile", "generateIndex", "rollup"]));







gulp.task("build", gulpSync.sync(["createShaderChunkSystemFile", "generateIndex", "rollup"]));