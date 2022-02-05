

import * as BufferGeometryUtils$WonderComponentWorkerUtils from "./BufferGeometryUtils.bs.js";
import * as ReallocatedPointsGeometryUtils$WonderComponentWorkerUtils from "./ReallocatedPointsGeometryUtils.bs.js";

function getTangents(tangents, tangentsInfos, isDebug, geometry) {
  return ReallocatedPointsGeometryUtils$WonderComponentWorkerUtils.getFloat32PointData(BufferGeometryUtils$WonderComponentWorkerUtils.getInfoIndex(geometry), tangents, isDebug, tangentsInfos);
}

export {
  getTangents ,
  
}
/* No side effect */
