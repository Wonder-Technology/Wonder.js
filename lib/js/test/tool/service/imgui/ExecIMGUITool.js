'use strict';

var Caml_option = require("bs-platform/lib/js/caml_option.js");
var ExecIMGUIAPI$Wonderjs = require("../../../../src/api/imgui/ExecIMGUIAPI.js");
var SerializeService$Wonderjs = require("../../../../src/service/atom/SerializeService.js");
var ExecIMGUIMainService$Wonderjs = require("../../../../src/service/state/main/imgui/ExecIMGUIMainService.js");
var ExecDataAllIMGUIService$Wonderjs = require("../../../../src/service/record/all/imgui/ExecDataAllIMGUIService.js");

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

exports.buildEmptyExecFuncStr = buildEmptyExecFuncStr;
exports.buildEmptyExecFunc = buildEmptyExecFunc;
exports.createEmptyExecFuncDataArr = createEmptyExecFuncDataArr;
exports.addExecFuncData = addExecFuncData;
exports.getExecFunc = getExecFunc;
exports.getCustomData = getCustomData;
exports.getExecFuncDataArr = getExecFuncDataArr;
exports.hasExecFuncData = hasExecFuncData;
/* ExecIMGUIAPI-Wonderjs Not a pure module */
