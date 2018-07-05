var gulp = require("gulp");
var path = require("path");
var test = require("../e2e/test");

gulp.task("testRenderInCI", function (done) {
    var testRender = require(path.join(process.cwd(), "lib/js/test/e2e/render/TestRender.js"));

    test.testInCI("generate correct image...", "render", testRender.generateCorrectImage, testRender.runTest, done);
});

gulp.task("testRenderInLocal", function (done) {
    var testRender = require(path.join(process.cwd(), "lib/js/test/e2e/render/TestRender.js"));

    var reportFilePath = path.join(process.cwd(), "./test/e2e/render/report/report.html");

    test.testInLocal("generate correct image...", reportFilePath, "render", testRender.generateCorrectImage, testRender.generateReport, testRender.runTest, done);
});


gulp.task("testFastRender", function (done) {
    var testRender = require(path.join(process.cwd(), "lib/js/test/e2e/render/TestRender.js"));

    var reportFilePath = path.join(process.cwd(), "./test/e2e/render/report/report.html");

    test.fastTest("generate correct image...", reportFilePath, "render", testRender.generateCorrectImage, testRender.generateReport, testRender.runTest, done);
});
