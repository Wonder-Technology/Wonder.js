

import * as PrecisionAllService$Wonderjs from "../../../service/state/all/glsl/PrecisionAllService.js";

function execJob(flags, state) {
  var glslRecord = state[/* glslRecord */29];
  glslRecord[/* precision */0] = PrecisionAllService$Wonderjs.getPrecisionSource(state[/* gpuDetectRecord */5], state[/* glslChunkRecord */33]);
  return state;
}

export {
  execJob ,
  
}
/* No side effect */
