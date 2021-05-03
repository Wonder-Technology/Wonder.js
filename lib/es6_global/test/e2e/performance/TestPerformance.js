

import * as Path from "path";
import * as Process from "process";
import * as Log$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Tester$WonderBenchmark from "./../../../../../node_modules/wonder-benchmark/lib/es6_global/src/Tester.js";
import * as PerformanceTestData$Wonderjs from "./data/PerformanceTestData.js";
import * as GenerateDebug$WonderBenchmark from "./../../../../../node_modules/wonder-benchmark/lib/es6_global/src/GenerateDebug.js";
import * as GenerateReport$WonderBenchmark from "./../../../../../node_modules/wonder-benchmark/lib/es6_global/src/GenerateReport.js";
import * as GenerateBenchmark$WonderBenchmark from "./../../../../../node_modules/wonder-benchmark/lib/es6_global/src/GenerateBenchmark.js";

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

export {
  generateBenchmark ,
  generateReport ,
  generateAllCasesReport ,
  runTest ,
  runOneCountTest ,
  
}
/* path Not a pure module */
