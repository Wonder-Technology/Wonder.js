open WonderBenchmark;

open PerformanceTestData;

open Js.Promise;

let generateBenchmark = () => Tester.generateBenchmark(performanceTestData);

let generateReport = (debugFilePath, failList) =>
  Tester.generateReport(debugFilePath, failList, performanceTestData);

let runTest = (browserArr) => Tester.runTest(browserArr, performanceTestData);