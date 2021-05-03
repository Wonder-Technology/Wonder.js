

import * as Curry from "./../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "./../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs from "../../atom/ArrayService.js";
import * as StateDataMain$Wonderjs from "../../state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

function checkComponentShouldAlive(component, isAliveFunc, record) {
  return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("component alive", "not"), (function (param) {
                return Contract$WonderLog.assertTrue(Curry._2(isAliveFunc, component, record));
              }));
}

function getAllAliveComponents(index, disposedIndexArray) {
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("disposedIndexArray not has duplicate items", "has"), (function (param) {
                        return Contract$WonderLog.Operators[/* = */0](ArrayService$WonderCommonlib.removeDuplicateItems(disposedIndexArray).length, disposedIndexArray.length);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return ArrayService$Wonderjs.fastExclude(disposedIndexArray.slice(), ArrayService$Wonderjs.range(0, index - 1 | 0));
}

export {
  checkComponentShouldAlive ,
  getAllAliveComponents ,
  
}
/* Log-WonderLog Not a pure module */
