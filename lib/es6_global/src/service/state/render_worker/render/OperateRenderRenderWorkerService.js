

import * as OptionService$Wonderjs from "../../../atom/OptionService.js";

function getCameraRecord(state) {
  return state[/* renderRecord */23][/* cameraRecord */2];
}

function unsafeGetCameraRecord(state) {
  return OptionService$Wonderjs.unsafeGet(state[/* renderRecord */23][/* cameraRecord */2]);
}

function getBasicRenderObjectRecord(state) {
  return state[/* renderRecord */23][/* basicRenderObjectRecord */0];
}

function getLightRenderObjectRecord(state) {
  return state[/* renderRecord */23][/* lightRenderObjectRecord */1];
}

export {
  getCameraRecord ,
  unsafeGetCameraRecord ,
  getBasicRenderObjectRecord ,
  getLightRenderObjectRecord ,
  
}
/* OptionService-Wonderjs Not a pure module */
