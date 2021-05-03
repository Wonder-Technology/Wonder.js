

import * as Caml_array from "./../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Contract$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";
import * as AliveComponentService$Wonderjs from "../../service/primitive/component/AliveComponentService.js";
import * as OperateFlyCameraControllerService$Wonderjs from "../../service/record/main/camera_controller/fly/OperateFlyCameraControllerService.js";
import * as EventFlyCameraControllerMainService$Wonderjs from "../../service/state/main/camera_controller/fly/EventFlyCameraControllerMainService.js";
import * as CreateFlyCameraControllerMainService$Wonderjs from "../../service/state/main/camera_controller/fly/CreateFlyCameraControllerMainService.js";
import * as GameObjectFlyCameraControllerService$Wonderjs from "../../service/record/main/camera_controller/fly/GameObjectFlyCameraControllerService.js";
import * as DisposeFlyCameraControllerMainService$Wonderjs from "../../service/state/main/camera_controller/fly/DisposeFlyCameraControllerMainService.js";

function createFlyCameraController(state) {
  return CreateFlyCameraControllerMainService$Wonderjs.create(state);
}

function unsafeGetFlyCameraControllerGameObject(cameraController, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(cameraController, DisposeFlyCameraControllerMainService$Wonderjs.isAlive, state[/* flyCameraControllerRecord */26]);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return GameObjectFlyCameraControllerService$Wonderjs.unsafeGetGameObject(cameraController, state[/* flyCameraControllerRecord */26]);
}

function unsafeGetFlyCameraControllerMoveSpeed(cameraController, state) {
  return OperateFlyCameraControllerService$Wonderjs.unsafeGetMoveSpeed(cameraController, state[/* flyCameraControllerRecord */26]);
}

function setFlyCameraControllerMoveSpeed(cameraController, value, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* flyCameraControllerRecord */26] = OperateFlyCameraControllerService$Wonderjs.setMoveSpeed(cameraController, value, state[/* flyCameraControllerRecord */26]);
  return newrecord;
}

function unsafeGetFlyCameraControllerWheelSpeed(cameraController, state) {
  return OperateFlyCameraControllerService$Wonderjs.unsafeGetWheelSpeed(cameraController, state[/* flyCameraControllerRecord */26]);
}

function setFlyCameraControllerWheelSpeed(cameraController, value, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* flyCameraControllerRecord */26] = OperateFlyCameraControllerService$Wonderjs.setWheelSpeed(cameraController, value, state[/* flyCameraControllerRecord */26]);
  return newrecord;
}

function unsafeGetFlyCameraControllerRotateSpeed(cameraController, state) {
  return OperateFlyCameraControllerService$Wonderjs.unsafeGetRotateSpeed(cameraController, state[/* flyCameraControllerRecord */26]);
}

function setFlyCameraControllerRotateSpeed(cameraController, value, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* flyCameraControllerRecord */26] = OperateFlyCameraControllerService$Wonderjs.setRotateSpeed(cameraController, value, state[/* flyCameraControllerRecord */26]);
  return newrecord;
}

function unsafeGetFlyCameraControllerDirectionArray(cameraController, state) {
  return OperateFlyCameraControllerService$Wonderjs.unsafeGetDirectionArray(cameraController, state[/* flyCameraControllerRecord */26]);
}

function hasFlyCameraControllerDirection(cameraController, state) {
  return OperateFlyCameraControllerService$Wonderjs.hasDirection(cameraController, state[/* flyCameraControllerRecord */26]);
}

function setFlyCameraControllerDirectionArray(cameraController, directionArray, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* flyCameraControllerRecord */26] = OperateFlyCameraControllerService$Wonderjs.setDirectionArray(cameraController, directionArray, state[/* flyCameraControllerRecord */26]);
  return newrecord;
}

var bindFlyCameraControllerEvent = EventFlyCameraControllerMainService$Wonderjs.bindEvent;

var unbindFlyCameraControllerEvent = EventFlyCameraControllerMainService$Wonderjs.unbindEvent;

var unbindFlyCameraControllerPointScaleEvent = EventFlyCameraControllerMainService$Wonderjs.unbindPointScaleEvent;

var isBindFlyCameraControllerEvent = EventFlyCameraControllerMainService$Wonderjs.isBindEvent;

export {
  createFlyCameraController ,
  unsafeGetFlyCameraControllerGameObject ,
  unsafeGetFlyCameraControllerMoveSpeed ,
  setFlyCameraControllerMoveSpeed ,
  unsafeGetFlyCameraControllerWheelSpeed ,
  setFlyCameraControllerWheelSpeed ,
  unsafeGetFlyCameraControllerRotateSpeed ,
  setFlyCameraControllerRotateSpeed ,
  unsafeGetFlyCameraControllerDirectionArray ,
  hasFlyCameraControllerDirection ,
  setFlyCameraControllerDirectionArray ,
  bindFlyCameraControllerEvent ,
  unbindFlyCameraControllerEvent ,
  unbindFlyCameraControllerPointScaleEvent ,
  isBindFlyCameraControllerEvent ,
  
}
/* Contract-WonderLog Not a pure module */
