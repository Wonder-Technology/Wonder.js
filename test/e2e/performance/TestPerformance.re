open WonderBenchmark;

open PerformanceTestData;

open Js.Promise;

let generateBenchmark = () => {
  GenerateBenchmark.removeFiles(
    Node.Path.join([|
      Node.Process.cwd(),
      "./test/e2e/performance/benchmark",
    |]),
  );
  let copiedTargetDirForBaseScript =
    Node.Path.join([|Node.Process.cwd(), "./dist/base"|]);
  GenerateDebug.removeFiles(
    Node.Path.join([|Node.Process.cwd(), "./test/e2e/performance/report"|]),
    Some(copiedTargetDirForBaseScript),
  );
  WonderLog.Log.log(
    {j|copy base script to $(copiedTargetDirForBaseScript)...|j},
  )
  |> ignore;
  Tester.copyBaseScript(performanceTestData);
  Tester.generateBenchmark(performanceTestData);
};

/* let copyBaseScript = () => Tester.copyBaseScript(performanceTestData); */
let generateReport = (reportFilePath, failList) => {
  GenerateReport.removeFile(
    Node.Path.join([|
      Node.Process.cwd(),
      "./test/e2e/performance/report/report.html",
    |]),
  );
  GenerateDebug.removeFiles(
    Node.Path.join([|Node.Process.cwd(), "./test/e2e/performance/report"|]),
    None,
  );
  Tester.generateReport(reportFilePath, failList, performanceTestData);
};

let generateAllCasesReport = reportFilePath => {
  GenerateReport.removeFile(
    Node.Path.join([|
      Node.Process.cwd(),
      "./test/e2e/performance/report/report.html",
    |]),
  );
  GenerateDebug.removeFiles(
    Node.Path.join([|Node.Process.cwd(), "./test/e2e/performance/report"|]),
    None,
  );
  Tester.generateAllCasesReport(reportFilePath, performanceTestData);
};

let runTest = browserArr => Tester.runTest(browserArr, performanceTestData);

let runOneCountTest = browserArr =>
  Tester.runTest(
    browserArr,
    {
      ...performanceTestData,
      commonData: {
        ...performanceTestData.commonData,
        execCountWhenTest: 1,
        execCountWhenGenerateBenchmark: 1,
        compareCount: 1,
      },
    },
  );