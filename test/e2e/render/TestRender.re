open WonderRenderTest;

open RenderTestData;

open Js.Promise;

let generateCorrectImage = () => Tester.generateCorrectImage(renderTestData);

let generateReport = (reportFilePath, compareResultData) =>
  Tester.generateReport(reportFilePath, compareResultData);

let runTest = (browserArr) => Tester.runTest(browserArr, wrongRenderTestData);