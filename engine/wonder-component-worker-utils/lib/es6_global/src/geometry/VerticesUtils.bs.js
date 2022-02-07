

import * as BufferGeometryUtils$WonderComponentWorkerUtils from "./BufferGeometryUtils.bs.js";
import * as ReallocatedPointsGeometryUtils$WonderComponentWorkerUtils from "./ReallocatedPointsGeometryUtils.bs.js";

function getVertices(vertices, verticesInfos, isDebug, geometry) {
  return ReallocatedPointsGeometryUtils$WonderComponentWorkerUtils.getFloat32PointData(BufferGeometryUtils$WonderComponentWorkerUtils.getInfoIndex(geometry), vertices, isDebug, verticesInfos);
}

export {
  getVertices ,
  
}
/* No side effect */
