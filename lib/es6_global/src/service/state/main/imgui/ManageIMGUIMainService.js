

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as ViewService$Wonderjs from "../../../record/main/device/ViewService.js";
import * as ProgramService$Wonderjs from "../../../record/all/program/ProgramService.js";
import * as ManageIMGUIAPI$WonderImgui from "../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/api/ManageIMGUIAPI.js";
import * as RecordIMGUIMainService$Wonderjs from "./RecordIMGUIMainService.js";
import * as WorkerDetectMainService$Wonderjs from "../workerDetect/WorkerDetectMainService.js";

function getIMGUIFunc(state) {
  return ManageIMGUIAPI$WonderImgui.getIMGUIFunc(RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state));
}

function setIMGUIFunc(customData, func, state) {
  var wonderImguiIMGUIRecord = ManageIMGUIAPI$WonderImgui.setIMGUIFunc(customData, func, RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state));
  var match = WorkerDetectMainService$Wonderjs.isUseWorker(state);
  if (match) {
    var newrecord = Caml_array.caml_array_dup(state);
    var init = state[/* imguiRecord */42];
    newrecord[/* imguiRecord */42] = /* record */[
      /* ioData */init[/* ioData */0],
      /* isSetIMGUIFuncInRenderWorkerForWorker */false,
      /* wonderImguiIMGUIRecord */wonderImguiIMGUIRecord
    ];
    return newrecord;
  } else {
    var newrecord$1 = Caml_array.caml_array_dup(state);
    var init$1 = state[/* imguiRecord */42];
    newrecord$1[/* imguiRecord */42] = /* record */[
      /* ioData */init$1[/* ioData */0],
      /* isSetIMGUIFuncInRenderWorkerForWorker */init$1[/* isSetIMGUIFuncInRenderWorkerForWorker */1],
      /* wonderImguiIMGUIRecord */wonderImguiIMGUIRecord
    ];
    return newrecord$1;
  }
}

function clearIMGUIFunc(state) {
  return setIMGUIFunc(-1, (function (param, param$1, state) {
                return state;
              }), state);
}

function isSetIMGUIFuncInRenderWorkerForWorker(state) {
  return state[/* imguiRecord */42][/* isSetIMGUIFuncInRenderWorkerForWorker */1] === true;
}

function _markIsSetIMGUIFuncInRenderWorkerForWorker(isSetIMGUIFuncInRenderWorkerForWorker, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* imguiRecord */42];
  newrecord[/* imguiRecord */42] = /* record */[
    /* ioData */init[/* ioData */0],
    /* isSetIMGUIFuncInRenderWorkerForWorker */isSetIMGUIFuncInRenderWorkerForWorker,
    /* wonderImguiIMGUIRecord */init[/* wonderImguiIMGUIRecord */2]
  ];
  return newrecord;
}

function markSetIMGUIFuncInRenderWorkerForWorker(state) {
  return _markIsSetIMGUIFuncInRenderWorkerForWorker(true, state);
}

function resetIsSetIMGUIFuncInRenderWorkerForWorker(state) {
  return _markIsSetIMGUIFuncInRenderWorkerForWorker(false, state);
}

function getCustomData(state) {
  return ManageIMGUIAPI$WonderImgui.getCustomData(RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state));
}

function getCanvasSize(param) {
  var viewRecord = param[/* viewRecord */8];
  var match = ViewService$Wonderjs.getCanvas(viewRecord);
  if (match !== undefined) {
    var canvas = Caml_option.valFromOption(match);
    return /* tuple */[
            canvas.width,
            canvas.height
          ];
  } else {
    return /* tuple */[
            0,
            0
          ];
  }
}

var getRecord = RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord;

function setRecord(record, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* imguiRecord */42];
  newrecord[/* imguiRecord */42] = /* record */[
    /* ioData */init[/* ioData */0],
    /* isSetIMGUIFuncInRenderWorkerForWorker */init[/* isSetIMGUIFuncInRenderWorkerForWorker */1],
    /* wonderImguiIMGUIRecord */record
  ];
  return newrecord;
}

function sendUniformProjectionMatData(gl, canvasSize, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* programRecord */28] = ProgramService$Wonderjs.clearLastSendProgram(state[/* programRecord */28]);
  var init = state[/* imguiRecord */42];
  newrecord[/* imguiRecord */42] = /* record */[
    /* ioData */init[/* ioData */0],
    /* isSetIMGUIFuncInRenderWorkerForWorker */init[/* isSetIMGUIFuncInRenderWorkerForWorker */1],
    /* wonderImguiIMGUIRecord */ManageIMGUIAPI$WonderImgui.sendUniformProjectionMatData(gl, canvasSize, RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state))
  ];
  return newrecord;
}

export {
  getIMGUIFunc ,
  setIMGUIFunc ,
  clearIMGUIFunc ,
  isSetIMGUIFuncInRenderWorkerForWorker ,
  _markIsSetIMGUIFuncInRenderWorkerForWorker ,
  markSetIMGUIFuncInRenderWorkerForWorker ,
  resetIsSetIMGUIFuncInRenderWorkerForWorker ,
  getCustomData ,
  getCanvasSize ,
  getRecord ,
  setRecord ,
  sendUniformProjectionMatData ,
  
}
/* ViewService-Wonderjs Not a pure module */
