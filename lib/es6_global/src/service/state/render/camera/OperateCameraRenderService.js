

import * as OptionService$Wonderjs from "../../../atom/OptionService.js";

function unsafeGetCameraRecord(state) {
  return OptionService$Wonderjs.unsafeGet(state[/* cameraRecord */7]);
}

function getCameraVMatrixData(state) {
  return OptionService$Wonderjs.unsafeGet(state[/* cameraRecord */7])[/* vMatrix */0];
}

function getCameraPMatrixData(state) {
  return OptionService$Wonderjs.unsafeGet(state[/* cameraRecord */7])[/* pMatrix */1];
}

function getCameraPositionData(state) {
  return OptionService$Wonderjs.unsafeGet(state[/* cameraRecord */7])[/* position */2];
}

export {
  unsafeGetCameraRecord ,
  getCameraVMatrixData ,
  getCameraPMatrixData ,
  getCameraPositionData ,
  
}
/* OptionService-Wonderjs Not a pure module */
