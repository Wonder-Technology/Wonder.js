

import * as BufferGeometryService$Wonderjs from "../../../record/main/geometry/BufferGeometryService.js";
import * as ReallocatedPointsGeometryService$Wonderjs from "../../../primitive/geometry/ReallocatedPointsGeometryService.js";

function getIndices(index, param) {
  var geometryRecord = param[/* geometryRecord */5];
  return ReallocatedPointsGeometryService$Wonderjs.getUint16PointData(BufferGeometryService$Wonderjs.getInfoIndex(index), geometryRecord[/* indices */3], geometryRecord[/* indicesInfos */8]);
}

function getIndices32(index, param) {
  var geometryRecord = param[/* geometryRecord */5];
  return ReallocatedPointsGeometryService$Wonderjs.getUint32PointData(BufferGeometryService$Wonderjs.getInfoIndex(index), geometryRecord[/* indices32 */4], geometryRecord[/* indicesInfos */8]);
}

function getIndicesCount(index, param) {
  var match = ReallocatedPointsGeometryService$Wonderjs.getInfo(BufferGeometryService$Wonderjs.getInfoIndex(index), param[/* geometryRecord */5][/* indicesInfos */8]);
  return match[1] - match[0] | 0;
}

export {
  getIndices ,
  getIndices32 ,
  getIndicesCount ,
  
}
/* BufferGeometryService-Wonderjs Not a pure module */
