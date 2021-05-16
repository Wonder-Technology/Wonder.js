

import * as JudgeInstanceRenderService$Wonderjs from "../../../../service/state/render/instance/JudgeInstanceRenderService.js";
import * as RenderBasicBatchInstanceJobCommon$Wonderjs from "./RenderBasicBatchInstanceJobCommon.js";
import * as RenderBasicHardwareInstanceJobCommon$Wonderjs from "./RenderBasicHardwareInstanceJobCommon.js";

function render(gl, indexTuple, state) {
  if (JudgeInstanceRenderService$Wonderjs.isSupportInstance(state)) {
    return RenderBasicHardwareInstanceJobCommon$Wonderjs.render(gl, indexTuple, state);
  } else {
    return RenderBasicBatchInstanceJobCommon$Wonderjs.render(gl, indexTuple, state);
  }
}

export {
  render ,
  
}
/* JudgeInstanceRenderService-Wonderjs Not a pure module */
