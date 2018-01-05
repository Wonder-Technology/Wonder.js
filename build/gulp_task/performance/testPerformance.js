var gulp = require("gulp");
var path = require("path");
var testPerformance = require(path.join(process.cwd(), "lib/js/test/e2e/performance/TestPerformance.js"));
var test = require("../e2e/test");

gulp.task("testPerformanceInCI", function (done) {
    test.testInCI(testPerformance.generateBenchmark, testPerformance.runTest, "generate benchmark...", "performance", done);
});

gulp.task("testPerformanceInLocal", function (done) {
    test.testInLocal(testPerformance.generateBenchmark, testPerformance.runTest, "generate benchmark...", "performance", done);
});
