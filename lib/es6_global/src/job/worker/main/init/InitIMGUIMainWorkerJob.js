

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as IOIMGUIMainService$Wonderjs from "../../../../service/state/main/imgui/IOIMGUIMainService.js";
import * as StateDataMainService$Wonderjs from "../../../../service/state/main/state/StateDataMainService.js";

function execJob(_, stateData) {
  return MostUtils$Wonderjs.callFunc((function () {
                var state = StateDataMainService$Wonderjs.unsafeGetState(stateData);
                StateDataMainService$Wonderjs.setState(stateData, IOIMGUIMainService$Wonderjs.bindEvent(state));
                return undefined;
              }));
}

export {
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
