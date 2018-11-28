

import * as BufferSourceInstanceService$Wonderjs from "../../main/instance/sourceInstance/BufferSourceInstanceService.js";

function createTypeArrays(buffer, sourceInstanceCount, objectInstanceCountPerSourceInstance) {
  return /* tuple */[
          new Uint32Array(buffer, BufferSourceInstanceService$Wonderjs.getObjectInstanceTransformCollectionsOffset(sourceInstanceCount, objectInstanceCountPerSourceInstance), BufferSourceInstanceService$Wonderjs.getObjectInstanceTransformCollectionsLength(sourceInstanceCount, objectInstanceCountPerSourceInstance)),
          new Uint8Array(buffer, BufferSourceInstanceService$Wonderjs.getIsTransformStaticsOffset(sourceInstanceCount, objectInstanceCountPerSourceInstance), BufferSourceInstanceService$Wonderjs.getIsTransformStaticsLength(sourceInstanceCount))
        ];
}

export {
  createTypeArrays ,
  
}
/* BufferSourceInstanceService-Wonderjs Not a pure module */
