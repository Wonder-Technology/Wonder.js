'use strict';

var Caml_option = require("bs-platform/lib/js/caml_option.js");
var ScriptTool$Wonderjs = require("../../../../tool/service/script/ScriptTool.js");
var ImmutableHashMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/ImmutableHashMapService.js");

function getScriptAttributeName(param) {
  return "scriptAttribute";
}

function getScriptAttributeFieldName(param) {
  return "a";
}

function buildEventFunc(param) {
  return (function (script, api, state) {
      var scriptAttributeName = "scriptAttribute";
      var unsafeGetScriptAttribute = api.unsafeGetScriptAttribute;
      var scriptAttribute = unsafeGetScriptAttribute(script, scriptAttributeName, state);
      var unsafeGetScriptAttributeFieldValue = api.unsafeGetScriptAttributeFieldValue;
      var setScriptAttributeFieldValue = api.setScriptAttributeFieldValue;
      return setScriptAttributeFieldValue(script, /* tuple */[
                  scriptAttributeName,
                  "a",
                  unsafeGetScriptAttributeFieldValue("a", scriptAttribute) + 1 | 0
                ], state);
    });
}

function getAttributeFieldAValueAfterExecEventeFunc(param) {
  return 2;
}

function buildEventFunc2(param) {
  return (function (script, api, state) {
      var scriptAttributeName = "scriptAttribute";
      var unsafeGetScriptAttribute = api.unsafeGetScriptAttribute;
      var scriptAttribute = unsafeGetScriptAttribute(script, scriptAttributeName, state);
      var unsafeGetScriptAttributeFieldValue = api.unsafeGetScriptAttributeFieldValue;
      var setScriptAttributeFieldValue = api.setScriptAttributeFieldValue;
      return setScriptAttributeFieldValue(script, /* tuple */[
                  scriptAttributeName,
                  "a",
                  unsafeGetScriptAttributeFieldValue("a", scriptAttribute) + 2 | 0
                ], state);
    });
}

function getAttributeFieldAValueAfterExecEventeFunc2(param) {
  return 3;
}

function buildEventFunctionDataMap($staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var initFunc = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : Caml_option.some(buildEventFunc(/* () */0));
  var updateFunc = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : Caml_option.some(buildEventFunc(/* () */0));
  var disposeFunc = $staropt$star$2 !== undefined ? Caml_option.valFromOption($staropt$star$2) : undefined;
  var eventFunctionDataMap = ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0);
  var scriptEventFunctionData = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptEventFunctionData */0](initFunc, updateFunc, disposeFunc);
  return ImmutableHashMapService$WonderCommonlib.set("eventFunctionData", scriptEventFunctionData, eventFunctionDataMap);
}

function buildAttributeMap(param) {
  var attributeMap = ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0);
  var scriptAttributeName = "scriptAttribute";
  var scriptAttribute = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptAttribute */2](scriptAttributeName);
  return ImmutableHashMapService$WonderCommonlib.set(scriptAttributeName, scriptAttribute, attributeMap);
}

exports.getScriptAttributeName = getScriptAttributeName;
exports.getScriptAttributeFieldName = getScriptAttributeFieldName;
exports.buildEventFunc = buildEventFunc;
exports.getAttributeFieldAValueAfterExecEventeFunc = getAttributeFieldAValueAfterExecEventeFunc;
exports.buildEventFunc2 = buildEventFunc2;
exports.getAttributeFieldAValueAfterExecEventeFunc2 = getAttributeFieldAValueAfterExecEventeFunc2;
exports.buildEventFunctionDataMap = buildEventFunctionDataMap;
exports.buildAttributeMap = buildAttributeMap;
/* ScriptTool-Wonderjs Not a pure module */
