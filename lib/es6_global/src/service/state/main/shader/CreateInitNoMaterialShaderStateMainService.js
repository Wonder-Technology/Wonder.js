

import * as RecordRenderConfigMainService$Wonderjs from "../renderConfig/RecordRenderConfigMainService.js";

function createInitNoMaterialShaderState(state) {
  return /* record */[
          /* renderConfigRecord */RecordRenderConfigMainService$Wonderjs.getRecord(state),
          /* shaderRecord */state[/* shaderRecord */28],
          /* programRecord */state[/* programRecord */30],
          /* glslRecord */state[/* glslRecord */29],
          /* glslSenderRecord */state[/* glslSenderRecord */32],
          /* glslLocationRecord */state[/* glslLocationRecord */31],
          /* glslChunkRecord */state[/* glslChunkRecord */33]
        ];
}

export {
  createInitNoMaterialShaderState ,
  
}
/* RecordRenderConfigMainService-Wonderjs Not a pure module */
