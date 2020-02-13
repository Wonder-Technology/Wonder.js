

import * as RenderJobUtils$Wonderjs from "../../utils/render/RenderJobUtils.js";
import * as BindAndUpdateMapBasicMaterialRenderService$Wonderjs from "../../../service/state/render/material/basic/BindAndUpdateMapBasicMaterialRenderService.js";

function render(gl, indexTuple, state) {
  return RenderJobUtils$Wonderjs.render(gl, indexTuple, BindAndUpdateMapBasicMaterialRenderService$Wonderjs.bindAndUpdate, state);
}

export {
  render ,
  
}
/* RenderJobUtils-Wonderjs Not a pure module */
