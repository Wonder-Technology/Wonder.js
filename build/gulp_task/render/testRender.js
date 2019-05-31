var gulp = require("gulp");
var path = require("path");
var gulp = require("gulp");
var test = require("../e2e/test");
var exec = require("child_process").exec;
var fs = require("fs");


function _getGenerateDataInfo() {
    return "generate correct image...";
};

gulp.task("testRenderInCI", function (done) {
    var testRender = require(path.join(process.cwd(), "lib/js/test/e2e/render/TestRender.js"));

    test.testInCI(_getGenerateDataInfo(), "render", testRender.generateCorrectImage, testRender.runTest, done);
});

function _getCorrectDir() {
    return "./test/e2e/render/screenshot/correct/"
};

function _getTempDir() {
    return "./_temp/"
};

gulp.task("testRenderInLocal", function (done) {
    var testRender = require(path.join(process.cwd(), "lib/js/test/e2e/render/TestRender.js"));

    var reportFilePath = path.join(process.cwd(), "./test/e2e/render/report/report.html");

    test.testInLocal(_getGenerateDataInfo(), reportFilePath, "render", testRender.generateCorrectImage, testRender.generateReport, testRender.runTest, done);
});


gulp.task("generateCorrectImage", function (done) {
    var testRender = require(path.join(process.cwd(), "lib/js/test/e2e/render/TestRender.js"));

    test.generateCorrectData("render", testRender.generateCorrectImage, _getTempDir, _getCorrectDir, done);
});




gulp.task("testFastRender", function (done) {
    var testRender = require(path.join(process.cwd(), "lib/js/test/e2e/render/TestRender.js"));

    var reportFilePath = path.join(process.cwd(), "./test/e2e/render/report/report.html");

    test.fastTest(reportFilePath, testRender.generateReport, testRender.runTest, done);
});
