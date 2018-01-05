open WonderBenchmark;

open PerformanceTestData;

open Js.Promise;

let generateBenchmark = () => TestPerformance.generateBenchmark(performanceTestData);

let generateReport = (debugFilePath, failList) =>
  TestPerformance.generateReport(debugFilePath, failList, performanceTestData);

let runTest = (browserArr) => TestPerformance.runTest(browserArr, performanceTestData);