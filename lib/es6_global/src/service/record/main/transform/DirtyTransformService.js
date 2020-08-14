

import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../../state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../../state/main/state/IsDebugMainService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function mark(transform, isDirty, record) {
  var dirtyMap = record[/* dirtyMap */18];
  MutableSparseMapService$WonderCommonlib.set(transform, isDirty, dirtyMap);
  return record;
}

function isDirty(transform, record) {
  var dirtyMap = record[/* dirtyMap */18];
  return Contract$WonderLog.ensureCheck((function (isDirty) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("return bool", "not"), (function (param) {
                              return Contract$WonderLog.assertIsBool(isDirty);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), MutableSparseMapService$WonderCommonlib.unsafeGet(transform, dirtyMap) === true);
}

export {
  mark ,
  isDirty ,
  
}
/* Log-WonderLog Not a pure module */
