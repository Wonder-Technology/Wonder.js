var gulp = require("gulp");
var path = require("path");
var testPerformance = require(path.join(process.cwd(), "lib/js/test/e2e/performance/TestPerformance.js"));
var test = require("../e2e/test");

gulp.task("testPerformanceInCI", function (done) {
    test.testInCI("generate benchmark...", "performance", testPerformance.generateBenchmark, testPerformance.runTest, done);
});

gulp.task("testPerformanceInLocal", function (done) {
    var reportFilePath = path.join(process.cwd(), "./test/e2e/performance/report/report.html");

    test.testInLocal("generate benchmark...", reportFilePath, "performance", testPerformance.generateBenchmark, testPerformance.generateReport, testPerformance.runTest, done);
});
