

import * as RecordRenderConfigRenderWorkerService$Wonderjs from "../../renderConfig/RecordRenderConfigRenderWorkerService.js";
import * as RecordBasicMaterialRenderWorkerService$Wonderjs from "./RecordBasicMaterialRenderWorkerService.js";

function createInitMaterialState(state) {
  var shaderRecord = state[/* shaderRecord */5];
  var programRecord = state[/* programRecord */6];
  var glslRecord = state[/* glslRecord */7];
  var glslSenderRecord = state[/* glslSenderRecord */8];
  var glslLocationRecord = state[/* glslLocationRecord */9];
  var glslChunkRecord = state[/* glslChunkRecord */10];
  var match = RecordBasicMaterialRenderWorkerService$Wonderjs.getRecord(state);
  return /* record */[
          /* materialRecord : record */[
            /* index */match[/* index */6],
            /* disposedIndexArray */match[/* disposedIndexArray */7],
            /* shaderIndices */RecordBasicMaterialRenderWorkerService$Wonderjs.unsafeGetShaderIndices(state),
            /* mapUnits */RecordBasicMaterialRenderWorkerService$Wonderjs.unsafeGetMapUnits(state)
          ],
          /* renderConfigRecord */RecordRenderConfigRenderWorkerService$Wonderjs.getRecord(state),
          /* shaderRecord */shaderRecord,
          /* programRecord */programRecord,
          /* glslRecord */glslRecord,
          /* glslSenderRecord */glslSenderRecord,
          /* glslLocationRecord */glslLocationRecord,
          /* glslChunkRecord */glslChunkRecord
        ];
}

export {
  createInitMaterialState ,
  
}
/* RecordRenderConfigRenderWorkerService-Wonderjs Not a pure module */
