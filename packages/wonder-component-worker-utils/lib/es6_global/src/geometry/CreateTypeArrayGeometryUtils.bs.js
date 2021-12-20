

import * as BufferGeometryUtils$WonderComponentWorkerUtils from "./BufferGeometryUtils.bs.js";

function createTypeArrays(buffer, geometryPointCount, geometryCount) {
  return [
          new Float32Array(buffer, BufferGeometryUtils$WonderComponentWorkerUtils.getVerticesOffset(geometryPointCount), BufferGeometryUtils$WonderComponentWorkerUtils.getVertexLength(geometryPointCount)),
          new Float32Array(buffer, BufferGeometryUtils$WonderComponentWorkerUtils.getTexCoordsOffset(geometryPointCount), BufferGeometryUtils$WonderComponentWorkerUtils.getTexCoordsLength(geometryPointCount)),
          new Float32Array(buffer, BufferGeometryUtils$WonderComponentWorkerUtils.getNormalsOffset(geometryPointCount), BufferGeometryUtils$WonderComponentWorkerUtils.getVertexLength(geometryPointCount)),
          new Float32Array(buffer, BufferGeometryUtils$WonderComponentWorkerUtils.getTangentsOffset(geometryPointCount), BufferGeometryUtils$WonderComponentWorkerUtils.getVertexLength(geometryPointCount)),
          new Uint32Array(buffer, BufferGeometryUtils$WonderComponentWorkerUtils.getIndicesOffset(geometryPointCount), BufferGeometryUtils$WonderComponentWorkerUtils.getIndicesLength(geometryPointCount)),
          new Uint32Array(buffer, BufferGeometryUtils$WonderComponentWorkerUtils.getVerticesInfosOffset(geometryPointCount), BufferGeometryUtils$WonderComponentWorkerUtils.getVerticesInfosLength(geometryCount)),
          new Uint32Array(buffer, BufferGeometryUtils$WonderComponentWorkerUtils.getTexCoordsInfosOffset(geometryPointCount, geometryCount), BufferGeometryUtils$WonderComponentWorkerUtils.getTexCoordsInfosLength(geometryCount)),
          new Uint32Array(buffer, BufferGeometryUtils$WonderComponentWorkerUtils.getNormalsInfosOffset(geometryPointCount, geometryCount), BufferGeometryUtils$WonderComponentWorkerUtils.getNormalsInfosLength(geometryCount)),
          new Uint32Array(buffer, BufferGeometryUtils$WonderComponentWorkerUtils.getTangentsInfosOffset(geometryPointCount, geometryCount), BufferGeometryUtils$WonderComponentWorkerUtils.getTangentsInfosLength(geometryCount)),
          new Uint32Array(buffer, BufferGeometryUtils$WonderComponentWorkerUtils.getIndicesInfosOffset(geometryPointCount, geometryCount), BufferGeometryUtils$WonderComponentWorkerUtils.getIndicesInfosLength(geometryCount))
        ];
}

export {
  createTypeArrays ,
  
}
/* No side effect */
