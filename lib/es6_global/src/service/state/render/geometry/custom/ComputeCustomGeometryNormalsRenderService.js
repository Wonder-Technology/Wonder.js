

import * as ComputeNormalsService$Wonderjs from "../../../../primitive/geometry/ComputeNormalsService.js";
import * as GetCustomGeometryIndicesRenderService$Wonderjs from "./GetCustomGeometryIndicesRenderService.js";
import * as GetCustomGeometryVerticesRenderService$Wonderjs from "./GetCustomGeometryVerticesRenderService.js";

function computeVertexNormals(index, state) {
  return ComputeNormalsService$Wonderjs.computeVertexNormals(GetCustomGeometryVerticesRenderService$Wonderjs.getVertices(index, state), GetCustomGeometryIndicesRenderService$Wonderjs.getIndices(index, state));
}

export {
  computeVertexNormals ,
  
}
/* GetCustomGeometryIndicesRenderService-Wonderjs Not a pure module */
