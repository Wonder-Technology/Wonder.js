

import * as BufferGeometryService$Wonderjs from "../../record/main/geometry/BufferGeometryService.js";
import * as ReallocatedPointsGeometryService$Wonderjs from "./ReallocatedPointsGeometryService.js";

function hasNormals(index, normalsInfos) {
  return ReallocatedPointsGeometryService$Wonderjs.hasPointData(BufferGeometryService$Wonderjs.getInfoIndex(index), normalsInfos);
}

export {
  hasNormals ,
  
}
/* BufferGeometryService-Wonderjs Not a pure module */
