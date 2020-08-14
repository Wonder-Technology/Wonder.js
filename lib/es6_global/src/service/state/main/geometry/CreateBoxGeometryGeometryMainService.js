

import * as ComputeBoxPointsGeometryService$Wonderjs from "../../../record/main/geometry/ComputeBoxPointsGeometryService.js";
import * as CreateDefaultGeometryGeometryMainService$Wonderjs from "./CreateDefaultGeometryGeometryMainService.js";

function create(state) {
  return CreateDefaultGeometryGeometryMainService$Wonderjs.create(ComputeBoxPointsGeometryService$Wonderjs.generateAllFaces(/* tuple */[
                  5,
                  5,
                  5,
                  1,
                  1,
                  1
                ]), state);
}

export {
  create ,
  
}
/* CreateDefaultGeometryGeometryMainService-Wonderjs Not a pure module */
