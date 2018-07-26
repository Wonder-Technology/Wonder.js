

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as MessageService$Wonderjs from "../../../../service/primitive/worker/MessageService.js";
import * as DisposeVboBufferService$Wonderjs from "../../../../service/record/main/vboBuffer/DisposeVboBufferService.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";

function execJob(_, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function () {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                var data = MessageService$Wonderjs.getRecord(e);
                state[/* vboBufferRecord */23] = DisposeVboBufferService$Wonderjs.disposeSourceInstanceVboBuffer(data.sourceInstanceNeedDisposeVboBufferArr, DisposeVboBufferService$Wonderjs.disposeCustomGeometryVboBuffer(data.customGeometryNeedDisposeVboBufferArr, DisposeVboBufferService$Wonderjs.disposeBoxGeometryVboBuffer(data.boxGeometryNeedDisposeVboBufferArr, state[/* vboBufferRecord */23])));
                StateRenderWorkerService$Wonderjs.setState(stateData, state);
                return e;
              }));
}

export {
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
