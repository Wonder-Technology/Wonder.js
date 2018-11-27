

import * as Random from "../../../../node_modules/bs-platform/lib/es6/random.js";
import * as Js_primitive from "../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as SettingTool$Wonderjs from "./service/setting/SettingTool.js";
import * as StateDataMain$Wonderjs from "../../src/service/state/main/data/StateDataMain.js";
import * as NoWorkerJobTool$Wonderjs from "./service/job/no_worker/NoWorkerJobTool.js";
import * as RenderConfigTool$Wonderjs from "./service/renderConfig/RenderConfigTool.js";
import * as IsDebugMainService$Wonderjs from "../../src/service/state/main/state/IsDebugMainService.js";
import * as NoWorkerJobConfigTool$Wonderjs from "./service/noWorkerJob/NoWorkerJobConfigTool.js";
import * as SharedArrayBufferTool$Wonderjs from "./SharedArrayBufferTool.js";
import * as NoWorkerJobHandleSystem$Wonderjs from "../../src/job/no_worker/NoWorkerJobHandleSystem.js";

function openContractCheck() {
  IsDebugMainService$Wonderjs.setIsDebug(StateDataMain$Wonderjs.stateData, true);
  return /* () */0;
}

function closeContractCheck() {
  IsDebugMainService$Wonderjs.setIsDebug(StateDataMain$Wonderjs.stateData, false);
  return /* () */0;
}

function initWithoutBuildFakeDom(_, $staropt$star, $staropt$star$1, _$1) {
  var isDebug = $staropt$star !== undefined ? $staropt$star : "true";
  var buffer = $staropt$star$1 !== undefined ? $staropt$star$1 : SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
  Random.init(1);
  return SettingTool$Wonderjs.createStateAndSetToStateData(isDebug, undefined, undefined, undefined, undefined, buffer, /* () */0);
}

function init(sandbox, $staropt$star, $staropt$star$1, _) {
  var isDebug = $staropt$star !== undefined ? $staropt$star : "true";
  var buffer = $staropt$star$1 !== undefined ? $staropt$star$1 : SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
  SettingTool$Wonderjs.buildFakeDomForNotPassCanvasId(sandbox);
  return initWithoutBuildFakeDom(sandbox, isDebug, buffer, /* () */0);
}

function initWithJobConfigWithoutBuildFakeDom(_, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, _$1) {
  var isDebug = $staropt$star !== undefined ? $staropt$star : "true";
  var canvasId = $staropt$star$1 !== undefined ? Js_primitive.valFromOption($staropt$star$1) : undefined;
  var context = $staropt$star$2 !== undefined ? $staropt$star$2 : "\n        {\n        \"alpha\": true,\n        \"depth\": true,\n        \"stencil\": false,\n        \"antialias\": true,\n        \"premultiplied_alpha\": true,\n        \"preserve_drawing_buffer\": false\n        }\n               ";
  var useHardwareInstance = $staropt$star$3 !== undefined ? $staropt$star$3 : "true";
  var buffer = $staropt$star$4 !== undefined ? $staropt$star$4 : SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
  var noWorkerJobRecord = $staropt$star$5 !== undefined ? $staropt$star$5 : NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0);
  var renderConfigRecord = $staropt$star$6 !== undefined ? $staropt$star$6 : RenderConfigTool$Wonderjs.buildRenderConfig(undefined, undefined, /* () */0);
  SharedArrayBufferTool$Wonderjs.setSharedArrayBufferToBeArrayBuffer();
  return RenderConfigTool$Wonderjs.create(renderConfigRecord, NoWorkerJobTool$Wonderjs.init(/* tuple */[
                  NoWorkerJobHandleSystem$Wonderjs.createInitJobHandleMap,
                  NoWorkerJobHandleSystem$Wonderjs.createLoopJobHandleMap
                ], NoWorkerJobConfigTool$Wonderjs.create(noWorkerJobRecord, SettingTool$Wonderjs.createStateAndSetToStateData(isDebug, Js_primitive.some(canvasId), context, useHardwareInstance, undefined, buffer, /* () */0))));
}

