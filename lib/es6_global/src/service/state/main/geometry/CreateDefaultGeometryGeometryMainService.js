

import * as CreateGeometryMainService$Wonderjs from "./CreateGeometryMainService.js";
import * as IndicesGeometryMainService$Wonderjs from "./IndicesGeometryMainService.js";
import * as NormalsGeometryMainService$Wonderjs from "./NormalsGeometryMainService.js";
import * as VerticesGeometryMainService$Wonderjs from "./VerticesGeometryMainService.js";
import * as TexCoordsGeometryMainService$Wonderjs from "./TexCoordsGeometryMainService.js";

function create(param, state) {
  var match = CreateGeometryMainService$Wonderjs.create(state);
  var geometry = match[1];
  var state$1 = IndicesGeometryMainService$Wonderjs.setIndicesByUint16Array(geometry, new Uint16Array(param[3]), NormalsGeometryMainService$Wonderjs.setNormalsByTypeArray(geometry, new Float32Array(param[2]), TexCoordsGeometryMainService$Wonderjs.setTexCoordsByTypeArray(geometry, new Float32Array(param[1]), VerticesGeometryMainService$Wonderjs.setVerticesByTypeArray(geometry, new Float32Array(param[0]), match[0]))));
  return /* tuple */[
          state$1,
          geometry
        ];
}

export {
  create ,
  
}
/* CreateGeometryMainService-Wonderjs Not a pure module */
