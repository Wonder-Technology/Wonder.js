

import * as RenderJobUtils$Wonderjs from "../../utils/render/RenderJobUtils.js";
import * as BindAndUpdateMapLightMaterialRenderService$Wonderjs from "../../../service/state/render/material/light/BindAndUpdateMapLightMaterialRenderService.js";

function render(gl, indexTuple, state) {
  return RenderJobUtils$Wonderjs.render(gl, indexTuple, BindAndUpdateMapLightMaterialRenderService$Wonderjs.bindAndUpdate, state);
}

export {
  render ,
  
}
/* RenderJobUtils-Wonderjs Not a pure module */
