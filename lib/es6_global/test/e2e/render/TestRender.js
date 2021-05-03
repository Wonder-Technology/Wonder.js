

import * as Path from "path";
import * as Process from "process";
import * as RenderTestData$Wonderjs from "./data/RenderTestData.js";
import * as Tester$WonderRenderTest from "./../../../../../node_modules/wonder-render-test/lib/es6_global/src/Tester.js";
import * as GenerateReport$WonderRenderTest from "./../../../../../node_modules/wonder-render-test/lib/es6_global/src/GenerateReport.js";
import * as GenerateCorrectImage$WonderRenderTest from "./../../../../../node_modules/wonder-render-test/lib/es6_global/src/GenerateCorrectImage.js";

function generateCorrectImage(param) {
  GenerateCorrectImage$WonderRenderTest.removeFiles(Path.join(Process.cwd(), "./test/e2e/render/screenshot"));
  return Tester$WonderRenderTest.generateCorrectImage(RenderTestData$Wonderjs.renderTestData);
}

function generateReport(reportFilePath, compareResultData) {
  GenerateReport$WonderRenderTest.removeFiles(Path.join(Process.cwd(), "./test/e2e/render/report/report.html"));
  return Tester$WonderRenderTest.generateReport(reportFilePath, compareResultData);
}

function runTest(browserArr) {
  return Tester$WonderRenderTest.runTest(browserArr, RenderTestData$Wonderjs.renderTestData);
}

export {
  generateCorrectImage ,
  generateReport ,
  runTest ,
  
}
/* path Not a pure module */
