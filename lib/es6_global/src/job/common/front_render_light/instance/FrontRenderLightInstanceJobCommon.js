

import * as JudgeInstanceRenderService$Wonderjs from "../../../../service/state/render/instance/JudgeInstanceRenderService.js";
import * as FrontRenderLightBatchInstanceJobCommon$Wonderjs from "./FrontRenderLightBatchInstanceJobCommon.js";
import * as FrontRenderLightHardwareInstanceJobCommon$Wonderjs from "./FrontRenderLightHardwareInstanceJobCommon.js";

function render(gl, indexTuple, state) {
  if (JudgeInstanceRenderService$Wonderjs.isSupportInstance(state)) {
    return FrontRenderLightHardwareInstanceJobCommon$Wonderjs.render(gl, indexTuple, state);
  } else {
    return FrontRenderLightBatchInstanceJobCommon$Wonderjs.render(gl, indexTuple, state);
  }
}

export {
  render ,
  
}
/* JudgeInstanceRenderService-Wonderjs Not a pure module */
