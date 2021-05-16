'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var ViewTool$Wonderjs = require("../../../../tool/service/device/ViewTool.js");
var EventTool$Wonderjs = require("./EventTool.js");
var BrowserDetectTool$Wonderjs = require("../../../../tool/service/browserDetect/BrowserDetectTool.js");
var NoWorkerJobConfigTool$Wonderjs = require("../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js");
var HandleTouchEventMainService$Wonderjs = require("../../../../../src/service/state/main/event/handle/HandleTouchEventMainService.js");

function buildTouchData($staropt$star, $staropt$star$1, param) {
  var pageX = $staropt$star !== undefined ? $staropt$star : 10;
  var pageY = $staropt$star$1 !== undefined ? $staropt$star$1 : 20;
  return {
          clientX: 0,
          clientY: 0,
          pageX: pageX,
          pageY: pageY,
          identifier: 0,
          screenX: 0,
          screenY: 0,
          radiusX: 0,
          radiusY: 0,
          rotationAngle: 0,
          force: 0
        };
}

function buildTouchEvent($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, param) {
  var touches = $staropt$star !== undefined ? $staropt$star : /* array */[buildTouchData(undefined, undefined, /* () */0)];
  var changedTouches = $staropt$star$1 !== undefined ? $staropt$star$1 : /* array */[buildTouchData(undefined, undefined, /* () */0)];
  var targetTouches = $staropt$star$2 !== undefined ? $staropt$star$2 : /* array */[buildTouchData(undefined, undefined, /* () */0)];
  var preventDefaultFunc = $staropt$star$3 !== undefined ? $staropt$star$3 : (function (param) {
        return /* () */0;
      });
  var stopPropagationFunc = $staropt$star$4 !== undefined ? $staropt$star$4 : (function (param) {
        return /* () */0;
      });
  return {
          touches: touches,
          changedTouches: changedTouches,
          targetTouches: targetTouches,
          preventDefault: preventDefaultFunc,
          stopPropagation: stopPropagationFunc
        };
}

function prepareWithState(sandbox, state, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, param) {
  var offsetLeft = $staropt$star !== undefined ? $staropt$star : 1;
  var offsetTop = $staropt$star$1 !== undefined ? $staropt$star$1 : 2;
  var offsetParent = $staropt$star$2 !== undefined ? Caml_option.valFromOption($staropt$star$2) : undefined;
  var setBrowserFunc = $staropt$star$3 !== undefined ? $staropt$star$3 : BrowserDetectTool$Wonderjs.setChrome;
  var canvasDom = EventTool$Wonderjs.buildFakeCanvas(/* tuple */[
        offsetLeft,
        offsetTop,
        offsetParent
      ]);
  return Curry._1(setBrowserFunc, ViewTool$Wonderjs.setCanvas(canvasDom, state));
}

function prepare(sandbox, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, param) {
  var offsetLeft = $staropt$star !== undefined ? $staropt$star : 1;
  var offsetTop = $staropt$star$1 !== undefined ? $staropt$star$1 : 2;
  var offsetParent = $staropt$star$2 !== undefined ? Caml_option.valFromOption($staropt$star$2) : undefined;
  var setBrowserFunc = $staropt$star$3 !== undefined ? $staropt$star$3 : BrowserDetectTool$Wonderjs.setAndroid;
  var canvasDom = EventTool$Wonderjs.buildFakeCanvas(/* tuple */[
        offsetLeft,
        offsetTop,
        offsetParent
      ]);
  var state = TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, undefined, NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"init_event\"\n        }\n      ]\n    }\n  ]\n        ", undefined, "\n[\n\n    {\n          \"name\": \"init_event\"\n    }\n]\n        ", undefined, /* () */0), undefined, /* () */0);
  return Curry._1(setBrowserFunc, ViewTool$Wonderjs.setCanvas(canvasDom, state));
}

var setLastXY = HandleTouchEventMainService$Wonderjs.setLastXY;

var getIsDrag = HandleTouchEventMainService$Wonderjs.getIsDrag;

var setIsDrag = HandleTouchEventMainService$Wonderjs.setIsDrag;

exports.setLastXY = setLastXY;
exports.getIsDrag = getIsDrag;
exports.setIsDrag = setIsDrag;
exports.buildTouchData = buildTouchData;
exports.buildTouchEvent = buildTouchEvent;
exports.prepareWithState = prepareWithState;
exports.prepare = prepare;
/* TestTool-Wonderjs Not a pure module */
