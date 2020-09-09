'use strict';

var BufferPBRMaterialCPRepoUtils$Wonderjs = require("./BufferPBRMaterialCPRepoUtils.bs.js");

function createTypeArrays(buffer, count) {
  return [
          new Float32Array(buffer, BufferPBRMaterialCPRepoUtils$Wonderjs.getDiffuseColorsOffset(count), BufferPBRMaterialCPRepoUtils$Wonderjs.getDiffuseColorsLength(count)),
          new Float32Array(buffer, BufferPBRMaterialCPRepoUtils$Wonderjs.getSpecularsOffset(count), BufferPBRMaterialCPRepoUtils$Wonderjs.getSpecularsLength(count)),
          new Float32Array(buffer, BufferPBRMaterialCPRepoUtils$Wonderjs.getRoughnessesOffset(count), BufferPBRMaterialCPRepoUtils$Wonderjs.getRoughnessesLength(count)),
          new Float32Array(buffer, BufferPBRMaterialCPRepoUtils$Wonderjs.getMetalnessesOffset(count), BufferPBRMaterialCPRepoUtils$Wonderjs.getMetalnessesLength(count))
        ];
}

exports.createTypeArrays = createTypeArrays;
/* No side effect */
