

import * as ComputePointsBoxGeometryService$Wonderjs from "../../../../record/main/geometry/box/ComputePointsBoxGeometryService.js";

function getRecord(state) {
  return state[/* boxGeometryRecord */17];
}

function create() {
  var match = ComputePointsBoxGeometryService$Wonderjs.generateAllFaces(/* () */0);
  return /* record */[
          /* vertices */new Float32Array(match[0]),
          /* texCoords */new Float32Array(match[1]),
          /* normals */new Float32Array(match[2]),
          /* indices */new Uint16Array(match[3])
        ];
}

export {
  getRecord ,
  create ,
  
}
/* ComputePointsBoxGeometryService-Wonderjs Not a pure module */
