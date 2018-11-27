'use strict';

var GameObjectAPI$Wonderjs = require("../../../../src/api/GameObjectAPI.js");
var CameraGroupAPI$Wonderjs = require("../../../../src/api/group/camera/CameraGroupAPI.js");
var BasicCameraViewAPI$Wonderjs = require("../../../../src/api/camera/BasicCameraViewAPI.js");
var PerspectiveCameraProjectionAPI$Wonderjs = require("../../../../src/api/camera/PerspectiveCameraProjectionAPI.js");

function createCameraGroup(state) {
  return CameraGroupAPI$Wonderjs.createCameraGroup(/* tuple */[
              BasicCameraViewAPI$Wonderjs.createBasicCameraView,
              PerspectiveCameraProjectionAPI$Wonderjs.createPerspectiveCameraProjection
            ], state);
}

function addGameObjectCameraGroupComponents(gameObject, cameraGroup, state) {
  return CameraGroupAPI$Wonderjs.addGameObjectCameraGroupComponents(gameObject, cameraGroup, /* tuple */[
              GameObjectAPI$Wonderjs.addGameObjectBasicCameraViewComponent,
              GameObjectAPI$Wonderjs.addGameObjectPerspectiveCameraProjectionComponent
            ], state);
}

function disposeGameObjectCameraGroupComponents(gameObject, cameraGroup, state) {
  return CameraGroupAPI$Wonderjs.disposeGameObjectCameraGroupComponents(gameObject, cameraGroup, /* tuple */[
              GameObjectAPI$Wonderjs.disposeGameObjectBasicCameraViewComponent,
              GameObjectAPI$Wonderjs.disposeGameObjectPerspectiveCameraProjectionComponent
            ], state);
}

function unsafeGetGameObjectCameraGroupComponents(gameObject, state) {
  return CameraGroupAPI$Wonderjs.unsafeGetGameObjectCameraGroupComponents(gameObject, /* tuple */[
              GameObjectAPI$Wonderjs.unsafeGetGameObjectBasicCameraViewComponent,
              GameObjectAPI$Wonderjs.unsafeGetGameObjectPerspectiveCameraProjectionComponent
            ], state);
}

function hasGameObjectCameraGroupComponents(gameObject, state) {
  return CameraGroupAPI$Wonderjs.hasGameObjectCameraGroupComponents(gameObject, /* tuple */[
              GameObjectAPI$Wonderjs.hasGameObjectBasicCameraViewComponent,
              GameObjectAPI$Wonderjs.hasGameObjectPerspectiveCameraProjectionComponent
            ], state);
}

exports.createCameraGroup = createCameraGroup;
exports.addGameObjectCameraGroupComponents = addGameObjectCameraGroupComponents;
exports.disposeGameObjectCameraGroupComponents = disposeGameObjectCameraGroupComponents;
exports.unsafeGetGameObjectCameraGroupComponents = unsafeGetGameObjectCameraGroupComponents;
exports.hasGameObjectCameraGroupComponents = hasGameObjectCameraGroupComponents;
/* GameObjectAPI-Wonderjs Not a pure module */
