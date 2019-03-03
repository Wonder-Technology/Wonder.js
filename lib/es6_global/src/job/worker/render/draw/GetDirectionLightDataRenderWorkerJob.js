

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as MessageService$Wonderjs from "../../../../service/primitive/worker/MessageService.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";
import * as RecordDirectionLightRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/light/direction/RecordDirectionLightRenderWorkerService.js";

function execJob(flags, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                var data = MessageService$Wonderjs.getRecord(e);
                var directionLightData = data.directionLightData;
                var directionLightRecord = RecordDirectionLightRenderWorkerService$Wonderjs.getRecord(state);
                state[/* directionLightRecord */19] = /* record */[
                  /* index */directionLightData.index,
                  /* directionMap */directionLightData.directionMap,
                  /* renderLightArr */directionLightData.renderLightArr,
                  /* colors */directionLightRecord[/* colors */3],
                  /* intensities */directionLightRecord[/* intensities */4]
                ];
                StateRenderWorkerService$Wonderjs.setState(stateData, state);
                return e;
              }));
}

export {
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
