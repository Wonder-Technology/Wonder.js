

import * as Curry from "./../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Wonder_jest from "./../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as VMatrixService$Wonderjs from "../../../../src/service/primitive/VMatrixService.js";
import * as RecordTransformMainService$Wonderjs from "../../../../src/service/state/main/transform/RecordTransformMainService.js";
import * as UpdateTransformMainService$Wonderjs from "../../../../src/service/state/main/transform/UpdateTransformMainService.js";
import * as ModelMatrixTransformService$Wonderjs from "../../../../src/service/record/main/transform/ModelMatrixTransformService.js";

function isBasicCameraView(basicCameraView) {
  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* >= */2], Wonder_jest.Expect[/* expect */0](basicCameraView), 0);
}

function getWorldToCameraMatrix(transform, state) {
  var match = RecordTransformMainService$Wonderjs.getRecord(state);
  var localToWorldMatrices = match[/* localToWorldMatrices */2];
  var localToWorldMatrixCacheMap = match[/* localToWorldMatrixCacheMap */19];
  return VMatrixService$Wonderjs.getWorldToCameraMatrix(ModelMatrixTransformService$Wonderjs.getLocalToWorldMatrixTypeArray(transform, localToWorldMatrices, localToWorldMatrixCacheMap));
}

function getPosition(transform, state) {
  return UpdateTransformMainService$Wonderjs.updateAndGetPositionTuple(transform, state[/* globalTempRecord */37], RecordTransformMainService$Wonderjs.getRecord(state));
}

export {
  isBasicCameraView ,
  getWorldToCameraMatrix ,
  getPosition ,
  
}
/* Wonder_jest Not a pure module */
