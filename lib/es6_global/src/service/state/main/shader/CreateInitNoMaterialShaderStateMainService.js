

import * as RecordRenderConfigMainService$Wonderjs from "../renderConfig/RecordRenderConfigMainService.js";

function createInitNoMaterialShaderState(state) {
  return /* record */[
          /* renderConfigRecord */RecordRenderConfigMainService$Wonderjs.getRecord(state),
          /* shaderRecord */state[/* shaderRecord */25],
          /* programRecord */state[/* programRecord */27],
          /* glslRecord */state[/* glslRecord */26],
          /* glslSenderRecord */state[/* glslSenderRecord */29],
          /* glslLocationRecord */state[/* glslLocationRecord */28],
          /* glslChunkRecord */state[/* glslChunkRecord */30]
        ];
}

export {
  createInitNoMaterialShaderState ,
  
}
/* RecordRenderConfigMainService-Wonderjs Not a pure module */
