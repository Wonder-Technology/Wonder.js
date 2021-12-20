

import * as ComputePointsGeometryService$WonderComponentCommonlib from "./ComputePointsGeometryService.bs.js";
import * as CreateDefaultGeometryService$WonderComponentCommonlib from "./CreateDefaultGeometryService.bs.js";

function create(data) {
  return CreateDefaultGeometryService$WonderComponentCommonlib.create(data, ComputePointsGeometryService$WonderComponentCommonlib.addTangents([
                  [
                    0.0,
                    0.5,
                    0,
                    -0.5,
                    -0.5,
                    0,
                    0.5,
                    -0.5,
                    0
                  ],
                  [
                    0.5,
                    1,
                    0,
                    0,
                    1,
                    0
                  ],
                  [
                    0,
                    0,
                    1,
                    0,
                    0,
                    1,
                    0,
                    0,
                    1
                  ],
                  [
                    0,
                    1,
                    2
                  ]
                ]));
}

export {
  create ,
  
}
/* CreateDefaultGeometryService-WonderComponentCommonlib Not a pure module */
