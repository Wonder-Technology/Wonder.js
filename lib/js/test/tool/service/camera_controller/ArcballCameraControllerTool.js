'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var CameraTool$Wonderjs = require("../camera/CameraTool.js");
var GameObjectAPI$Wonderjs = require("../../../../src/api/GameObjectAPI.js");
var ArcballCameraControllerAPI$Wonderjs = require("../../../../src/api/camera_controller/ArcballCameraControllerAPI.js");
var EventArcballCameraControllerMainService$Wonderjs = require("../../../../src/service/state/main/camera_controller/arcball/EventArcballCameraControllerMainService.js");

function isArcballCameraController(cameraController) {
  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* >= */2], Wonder_jest.Expect[/* expect */0](cameraController), 0);
}

function createGameObject(state) {
  var match = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(state);
  var cameraController = match[1];
  var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
  var match$2 = match$1[3];
  var gameObject = match$1[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectArcballCameraControllerComponent(gameObject, cameraController, match$1[0]);
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

function setArcballCameraControllerData(cameraController, state) {
  var target = /* tuple */[
    0.1,
    0.2,
    0.5
  ];
  var state$1 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerWheelSpeed(cameraController, 0.4, ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerRotateSpeed(cameraController, 0.3, ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerMoveSpeedY(cameraController, 0.2, ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerMoveSpeedX(cameraController, 0.1, ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerTarget(cameraController, target, ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerThetaMargin(cameraController, 0.3, ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerTheta(cameraController, 0.5, ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerPhi(cameraController, 1.7, ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerDistance(cameraController, 1.6, ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerMinDistance(cameraController, 0.5, state))))))))));
  return /* tuple */[
          state$1,
          /* tuple */[
            1.6,
            0.5,
            1.7,
            0.5,
            0.3,
            target,
            0.1,
            0.2,
            0.3,
            0.4
          ]
        ];
}

function addPointDragStartEventHandleFunc(cameraController, handleFunc, state) {
  var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */25];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* arcballCameraControllerRecord */25] = EventArcballCameraControllerMainService$Wonderjs._addPointDragStartEventHandleFunc(cameraController, handleFunc, arcballCameraControllerRecord);
  return newrecord;
}

function addPointDragDropEventHandleFunc(cameraController, handleFunc, state) {
  var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */25];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* arcballCameraControllerRecord */25] = EventArcballCameraControllerMainService$Wonderjs._addPointDragDropEventHandleFunc(cameraController, handleFunc, arcballCameraControllerRecord);
  return newrecord;
}

function addPointDragOverEventHandleFunc(cameraController, handleFunc, state) {
  var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */25];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* arcballCameraControllerRecord */25] = EventArcballCameraControllerMainService$Wonderjs._addPointDragOverEventHandleFunc(cameraController, handleFunc, arcballCameraControllerRecord);
  return newrecord;
}

function addPointScaleEventHandleFunc(cameraController, handleFunc, state) {
  var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */25];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* arcballCameraControllerRecord */25] = EventArcballCameraControllerMainService$Wonderjs._addPointScaleEventHandleFunc(cameraController, handleFunc, arcballCameraControllerRecord);
  return newrecord;
}

function addKeydownEventHandleFunc(cameraController, handleFunc, state) {
  var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */25];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* arcballCameraControllerRecord */25] = EventArcballCameraControllerMainService$Wonderjs._addKeydownEventHandleFunc(cameraController, handleFunc, arcballCameraControllerRecord);
  return newrecord;
}

function addKeyupEventHandleFunc(cameraController, handleFunc, state) {
  var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */25];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* arcballCameraControllerRecord */25] = EventArcballCameraControllerMainService$Wonderjs._addKeyupEventHandleFunc(cameraController, handleFunc, arcballCameraControllerRecord);
  return newrecord;
}

exports.isArcballCameraController = isArcballCameraController;
exports.createGameObject = createGameObject;
exports.setArcballCameraControllerData = setArcballCameraControllerData;
exports.addPointDragStartEventHandleFunc = addPointDragStartEventHandleFunc;
exports.addPointDragDropEventHandleFunc = addPointDragDropEventHandleFunc;
exports.addPointDragOverEventHandleFunc = addPointDragOverEventHandleFunc;
exports.addPointScaleEventHandleFunc = addPointScaleEventHandleFunc;
exports.addKeydownEventHandleFunc = addKeydownEventHandleFunc;
exports.addKeyupEventHandleFunc = addKeyupEventHandleFunc;
/* Wonder_jest Not a pure module */
