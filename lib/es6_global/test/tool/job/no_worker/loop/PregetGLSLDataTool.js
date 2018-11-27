

import * as GPUDetectTool$Wonderjs from "../../../service/gpu/GPUDetectTool.js";

function preparePrecision(state) {
  return GPUDetectTool$Wonderjs.setPrecision(/* HIGHP */0, state);
}

export {
  preparePrecision ,
  
}
/* No side effect */
