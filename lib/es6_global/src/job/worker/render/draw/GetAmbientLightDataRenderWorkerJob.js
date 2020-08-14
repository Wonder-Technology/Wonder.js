

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as MessageService$Wonderjs from "../../../../service/primitive/worker/MessageService.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";
import * as AmbientLightSceneRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/scene/AmbientLightSceneRenderWorkerService.js";

function execJob(flags, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                var data = MessageService$Wonderjs.getRecord(e);
                var ambientLightData = data.ambientLightData;
                var state$1 = AmbientLightSceneRenderWorkerService$Wonderjs.setAmbientLightColor(ambientLightData.color, state);
                StateRenderWorkerService$Wonderjs.setState(stateData, state$1);
                return e;
              }));
}

export {
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
