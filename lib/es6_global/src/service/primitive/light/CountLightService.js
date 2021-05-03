

import * as Log$WonderLog from "./../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../state/main/state/IsDebugMainService.js";
import * as BufferDirectionLightService$Wonderjs from "../../record/main/light/direction/BufferDirectionLightService.js";

function checkNotExceedMaxCount(count, maxCount) {
  Contract$WonderLog.requireCheck((function (param) {
          var maxCount = BufferDirectionLightService$Wonderjs.getBufferMaxCount(/* () */0);
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("light count: " + (String(count) + (" <= max count: " + (String(maxCount) + ""))), "not"), (function (param) {
                        return Contract$WonderLog.assertLte(/* Int */0, count, maxCount);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return count;
}

function getLightCount(renderLightArr) {
  return renderLightArr.length;
}

export {
  checkNotExceedMaxCount ,
  getLightCount ,
  
}
/* Log-WonderLog Not a pure module */
