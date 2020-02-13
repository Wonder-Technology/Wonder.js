

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as StateDataMainService$Wonderjs from "../../../../service/state/main/state/StateDataMainService.js";
import * as ReallocateCPUMemoryJobUtils$Wonderjs from "../../../utils/ReallocateCPUMemoryJobUtils.js";

function execJob(flags, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateDataMainService$Wonderjs.unsafeGetState(stateData);
                var state$1 = ReallocateCPUMemoryJobUtils$Wonderjs.execJob(state);
                StateDataMainService$Wonderjs.setState(stateData, state$1);
                return undefined;
              }));
}

export {
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
