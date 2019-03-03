

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as MessageService$Wonderjs from "../../../../service/primitive/worker/MessageService.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";
import * as OperateCustomRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/custom/OperateCustomRenderWorkerService.js";

function execJob(param, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                var data = MessageService$Wonderjs.getRecord(e);
                var state$1 = OperateCustomRenderWorkerService$Wonderjs.setCustomDataFromMainWorkerToRenderWorker(data.customData, state);
                StateRenderWorkerService$Wonderjs.setState(stateData, state$1);
                return e;
              }));
}

export {
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
