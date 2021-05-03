

import * as Log$WonderLog from "./../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../state/main/state/IsDebugMainService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function unsafeGetUniformSendData(shaderIndex, map) {
  return Contract$WonderLog.ensureCheck((function (sendData) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("uniform send record exist", "not"), (function (param) {
                              return Contract$WonderLog.assertNullableExist(sendData);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), MutableSparseMapService$WonderCommonlib.unsafeGet(shaderIndex, map));
}

export {
  unsafeGetUniformSendData ,
  
}
/* Log-WonderLog Not a pure module */
