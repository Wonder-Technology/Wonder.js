'use strict';

var BufferBSDFMaterialCPRepoUtils$Wonderjs = require("./BufferBSDFMaterialCPRepoUtils.bs.js");

function createTypeArrays(buffer, count) {
  return [
          new Float32Array(buffer, BufferBSDFMaterialCPRepoUtils$Wonderjs.getDiffuseColorsOffset(count), BufferBSDFMaterialCPRepoUtils$Wonderjs.getDiffuseColorsLength(count)),
          new Float32Array(buffer, BufferBSDFMaterialCPRepoUtils$Wonderjs.getSpecularsOffset(count), BufferBSDFMaterialCPRepoUtils$Wonderjs.getSpecularsLength(count)),
          new Float32Array(buffer, BufferBSDFMaterialCPRepoUtils$Wonderjs.getSpecularColorsOffset(count), BufferBSDFMaterialCPRepoUtils$Wonderjs.getSpecularColorsLength(count)),
          new Float32Array(buffer, BufferBSDFMaterialCPRepoUtils$Wonderjs.getRoughnessesOffset(count), BufferBSDFMaterialCPRepoUtils$Wonderjs.getRoughnessesLength(count)),
          new Float32Array(buffer, BufferBSDFMaterialCPRepoUtils$Wonderjs.getMetalnessesOffset(count), BufferBSDFMaterialCPRepoUtils$Wonderjs.getMetalnessesLength(count)),
          new Float32Array(buffer, BufferBSDFMaterialCPRepoUtils$Wonderjs.getTransmissionsOffset(count), BufferBSDFMaterialCPRepoUtils$Wonderjs.getTransmissionsLength(count)),
          new Float32Array(buffer, BufferBSDFMaterialCPRepoUtils$Wonderjs.getIORsOffset(count), BufferBSDFMaterialCPRepoUtils$Wonderjs.getIORsLength(count))
        ];
}

exports.createTypeArrays = createTypeArrays;
/* No side effect */
