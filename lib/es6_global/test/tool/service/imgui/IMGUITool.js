

import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as SerializeService$Wonderjs from "../../../../src/service/atom/SerializeService.js";
import * as RecordIMGUIMainService$Wonderjs from "../../../../src/service/state/main/imgui/RecordIMGUIMainService.js";

function buildEmptyCustomControlFuncStr(param) {
  return "function (_customControlFuncInputData, _customControlFunctionShowData, _customControlAPIJsObj, record){ return record; }";
}

function buildEmptyCustomControlFunc(param) {
  return SerializeService$Wonderjs.deserializeFunction("function (_customControlFuncInputData, _customControlFunctionShowData, _customControlAPIJsObj, record){ return record; }");
}

var getIOData = RecordIMGUIMainService$Wonderjs.getIOData;

function setIOData(ioData, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* imguiRecord */44];
  newrecord[/* imguiRecord */44] = /* record */[
    /* ioData */ioData,
    /* isSetExecFuncInRenderWorkerForWorker */init[/* isSetExecFuncInRenderWorkerForWorker */1],
    /* extendData */init[/* extendData */2],
    /* wonderImguiIMGUIRecord */init[/* wonderImguiIMGUIRecord */3]
  ];
  return newrecord;
}

var getWonderIMGUIRecord = RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord;

export {
  buildEmptyCustomControlFuncStr ,
  buildEmptyCustomControlFunc ,
  getWonderIMGUIRecord ,
  getIOData ,
  setIOData ,
  
}
/* RecordIMGUIMainService-Wonderjs Not a pure module */
