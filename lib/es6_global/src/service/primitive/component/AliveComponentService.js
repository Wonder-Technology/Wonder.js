

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs from "../../atom/ArrayService.js";

function checkComponentShouldAlive(component, isAliveFunc, record) {
  return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("component alive", "not"), (function () {
                return Contract$WonderLog.assertTrue(Curry._2(isAliveFunc, component, record));
              }));
}

function getAllAliveComponents(index, disposedIndexArray, isAliveFunc) {
  return ArrayService$Wonderjs.range(0, index - 1 | 0).filter((function (component) {
                return Curry._2(isAliveFunc, component, disposedIndexArray);
              }));
}

export {
  checkComponentShouldAlive ,
  getAllAliveComponents ,
  
}
/* Log-WonderLog Not a pure module */
