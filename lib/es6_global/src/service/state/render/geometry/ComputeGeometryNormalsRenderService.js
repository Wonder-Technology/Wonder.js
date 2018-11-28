

import * as ComputeNormalsService$Wonderjs from "../../../primitive/geometry/ComputeNormalsService.js";
import * as GeometryRenderService$Wonderjs from "./GeometryRenderService.js";
import * as GetGeometryIndicesRenderService$Wonderjs from "./GetGeometryIndicesRenderService.js";
import * as GetGeometryVerticesRenderService$Wonderjs from "./GetGeometryVerticesRenderService.js";

function computeVertexNormals(index, state) {
  var match = GeometryRenderService$Wonderjs.unsafeGetIndicesType(index, state);
  if (match) {
    return ComputeNormalsService$Wonderjs.computeVertexNormalsByIndices32(GetGeometryVerticesRenderService$Wonderjs.getVertices(index, state), GetGeometryIndicesRenderService$Wonderjs.getIndices32(index, state));
  } else {
    return ComputeNormalsService$Wonderjs.computeVertexNormalsByIndices(GetGeometryVerticesRenderService$Wonderjs.getVertices(index, state), GetGeometryIndicesRenderService$Wonderjs.getIndices(index, state));
  }
}

export {
  computeVertexNormals ,
  
}
/* GeometryRenderService-Wonderjs Not a pure module */
