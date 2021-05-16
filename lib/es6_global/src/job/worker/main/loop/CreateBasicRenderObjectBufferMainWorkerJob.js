

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as StateDataMainService$Wonderjs from "../../../../service/state/main/state/StateDataMainService.js";
import * as RecordRenderMainService$Wonderjs from "../../../../service/state/main/render/RecordRenderMainService.js";
import * as CreateBasicRenderObjectBufferJobUtils$Wonderjs from "../../../utils/CreateBasicRenderObjectBufferJobUtils.js";

function execJob(param, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateDataMainService$Wonderjs.unsafeGetState(stateData);
                RecordRenderMainService$Wonderjs.getRecord(state)[/* basicRenderObjectRecord */0] = CreateBasicRenderObjectBufferJobUtils$Wonderjs.execJob(state);
                StateDataMainService$Wonderjs.setState(stateData, state);
                return undefined;
              }));
}

export {
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
