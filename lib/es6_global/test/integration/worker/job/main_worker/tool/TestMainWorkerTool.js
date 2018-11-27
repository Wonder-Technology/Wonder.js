

import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Js_primitive from "../../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as SettingTool$Wonderjs from "../../../../../tool/service/setting/SettingTool.js";
import * as MainStateTool$Wonderjs from "../../../../../tool/service/state/MainStateTool.js";
import * as StateDataMain$Wonderjs from "../../../../../../src/service/state/main/data/StateDataMain.js";
import * as WorkerJobTool$Wonderjs from "../../../../../tool/service/workerJob/WorkerJobTool.js";
import * as RenderConfigTool$Wonderjs from "../../../../../tool/service/renderConfig/RenderConfigTool.js";
import * as SettingWorkerTool$Wonderjs from "../../../tool/SettingWorkerTool.js";
import * as IsDebugMainService$Wonderjs from "../../../../../../src/service/state/main/state/IsDebugMainService.js";
import * as SharedArrayBufferTool$Wonderjs from "../../../../../tool/SharedArrayBufferTool.js";
import * as CreateStateMainService$Wonderjs from "../../../../../../src/service/state/main/state/CreateStateMainService.js";

function initWithJobConfig(_, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, _$1) {
  var isDebug = $staropt$star !== undefined ? $staropt$star : "true";
  var canvasId = $staropt$star$1 !== undefined ? Js_primitive.valFromOption($staropt$star$1) : undefined;
  var useHardwareInstance = $staropt$star$2 !== undefined ? $staropt$star$2 : "true";
  var context = $staropt$star$3 !== undefined ? $staropt$star$3 : "\n        {\n        \"alpha\": true,\n        \"depth\": true,\n        \"stencil\": false,\n        \"antialias\": true,\n        \"premultiplied_alpha\": true,\n        \"preserve_drawing_buffer\": false\n        }\n               ";
  var workerJobRecord = $staropt$star$4 !== undefined ? $staropt$star$4 : WorkerJobTool$Wonderjs.buildWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
  var renderConfigRecord = $staropt$star$5 !== undefined ? $staropt$star$5 : RenderConfigTool$Wonderjs.buildRenderConfig(undefined, undefined, /* () */0);
  var buffer = $staropt$star$6 !== undefined ? $staropt$star$6 : SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
  SharedArrayBufferTool$Wonderjs.setSharedArrayBufferToBeArrayBuffer();
  var state = CreateStateMainService$Wonderjs.createState(/* () */0);
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* workerDetectRecord */38];
  newrecord[/* workerDetectRecord */38] = /* record */[
    /* isSupportSharedArrayBuffer */init[/* isSupportSharedArrayBuffer */0],
    /* isSupportRenderWorkerAndSharedArrayBuffer */true
  ];
  return MainStateTool$Wonderjs.setState(RenderConfigTool$Wonderjs.create(renderConfigRecord, WorkerJobTool$Wonderjs.create(workerJobRecord, SettingWorkerTool$Wonderjs.createStateAndSetToStateData(newrecord, isDebug, Js_primitive.some(canvasId), context, useHardwareInstance, "true", buffer, /* () */0))));
}

function openContractCheck() {
  IsDebugMainService$Wonderjs.setIsDebug(StateDataMain$Wonderjs.stateData, true);
  return /* () */0;
}

function closeContractCheck() {
  IsDebugMainService$Wonderjs.setIsDebug(StateDataMain$Wonderjs.stateData, false);
  return /* () */0;
}

export {
  initWithJobConfig ,
  openContractCheck ,
  closeContractCheck ,
  
}
/* SettingTool-Wonderjs Not a pure module */
