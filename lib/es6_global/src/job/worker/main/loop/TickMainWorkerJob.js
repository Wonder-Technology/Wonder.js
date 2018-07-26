

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as TickJobUtils$Wonderjs from "../../../utils/TickJobUtils.js";
import * as StateDataMainService$Wonderjs from "../../../../service/state/main/state/StateDataMainService.js";

function execJob(_, stateData) {
  return MostUtils$Wonderjs.callFunc((function () {
                var state = StateDataMainService$Wonderjs.unsafeGetState(stateData);
                state[/* timeControllerRecord */33] = TickJobUtils$Wonderjs.execJob(state[/* timeControllerRecord */33]);
                StateDataMainService$Wonderjs.setState(stateData, state);
                return undefined;
              }));
}

export {
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
