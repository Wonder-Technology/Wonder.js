'use strict';

var BufferDirectionLightUtils$WonderComponentWorkerUtils = require("./BufferDirectionLightUtils.bs.js");

function createTypeArrays(buffer, count) {
  return [
          new Float32Array(buffer, BufferDirectionLightUtils$WonderComponentWorkerUtils.getColorsOffset(count), BufferDirectionLightUtils$WonderComponentWorkerUtils.getColorsLength(count)),
          new Float32Array(buffer, BufferDirectionLightUtils$WonderComponentWorkerUtils.getIntensitiesOffset(count), BufferDirectionLightUtils$WonderComponentWorkerUtils.getIntensitiesLength(count))
        ];
}

exports.createTypeArrays = createTypeArrays;
/* No side effect */