function initWithJobConfig(sandbox, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, _) {
  var isDebug = $staropt$star !== undefined ? $staropt$star : "true";
  var buffer = $staropt$star$1 !== undefined ? $staropt$star$1 : SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
  var noWorkerJobRecord = $staropt$star$2 !== undefined ? $staropt$star$2 : NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0);
  if ($staropt$star$3 === undefined) {
    RenderConfigTool$Wonderjs.buildRenderConfig(undefined, undefined, /* () */0);
  }
  SharedArrayBufferTool$Wonderjs.setSharedArrayBufferToBeArrayBuffer();
  SettingTool$Wonderjs.buildFakeDomForNotPassCanvasId(sandbox);
  return initWithJobConfigWithoutBuildFakeDom(sandbox, isDebug, undefined, undefined, undefined, buffer, noWorkerJobRecord, undefined, /* () */0);
}

function createWithJobConfigWithoutBuildFakeDom(_, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, _$1) {
  var isDebug = $staropt$star !== undefined ? $staropt$star : "true";
  var canvasId = $staropt$star$1 !== undefined ? Js_primitive.valFromOption($staropt$star$1) : undefined;
  var context = $staropt$star$2 !== undefined ? $staropt$star$2 : "\n        {\n        \"alpha\": true,\n        \"depth\": true,\n        \"stencil\": false,\n        \"antialias\": true,\n        \"premultiplied_alpha\": true,\n        \"preserve_drawing_buffer\": false\n        }\n               ";
  var useHardwareInstance = $staropt$star$3 !== undefined ? $staropt$star$3 : "true";
  var buffer = $staropt$star$4 !== undefined ? $staropt$star$4 : SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
  var noWorkerJobRecord = $staropt$star$5 !== undefined ? $staropt$star$5 : NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0);
  var renderConfigRecord = $staropt$star$6 !== undefined ? $staropt$star$6 : RenderConfigTool$Wonderjs.buildRenderConfig(undefined, undefined, /* () */0);
  SharedArrayBufferTool$Wonderjs.setSharedArrayBufferToBeArrayBuffer();
  return RenderConfigTool$Wonderjs.create(renderConfigRecord, NoWorkerJobConfigTool$Wonderjs.create(noWorkerJobRecord, SettingTool$Wonderjs.createStateAndSetToStateData(isDebug, Js_primitive.some(canvasId), context, useHardwareInstance, undefined, buffer, /* () */0)));
}

function createWithJobConfig(sandbox, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, _) {
  var isDebug = $staropt$star !== undefined ? $staropt$star : "true";
  var buffer = $staropt$star$1 !== undefined ? $staropt$star$1 : SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
  var noWorkerJobRecord = $staropt$star$2 !== undefined ? $staropt$star$2 : NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0);
  if ($staropt$star$3 === undefined) {
    RenderConfigTool$Wonderjs.buildRenderConfig(undefined, undefined, /* () */0);
  }
  SharedArrayBufferTool$Wonderjs.setSharedArrayBufferToBeArrayBuffer();
  SettingTool$Wonderjs.buildFakeDomForNotPassCanvasId(sandbox);
  return createWithJobConfigWithoutBuildFakeDom(sandbox, isDebug, undefined, undefined, undefined, buffer, noWorkerJobRecord, undefined, /* () */0);
}

export {
  openContractCheck ,
  closeContractCheck ,
  initWithoutBuildFakeDom ,
  init ,
  initWithJobConfigWithoutBuildFakeDom ,
  initWithJobConfig ,
  createWithJobConfigWithoutBuildFakeDom ,
  createWithJobConfig ,
  
}
/* SettingTool-Wonderjs Not a pure module */
