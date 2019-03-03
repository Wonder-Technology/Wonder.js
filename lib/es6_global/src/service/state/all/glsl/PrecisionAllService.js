

import * as ShaderChunkSystem$Wonderjs from "../../../../glsl/ShaderChunkSystem.js";

function getPrecisionSource(gpuDetectRecord, glslChunkRecord) {
  var $$default = ShaderChunkSystem$Wonderjs.getChunk("highp_fragment", glslChunkRecord)[/* top */0];
  var match = gpuDetectRecord[/* precision */2];
  if (match !== undefined) {
    switch (match) {
      case 0 : 
          return ShaderChunkSystem$Wonderjs.getChunk("highp_fragment", glslChunkRecord)[/* top */0];
      case 1 : 
          return ShaderChunkSystem$Wonderjs.getChunk("mediump_fragment", glslChunkRecord)[/* top */0];
      case 2 : 
          return ShaderChunkSystem$Wonderjs.getChunk("lowp_fragment", glslChunkRecord)[/* top */0];
      
    }
  } else {
    return $$default;
  }
}

export {
  getPrecisionSource ,
  
}
/* No side effect */
