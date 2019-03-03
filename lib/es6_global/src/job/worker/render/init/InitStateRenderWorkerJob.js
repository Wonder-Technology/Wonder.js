

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as InitStateJobUtils$Wonderjs from "../../../utils/InitStateJobUtils.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";

function execJob(param, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                state[/* deviceManagerRecord */4] = InitStateJobUtils$Wonderjs.execJob(state[/* deviceManagerRecord */4]);
                StateRenderWorkerService$Wonderjs.setState(stateData, state);
                return e;
              }));
}

export {
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
