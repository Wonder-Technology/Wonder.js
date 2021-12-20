

import * as BufferGeometryUtils$WonderComponentWorkerUtils from "./BufferGeometryUtils.bs.js";
import * as ReallocatedPointsGeometryUtils$WonderComponentWorkerUtils from "./ReallocatedPointsGeometryUtils.bs.js";

function getIndices(indices, indicesInfos, isDebug, geometry) {
  return ReallocatedPointsGeometryUtils$WonderComponentWorkerUtils.getUint32PointData(BufferGeometryUtils$WonderComponentWorkerUtils.getInfoIndex(geometry), indices, isDebug, indicesInfos);
}

function getIndicesCount(indicesInfos, isDebug, geometry) {
  var match = ReallocatedPointsGeometryUtils$WonderComponentWorkerUtils.getInfo(BufferGeometryUtils$WonderComponentWorkerUtils.getInfoIndex(geometry), isDebug, indicesInfos);
  return match[1] - match[0] | 0;
}

export {
  getIndices ,
  getIndicesCount ,
  
}
/* No side effect */
