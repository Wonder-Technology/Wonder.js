

import * as BufferGeometryService$Wonderjs from "../../../record/main/geometry/BufferGeometryService.js";
import * as NormalsRenderGeometryService$Wonderjs from "../../../record/render/geometry/NormalsRenderGeometryService.js";
import * as ReallocatedPointsGeometryService$Wonderjs from "../../../primitive/geometry/ReallocatedPointsGeometryService.js";
import * as ComputeGeometryNormalsRenderService$Wonderjs from "./ComputeGeometryNormalsRenderService.js";

function _getNormals(index, param) {
  var geometryRecord = param[/* geometryRecord */5];
  return ReallocatedPointsGeometryService$Wonderjs.getFloat32PointData(BufferGeometryService$Wonderjs.getInfoIndex(index), geometryRecord[/* normals */2], geometryRecord[/* normalsInfos */7]);
}

function getNormals(index, state) {
  var match = NormalsRenderGeometryService$Wonderjs.hasNormals(index, state[/* geometryRecord */5]);
  if (match) {
    return _getNormals(index, state);
  } else {
    return ComputeGeometryNormalsRenderService$Wonderjs.computeVertexNormals(index, state);
  }
}

export {
  _getNormals ,
  getNormals ,
  
}
/* BufferGeometryService-Wonderjs Not a pure module */
