

import * as RecordPointLightMainService$Wonderjs from "../../light/point/RecordPointLightMainService.js";
import * as RecordRenderConfigMainService$Wonderjs from "../../renderConfig/RecordRenderConfigMainService.js";
import * as RecordLightMaterialMainService$Wonderjs from "./RecordLightMaterialMainService.js";
import * as RecordDirectionLightMainService$Wonderjs from "../../light/direction/RecordDirectionLightMainService.js";

function createInitMaterialState(param, state) {
  var match = RecordLightMaterialMainService$Wonderjs.getRecord(state);
  var directionLightRecord = RecordDirectionLightMainService$Wonderjs.getRecord(state);
  var pointLightRecord = RecordPointLightMainService$Wonderjs.getRecord(state);
  return /* record */[
          /* materialRecord : record */[
            /* index */param[0],
            /* disposedIndexArray */param[1],
            /* shaderIndices */match[/* shaderIndices */2],
            /* diffuseTextureIndices */match[/* diffuseTextureIndices */6],
            /* specularTextureIndices */match[/* specularTextureIndices */7]
          ],
          /* directionLightRecord : record */[
            /* index */directionLightRecord[/* index */0],
            /* renderLightArr */directionLightRecord[/* renderLightArr */4]
          ],
          /* pointLightRecord : record */[
            /* index */pointLightRecord[/* index */0],
            /* renderLightArr */pointLightRecord[/* renderLightArr */8]
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
/* RecordPointLightMainService-Wonderjs Not a pure module */
