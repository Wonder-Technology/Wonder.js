'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var PMatrixService$Wonderjs = require("../../../../src/service/primitive/PMatrixService.js");
var PerspectiveCameraProjectionAPI$Wonderjs = require("../../../../src/api/camera/PerspectiveCameraProjectionAPI.js");
var FrustumPerspectiveCameraProjectionService$Wonderjs = require("../../../../src/service/record/main/perspective_camera_projection/FrustumPerspectiveCameraProjectionService.js");
var InitPerspectiveCameraProjectionMainService$Wonderjs = require("../../../../src/service/state/main/perspective_camera_projection/InitPerspectiveCameraProjectionMainService.js");
var UpdatePerspectiveCameraProjectionMainService$Wonderjs = require("../../../../src/service/state/main/perspective_camera_projection/UpdatePerspectiveCameraProjectionMainService.js");

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

exports.isPerspectiveCameraProjection = isPerspectiveCameraProjection;
exports.unsafeGetPMatrix = unsafeGetPMatrix;
exports.getDirtyArray = getDirtyArray;
exports.init = init;
exports.update = update;
exports.updateCameraProjection = updateCameraProjection;
exports.getPMatrixOfCreateBasicCameraViewPerspectiveCamera = getPMatrixOfCreateBasicCameraViewPerspectiveCamera;
exports.unsafeGetNear = unsafeGetNear;
exports.unsafeGetFar = unsafeGetFar;
exports.unsafeGetFovy = unsafeGetFovy;
exports.unsafeGetAspect = unsafeGetAspect;
exports.getAspect = getAspect;
/* Wonder_jest Not a pure module */
