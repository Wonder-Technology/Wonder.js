

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as StateDataMainService$Wonderjs from "../../../../service/state/main/state/StateDataMainService.js";
import * as GetCameraDataJobUtils$Wonderjs from "../../../utils/GetCameraDataJobUtils.js";
import * as OperateRenderMainService$Wonderjs from "../../../../service/state/main/render/OperateRenderMainService.js";

function execJob(param, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateDataMainService$Wonderjs.unsafeGetState(stateData);
                OperateRenderMainService$Wonderjs.setCameraRecord(GetCameraDataJobUtils$Wonderjs.getCameraData(state), state);
                StateDataMainService$Wonderjs.setState(stateData, state);
                return undefined;
              }));
}

export {
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
