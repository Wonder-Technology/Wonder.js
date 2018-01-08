open WonderRenderTest;

open RenderTestData;

open Js.Promise;

let generateCorrectImage = () => {
  GenerateCorrectImage.removeFiles(
    Node.Path.join([|Node.Process.cwd(), "./test/e2e/render/screenshot"|])
  );
  Tester.generateCorrectImage(renderTestData)
};

let generateReport = (reportFilePath, compareResultData) => {
  GenerateReport.removeFiles(
    Node.Path.join([|Node.Process.cwd(), "./test/e2e/render/report/report.html"|])
  );
  Tester.generateReport(reportFilePath, compareResultData)
};

let runTest = (browserArr) => Tester.runTest(browserArr, renderTestData);