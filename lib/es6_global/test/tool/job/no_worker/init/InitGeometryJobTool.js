

import * as GeometryAPI$Wonderjs from "../../../../../src/api/geometry/GeometryAPI.js";
import * as DirectorTool$Wonderjs from "../../../core/DirectorTool.js";
import * as GeometryTool$Wonderjs from "../../../service/geometry/GeometryTool.js";

function prepareGameObject(sandbox, param, state) {
  var match = GeometryTool$Wonderjs.createGameObject(state);
  var geometry = match[2];
  var state$1 = GeometryAPI$Wonderjs.setGeometryIndices16(geometry, param[3], GeometryAPI$Wonderjs.setGeometryNormals(geometry, param[1], GeometryAPI$Wonderjs.setGeometryTexCoords(geometry, param[2], GeometryAPI$Wonderjs.setGeometryVertices(geometry, param[0], match[0]))));
  return /* tuple */[
          state$1,
          match[1],
          geometry
        ];
}

function exec(state) {
  return DirectorTool$Wonderjs.init(DirectorTool$Wonderjs.prepare(state));
}

export {
  prepareGameObject ,
  exec ,
  
}
/* GeometryAPI-Wonderjs Not a pure module */
