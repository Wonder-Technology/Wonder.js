

import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../state/main/state/IsDebugMainService.js";

function checkNotExceedMaxCountByIndex(maxCount, index) {
  return Contract$WonderLog.ensureCheck((function (index) {
                var maxIndex = maxCount - 1 | 0;
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("index: " + (String(index) + (" <= maxIndex: " + (String(maxIndex) + ""))), "not"), (function (param) {
                              return Contract$WonderLog.Operators[/* <= */11](index, maxIndex);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), index);
}

function checkNotExceedMaxCount(maxCount, resultTuple) {
  checkNotExceedMaxCountByIndex(maxCount, resultTuple[1]);
  return resultTuple;
}

export {
  checkNotExceedMaxCountByIndex ,
  checkNotExceedMaxCount ,
  
}
/* Log-WonderLog Not a pure module */
