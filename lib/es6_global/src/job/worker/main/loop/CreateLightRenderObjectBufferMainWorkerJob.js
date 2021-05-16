

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as StateDataMainService$Wonderjs from "../../../../service/state/main/state/StateDataMainService.js";
import * as RecordRenderMainService$Wonderjs from "../../../../service/state/main/render/RecordRenderMainService.js";
import * as CreateLightRenderObjectBufferJobUtils$Wonderjs from "../../../utils/CreateLightRenderObjectBufferJobUtils.js";

function execJob(param, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateDataMainService$Wonderjs.unsafeGetState(stateData);
                RecordRenderMainService$Wonderjs.getRecord(state)[/* lightRenderObjectRecord */1] = CreateLightRenderObjectBufferJobUtils$Wonderjs.execJob(state);
                StateDataMainService$Wonderjs.setState(stateData, state);
                return undefined;
              }));
}

export {
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
