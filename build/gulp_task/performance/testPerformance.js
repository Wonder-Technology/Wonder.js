var gulp = require("gulp");
var path = require("path");
var testPerformance = require(path.join(process.cwd(), "lib/js/test/e2e/performance/TestPerformance.js"));
var test = require("../e2e/test");

gulp.task("testPerformance", function (done) {
    test.test(testPerformance.generateBenchmark, testPerformance.runTest, "generate benchmark...", "performance", done);
});
