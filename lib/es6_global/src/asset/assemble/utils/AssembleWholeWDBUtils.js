

import * as Log$WonderLog from "./../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../../service/state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../../service/state/main/state/IsDebugMainService.js";

function buildBufferArray(buffers, binBuffer) {
  Contract$WonderLog.requireCheck((function (param) {
          var bufferLen = buffers.length;
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("has only one buffer", "has " + (String(bufferLen) + "")), (function (param) {
                        return Contract$WonderLog.Operators[/* = */0](bufferLen, 1);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return /* array */[binBuffer];
}

export {
  buildBufferArray ,
  
}
/* Log-WonderLog Not a pure module */
