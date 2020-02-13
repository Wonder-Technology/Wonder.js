

import * as BufferGeometryService$Wonderjs from "../../../record/main/geometry/BufferGeometryService.js";
import * as ReallocatedPointsGeometryService$Wonderjs from "../../../primitive/geometry/ReallocatedPointsGeometryService.js";

function getTexCoords(index, param) {
  var geometryRecord = param[/* geometryRecord */5];
  return ReallocatedPointsGeometryService$Wonderjs.getFloat32PointData(BufferGeometryService$Wonderjs.getInfoIndex(index), geometryRecord[/* texCoords */1], geometryRecord[/* texCoordsInfos */6]);
}

export {
  getTexCoords ,
  
}
/* BufferGeometryService-Wonderjs Not a pure module */
