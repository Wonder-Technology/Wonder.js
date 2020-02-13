

import * as ComputeConePointsGeometryService$Wonderjs from "../../../record/main/geometry/ComputeConePointsGeometryService.js";
import * as CreateDefaultGeometryGeometryMainService$Wonderjs from "./CreateDefaultGeometryGeometryMainService.js";

function create(radius, height, radialSegments, heightSegments, state) {
  return CreateDefaultGeometryGeometryMainService$Wonderjs.create(ComputeConePointsGeometryService$Wonderjs.compute(undefined, undefined, undefined, radius, height, radialSegments, heightSegments, /* () */0), state);
}

export {
  create ,
  
}
/* CreateDefaultGeometryGeometryMainService-Wonderjs Not a pure module */
