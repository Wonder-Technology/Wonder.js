

import * as Caml_option from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as ViewService$Wonderjs from "../../../record/main/device/ViewService.js";
import * as FrustumPerspectiveCameraProjectionService$Wonderjs from "../../../record/main/perspective_camera_projection/FrustumPerspectiveCameraProjectionService.js";

function computeAspect(state) {
  var canvas = ViewService$Wonderjs.getCanvas(state[/* viewRecord */8]);
  if (canvas !== undefined) {
    var canvas$1 = Caml_option.valFromOption(canvas);
    return canvas$1.width / canvas$1.height;
  }
  
}

function getAspect(cameraProjection, state) {
  return FrustumPerspectiveCameraProjectionService$Wonderjs.getAspect(cameraProjection, state[/* perspectiveCameraProjectionRecord */14]);
}

function setAspect(cameraProjection, aspect, state) {
  FrustumPerspectiveCameraProjectionService$Wonderjs.setAspect(cameraProjection, aspect, state[/* perspectiveCameraProjectionRecord */14]);
  return state;
}

function removeAspect(cameraProjection, state) {
  FrustumPerspectiveCameraProjectionService$Wonderjs.removeAspect(cameraProjection, state[/* perspectiveCameraProjectionRecord */14]);
  return state;
}

export {
  computeAspect ,
  getAspect ,
  setAspect ,
  removeAspect ,
  
}
/* ViewService-Wonderjs Not a pure module */
