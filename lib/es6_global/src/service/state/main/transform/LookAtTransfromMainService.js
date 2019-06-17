

import * as Matrix4Service$Wonderjs from "../../../atom/Matrix4Service.js";
import * as QuaternionService$Wonderjs from "../../../atom/QuaternionService.js";
import * as RecordTransformMainService$Wonderjs from "./RecordTransformMainService.js";
import * as UpdateTransformMainService$Wonderjs from "./UpdateTransformMainService.js";

function lookAt(transform, target, state, $staropt$star, param) {
  var up = $staropt$star !== undefined ? $staropt$star : /* tuple */[
      0,
      1,
      0
    ];
  var globalTempRecord = state[/* globalTempRecord */35];
  var transformRecord = RecordTransformMainService$Wonderjs.getRecord(state);
  var __x = QuaternionService$Wonderjs.setFromMatrix(Matrix4Service$Wonderjs.setLookAt(UpdateTransformMainService$Wonderjs.updateAndGetPositionTuple(transform, globalTempRecord, transformRecord), target, up));
  state[/* transformRecord */11] = UpdateTransformMainService$Wonderjs.updateAndSetRotationByTuple(transform, __x, globalTempRecord, transformRecord);
  return state;
}

export {
  lookAt ,
  
}
/* Matrix4Service-Wonderjs Not a pure module */
