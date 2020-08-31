'use strict';

var BufferTransformCPRepoUtils$Wonderjs = require("./BufferTransformCPRepoUtils.bs.js");

function createTypeArrays(buffer, count) {
  return [
          new Float32Array(buffer, BufferTransformCPRepoUtils$Wonderjs.getLocalToWorldMatricesOffset(count), BufferTransformCPRepoUtils$Wonderjs.getLocalToWorldMatricesLength(count)),
          new Float32Array(buffer, BufferTransformCPRepoUtils$Wonderjs.getLocalPositionsOffset(count), BufferTransformCPRepoUtils$Wonderjs.getLocalPositionsLength(count)),
          new Float32Array(buffer, BufferTransformCPRepoUtils$Wonderjs.getLocalRotationsOffset(count), BufferTransformCPRepoUtils$Wonderjs.getLocalRotationsLength(count)),
          new Float32Array(buffer, BufferTransformCPRepoUtils$Wonderjs.getLocalScalesOffset(count), BufferTransformCPRepoUtils$Wonderjs.getLocalScalesLength(count))
        ];
}

exports.createTypeArrays = createTypeArrays;
/* No side effect */
