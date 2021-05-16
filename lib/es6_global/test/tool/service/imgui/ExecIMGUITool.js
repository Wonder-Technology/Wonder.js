

import * as Caml_option from "../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as ExecIMGUIAPI$Wonderjs from "../../../../src/api/imgui/ExecIMGUIAPI.js";
import * as SerializeService$Wonderjs from "../../../../src/service/atom/SerializeService.js";
import * as ExecIMGUIMainService$Wonderjs from "../../../../src/service/state/main/imgui/ExecIMGUIMainService.js";
import * as ExecDataAllIMGUIService$Wonderjs from "../../../../src/service/record/all/imgui/ExecDataAllIMGUIService.js";

function buildEmptyExecFuncStr(param) {
  return "function (customData, imguiAPIJsObj, state){ return state; }";
}

function buildEmptyExecFunc(param) {
  return SerializeService$Wonderjs.deserializeFunction("function (customData, imguiAPIJsObj, state){ return state; }");
}

function createEmptyExecFuncDataArr(param) {
  return ExecIMGUIMainService$Wonderjs.createEmptyExecFuncDataArr(/* () */0);
}

function addExecFuncData(state, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, param) {
  var name = $staropt$star !== undefined ? $staropt$star : "exec";
  var customData = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : -1;
  var execOrder = $staropt$star$2 !== undefined ? $staropt$star$2 : 0;
  var func = $staropt$star$3 !== undefined ? Caml_option.valFromOption($staropt$star$3) : SerializeService$Wonderjs.deserializeFunction("function (customData, imguiAPIJsObj, state){ return state; }");
  return ExecIMGUIAPI$Wonderjs.addExecFuncData(name, customData, execOrder, func, state);
}

function hasExecFuncData(state) {
  return ExecDataAllIMGUIService$Wonderjs.hasExecFuncData(ExecIMGUIMainService$Wonderjs.getExecFuncDataArr(state));
}

var getExecFunc = ExecIMGUIMainService$Wonderjs.getExecFunc;

var getCustomData = ExecIMGUIMainService$Wonderjs.getCustomData;

var getExecFuncDataArr = ExecIMGUIMainService$Wonderjs.getExecFuncDataArr;

export {
  buildEmptyExecFuncStr ,
  buildEmptyExecFunc ,
  createEmptyExecFuncDataArr ,
  addExecFuncData ,
  getExecFunc ,
  getCustomData ,
  getExecFuncDataArr ,
  hasExecFuncData ,
  
}
/* ExecIMGUIAPI-Wonderjs Not a pure module */
