

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as ClearColorJobUtils$Wonderjs from "../../../utils/ClearColorJobUtils.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";

function execJob(flags, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                state[/* deviceManagerRecord */4] = ClearColorJobUtils$Wonderjs.execJob(flags, state[/* deviceManagerRecord */4]);
                StateRenderWorkerService$Wonderjs.setState(stateData, state);
                return e;
              }));
}

export {
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
