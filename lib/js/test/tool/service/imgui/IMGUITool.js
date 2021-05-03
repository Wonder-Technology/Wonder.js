'use strict';

var Caml_array = require("bs-platform/lib/js/caml_array.js");
var SerializeService$Wonderjs = require("../../../../src/service/atom/SerializeService.js");
var RecordIMGUIMainService$Wonderjs = require("../../../../src/service/state/main/imgui/RecordIMGUIMainService.js");

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

exports.buildEmptyCustomControlFuncStr = buildEmptyCustomControlFuncStr;
exports.buildEmptyCustomControlFunc = buildEmptyCustomControlFunc;
exports.getWonderIMGUIRecord = getWonderIMGUIRecord;
exports.getIOData = getIOData;
exports.setIOData = setIOData;
/* RecordIMGUIMainService-Wonderjs Not a pure module */
