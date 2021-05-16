

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as InitScriptJobUtils$Wonderjs from "../../../utils/InitScriptJobUtils.js";
import * as StateDataMainService$Wonderjs from "../../../../service/state/main/state/StateDataMainService.js";

function execJob(param, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateDataMainService$Wonderjs.unsafeGetState(stateData);
                StateDataMainService$Wonderjs.setState(stateData, InitScriptJobUtils$Wonderjs.exec(state));
                return undefined;
              }));
}

export {
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
