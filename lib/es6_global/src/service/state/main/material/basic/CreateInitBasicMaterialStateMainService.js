

import * as RecordRenderConfigMainService$Wonderjs from "../../renderConfig/RecordRenderConfigMainService.js";
import * as RecordBasicMaterialMainService$Wonderjs from "./RecordBasicMaterialMainService.js";

function createInitMaterialState(param, state) {
  var match = RecordBasicMaterialMainService$Wonderjs.getRecord(state);
  return /* record */[
          /* materialRecord : record */[
            /* index */param[0],
            /* disposedIndexArray */param[1],
            /* shaderIndices */match[/* shaderIndices */2],
            /* mapUnits */match[/* mapUnits */5]
          ],
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
  createInitMaterialState ,
  
}
/* RecordRenderConfigMainService-Wonderjs Not a pure module */
