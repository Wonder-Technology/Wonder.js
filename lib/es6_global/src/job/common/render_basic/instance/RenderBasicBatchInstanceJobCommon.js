

import * as RenderBasicJobCommon$Wonderjs from "../RenderBasicJobCommon.js";
import * as RenderBatchInstanceJobUtils$Wonderjs from "../../../utils/render/instance/RenderBatchInstanceJobUtils.js";

function render(gl, indexTuple, state) {
  return RenderBatchInstanceJobUtils$Wonderjs.render(gl, indexTuple, RenderBasicJobCommon$Wonderjs.render, state);
}

export {
  render ,
  
}
/* RenderBasicJobCommon-Wonderjs Not a pure module */
