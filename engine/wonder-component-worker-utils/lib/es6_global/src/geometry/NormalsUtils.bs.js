

import * as BufferGeometryUtils$WonderComponentWorkerUtils from "./BufferGeometryUtils.bs.js";
import * as ReallocatedPointsGeometryUtils$WonderComponentWorkerUtils from "./ReallocatedPointsGeometryUtils.bs.js";

function getNormals(normals, normalsInfos, isDebug, geometry) {
  return ReallocatedPointsGeometryUtils$WonderComponentWorkerUtils.getFloat32PointData(BufferGeometryUtils$WonderComponentWorkerUtils.getInfoIndex(geometry), normals, isDebug, normalsInfos);
}

export {
  getNormals ,
  
}
/* No side effect */
