

import * as BufferGeometryUtils$WonderComponentWorkerUtils from "./BufferGeometryUtils.bs.js";
import * as ReallocatedPointsGeometryUtils$WonderComponentWorkerUtils from "./ReallocatedPointsGeometryUtils.bs.js";

function getTexCoords(texCoords, texCoordsInfos, isDebug, geometry) {
  return ReallocatedPointsGeometryUtils$WonderComponentWorkerUtils.getFloat32PointData(BufferGeometryUtils$WonderComponentWorkerUtils.getInfoIndex(geometry), texCoords, isDebug, texCoordsInfos);
}

export {
  getTexCoords ,
  
}
/* No side effect */
