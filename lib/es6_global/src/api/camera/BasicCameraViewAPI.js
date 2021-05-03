

import * as Caml_array from "./../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Contract$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";
import * as AliveComponentService$Wonderjs from "../../service/primitive/component/AliveComponentService.js";
import * as ActiveBasicCameraViewService$Wonderjs from "../../service/record/main/basic_camera_view/ActiveBasicCameraViewService.js";
import * as DisposeBasicCameraViewService$Wonderjs from "../../service/record/main/basic_camera_view/DisposeBasicCameraViewService.js";
import * as CreateBasicCameraViewMainService$Wonderjs from "../../service/state/main/basic_camera_view/CreateBasicCameraViewMainService.js";
import * as GameObjectBasicCameraViewService$Wonderjs from "../../service/record/main/basic_camera_view/GameObjectBasicCameraViewService.js";
import * as ViewMatrixBasicCameraViewMainService$Wonderjs from "../../service/state/main/basic_camera_view/ViewMatrixBasicCameraViewMainService.js";

function createBasicCameraView(state) {
  return CreateBasicCameraViewMainService$Wonderjs.create(state);
}

function unsafeGetBasicCameraViewGameObject(cameraView, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(cameraView, DisposeBasicCameraViewService$Wonderjs.isAlive, state[/* basicCameraViewRecord */13]);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return GameObjectBasicCameraViewService$Wonderjs.unsafeGetGameObject(cameraView, state[/* basicCameraViewRecord */13]);
}

function getBasicCameraViewWorldToCameraMatrix(cameraView, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(cameraView, DisposeBasicCameraViewService$Wonderjs.isAlive, state[/* basicCameraViewRecord */13]);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return ViewMatrixBasicCameraViewMainService$Wonderjs.getBasicCameraViewWorldToCameraMatrix(cameraView, state);
}

function isActiveBasicCameraView(cameraView, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(cameraView, DisposeBasicCameraViewService$Wonderjs.isAlive, state[/* basicCameraViewRecord */13]);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return ActiveBasicCameraViewService$Wonderjs.isActive(cameraView, state[/* basicCameraViewRecord */13]);
}

function activeBasicCameraView(cameraView, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(cameraView, DisposeBasicCameraViewService$Wonderjs.isAlive, state[/* basicCameraViewRecord */13]);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* basicCameraViewRecord */13] = ActiveBasicCameraViewService$Wonderjs.active(cameraView, state[/* basicCameraViewRecord */13]);
  return newrecord;
}

function unactiveBasicCameraView(cameraView, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(cameraView, DisposeBasicCameraViewService$Wonderjs.isAlive, state[/* basicCameraViewRecord */13]);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* basicCameraViewRecord */13] = ActiveBasicCameraViewService$Wonderjs.unactive(cameraView, state[/* basicCameraViewRecord */13]);
  return newrecord;
}

function setActiveBasicCameraView(cameraView, isActive, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(cameraView, DisposeBasicCameraViewService$Wonderjs.isAlive, state[/* basicCameraViewRecord */13]);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* basicCameraViewRecord */13] = ActiveBasicCameraViewService$Wonderjs.setActive(cameraView, isActive, state[/* basicCameraViewRecord */13]);
  return newrecord;
}

function getActiveBasicCameraView(state) {
  return ActiveBasicCameraViewService$Wonderjs.getActiveCameraView(state[/* basicCameraViewRecord */13]);
}

export {
  createBasicCameraView ,
  unsafeGetBasicCameraViewGameObject ,
  getBasicCameraViewWorldToCameraMatrix ,
  isActiveBasicCameraView ,
  activeBasicCameraView ,
  unactiveBasicCameraView ,
  setActiveBasicCameraView ,
  getActiveBasicCameraView ,
  
}
/* Contract-WonderLog Not a pure module */
