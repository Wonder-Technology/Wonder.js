

import * as Log$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../state/main/state/IsDebugMainService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

var getPoints = MutableSparseMapService$WonderCommonlib.get;

function unsafeGetPoints(index, pointsMap) {
  return Contract$WonderLog.ensureCheck((function (points) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("points exist", "not"), (function (param) {
                              return Contract$WonderLog.assertNullableExist(points);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), MutableSparseMapService$WonderCommonlib.unsafeGet(index, pointsMap));
}

var setPoints = MutableSparseMapService$WonderCommonlib.set;

export {
  getPoints ,
  unsafeGetPoints ,
  setPoints ,
  
}
/* Log-WonderLog Not a pure module */
