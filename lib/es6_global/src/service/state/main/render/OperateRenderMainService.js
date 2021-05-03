

import * as Js_option from "./../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as OptionService$Wonderjs from "../../../atom/OptionService.js";
import * as RecordRenderMainService$Wonderjs from "./RecordRenderMainService.js";

function getCameraRecord(state) {
  return RecordRenderMainService$Wonderjs.getRecord(state)[/* cameraRecord */2];
}

function unsafeGetCameraRecord(state) {
  return OptionService$Wonderjs.unsafeGet(RecordRenderMainService$Wonderjs.getRecord(state)[/* cameraRecord */2]);
}

function setCameraRecord(cameraRecord, state) {
  RecordRenderMainService$Wonderjs.getRecord(state)[/* cameraRecord */2] = cameraRecord;
  return state;
}

function hasCameraRecord(state) {
  return Js_option.isSome(RecordRenderMainService$Wonderjs.getRecord(state)[/* cameraRecord */2]);
}

function getBasicRenderObjectRecord(state) {
  return RecordRenderMainService$Wonderjs.getRecord(state)[/* basicRenderObjectRecord */0];
}

function unsafeGetBasicRenderObjectRecord(state) {
  return OptionService$Wonderjs.unsafeGet(RecordRenderMainService$Wonderjs.getRecord(state)[/* basicRenderObjectRecord */0]);
}

function getLightRenderObjectRecord(state) {
  return RecordRenderMainService$Wonderjs.getRecord(state)[/* lightRenderObjectRecord */1];
}

function unsafeGetLightRenderObjectRecord(state) {
  return OptionService$Wonderjs.unsafeGet(RecordRenderMainService$Wonderjs.getRecord(state)[/* lightRenderObjectRecord */1]);
}

export {
  getCameraRecord ,
  unsafeGetCameraRecord ,
  setCameraRecord ,
  hasCameraRecord ,
  getBasicRenderObjectRecord ,
  unsafeGetBasicRenderObjectRecord ,
  getLightRenderObjectRecord ,
  unsafeGetLightRenderObjectRecord ,
  
}
/* OptionService-Wonderjs Not a pure module */
