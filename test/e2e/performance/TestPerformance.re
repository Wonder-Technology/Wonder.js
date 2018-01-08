open WonderBenchmark;

open PerformanceTestData;

open Js.Promise;

let generateBenchmark = () => {
  GenerateBenchmark.removeFiles(
    Node.Path.join([|Node.Process.cwd(), "./test/e2e/performance/benchmark"|])
  );
  Tester.generateBenchmark(performanceTestData)
};

let generateReport = (reportFilePath, failList) => {
  GenerateReport.removeFile(
    Node.Path.join([|Node.Process.cwd(), "./test/e2e/performance/report/report.html"|])
  );
  GenerateDebug.removeFiles(
    Node.Path.join([|Node.Process.cwd(), "./test/e2e/performance/report"|]),
    Some(Node.Path.join([|Node.Process.cwd(), "./dist/base"|]))
  );
  Tester.generateReport(reportFilePath, failList, performanceTestData)
};

let runTest = (browserArr) => Tester.runTest(browserArr, performanceTestData);