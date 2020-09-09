'use strict';

var BufferDirectionLightCPRepoUtils$Wonderjs = require("./BufferDirectionLightCPRepoUtils.bs.js");

function createTypeArrays(buffer, count) {
  return [
          new Float32Array(buffer, BufferDirectionLightCPRepoUtils$Wonderjs.getColorsOffset(count), BufferDirectionLightCPRepoUtils$Wonderjs.getColorsLength(count)),
          new Float32Array(buffer, BufferDirectionLightCPRepoUtils$Wonderjs.getIntensitiesOffset(count), BufferDirectionLightCPRepoUtils$Wonderjs.getIntensitiesLength(count))
        ];
}

exports.createTypeArrays = createTypeArrays;
/* No side effect */
