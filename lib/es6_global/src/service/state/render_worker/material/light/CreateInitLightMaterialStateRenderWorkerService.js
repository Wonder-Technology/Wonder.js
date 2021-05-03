

import * as RecordPointLightRenderWorkerService$Wonderjs from "../../light/point/RecordPointLightRenderWorkerService.js";
import * as RecordRenderWorkerPointLightService$Wonderjs from "../../../../record/render_worker/light/point/RecordRenderWorkerPointLightService.js";
import * as RecordRenderConfigRenderWorkerService$Wonderjs from "../../renderConfig/RecordRenderConfigRenderWorkerService.js";
import * as RecordLightMaterialRenderWorkerService$Wonderjs from "./RecordLightMaterialRenderWorkerService.js";
import * as RecordDirectionLightRenderWorkerService$Wonderjs from "../../light/direction/RecordDirectionLightRenderWorkerService.js";
import * as RecordRenderWorkerDirectionLightService$Wonderjs from "../../../../record/render_worker/light/direction/RecordRenderWorkerDirectionLightService.js";

function createInitMaterialState(state) {
  var shaderRecord = state[/* shaderRecord */5];
  var programRecord = state[/* programRecord */6];
  var glslRecord = state[/* glslRecord */7];
  var glslSenderRecord = state[/* glslSenderRecord */8];
  var glslLocationRecord = state[/* glslLocationRecord */9];
  var glslChunkRecord = state[/* glslChunkRecord */10];
  var directionLightRecord = RecordDirectionLightRenderWorkerService$Wonderjs.getRecord(state);
  var pointLightRecord = RecordPointLightRenderWorkerService$Wonderjs.getRecord(state);
  var match = RecordLightMaterialRenderWorkerService$Wonderjs.getRecord(state);
  return /* record */[
          /* materialRecord : record */[
            /* index */match[/* index */6],
            /* disposedIndexArray */match[/* disposedIndexArray */7],
            /* shaderIndices */RecordLightMaterialRenderWorkerService$Wonderjs.unsafeGetShaderIndices(state),
            /* diffuseTextureIndices */RecordLightMaterialRenderWorkerService$Wonderjs.unsafeGetDiffuseTextureIndices(state),
            /* specularTextureIndices */RecordLightMaterialRenderWorkerService$Wonderjs.unsafeGetSpecularTextureIndices(state)
          ],
          /* directionLightRecord : record */[
            /* index */directionLightRecord[/* index */0],
            /* renderLightArr */RecordRenderWorkerDirectionLightService$Wonderjs.getRenderLightArr(directionLightRecord)
          ],
          /* pointLightRecord : record */[
            /* index */pointLightRecord[/* index */0],
            /* renderLightArr */RecordRenderWorkerPointLightService$Wonderjs.getRenderLightArr(pointLightRecord)
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
/* RecordPointLightRenderWorkerService-Wonderjs Not a pure module */
