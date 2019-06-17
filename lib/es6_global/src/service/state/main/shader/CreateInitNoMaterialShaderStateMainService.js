

import * as RecordRenderConfigMainService$Wonderjs from "../renderConfig/RecordRenderConfigMainService.js";

function createInitNoMaterialShaderState(state) {
  return /* record */[
          /* renderConfigRecord */RecordRenderConfigMainService$Wonderjs.getRecord(state),
          /* shaderRecord */state[/* shaderRecord */26],
          /* programRecord */state[/* programRecord */28],
          /* glslRecord */state[/* glslRecord */27],
          /* glslSenderRecord */state[/* glslSenderRecord */30],
          /* glslLocationRecord */state[/* glslLocationRecord */29],
          /* glslChunkRecord */state[/* glslChunkRecord */31]
        ];
}

export {
  createInitNoMaterialShaderState ,
  
}
/* RecordRenderConfigMainService-Wonderjs Not a pure module */
