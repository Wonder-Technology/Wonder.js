

import * as ModelMatrixTransformService$Wonderjs from "../../../../record/main/transform/ModelMatrixTransformService.js";

function getLocalToWorldMatrixTypeArray(transform, state) {
  var transformRecord = state[/* transformRecord */5];
  return ModelMatrixTransformService$Wonderjs.getLocalToWorldMatrixTypeArray(transform, transformRecord[/* localToWorldMatrices */0], transformRecord[/* localToWorldMatrixCacheMap */1]);
}

function getNormalMatrixTypeArray(transform, param) {
  var transformRecord = param[/* transformRecord */5];
  return ModelMatrixTransformService$Wonderjs.getNormalMatrixTypeArray(transform, transformRecord[/* localToWorldMatrices */0], /* tuple */[
              transformRecord[/* localToWorldMatrixCacheMap */1],
              transformRecord[/* normalMatrixCacheMap */2]
            ], param[/* globalTempRecord */7]);
}

export {
  getLocalToWorldMatrixTypeArray ,
  getNormalMatrixTypeArray ,
  
}
/* ModelMatrixTransformService-Wonderjs Not a pure module */
