

import * as PrecisionAllService$Wonderjs from "../../../service/state/all/glsl/PrecisionAllService.js";

function execJob(flags, state) {
  var glslRecord = state[/* glslRecord */26];
  glslRecord[/* precision */0] = PrecisionAllService$Wonderjs.getPrecisionSource(state[/* gpuDetectRecord */5], state[/* glslChunkRecord */30]);
  return state;
}

export {
  execJob ,
  
}
/* No side effect */
