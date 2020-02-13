

import * as ComputePlanePointsGeometryService$Wonderjs from "../../../record/main/geometry/ComputePlanePointsGeometryService.js";
import * as CreateDefaultGeometryGeometryMainService$Wonderjs from "./CreateDefaultGeometryGeometryMainService.js";

function create(width, height, widthSegments, heightSegments, state) {
  return CreateDefaultGeometryGeometryMainService$Wonderjs.create(ComputePlanePointsGeometryService$Wonderjs.compute(width, height, widthSegments, heightSegments), state);
}

export {
  create ,
  
}
/* CreateDefaultGeometryGeometryMainService-Wonderjs Not a pure module */
