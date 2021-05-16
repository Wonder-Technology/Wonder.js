

import * as Matrix4Service$Wonderjs from "../../../../../../atom/Matrix4Service.js";
import * as ModelMatrixTransformService$Wonderjs from "../../../../../../record/main/transform/ModelMatrixTransformService.js";

function getScaledLocalToWorldMatrixTypeArray(transform, state) {
  var transformRecord = state[/* transformRecord */5];
  var __x = ModelMatrixTransformService$Wonderjs.getLocalToWorldMatrixTypeArray(transform, transformRecord[/* localToWorldMatrices */0], transformRecord[/* localToWorldMatrixCacheMap */1]);
  return Matrix4Service$Wonderjs.scale(/* tuple */[
              1.01,
              1.01,
              1.01
            ], __x, Matrix4Service$Wonderjs.createIdentityMatrix4(/* () */0));
}

export {
  getScaledLocalToWorldMatrixTypeArray ,
  
}
/* Matrix4Service-Wonderjs Not a pure module */
