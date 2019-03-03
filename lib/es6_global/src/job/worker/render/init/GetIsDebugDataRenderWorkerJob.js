

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as StateDataMain$Wonderjs from "../../../../service/state/main/data/StateDataMain.js";
import * as MessageService$Wonderjs from "../../../../service/primitive/worker/MessageService.js";
import * as IsDebugMainService$Wonderjs from "../../../../service/state/main/state/IsDebugMainService.js";

function execJob(param, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var data = MessageService$Wonderjs.getRecord(e);
                IsDebugMainService$Wonderjs.setIsDebug(StateDataMain$Wonderjs.stateData, data.isDebug);
                return e;
              }));
}

export {
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
