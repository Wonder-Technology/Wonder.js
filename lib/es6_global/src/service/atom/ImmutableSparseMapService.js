

import * as Caml_option from "./../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Log$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../state/main/state/IsDebugMainService.js";

function unsafeGetAndCheck(key, map) {
  return Contract$WonderLog.ensureCheck((function (data) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("data exist", "not"), (function (param) {
                              return Contract$WonderLog.assertExist((data == null) ? undefined : Caml_option.some(data));
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), map[key]);
}

export {
  unsafeGetAndCheck ,
  
}
/* Log-WonderLog Not a pure module */
