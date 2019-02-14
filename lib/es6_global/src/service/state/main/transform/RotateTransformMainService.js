

import * as QuaternionService$Wonderjs from "../../../atom/QuaternionService.js";
import * as RecordTransformMainService$Wonderjs from "./RecordTransformMainService.js";
import * as ModelMatrixTransformService$Wonderjs from "../../../record/main/transform/ModelMatrixTransformService.js";

function rotateLocalOnAxis(transform, param, state) {
  var rot = QuaternionService$Wonderjs.setFromAxisAngle(param[0], param[1]);
  var transformRecord = RecordTransformMainService$Wonderjs.getRecord(state);
  var localRotations = transformRecord[/* localRotations */4];
  state[/* transformRecord */11] = ModelMatrixTransformService$Wonderjs.setLocalRotationByTuple(transform, QuaternionService$Wonderjs.multiply(ModelMatrixTransformService$Wonderjs.getLocalRotationTuple(transform, localRotations), rot), transformRecord);
  return state;
}

function rotateWorldOnAxis(transform, param, state) {
  var rot = QuaternionService$Wonderjs.setFromAxisAngle(param[0], param[1]);
  var transformRecord = RecordTransformMainService$Wonderjs.getRecord(state);
  var localRotations = transformRecord[/* localRotations */4];
  state[/* transformRecord */11] = ModelMatrixTransformService$Wonderjs.setLocalRotationByTuple(transform, QuaternionService$Wonderjs.multiply(rot, ModelMatrixTransformService$Wonderjs.getLocalRotationTuple(transform, localRotations)), transformRecord);
  return state;
}

export {
  rotateLocalOnAxis ,
  rotateWorldOnAxis ,
  
}
/* RecordTransformMainService-Wonderjs Not a pure module */
