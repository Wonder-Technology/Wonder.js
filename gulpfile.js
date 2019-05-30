var gulp = require("gulp");

require("./build/gulp_task/create_inner_file/shaderChunk");
require("./build/gulp_task/performance/testPerformance");
require("./build/gulp_task/render/testRender");
require("./build/gulp_task/e2e/upgradeConfig");


require("./build/gulp_task/install/installWithPuppeteer");





var path = require("path");

gulp.task("generateIndex", function (done) {
    var generate = require("wonder-generate-index");
    var rootDir = path.join(process.cwd(), "src"),
        destDir = "./src/";

    generate.generate("/", rootDir, ["**/api/*.re", "**/api/**/*.re"], destDir, {
        exclude: ["System.re", "Utils.re", "Common.re"]
    });

    done();
});



