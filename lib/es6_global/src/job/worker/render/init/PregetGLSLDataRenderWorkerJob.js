

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as PrecisionAllService$Wonderjs from "../../../../service/state/all/glsl/PrecisionAllService.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";

function execJob(param, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                state[/* glslRecord */7][/* precision */0] = PrecisionAllService$Wonderjs.getPrecisionSource(state[/* gpuDetectRecord */3], state[/* glslChunkRecord */10]);
                StateRenderWorkerService$Wonderjs.setState(stateData, state);
                return e;
              }));
}

export {
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
