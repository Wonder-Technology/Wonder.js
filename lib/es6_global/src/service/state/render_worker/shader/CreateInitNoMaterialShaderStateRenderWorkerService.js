

import * as RecordRenderConfigRenderWorkerService$Wonderjs from "../renderConfig/RecordRenderConfigRenderWorkerService.js";

function createInitNoMaterialShaderState(state) {
  var shaderRecord = state[/* shaderRecord */5];
  var programRecord = state[/* programRecord */6];
  var glslRecord = state[/* glslRecord */7];
  var glslSenderRecord = state[/* glslSenderRecord */8];
  var glslLocationRecord = state[/* glslLocationRecord */9];
  var glslChunkRecord = state[/* glslChunkRecord */10];
  return /* record */[
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
  createInitNoMaterialShaderState ,
  
}
/* RecordRenderConfigRenderWorkerService-Wonderjs Not a pure module */
