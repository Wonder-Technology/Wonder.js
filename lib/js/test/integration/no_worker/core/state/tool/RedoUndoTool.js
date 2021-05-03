'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var MainStateTool$Wonderjs = require("../../../../../tool/service/state/MainStateTool.js");

function testCopyTypeArraySingleValue(param, state) {
  var setDataFunc = param[2];
  var match = Curry._1(param[0], state[0]);
  var component1 = match[2];
  var match$1 = Curry._1(param[3], /* () */0);
  var data1 = match$1[0];
  var state$1 = Curry._3(setDataFunc, component1, data1, match[0]);
  var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$1);
  Curry._3(setDataFunc, component1, match$1[1], copiedState);
  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Curry._2(param[1], component1, state$1)), data1);
}

exports.testCopyTypeArraySingleValue = testCopyTypeArraySingleValue;
/* Wonder_jest Not a pure module */
