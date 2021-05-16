'use strict';

var Path = require("path");
var Process = require("process");
var Log$WonderLog = require("wonder-log/lib/js/src/Log.js");
var Tester$WonderBenchmark = require("wonder-benchmark/lib/js/src/Tester.js");
var PerformanceTestData$Wonderjs = require("./data/PerformanceTestData.js");
var GenerateDebug$WonderBenchmark = require("wonder-benchmark/lib/js/src/GenerateDebug.js");
var GenerateReport$WonderBenchmark = require("wonder-benchmark/lib/js/src/GenerateReport.js");
var GenerateBenchmark$WonderBenchmark = require("wonder-benchmark/lib/js/src/GenerateBenchmark.js");

function generateBenchmark(param) {
  GenerateBenchmark$WonderBenchmark.removeFiles(Path.join(Process.cwd(), "./test/e2e/performance/benchmark"));
  var copiedTargetDirForBaseScript = Path.join(Process.cwd(), "./dist/base");
  GenerateDebug$WonderBenchmark.removeFiles(Path.join(Process.cwd(), "./test/e2e/performance/report"), copiedTargetDirForBaseScript);
  Log$WonderLog.log("copy base script to " + (String(copiedTargetDirForBaseScript) + "..."));
  Tester$WonderBenchmark.copyBaseScript(PerformanceTestData$Wonderjs.performanceTestData);
  return Tester$WonderBenchmark.generateBenchmark(PerformanceTestData$Wonderjs.performanceTestData);
}

function generateReport(reportFilePath, failList) {
  GenerateReport$WonderBenchmark.removeFile(Path.join(Process.cwd(), "./test/e2e/performance/report/report.html"));
  GenerateDebug$WonderBenchmark.removeFiles(Path.join(Process.cwd(), "./test/e2e/performance/report"), undefined);
  return Tester$WonderBenchmark.generateReport(reportFilePath, failList, PerformanceTestData$Wonderjs.performanceTestData);
}

function generateAllCasesReport(reportFilePath) {
  GenerateReport$WonderBenchmark.removeFile(Path.join(Process.cwd(), "./test/e2e/performance/report/report.html"));
  GenerateDebug$WonderBenchmark.removeFiles(Path.join(Process.cwd(), "./test/e2e/performance/report"), undefined);
  return Tester$WonderBenchmark.generateAllCasesReport(reportFilePath, PerformanceTestData$Wonderjs.performanceTestData);
}

function runTest(browserArr) {
  return Tester$WonderBenchmark.runTest(browserArr, PerformanceTestData$Wonderjs.performanceTestData);
}

function runOneCountTest(browserArr) {
  var init = PerformanceTestData$Wonderjs.performanceTestData[/* commonData */0];
  return Tester$WonderBenchmark.runTest(browserArr, /* record */[
              /* commonData : record */[
                /* isClosePage */init[/* isClosePage */0],
                /* execCountWhenTest */1,
                /* execCountWhenGenerateBenchmark */1,
                /* compareCount */1,
                /* maxAllowDiffTimePercent */init[/* maxAllowDiffTimePercent */4],
                /* maxAllowDiffMemoryPercent */init[/* maxAllowDiffMemoryPercent */5],
                /* benchmarkPath */init[/* benchmarkPath */6],
                /* baseDir */init[/* baseDir */7],
                /* scriptFilePathList */init[/* scriptFilePathList */8],
                /* replaceBodyFuncStrWhenDebug */init[/* replaceBodyFuncStrWhenDebug */9]
              ],
              /* testDataList */PerformanceTestData$Wonderjs.performanceTestData[/* testDataList */1]
            ]);
}

exports.generateBenchmark = generateBenchmark;
exports.generateReport = generateReport;
exports.generateAllCasesReport = generateAllCasesReport;
exports.runTest = runTest;
exports.runOneCountTest = runOneCountTest;
/* path Not a pure module */
