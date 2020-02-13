

import * as ArrayService$Wonderjs from "../../../atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as CreatePerspectiveCameraProjectionService$Wonderjs from "./CreatePerspectiveCameraProjectionService.js";
import * as FrustumPerspectiveCameraProjectionService$Wonderjs from "./FrustumPerspectiveCameraProjectionService.js";

function handleCloneComponent(sourceComponent, countRangeArr, record) {
  var near = FrustumPerspectiveCameraProjectionService$Wonderjs.unsafeGetNear(sourceComponent, record);
  var far = FrustumPerspectiveCameraProjectionService$Wonderjs.unsafeGetFar(sourceComponent, record);
  var fovy = FrustumPerspectiveCameraProjectionService$Wonderjs.unsafeGetFovy(sourceComponent, record);
  var aspect = FrustumPerspectiveCameraProjectionService$Wonderjs.getAspect(sourceComponent, record);
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, param$1) {
                var match = CreatePerspectiveCameraProjectionService$Wonderjs.create(param[0]);
                var index = match[1];
                var record = FrustumPerspectiveCameraProjectionService$Wonderjs.setFovy(index, fovy, FrustumPerspectiveCameraProjectionService$Wonderjs.setFar(index, far, FrustumPerspectiveCameraProjectionService$Wonderjs.setNear(index, near, match[0])));
                return /* tuple */[
                        aspect !== undefined ? FrustumPerspectiveCameraProjectionService$Wonderjs.setAspect(index, aspect, record) : record,
                        ArrayService$Wonderjs.push(index, param[1])
                      ];
              }), /* tuple */[
              record,
              /* array */[]
            ], countRangeArr);
}

export {
  handleCloneComponent ,
  
}
/* ArrayService-Wonderjs Not a pure module */
