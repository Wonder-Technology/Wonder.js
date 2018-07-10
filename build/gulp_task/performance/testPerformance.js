var gulp = require("gulp");
var path = require("path");
var test = require("../e2e/test");

gulp.task("testPerformanceInCI", function (done) {
    var testPerformance = require(path.join(process.cwd(), "lib/js/test/e2e/performance/TestPerformance.js"));

    test.testInCI("generate benchmark...", "performance", testPerformance.generateBenchmark, testPerformance.runTest, done);
});

gulp.task("testPerformanceInLocal", function (done) {
    var testPerformance = require(path.join(process.cwd(), "lib/js/test/e2e/performance/TestPerformance.js"));

    var reportFilePath = path.join(process.cwd(), "./test/e2e/performance/report/report.html");

    test.testInLocal("generate benchmark...", reportFilePath, "performance", testPerformance.generateBenchmark, testPerformance.generateReport, testPerformance.runTest, done);
});

gulp.task("testFastPerformance", function (done) {
    var testPerformance = require(path.join(process.cwd(), "lib/js/test/e2e/performance/TestPerformance.js"));

    var reportFilePath = path.join(process.cwd(), "./test/e2e/performance/report/report.html");

    test.fastTest("generate correct image...", reportFilePath, "performance", testPerformance.generateCorrectImage, testPerformance.generateReport, testPerformance.runTest, done);
});


function _fail(message, done) {
    console.log("fail");

    console.error(message);

    done();
}

gulp.task("generatePerformanceReport", function (done) {
    var testPerformance = require(path.join(process.cwd(), "lib/js/test/e2e/performance/TestPerformance.js"));

    var reportFilePath = path.join(process.cwd(), "./test/e2e/performance/report/report.html");

    try {
        testPerformance.generateAllCasesReport(reportFilePath).then(function () {
            done();
        }, function (e) {
            _fail(e, done);
        })
    }
    catch (e) {
        _fail(e, done);
    }
});
