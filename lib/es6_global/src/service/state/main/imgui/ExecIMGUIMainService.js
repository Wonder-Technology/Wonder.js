

import * as Caml_array from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ExecIMGUIAPI$WonderImgui from "./../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/api/ExecIMGUIAPI.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as RecordIMGUIMainService$Wonderjs from "./RecordIMGUIMainService.js";
import * as WorkerDetectMainService$Wonderjs from "../workerDetect/WorkerDetectMainService.js";

function isSetExecFuncInRenderWorkerForWorker(state) {
  return state[/* imguiRecord */44][/* isSetExecFuncInRenderWorkerForWorker */1] === true;
}

function _markIsSetExecFuncInRenderWorkerForWorker(isSetExecFuncInRenderWorkerForWorker, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* imguiRecord */44];
  newrecord[/* imguiRecord */44] = /* record */[
    /* ioData */init[/* ioData */0],
    /* isSetExecFuncInRenderWorkerForWorker */isSetExecFuncInRenderWorkerForWorker,
    /* extendData */init[/* extendData */2],
    /* wonderImguiIMGUIRecord */init[/* wonderImguiIMGUIRecord */3]
  ];
  return newrecord;
}

function markSetExecFuncInRenderWorkerForWorker(state) {
  return _markIsSetExecFuncInRenderWorkerForWorker(true, state);
}

function resetIsSetExecFuncInRenderWorkerForWorker(state) {
  return _markIsSetExecFuncInRenderWorkerForWorker(false, state);
}

function getExecFunc(execFuncName, state) {
  return ExecIMGUIAPI$WonderImgui.getExecFunc(execFuncName, RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state));
}

function unsafeGetExecFunc(execFuncName, state) {
  return ExecIMGUIAPI$WonderImgui.unsafeGetExecFunc(execFuncName, RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state));
}

function hasExecFuncData(execFuncName, state) {
  return ExecIMGUIAPI$WonderImgui.hasExecFuncData(execFuncName, RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state));
}

function addExecFuncData(execFuncName, customData, execOrder, func, state) {
  var wonderImguiIMGUIRecord = ExecIMGUIAPI$WonderImgui.addExecFuncData(execFuncName, customData, execOrder, func, RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state));
  var match = WorkerDetectMainService$Wonderjs.isUseWorker(state);
  if (match) {
    return _markIsSetExecFuncInRenderWorkerForWorker(false, state);
  } else {
    return RecordIMGUIMainService$Wonderjs.setWonderIMGUIRecord(wonderImguiIMGUIRecord, state);
  }
}

function removeExecFuncData(execFuncName, state) {
  var wonderImguiIMGUIRecord = ExecIMGUIAPI$WonderImgui.removeExecFuncData(execFuncName, RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state));
  var match = WorkerDetectMainService$Wonderjs.isUseWorker(state);
  if (match) {
    return _markIsSetExecFuncInRenderWorkerForWorker(false, state);
  } else {
    return RecordIMGUIMainService$Wonderjs.setWonderIMGUIRecord(wonderImguiIMGUIRecord, state);
  }
}

function clearExecFuncDataArr(state) {
  var __x = ExecIMGUIAPI$WonderImgui.clearExecFuncDataArr(RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state));
  return RecordIMGUIMainService$Wonderjs.setWonderIMGUIRecord(__x, state);
}

function getCustomData(execFuncName, state) {
  return ExecIMGUIAPI$WonderImgui.getCustomData(execFuncName, RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state));
}

function unsafeGetCustomData(execFuncName, state) {
  return ExecIMGUIAPI$WonderImgui.unsafeGetCustomData(execFuncName, RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state));
}

function getExecOrder(execFuncName, state) {
  return ExecIMGUIAPI$WonderImgui.getExecOrder(execFuncName, RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state));
}

function unsafeGetExecOrder(execFuncName, state) {
  return ExecIMGUIAPI$WonderImgui.unsafeGetExecOrder(execFuncName, RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state));
}

function getExecFuncDataArr(state) {
  return ExecIMGUIAPI$WonderImgui.getExecFuncDataArr(RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state));
}

function createEmptyExecFuncDataArr(param) {
  return ArrayService$WonderCommonlib.createEmpty(/* () */0);
}

export {
  isSetExecFuncInRenderWorkerForWorker ,
  _markIsSetExecFuncInRenderWorkerForWorker ,
  markSetExecFuncInRenderWorkerForWorker ,
  resetIsSetExecFuncInRenderWorkerForWorker ,
  getExecFunc ,
  unsafeGetExecFunc ,
  hasExecFuncData ,
  addExecFuncData ,
  removeExecFuncData ,
  clearExecFuncDataArr ,
  getCustomData ,
  unsafeGetCustomData ,
  getExecOrder ,
  unsafeGetExecOrder ,
  getExecFuncDataArr ,
  createEmptyExecFuncDataArr ,
  
}
/* ExecIMGUIAPI-WonderImgui Not a pure module */
