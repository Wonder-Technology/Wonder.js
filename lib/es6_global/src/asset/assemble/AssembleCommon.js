

import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function addChildrenToParent(parent, children, param) {
  return /* tuple */[
          ArrayService$WonderCommonlib.reduceOneParam((function (parentMap, child) {
                  return MutableSparseMapService$WonderCommonlib.set(child, parent, parentMap);
                }), param[0], children),
          MutableSparseMapService$WonderCommonlib.set(parent, children, param[1])
        ];
}

function checkNotDisposedBefore(disposedIndexArray) {
  return Contract$WonderLog.requireCheck((function (param) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("not disposed before", "do"), (function (param) {
                              return Contract$WonderLog.Operators[/* = */0](disposedIndexArray.length, 0);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
}

export {
  addChildrenToParent ,
  checkNotDisposedBefore ,
  
}
/* Log-WonderLog Not a pure module */
