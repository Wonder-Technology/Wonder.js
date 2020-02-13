

import * as GetCameraDataJobUtils$Wonderjs from "../../utils/GetCameraDataJobUtils.js";
import * as OperateRenderMainService$Wonderjs from "../../../service/state/main/render/OperateRenderMainService.js";

function execJob(param, state) {
  return OperateRenderMainService$Wonderjs.setCameraRecord(GetCameraDataJobUtils$Wonderjs.getCameraData(state), state);
}

export {
  execJob ,
  
}
/* GetCameraDataJobUtils-Wonderjs Not a pure module */
