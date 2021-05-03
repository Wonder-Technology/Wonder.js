'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var ViewTool$Wonderjs = require("../../../../tool/service/device/ViewTool.js");
var EventTool$Wonderjs = require("./EventTool.js");
var BrowserDetectTool$Wonderjs = require("../../../../tool/service/browserDetect/BrowserDetectTool.js");
var NoWorkerJobConfigTool$Wonderjs = require("../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js");
var HandleMouseEventMainService$Wonderjs = require("../../../../../src/service/state/main/event/handle/HandleMouseEventMainService.js");

function buildMouseEvent($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, $staropt$star$7, $staropt$star$8, param) {
  var pageX = $staropt$star !== undefined ? $staropt$star : 10;
  var pageY = $staropt$star$1 !== undefined ? $staropt$star$1 : 20;
  var which = $staropt$star$2 !== undefined ? $staropt$star$2 : 0;
  var movementX = $staropt$star$3 !== undefined ? $staropt$star$3 : 1;
  var movementY = $staropt$star$4 !== undefined ? $staropt$star$4 : 2;
  var detail = $staropt$star$5 !== undefined ? Caml_option.valFromOption($staropt$star$5) : undefined;
  var wheelDelta = $staropt$star$6 !== undefined ? Caml_option.valFromOption($staropt$star$6) : undefined;
  var preventDefaultFunc = $staropt$star$7 !== undefined ? $staropt$star$7 : (function (param) {
        return /* () */0;
      });
  var stopPropagationFunc = $staropt$star$8 !== undefined ? $staropt$star$8 : (function (param) {
        return /* () */0;
      });
  return {
          pageX: pageX,
          pageY: pageY,
          which: which,
          movementX: movementX,
          movementY: movementY,
          detail: detail,
          wheelDelta: wheelDelta,
          preventDefault: preventDefaultFunc,
          stopPropagation: stopPropagationFunc
        };
}

function setPointerLocked (){
 document.pointerLockElement = {};
  };

function setNotPointerLocked (){
 document.pointerLockElement = undefined;
  };

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
  var setBrowserFunc = $staropt$star$3 !== undefined ? $staropt$star$3 : BrowserDetectTool$Wonderjs.setChrome;
  return prepareWithState(sandbox, TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, undefined, NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"init_event\"\n        }\n      ]\n    }\n  ]\n        ", undefined, "\n[\n\n    {\n          \"name\": \"init_event\"\n    }\n]\n        ", undefined, /* () */0), undefined, /* () */0), offsetLeft, offsetTop, Caml_option.some(offsetParent), setBrowserFunc, /* () */0);
}

function prepareForPointerLock(sandbox, state) {
  var canvas = ViewTool$Wonderjs.unsafeGetCanvas(state);
  var requestPointerLockStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
  canvas.requestPointerLock = requestPointerLockStub;
  return /* tuple */[
          state,
          requestPointerLockStub
        ];
}

var setLastXY = HandleMouseEventMainService$Wonderjs.setLastXY;

var getIsDrag = HandleMouseEventMainService$Wonderjs.getIsDrag;

var setIsDrag = HandleMouseEventMainService$Wonderjs.setIsDrag;

exports.setLastXY = setLastXY;
exports.getIsDrag = getIsDrag;
exports.setIsDrag = setIsDrag;
exports.buildMouseEvent = buildMouseEvent;
exports.setPointerLocked = setPointerLocked;
exports.setNotPointerLocked = setNotPointerLocked;
exports.prepareWithState = prepareWithState;
exports.prepare = prepare;
exports.prepareForPointerLock = prepareForPointerLock;
/* Sinon Not a pure module */
