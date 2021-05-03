'use strict';

var Path = require("path");
var Process = require("process");
var RenderTestData$Wonderjs = require("./data/RenderTestData.js");
var Tester$WonderRenderTest = require("wonder-render-test/lib/js/src/Tester.js");
var GenerateReport$WonderRenderTest = require("wonder-render-test/lib/js/src/GenerateReport.js");
var GenerateCorrectImage$WonderRenderTest = require("wonder-render-test/lib/js/src/GenerateCorrectImage.js");

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

exports.generateCorrectImage = generateCorrectImage;
exports.generateReport = generateReport;
exports.runTest = runTest;
/* path Not a pure module */
