

import * as CreateDefaultGeometryService$WonderComponentCommonlib from "./CreateDefaultGeometryService.bs.js";
import * as ComputeSpherePointsGeometryService$WonderComponentCommonlib from "./ComputeSpherePointsGeometryService.bs.js";

function create(data, radius, bands) {
  return CreateDefaultGeometryService$WonderComponentCommonlib.create(data, ComputeSpherePointsGeometryService$WonderComponentCommonlib.compute(radius, bands));
}

export {
  create ,
  
}
/* CreateDefaultGeometryService-WonderComponentCommonlib Not a pure module */
