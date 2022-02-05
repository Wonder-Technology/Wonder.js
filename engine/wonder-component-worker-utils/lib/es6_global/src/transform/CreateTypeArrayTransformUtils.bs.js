

import * as BufferTransformUtils$WonderComponentWorkerUtils from "./BufferTransformUtils.bs.js";

function createTypeArrays(buffer, count) {
  return [
          new Float32Array(buffer, BufferTransformUtils$WonderComponentWorkerUtils.getLocalToWorldMatricesOffset(count), BufferTransformUtils$WonderComponentWorkerUtils.getLocalToWorldMatricesLength(count)),
          new Float32Array(buffer, BufferTransformUtils$WonderComponentWorkerUtils.getLocalPositionsOffset(count), BufferTransformUtils$WonderComponentWorkerUtils.getLocalPositionsLength(count)),
          new Float32Array(buffer, BufferTransformUtils$WonderComponentWorkerUtils.getLocalRotationsOffset(count), BufferTransformUtils$WonderComponentWorkerUtils.getLocalRotationsLength(count)),
          new Float32Array(buffer, BufferTransformUtils$WonderComponentWorkerUtils.getLocalScalesOffset(count), BufferTransformUtils$WonderComponentWorkerUtils.getLocalScalesLength(count))
        ];
}

export {
  createTypeArrays ,
  
}
/* No side effect */
