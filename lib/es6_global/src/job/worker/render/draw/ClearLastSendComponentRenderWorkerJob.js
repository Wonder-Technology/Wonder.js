

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";
import * as ClearLastSendComponentJobUtils$Wonderjs from "../../../utils/ClearLastSendComponentJobUtils.js";

function execJob(flags, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                state[/* glslSenderRecord */8] = ClearLastSendComponentJobUtils$Wonderjs.execJob(state[/* glslSenderRecord */8]);
                StateRenderWorkerService$Wonderjs.setState(stateData, state);
                return e;
              }));
}

export {
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
