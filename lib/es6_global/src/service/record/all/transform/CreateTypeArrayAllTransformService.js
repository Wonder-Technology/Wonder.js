

import * as BufferTransformService$Wonderjs from "../../main/transform/BufferTransformService.js";

function createTypeArrays(buffer, count) {
  return /* tuple */[
          new Float32Array(buffer, BufferTransformService$Wonderjs.getLocalToWorldMatricesOffset(count), BufferTransformService$Wonderjs.getLocalToWorldMatricesLength(count)),
          new Float32Array(buffer, BufferTransformService$Wonderjs.getLocalPositionsOffset(count), BufferTransformService$Wonderjs.getLocalPositionsLength(count)),
          new Float32Array(buffer, BufferTransformService$Wonderjs.getLocalRotationsOffset(count), BufferTransformService$Wonderjs.getLocalRotationsLength(count)),
          new Float32Array(buffer, BufferTransformService$Wonderjs.getLocalScalesOffset(count), BufferTransformService$Wonderjs.getLocalScalesLength(count))
        ];
}

export {
  createTypeArrays ,
  
}
/* BufferTransformService-Wonderjs Not a pure module */
