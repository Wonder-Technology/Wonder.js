

import * as Caml_array from "../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Contract$WonderLog from "../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../service/state/main/data/StateDataMain.js";
import * as PMatrixService$Wonderjs from "../service/primitive/PMatrixService.js";
import * as IsDebugMainService$Wonderjs from "../service/state/main/state/IsDebugMainService.js";
import * as AliveComponentService$Wonderjs from "../service/primitive/component/AliveComponentService.js";
import * as CreatePerspectiveCameraProjectionService$Wonderjs from "../service/record/main/perspective_camera_projection/CreatePerspectiveCameraProjectionService.js";
import * as DisposePerspectiveCameraProjectionService$Wonderjs from "../service/record/main/perspective_camera_projection/DisposePerspectiveCameraProjectionService.js";
import * as FrustumPerspectiveCameraProjectionService$Wonderjs from "../service/record/main/perspective_camera_projection/FrustumPerspectiveCameraProjectionService.js";
import * as GameObjectPerspectiveCameraProjectionService$Wonderjs from "../service/record/main/perspective_camera_projection/GameObjectPerspectiveCameraProjectionService.js";

function createPerspectiveCameraProjection(state) {
  var match = CreatePerspectiveCameraProjectionService$Wonderjs.create(state[/* perspectiveCameraProjectionRecord */14]);
  state[/* perspectiveCameraProjectionRecord */14] = match[0];
  return /* tuple */[
          state,
          match[1]
        ];
}

function unsafeGetPerspectiveCameraProjectionPMatrix(cameraProjection, state) {
  Contract$WonderLog.requireCheck((function () {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(cameraProjection, DisposePerspectiveCameraProjectionService$Wonderjs.isAlive, state[/* perspectiveCameraProjectionRecord */14]);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return PMatrixService$Wonderjs.unsafeGetPMatrix(cameraProjection, state[/* perspectiveCameraProjectionRecord */14][/* pMatrixMap */2]);
}

function unsafeGetPerspectiveCameraProjectionGameObject(cameraProjection, state) {
  Contract$WonderLog.requireCheck((function () {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(cameraProjection, DisposePerspectiveCameraProjectionService$Wonderjs.isAlive, state[/* perspectiveCameraProjectionRecord */14]);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return GameObjectPerspectiveCameraProjectionService$Wonderjs.unsafeGetGameObject(cameraProjection, state[/* perspectiveCameraProjectionRecord */14]);
}

function unsafeGetPerspectiveCameraFovy(cameraProjection, state) {
  return FrustumPerspectiveCameraProjectionService$Wonderjs.unsafeGetFovy(cameraProjection, state[/* perspectiveCameraProjectionRecord */14]);
}

function setPerspectiveCameraProjectionFovy(cameraProjection, fovy, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* perspectiveCameraProjectionRecord */14] = FrustumPerspectiveCameraProjectionService$Wonderjs.setFovy(cameraProjection, fovy, state[/* perspectiveCameraProjectionRecord */14]);
  return newrecord;
}

function unsafeGetPerspectiveCameraAspect(cameraProjection, state) {
  return FrustumPerspectiveCameraProjectionService$Wonderjs.unsafeGetAspect(cameraProjection, state[/* perspectiveCameraProjectionRecord */14]);
}

function setPerspectiveCameraProjectionAspect(cameraProjection, aspect, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* perspectiveCameraProjectionRecord */14] = FrustumPerspectiveCameraProjectionService$Wonderjs.setAspect(cameraProjection, aspect, state[/* perspectiveCameraProjectionRecord */14]);
  return newrecord;
}

function unsafeGetPerspectiveCameraNear(cameraProjection, state) {
  return FrustumPerspectiveCameraProjectionService$Wonderjs.unsafeGetNear(cameraProjection, state[/* perspectiveCameraProjectionRecord */14]);
}

function setPerspectiveCameraProjectionNear(cameraProjection, near, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* perspectiveCameraProjectionRecord */14] = FrustumPerspectiveCameraProjectionService$Wonderjs.setNear(cameraProjection, near, state[/* perspectiveCameraProjectionRecord */14]);
  return newrecord;
}

function unsafeGetPerspectiveCameraFar(cameraProjection, state) {
  return FrustumPerspectiveCameraProjectionService$Wonderjs.unsafeGetFar(cameraProjection, state[/* perspectiveCameraProjectionRecord */14]);
}

function setPerspectiveCameraProjectionFar(cameraProjection, far, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* perspectiveCameraProjectionRecord */14] = FrustumPerspectiveCameraProjectionService$Wonderjs.setFar(cameraProjection, far, state[/* perspectiveCameraProjectionRecord */14]);
  return newrecord;
}

export {
  createPerspectiveCameraProjection ,
  unsafeGetPerspectiveCameraProjectionPMatrix ,
  unsafeGetPerspectiveCameraProjectionGameObject ,
  unsafeGetPerspectiveCameraFovy ,
  setPerspectiveCameraProjectionFovy ,
  unsafeGetPerspectiveCameraAspect ,
  setPerspectiveCameraProjectionAspect ,
  unsafeGetPerspectiveCameraNear ,
  setPerspectiveCameraProjectionNear ,
  unsafeGetPerspectiveCameraFar ,
  setPerspectiveCameraProjectionFar ,
  
}
/* Contract-WonderLog Not a pure module */
