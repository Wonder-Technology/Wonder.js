

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as PMatrixService$Wonderjs from "../../../../src/service/primitive/PMatrixService.js";
import * as PerspectiveCameraProjectionAPI$Wonderjs from "../../../../src/api/camera/PerspectiveCameraProjectionAPI.js";
import * as FrustumPerspectiveCameraProjectionService$Wonderjs from "../../../../src/service/record/main/perspective_camera_projection/FrustumPerspectiveCameraProjectionService.js";
import * as InitPerspectiveCameraProjectionMainService$Wonderjs from "../../../../src/service/state/main/perspective_camera_projection/InitPerspectiveCameraProjectionMainService.js";
import * as UpdatePerspectiveCameraProjectionMainService$Wonderjs from "../../../../src/service/state/main/perspective_camera_projection/UpdatePerspectiveCameraProjectionMainService.js";

function isPerspectiveCameraProjection(cameraProjection) {
  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* >= */2], Wonder_jest.Expect[/* expect */0](cameraProjection), 0);
}

function unsafeGetPMatrix(cameraProjection, state) {
  return PMatrixService$Wonderjs.unsafeGetPMatrix(cameraProjection, state[/* perspectiveCameraProjectionRecord */14][/* pMatrixMap */2]);
}

function getDirtyArray(state) {
  return state[/* perspectiveCameraProjectionRecord */14][/* dirtyArray */1];
}

var init = InitPerspectiveCameraProjectionMainService$Wonderjs.init;

var update = UpdatePerspectiveCameraProjectionMainService$Wonderjs.update;

var updateCameraProjection = UpdatePerspectiveCameraProjectionMainService$Wonderjs.updateCameraProjection;

function getPMatrixOfCreateBasicCameraViewPerspectiveCamera(param) {
  return new Float32Array(/* array */[
              1.7320508075688776,
              0,
              0,
              0,
              0,
              1.7320508075688776,
              0,
              0,
              0,
              0,
              -1.0002000200020003,
              -1,
              0,
              0,
              -0.2000200020002,
              0
            ]);
}

function unsafeGetNear(cameraProjection, state) {
  return FrustumPerspectiveCameraProjectionService$Wonderjs.unsafeGetNear(cameraProjection, state[/* perspectiveCameraProjectionRecord */14]);
}

function unsafeGetFar(cameraProjection, state) {
  return FrustumPerspectiveCameraProjectionService$Wonderjs.unsafeGetFar(cameraProjection, state[/* perspectiveCameraProjectionRecord */14]);
}

function unsafeGetFovy(cameraProjection, state) {
  return FrustumPerspectiveCameraProjectionService$Wonderjs.unsafeGetFovy(cameraProjection, state[/* perspectiveCameraProjectionRecord */14]);
}

var unsafeGetAspect = PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraAspect;

function getAspect(cameraProjection, state) {
  return FrustumPerspectiveCameraProjectionService$Wonderjs.getAspect(cameraProjection, state[/* perspectiveCameraProjectionRecord */14]);
}

export {
  isPerspectiveCameraProjection ,
  unsafeGetPMatrix ,
  getDirtyArray ,
  init ,
  update ,
  updateCameraProjection ,
  getPMatrixOfCreateBasicCameraViewPerspectiveCamera ,
  unsafeGetNear ,
  unsafeGetFar ,
  unsafeGetFovy ,
  unsafeGetAspect ,
  getAspect ,
  
}
/* Wonder_jest Not a pure module */
