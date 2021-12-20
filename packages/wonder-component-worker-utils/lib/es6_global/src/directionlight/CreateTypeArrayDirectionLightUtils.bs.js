

import * as BufferDirectionLightUtils$WonderComponentWorkerUtils from "./BufferDirectionLightUtils.bs.js";

function createTypeArrays(buffer, count) {
  return [
          new Float32Array(buffer, BufferDirectionLightUtils$WonderComponentWorkerUtils.getColorsOffset(count), BufferDirectionLightUtils$WonderComponentWorkerUtils.getColorsLength(count)),
          new Float32Array(buffer, BufferDirectionLightUtils$WonderComponentWorkerUtils.getIntensitiesOffset(count), BufferDirectionLightUtils$WonderComponentWorkerUtils.getIntensitiesLength(count))
        ];
}

export {
  createTypeArrays ,
  
}
/* No side effect */
