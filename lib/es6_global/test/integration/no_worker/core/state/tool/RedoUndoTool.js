

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Wonder_jest from "../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as MainStateTool$Wonderjs from "../../../../../tool/service/state/MainStateTool.js";

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

export {
  testCopyTypeArraySingleValue ,
  
}
/* Wonder_jest Not a pure module */
