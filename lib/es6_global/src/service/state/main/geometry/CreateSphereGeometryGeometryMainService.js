

import * as ComputeSpherePointsGeometryService$Wonderjs from "../../../record/main/geometry/ComputeSpherePointsGeometryService.js";
import * as CreateDefaultGeometryGeometryMainService$Wonderjs from "./CreateDefaultGeometryGeometryMainService.js";

function create(radius, bands, state) {
  return CreateDefaultGeometryGeometryMainService$Wonderjs.create(ComputeSpherePointsGeometryService$Wonderjs.compute(radius, bands), state);
}

export {
  create ,
  
}
/* ComputeSpherePointsGeometryService-Wonderjs Not a pure module */
