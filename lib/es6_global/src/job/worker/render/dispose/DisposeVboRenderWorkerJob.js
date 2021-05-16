

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as MessageService$Wonderjs from "../../../../service/primitive/worker/MessageService.js";
import * as DisposeVboBufferService$Wonderjs from "../../../../service/record/main/vboBuffer/DisposeVboBufferService.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";

function execJob(flags, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                var data = MessageService$Wonderjs.getRecord(e);
                state[/* vboBufferRecord */25] = DisposeVboBufferService$Wonderjs.disposeSourceInstanceVboBuffer(data.sourceInstanceNeedDisposeVboBufferArr, DisposeVboBufferService$Wonderjs.disposeGeometryVboBuffer(data.geometryNeedDisposeVboBufferArr, state[/* vboBufferRecord */25]));
                StateRenderWorkerService$Wonderjs.setState(stateData, state);
                return e;
              }));
}

export {
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
