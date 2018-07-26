

import * as BufferCustomGeometryService$Wonderjs from "../../../../record/main/geometry/custom/BufferCustomGeometryService.js";
import * as ReallocatedPointsGeometryService$Wonderjs from "../../../../primitive/geometry/ReallocatedPointsGeometryService.js";

function getVertices(index, param) {
  var customGeometryRecord = param[/* customGeometryRecord */6];
  return ReallocatedPointsGeometryService$Wonderjs.getFloat32PointData(BufferCustomGeometryService$Wonderjs.getInfoIndex(index), customGeometryRecord[/* vertices */0], customGeometryRecord[/* verticesInfos */4]);
}

export {
  getVertices ,
  
}
/* BufferCustomGeometryService-Wonderjs Not a pure module */
