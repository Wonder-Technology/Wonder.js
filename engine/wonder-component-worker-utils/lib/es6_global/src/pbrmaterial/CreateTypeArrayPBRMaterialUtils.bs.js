

import * as BufferPBRMaterialUtils$WonderComponentWorkerUtils from "./BufferPBRMaterialUtils.bs.js";

function createTypeArrays(buffer, count) {
  return [
          new Float32Array(buffer, BufferPBRMaterialUtils$WonderComponentWorkerUtils.getDiffuseColorsOffset(count), BufferPBRMaterialUtils$WonderComponentWorkerUtils.getDiffuseColorsLength(count)),
          new Float32Array(buffer, BufferPBRMaterialUtils$WonderComponentWorkerUtils.getSpecularsOffset(count), BufferPBRMaterialUtils$WonderComponentWorkerUtils.getSpecularsLength(count)),
          new Float32Array(buffer, BufferPBRMaterialUtils$WonderComponentWorkerUtils.getSpecularColorsOffset(count), BufferPBRMaterialUtils$WonderComponentWorkerUtils.getSpecularColorsLength(count)),
          new Float32Array(buffer, BufferPBRMaterialUtils$WonderComponentWorkerUtils.getRoughnessesOffset(count), BufferPBRMaterialUtils$WonderComponentWorkerUtils.getRoughnessesLength(count)),
          new Float32Array(buffer, BufferPBRMaterialUtils$WonderComponentWorkerUtils.getMetalnessesOffset(count), BufferPBRMaterialUtils$WonderComponentWorkerUtils.getMetalnessesLength(count)),
          new Float32Array(buffer, BufferPBRMaterialUtils$WonderComponentWorkerUtils.getTransmissionsOffset(count), BufferPBRMaterialUtils$WonderComponentWorkerUtils.getTransmissionsLength(count)),
          new Float32Array(buffer, BufferPBRMaterialUtils$WonderComponentWorkerUtils.getIORsOffset(count), BufferPBRMaterialUtils$WonderComponentWorkerUtils.getIORsLength(count))
        ];
}

export {
  createTypeArrays ,
  
}
/* No side effect */
