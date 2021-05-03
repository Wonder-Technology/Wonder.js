'use strict';

var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var SettingTool$Wonderjs = require("../../../../../tool/service/setting/SettingTool.js");
var MainStateTool$Wonderjs = require("../../../../../tool/service/state/MainStateTool.js");
var StateDataMain$Wonderjs = require("../../../../../../src/service/state/main/data/StateDataMain.js");
var WorkerJobTool$Wonderjs = require("../../../../../tool/service/workerJob/WorkerJobTool.js");
var RenderConfigTool$Wonderjs = require("../../../../../tool/service/renderConfig/RenderConfigTool.js");
var SettingWorkerTool$Wonderjs = require("../../../tool/SettingWorkerTool.js");
var IsDebugMainService$Wonderjs = require("../../../../../../src/service/state/main/state/IsDebugMainService.js");
var SharedArrayBufferTool$Wonderjs = require("../../../../../tool/SharedArrayBufferTool.js");
var CreateStateMainService$Wonderjs = require("../../../../../../src/service/state/main/state/CreateStateMainService.js");

function initWithJobConfig(sandbox, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, param) {
  var isDebug = $staropt$star !== undefined ? $staropt$star : "true";
  var canvasId = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : undefined;
  var useHardwareInstance = $staropt$star$2 !== undefined ? $staropt$star$2 : "true";
  var context = $staropt$star$3 !== undefined ? $staropt$star$3 : "\n        {\n        \"alpha\": true,\n        \"depth\": true,\n        \"stencil\": false,\n        \"antialias\": true,\n        \"premultiplied_alpha\": true,\n        \"preserve_drawing_buffer\": false\n        }\n               ";
  var workerJobRecord = $staropt$star$4 !== undefined ? $staropt$star$4 : WorkerJobTool$Wonderjs.buildWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
  var renderConfigRecord = $staropt$star$5 !== undefined ? $staropt$star$5 : RenderConfigTool$Wonderjs.buildRenderConfig(undefined, undefined, /* () */0);
  var buffer = $staropt$star$6 !== undefined ? $staropt$star$6 : SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
  SharedArrayBufferTool$Wonderjs.setSharedArrayBufferToBeArrayBuffer();
  var state = CreateStateMainService$Wonderjs.createState(/* () */0);
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* workerDetectRecord */41];
  newrecord[/* workerDetectRecord */41] = /* record */[
    /* isSupportSharedArrayBuffer */init[/* isSupportSharedArrayBuffer */0],
    /* isSupportRenderWorkerAndSharedArrayBuffer */true
  ];
  return MainStateTool$Wonderjs.setState(RenderConfigTool$Wonderjs.create(renderConfigRecord, WorkerJobTool$Wonderjs.create(workerJobRecord, SettingWorkerTool$Wonderjs.createStateAndSetToStateData(newrecord, isDebug, Caml_option.some(canvasId), context, useHardwareInstance, "true", buffer, /* () */0))));
}

function openContractCheck(param) {
  IsDebugMainService$Wonderjs.setIsDebug(StateDataMain$Wonderjs.stateData, true);
  return /* () */0;
}

function closeContractCheck(param) {
  IsDebugMainService$Wonderjs.setIsDebug(StateDataMain$Wonderjs.stateData, false);
  return /* () */0;
}

exports.initWithJobConfig = initWithJobConfig;
exports.openContractCheck = openContractCheck;
exports.closeContractCheck = closeContractCheck;
/* SettingTool-Wonderjs Not a pure module */
