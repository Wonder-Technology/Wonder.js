

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as MessageService$Wonderjs from "../../../../service/primitive/worker/MessageService.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";
import * as RecordPointLightRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/light/point/RecordPointLightRenderWorkerService.js";

function execJob(_, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function () {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                var data = MessageService$Wonderjs.getRecord(e);
                var pointLightData = data.pointLightData;
                var pointLightRecord = RecordPointLightRenderWorkerService$Wonderjs.getRecord(state);
                state[/* pointLightRecord */20] = /* record */[
                  /* index */pointLightData.index,
                  /* positionMap */pointLightData.positionMap,
                  /* colors */pointLightRecord[/* colors */2],
                  /* intensities */pointLightRecord[/* intensities */3],
                  /* constants */pointLightRecord[/* constants */4],
                  /* linears */pointLightRecord[/* linears */5],
                  /* quadratics */pointLightRecord[/* quadratics */6],
                  /* ranges */pointLightRecord[/* ranges */7]
                ];
                StateRenderWorkerService$Wonderjs.setState(stateData, state);
                return e;
              }));
}

export {
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
