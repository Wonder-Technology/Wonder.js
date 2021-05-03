

import * as Caml_array from "./../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Contract$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";
import * as AliveComponentService$Wonderjs from "../../service/primitive/component/AliveComponentService.js";
import * as OperateArcballCameraControllerService$Wonderjs from "../../service/record/main/camera_controller/arcball/OperateArcballCameraControllerService.js";
import * as EventArcballCameraControllerMainService$Wonderjs from "../../service/state/main/camera_controller/arcball/EventArcballCameraControllerMainService.js";
import * as CreateArcballCameraControllerMainService$Wonderjs from "../../service/state/main/camera_controller/arcball/CreateArcballCameraControllerMainService.js";
import * as GameObjectArcballCameraControllerService$Wonderjs from "../../service/record/main/camera_controller/arcball/GameObjectArcballCameraControllerService.js";
import * as DisposeArcballCameraControllerMainService$Wonderjs from "../../service/state/main/camera_controller/arcball/DisposeArcballCameraControllerMainService.js";

function createArcballCameraController(state) {
  return CreateArcballCameraControllerMainService$Wonderjs.create(state);
}

function unsafeGetArcballCameraControllerGameObject(cameraController, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(cameraController, DisposeArcballCameraControllerMainService$Wonderjs.isAlive, state[/* arcballCameraControllerRecord */25]);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return GameObjectArcballCameraControllerService$Wonderjs.unsafeGetGameObject(cameraController, state[/* arcballCameraControllerRecord */25]);
}

function unsafeGetArcballCameraControllerDistance(cameraController, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(cameraController, DisposeArcballCameraControllerMainService$Wonderjs.isAlive, state[/* arcballCameraControllerRecord */25]);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateArcballCameraControllerService$Wonderjs.unsafeGetDistance(cameraController, state[/* arcballCameraControllerRecord */25]);
}

function setArcballCameraControllerDistance(cameraController, value, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* arcballCameraControllerRecord */25] = OperateArcballCameraControllerService$Wonderjs.setDistance(cameraController, value, state[/* arcballCameraControllerRecord */25]);
  return newrecord;
}

function unsafeGetArcballCameraControllerMinDistance(cameraController, state) {
  return OperateArcballCameraControllerService$Wonderjs.unsafeGetMinDistance(cameraController, state[/* arcballCameraControllerRecord */25]);
}

function setArcballCameraControllerMinDistance(cameraController, value, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* arcballCameraControllerRecord */25] = OperateArcballCameraControllerService$Wonderjs.setMinDistance(cameraController, value, state[/* arcballCameraControllerRecord */25]);
  return newrecord;
}

function unsafeGetArcballCameraControllerWheelSpeed(cameraController, state) {
  return OperateArcballCameraControllerService$Wonderjs.unsafeGetWheelSpeed(cameraController, state[/* arcballCameraControllerRecord */25]);
}

function setArcballCameraControllerWheelSpeed(cameraController, value, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* arcballCameraControllerRecord */25] = OperateArcballCameraControllerService$Wonderjs.setWheelSpeed(cameraController, value, state[/* arcballCameraControllerRecord */25]);
  return newrecord;
}

function unsafeGetArcballCameraControllerPhi(cameraController, state) {
  return OperateArcballCameraControllerService$Wonderjs.unsafeGetPhi(cameraController, state[/* arcballCameraControllerRecord */25]);
}

function setArcballCameraControllerPhi(cameraController, value, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* arcballCameraControllerRecord */25] = OperateArcballCameraControllerService$Wonderjs.setPhi(cameraController, value, state[/* arcballCameraControllerRecord */25]);
  return newrecord;
}

function unsafeGetArcballCameraControllerTheta(cameraController, state) {
  return OperateArcballCameraControllerService$Wonderjs.unsafeGetTheta(cameraController, state[/* arcballCameraControllerRecord */25]);
}

function setArcballCameraControllerTheta(cameraController, value, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* arcballCameraControllerRecord */25] = OperateArcballCameraControllerService$Wonderjs.setTheta(cameraController, value, state[/* arcballCameraControllerRecord */25]);
  return newrecord;
}

function unsafeGetArcballCameraControllerThetaMargin(cameraController, state) {
  return OperateArcballCameraControllerService$Wonderjs.unsafeGetThetaMargin(cameraController, state[/* arcballCameraControllerRecord */25]);
}

function setArcballCameraControllerThetaMargin(cameraController, value, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* arcballCameraControllerRecord */25] = OperateArcballCameraControllerService$Wonderjs.setThetaMargin(cameraController, value, state[/* arcballCameraControllerRecord */25]);
  return newrecord;
}

function unsafeGetArcballCameraControllerTarget(cameraController, state) {
  return OperateArcballCameraControllerService$Wonderjs.unsafeGetTarget(cameraController, state[/* arcballCameraControllerRecord */25]);
}

