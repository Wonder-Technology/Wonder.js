

import * as Js_option from "../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as OptionService$Wonderjs from "../../../atom/OptionService.js";

function unsafeGetCameraRecord(state) {
  return OptionService$Wonderjs.unsafeGet(state[/* cameraRecord */6]);
}

function hasCameraRecord(state) {
  return Js_option.isSome(state[/* cameraRecord */6]);
}

function getCameraVMatrixData(state) {
  return OptionService$Wonderjs.unsafeGet(state[/* cameraRecord */6])[/* vMatrix */0];
}

function getCameraPMatrixData(state) {
  return OptionService$Wonderjs.unsafeGet(state[/* cameraRecord */6])[/* pMatrix */1];
}

function getCameraPositionData(state) {
  return OptionService$Wonderjs.unsafeGet(state[/* cameraRecord */6])[/* position */2];
}

export {
  unsafeGetCameraRecord ,
  hasCameraRecord ,
  getCameraVMatrixData ,
  getCameraPMatrixData ,
  getCameraPositionData ,
  
}
/* OptionService-Wonderjs Not a pure module */
