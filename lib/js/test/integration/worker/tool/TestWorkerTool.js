'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var OptionService$Wonderjs = require("../../../../src/service/atom/OptionService.js");
var RenderWorkerStateTool$Wonderjs = require("../../../tool/service/state/RenderWorkerStateTool.js");

function clear(sandbox) {
  Curry._1(Sinon.restoreSandbox, sandbox[0]);
  RenderWorkerStateTool$Wonderjs.getStateData(/* () */0)[/* state */0] = undefined;
  return /* () */0;
}

function _markWorker(useWorker, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* settingRecord */0];
  newrecord[/* settingRecord */0] = /* record */[
    /* canvasId */init[/* canvasId */0],
    /* memory */init[/* memory */1],
    /* buffer */init[/* buffer */2],
    /* isDebug */init[/* isDebug */3],
    /* context */init[/* context */4],
    /* gpu */init[/* gpu */5],
    /* worker */(OptionService$Wonderjs.unsafeGet(state[/* settingRecord */0][/* worker */6]), /* record */[/* useWorker */useWorker])
  ];
  var init$1 = state[/* workerDetectRecord */41];
  newrecord[/* workerDetectRecord */41] = /* record */[
    /* isSupportSharedArrayBuffer */init$1[/* isSupportSharedArrayBuffer */0],
    /* isSupportRenderWorkerAndSharedArrayBuffer */useWorker
  ];
  return newrecord;
}

function markUseWorker(state) {
  return _markWorker(true, state);
}

function markNotUseWorker(state) {
  return _markWorker(false, state);
}

exports.clear = clear;
exports._markWorker = _markWorker;
exports.markUseWorker = markUseWorker;
exports.markNotUseWorker = markNotUseWorker;
/* Sinon Not a pure module */
