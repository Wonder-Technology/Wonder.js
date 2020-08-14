'use strict';

var Caml_array = require("bs-platform/lib/js/caml_array.js");
var CameraTool$Wonderjs = require("../camera/CameraTool.js");
var GameObjectAPI$Wonderjs = require("../../../../src/api/GameObjectAPI.js");
var FlyCameraControllerAPI$Wonderjs = require("../../../../src/api/camera_controller/FlyCameraControllerAPI.js");
var OperateFlyCameraControllerService$Wonderjs = require("../../../../src/service/record/main/camera_controller/fly/OperateFlyCameraControllerService.js");
var EventFlyCameraControllerMainService$Wonderjs = require("../../../../src/service/state/main/camera_controller/fly/EventFlyCameraControllerMainService.js");

function createGameObject(state) {
  var match = FlyCameraControllerAPI$Wonderjs.createFlyCameraController(state);
  var cameraController = match[1];
  var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
  var match$2 = match$1[3];
  var gameObject = match$1[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectFlyCameraControllerComponent(gameObject, cameraController, match$1[0]);
  return /* tuple */[
          state$1,
          gameObject,
          match$1[2],
          /* tuple */[
            cameraController,
            match$2[0],
            match$2[1]
          ]
        ];
}

function unsafeGetEulerAngleDiff(cameraController, state) {
  return OperateFlyCameraControllerService$Wonderjs.unsafeGetEulerAngleDiff(cameraController, state[/* flyCameraControllerRecord */26]);
}

function setEulerAngleDiff(cameraController, value, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* flyCameraControllerRecord */26] = OperateFlyCameraControllerService$Wonderjs.setEulerAngleDiff(cameraController, value, state[/* flyCameraControllerRecord */26]);
  return newrecord;
}

function unsafeGetTranslationDiff(cameraController, state) {
  return OperateFlyCameraControllerService$Wonderjs.unsafeGetTranslationDiff(cameraController, state[/* flyCameraControllerRecord */26]);
}

function setTranslationDiff(cameraController, value, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* flyCameraControllerRecord */26] = OperateFlyCameraControllerService$Wonderjs.setTranslationDiff(cameraController, value, state[/* flyCameraControllerRecord */26]);
  return newrecord;
}

function getLocalEulerAngle(transformComponent, state) {
  return OperateFlyCameraControllerService$Wonderjs.getLocalEulerAngle(transformComponent, state[/* flyCameraControllerRecord */26]);
}

function setLocalEulerAngle(transformComponent, value, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* flyCameraControllerRecord */26] = OperateFlyCameraControllerService$Wonderjs.setLocalEulerAngle(transformComponent, value, state[/* flyCameraControllerRecord */26]);
  return newrecord;
}

function setFlyCameraControllerData(cameraController, state) {
  var state$1 = FlyCameraControllerAPI$Wonderjs.setFlyCameraControllerWheelSpeed(cameraController, 0.4, FlyCameraControllerAPI$Wonderjs.setFlyCameraControllerRotateSpeed(cameraController, 0.3, FlyCameraControllerAPI$Wonderjs.setFlyCameraControllerMoveSpeed(cameraController, 0.1, state)));
  return /* tuple */[
          state$1,
          /* tuple */[
            0.1,
            0.3,
            0.4
          ]
        ];
}

function addPointDragStartEventHandleFunc(cameraController, handleFunc, state) {
  var flyCameraControllerRecord = state[/* flyCameraControllerRecord */26];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* flyCameraControllerRecord */26] = EventFlyCameraControllerMainService$Wonderjs._addPointDragStartEventHandleFunc(cameraController, handleFunc, flyCameraControllerRecord);
  return newrecord;
}

function addPointDragDropEventHandleFunc(cameraController, handleFunc, state) {
  var flyCameraControllerRecord = state[/* flyCameraControllerRecord */26];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* flyCameraControllerRecord */26] = EventFlyCameraControllerMainService$Wonderjs._addPointDragDropEventHandleFunc(cameraController, handleFunc, flyCameraControllerRecord);
  return newrecord;
}

function addPointDragOverEventHandleFunc(cameraController, handleFunc, state) {
  var flyCameraControllerRecord = state[/* flyCameraControllerRecord */26];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* flyCameraControllerRecord */26] = EventFlyCameraControllerMainService$Wonderjs._addPointDragOverEventHandleFunc(cameraController, handleFunc, flyCameraControllerRecord);
  return newrecord;
}

function addPointScaleEventHandleFunc(cameraController, handleFunc, state) {
  var flyCameraControllerRecord = state[/* flyCameraControllerRecord */26];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* flyCameraControllerRecord */26] = EventFlyCameraControllerMainService$Wonderjs._addPointScaleEventHandleFunc(cameraController, handleFunc, flyCameraControllerRecord);
  return newrecord;
}

function addKeydownEventHandleFunc(cameraController, handleFunc, state) {
  var flyCameraControllerRecord = state[/* flyCameraControllerRecord */26];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* flyCameraControllerRecord */26] = EventFlyCameraControllerMainService$Wonderjs._addKeydownEventHandleFunc(cameraController, handleFunc, flyCameraControllerRecord);
  return newrecord;
}

function addKeyupEventHandleFunc(cameraController, handleFunc, state) {
  var flyCameraControllerRecord = state[/* flyCameraControllerRecord */26];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* flyCameraControllerRecord */26] = EventFlyCameraControllerMainService$Wonderjs._addKeyupEventHandleFunc(cameraController, handleFunc, flyCameraControllerRecord);
  return newrecord;
}

exports.createGameObject = createGameObject;
exports.unsafeGetEulerAngleDiff = unsafeGetEulerAngleDiff;
exports.setEulerAngleDiff = setEulerAngleDiff;
exports.unsafeGetTranslationDiff = unsafeGetTranslationDiff;
exports.setTranslationDiff = setTranslationDiff;
exports.getLocalEulerAngle = getLocalEulerAngle;
exports.setLocalEulerAngle = setLocalEulerAngle;
exports.setFlyCameraControllerData = setFlyCameraControllerData;
exports.addPointDragStartEventHandleFunc = addPointDragStartEventHandleFunc;
exports.addPointDragDropEventHandleFunc = addPointDragDropEventHandleFunc;
exports.addPointDragOverEventHandleFunc = addPointDragOverEventHandleFunc;
exports.addPointScaleEventHandleFunc = addPointScaleEventHandleFunc;
exports.addKeydownEventHandleFunc = addKeydownEventHandleFunc;
exports.addKeyupEventHandleFunc = addKeyupEventHandleFunc;
/* CameraTool-Wonderjs Not a pure module */
