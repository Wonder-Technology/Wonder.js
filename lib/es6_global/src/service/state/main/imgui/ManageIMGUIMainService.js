

import * as Caml_array from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_option from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as ViewService$Wonderjs from "../../../record/main/device/ViewService.js";
import * as AllProgramService$Wonderjs from "../../../record/all/program/AllProgramService.js";
import * as ManageIMGUIAPI$WonderImgui from "./../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/api/ManageIMGUIAPI.js";
import * as RecordIMGUIMainService$Wonderjs from "./RecordIMGUIMainService.js";

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
  var init = state[/* imguiRecord */44];
  newrecord[/* imguiRecord */44] = /* record */[
    /* ioData */init[/* ioData */0],
    /* isSetExecFuncInRenderWorkerForWorker */init[/* isSetExecFuncInRenderWorkerForWorker */1],
    /* extendData */init[/* extendData */2],
    /* wonderImguiIMGUIRecord */record
  ];
  return newrecord;
}

function sendCustomTextureProgramUniformProjectionMatData(gl, canvasSize, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* programRecord */30] = AllProgramService$Wonderjs.clearLastSendProgram(state[/* programRecord */30]);
  var init = state[/* imguiRecord */44];
  newrecord[/* imguiRecord */44] = /* record */[
    /* ioData */init[/* ioData */0],
    /* isSetExecFuncInRenderWorkerForWorker */init[/* isSetExecFuncInRenderWorkerForWorker */1],
    /* extendData */init[/* extendData */2],
    /* wonderImguiIMGUIRecord */ManageIMGUIAPI$WonderImgui.sendCustomTextureProgramUniformProjectionMatData(gl, canvasSize, RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state))
  ];
  return newrecord;
}

function sendFontTextureProgramUniformProjectionMatData(gl, canvasSize, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* programRecord */30] = AllProgramService$Wonderjs.clearLastSendProgram(state[/* programRecord */30]);
  var init = state[/* imguiRecord */44];
  newrecord[/* imguiRecord */44] = /* record */[
    /* ioData */init[/* ioData */0],
    /* isSetExecFuncInRenderWorkerForWorker */init[/* isSetExecFuncInRenderWorkerForWorker */1],
    /* extendData */init[/* extendData */2],
    /* wonderImguiIMGUIRecord */ManageIMGUIAPI$WonderImgui.sendFontTextureProgramUniformProjectionMatData(gl, canvasSize, RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state))
  ];
  return newrecord;
}

function sendNoTextureProgramUniformProjectionMatData(gl, canvasSize, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* programRecord */30] = AllProgramService$Wonderjs.clearLastSendProgram(state[/* programRecord */30]);
  var init = state[/* imguiRecord */44];
  newrecord[/* imguiRecord */44] = /* record */[
    /* ioData */init[/* ioData */0],
    /* isSetExecFuncInRenderWorkerForWorker */init[/* isSetExecFuncInRenderWorkerForWorker */1],
    /* extendData */init[/* extendData */2],
    /* wonderImguiIMGUIRecord */ManageIMGUIAPI$WonderImgui.sendNoTextureProgramUniformProjectionMatData(gl, canvasSize, RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state))
  ];
  return newrecord;
}

export {
  getCanvasSize ,
  getRecord ,
  setRecord ,
  sendCustomTextureProgramUniformProjectionMatData ,
  sendFontTextureProgramUniformProjectionMatData ,
  sendNoTextureProgramUniformProjectionMatData ,
  
}
/* ViewService-Wonderjs Not a pure module */
