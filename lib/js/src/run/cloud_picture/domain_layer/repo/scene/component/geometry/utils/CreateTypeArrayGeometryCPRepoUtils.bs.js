'use strict';

var BufferGeometryCPRepoUtils$Wonderjs = require("./BufferGeometryCPRepoUtils.bs.js");

function createTypeArrays(buffer, geometryPointCount, geometryCount) {
  return [
          new Float32Array(buffer, BufferGeometryCPRepoUtils$Wonderjs.getVerticesOffset(geometryPointCount), BufferGeometryCPRepoUtils$Wonderjs.getVertexLength(geometryPointCount)),
          new Float32Array(buffer, BufferGeometryCPRepoUtils$Wonderjs.getNormalsOffset(geometryPointCount), BufferGeometryCPRepoUtils$Wonderjs.getVertexLength(geometryPointCount)),
          new Uint32Array(buffer, BufferGeometryCPRepoUtils$Wonderjs.getIndicesOffset(geometryPointCount), BufferGeometryCPRepoUtils$Wonderjs.getIndicesLength(geometryPointCount)),
          new Uint32Array(buffer, BufferGeometryCPRepoUtils$Wonderjs.getVerticesInfosOffset(geometryPointCount), BufferGeometryCPRepoUtils$Wonderjs.getVerticesInfosLength(geometryCount)),
          new Uint32Array(buffer, BufferGeometryCPRepoUtils$Wonderjs.getNormalsInfosOffset(geometryPointCount, geometryCount), BufferGeometryCPRepoUtils$Wonderjs.getNormalsInfosLength(geometryCount)),
          new Uint32Array(buffer, BufferGeometryCPRepoUtils$Wonderjs.getIndicesInfosOffset(geometryPointCount, geometryCount), BufferGeometryCPRepoUtils$Wonderjs.getIndicesInfosLength(geometryCount))
        ];
}

exports.createTypeArrays = createTypeArrays;
/* No side effect */
