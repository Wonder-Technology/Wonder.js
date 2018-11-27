

import * as BufferGeometryService$Wonderjs from "../../../record/main/geometry/BufferGeometryService.js";
import * as ReallocatedPointsGeometryService$Wonderjs from "../../../primitive/geometry/ReallocatedPointsGeometryService.js";

function getVertices(index, param) {
  var geometryRecord = param[/* geometryRecord */5];
  return ReallocatedPointsGeometryService$Wonderjs.getFloat32PointData(BufferGeometryService$Wonderjs.getInfoIndex(index), geometryRecord[/* vertices */0], geometryRecord[/* verticesInfos */5]);
}

export {
  getVertices ,
  
}
/* BufferGeometryService-Wonderjs Not a pure module */
