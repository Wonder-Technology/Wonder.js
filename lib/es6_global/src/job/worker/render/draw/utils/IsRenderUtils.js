

import * as Log$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../../../../service/state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../../../../service/state/main/state/IsDebugMainService.js";

function isRender(data) {
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("data##renderData exist", "not"), (function (param) {
                        return Contract$WonderLog.assertNullableExist(data.renderData);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return data.renderData.isRender === true;
}

export {
  isRender ,
  
}
/* Log-WonderLog Not a pure module */
