

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as MessageService$Wonderjs from "../../../../service/primitive/worker/MessageService.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";

function execJob(flags, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                var data = MessageService$Wonderjs.getRecord(e);
                var sourceInstanceData = data.renderData.sourceInstance;
                var init = state[/* sourceInstanceRecord */11];
                state[/* sourceInstanceRecord */11] = /* record */[
                  /* objectInstanceTransformIndexMap */sourceInstanceData.objectInstanceTransformIndexMap,
                  /* objectInstanceTransformCollections */init[/* objectInstanceTransformCollections */1],
                  /* isTransformStatics */init[/* isTransformStatics */2],
                  /* matrixInstanceBufferCapacityMap */init[/* matrixInstanceBufferCapacityMap */3],
                  /* matrixFloat32ArrayMap */init[/* matrixFloat32ArrayMap */4],
                  /* isSendTransformMatrixDataMap */init[/* isSendTransformMatrixDataMap */5]
                ];
                StateRenderWorkerService$Wonderjs.setState(stateData, state);
                return e;
              }));
}

export {
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
