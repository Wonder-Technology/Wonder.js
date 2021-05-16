'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var ViewTool$Wonderjs = require("../../../../tool/service/device/ViewTool.js");
var EventTool$Wonderjs = require("./EventTool.js");
var BrowserDetectTool$Wonderjs = require("../../../../tool/service/browserDetect/BrowserDetectTool.js");
var NoWorkerJobConfigTool$Wonderjs = require("../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js");

function buildKeyboardEvent($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, param) {
  var ctrlKey = $staropt$star !== undefined ? $staropt$star : false;
  var altKey = $staropt$star$1 !== undefined ? $staropt$star$1 : false;
  var shiftKey = $staropt$star$2 !== undefined ? $staropt$star$2 : false;
  var metaKey = $staropt$star$3 !== undefined ? $staropt$star$3 : false;
  var keyCode = $staropt$star$4 !== undefined ? $staropt$star$4 : 8;
  return {
          ctrlKey: ctrlKey,
          altKey: altKey,
          shiftKey: shiftKey,
          metaKey: metaKey,
          keyCode: keyCode
        };
}

function prepare(sandbox, $staropt$star, param) {
  var setBrowserFunc = $staropt$star !== undefined ? $staropt$star : BrowserDetectTool$Wonderjs.setChrome;
  var canvasDom = EventTool$Wonderjs.buildFakeCanvas(/* tuple */[
        0,
        0,
        null
      ]);
  var state = TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, undefined, NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"init_event\"\n        }\n      ]\n    }\n  ]\n        ", undefined, "\n[\n\n    {\n          \"name\": \"init_event\"\n    }\n]\n        ", undefined, /* () */0), undefined, /* () */0);
  return Curry._1(setBrowserFunc, ViewTool$Wonderjs.setCanvas(canvasDom, state));
}

exports.buildKeyboardEvent = buildKeyboardEvent;
exports.prepare = prepare;
/* TestTool-Wonderjs Not a pure module */