function setArcballCameraControllerTarget(cameraController, target, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* arcballCameraControllerRecord */25] = OperateArcballCameraControllerService$Wonderjs.setTarget(cameraController, target, state[/* arcballCameraControllerRecord */25]);
  return newrecord;
}

function unsafeGetArcballCameraControllerMoveSpeedX(cameraController, state) {
  return OperateArcballCameraControllerService$Wonderjs.unsafeGetMoveSpeedX(cameraController, state[/* arcballCameraControllerRecord */25]);
}

function setArcballCameraControllerMoveSpeedX(cameraController, value, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* arcballCameraControllerRecord */25] = OperateArcballCameraControllerService$Wonderjs.setMoveSpeedX(cameraController, value, state[/* arcballCameraControllerRecord */25]);
  return newrecord;
}

function unsafeGetArcballCameraControllerMoveSpeedY(cameraController, state) {
  return OperateArcballCameraControllerService$Wonderjs.unsafeGetMoveSpeedY(cameraController, state[/* arcballCameraControllerRecord */25]);
}

function setArcballCameraControllerMoveSpeedY(cameraController, value, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* arcballCameraControllerRecord */25] = OperateArcballCameraControllerService$Wonderjs.setMoveSpeedY(cameraController, value, state[/* arcballCameraControllerRecord */25]);
  return newrecord;
}

function unsafeGetArcballCameraControllerRotateSpeed(cameraController, state) {
  return OperateArcballCameraControllerService$Wonderjs.unsafeGetRotateSpeed(cameraController, state[/* arcballCameraControllerRecord */25]);
}

function setArcballCameraControllerRotateSpeed(cameraController, value, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* arcballCameraControllerRecord */25] = OperateArcballCameraControllerService$Wonderjs.setRotateSpeed(cameraController, value, state[/* arcballCameraControllerRecord */25]);
  return newrecord;
}

function unsafeGetArcballCameraControllerDirectionArray(cameraController, state) {
  return OperateArcballCameraControllerService$Wonderjs.unsafeGetDirectionArray(cameraController, state[/* arcballCameraControllerRecord */25]);
}

function hasArcballCameraControllerDirection(cameraController, state) {
  return OperateArcballCameraControllerService$Wonderjs.hasDirection(cameraController, state[/* arcballCameraControllerRecord */25]);
}

function setArcballCameraControllerDirectionArray(cameraController, directionArray, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* arcballCameraControllerRecord */25] = OperateArcballCameraControllerService$Wonderjs.setDirectionArray(cameraController, directionArray, state[/* arcballCameraControllerRecord */25]);
  return newrecord;
}

var bindArcballCameraControllerEvent = EventArcballCameraControllerMainService$Wonderjs.bindEvent;

var unbindArcballCameraControllerEvent = EventArcballCameraControllerMainService$Wonderjs.unbindEvent;

var unbindArcballCameraControllerPointScaleEvent = EventArcballCameraControllerMainService$Wonderjs.unbindPointScaleEvent;

var isBindArcballCameraControllerEvent = EventArcballCameraControllerMainService$Wonderjs.isBindEvent;

export {
  createArcballCameraController ,
  unsafeGetArcballCameraControllerGameObject ,
  unsafeGetArcballCameraControllerDistance ,
  setArcballCameraControllerDistance ,
  unsafeGetArcballCameraControllerMinDistance ,
  setArcballCameraControllerMinDistance ,
  unsafeGetArcballCameraControllerWheelSpeed ,
  setArcballCameraControllerWheelSpeed ,
  unsafeGetArcballCameraControllerPhi ,
  setArcballCameraControllerPhi ,
  unsafeGetArcballCameraControllerTheta ,
  setArcballCameraControllerTheta ,
  unsafeGetArcballCameraControllerThetaMargin ,
  setArcballCameraControllerThetaMargin ,
  unsafeGetArcballCameraControllerTarget ,
  setArcballCameraControllerTarget ,
  unsafeGetArcballCameraControllerMoveSpeedX ,
  setArcballCameraControllerMoveSpeedX ,
  unsafeGetArcballCameraControllerMoveSpeedY ,
  setArcballCameraControllerMoveSpeedY ,
  unsafeGetArcballCameraControllerRotateSpeed ,
  setArcballCameraControllerRotateSpeed ,
  unsafeGetArcballCameraControllerDirectionArray ,
  hasArcballCameraControllerDirection ,
  setArcballCameraControllerDirectionArray ,
  bindArcballCameraControllerEvent ,
  unbindArcballCameraControllerEvent ,
  unbindArcballCameraControllerPointScaleEvent ,
  isBindArcballCameraControllerEvent ,
  
}
/* Contract-WonderLog Not a pure module */
