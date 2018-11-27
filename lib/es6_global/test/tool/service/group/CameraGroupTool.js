

import * as GameObjectAPI$Wonderjs from "../../../../src/api/GameObjectAPI.js";
import * as CameraGroupAPI$Wonderjs from "../../../../src/api/group/camera/CameraGroupAPI.js";
import * as BasicCameraViewAPI$Wonderjs from "../../../../src/api/camera/BasicCameraViewAPI.js";
import * as PerspectiveCameraProjectionAPI$Wonderjs from "../../../../src/api/camera/PerspectiveCameraProjectionAPI.js";

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

export {
  createCameraGroup ,
  addGameObjectCameraGroupComponents ,
  disposeGameObjectCameraGroupComponents ,
  unsafeGetGameObjectCameraGroupComponents ,
  hasGameObjectCameraGroupComponents ,
  
}
/* GameObjectAPI-Wonderjs Not a pure module */
