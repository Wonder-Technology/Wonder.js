var gulp = require("gulp");
var path = require("path");
var testRender = require(path.join(process.cwd(), "lib/js/test/e2e/render/TestRender.js"));
var test = require("../e2e/test");

gulp.task("testRenderInCI", function (done) {
    test.testInCI("generate correct image...", "render", testRender.generateCorrectImage, testRender.runTest, done);
});

gulp.task("testRenderInLocal", function (done) {
    var reportFilePath = path.join(process.cwd(), "./test/e2e/render/report/report.html");

    test.testInLocal("generate correct image...", reportFilePath, "render", testRender.generateCorrectImage, testRender.generateReport, testRender.runTest, done);
});
