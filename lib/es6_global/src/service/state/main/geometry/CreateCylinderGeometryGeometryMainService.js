

import * as ComputeCylinderPointsGeometryService$Wonderjs from "../../../record/main/geometry/ComputeCylinderPointsGeometryService.js";
import * as CreateDefaultGeometryGeometryMainService$Wonderjs from "./CreateDefaultGeometryGeometryMainService.js";

function create(radiusTop, radiusBottom, height, radialSegments, heightSegments, state) {
  return CreateDefaultGeometryGeometryMainService$Wonderjs.create(ComputeCylinderPointsGeometryService$Wonderjs.compute(undefined, undefined, undefined, radiusTop, radiusBottom, height, radialSegments, heightSegments, /* () */0), state);
}

export {
  create ,
  
}
/* CreateDefaultGeometryGeometryMainService-Wonderjs Not a pure module */
