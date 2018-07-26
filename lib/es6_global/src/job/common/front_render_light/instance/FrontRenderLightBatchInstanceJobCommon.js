

import * as FrontRenderLightJobCommon$Wonderjs from "../FrontRenderLightJobCommon.js";
import * as RenderBatchInstanceJobUtils$Wonderjs from "../../../utils/render/instance/RenderBatchInstanceJobUtils.js";

function render(gl, indexTuple, state) {
  return RenderBatchInstanceJobUtils$Wonderjs.render(gl, indexTuple, FrontRenderLightJobCommon$Wonderjs.render, state);
}

export {
  render ,
  
}
/* FrontRenderLightJobCommon-Wonderjs Not a pure module */
