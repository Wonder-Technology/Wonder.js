

import * as RecordRenderConfigMainService$Wonderjs from "../../renderConfig/RecordRenderConfigMainService.js";
import * as RecordBasicMaterialMainService$Wonderjs from "./RecordBasicMaterialMainService.js";

function createInitMaterialState(param, state) {
  var match = RecordBasicMaterialMainService$Wonderjs.getRecord(state);
  return /* record */[
          /* materialRecord : record */[
            /* index */param[0],
            /* disposedIndexArray */param[1],
            /* shaderIndices */match[/* shaderIndices */2]
          ],
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
  createInitMaterialState ,
  
}
/* RecordRenderConfigMainService-Wonderjs Not a pure module */
