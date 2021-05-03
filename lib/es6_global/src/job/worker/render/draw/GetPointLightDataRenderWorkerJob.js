

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as MessageService$Wonderjs from "../../../../service/primitive/worker/MessageService.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";
import * as RecordPointLightRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/light/point/RecordPointLightRenderWorkerService.js";

function execJob(flags, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                var data = MessageService$Wonderjs.getRecord(e);
                var pointLightData = data.pointLightData;
                var pointLightRecord = RecordPointLightRenderWorkerService$Wonderjs.getRecord(state);
                state[/* pointLightRecord */22] = /* record */[
                  /* index */pointLightData.index,
                  /* positionMap */pointLightData.positionMap,
                  /* renderLightArr */pointLightData.renderLightArr,
                  /* colors */pointLightRecord[/* colors */3],
                  /* intensities */pointLightRecord[/* intensities */4],
                  /* constants */pointLightRecord[/* constants */5],
                  /* linears */pointLightRecord[/* linears */6],
                  /* quadratics */pointLightRecord[/* quadratics */7],
                  /* ranges */pointLightRecord[/* ranges */8]
                ];
                StateRenderWorkerService$Wonderjs.setState(stateData, state);
                return e;
              }));
}

export {
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
