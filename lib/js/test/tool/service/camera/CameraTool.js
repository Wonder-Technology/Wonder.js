'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var GameObjectAPI$Wonderjs = require("../../../../src/api/GameObjectAPI.js");
var BasicCameraViewAPI$Wonderjs = require("../../../../src/api/camera/BasicCameraViewAPI.js");
var PerspectiveCameraProjectionAPI$Wonderjs = require("../../../../src/api/camera/PerspectiveCameraProjectionAPI.js");

function createBasicCameraViewPerspectiveCamera(state) {
  var match = PerspectiveCameraProjectionAPI$Wonderjs.createPerspectiveCameraProjection(state);
  var perspectiveCameraProjection = match[1];
  var match$1 = BasicCameraViewAPI$Wonderjs.createBasicCameraView(match[0]);
  var state$1 = PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionAspect(perspectiveCameraProjection, 1, PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionFovy(perspectiveCameraProjection, 60, PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionFar(perspectiveCameraProjection, 1000, PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionNear(perspectiveCameraProjection, 0.1, match$1[0]))));
  return /* tuple */[
          state$1,
          match$1[1],
          perspectiveCameraProjection
        ];
}

function createBasicCameraViewPerspectiveCameraWithoutAspect(state) {
  var match = createBasicCameraViewPerspectiveCamera(state);
  var perspectiveCameraProjection = match[2];
  var state$1 = PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionAspect(perspectiveCameraProjection, undefined, match[0]);
  return /* tuple */[
          state$1,
          match[1],
          perspectiveCameraProjection
        ];
}

function createCameraGameObjectWithFunc(createBasicCameraViewPerspectiveCameraFunc, state) {
  var match = Curry._1(createBasicCameraViewPerspectiveCameraFunc, state);
  var perspectiveCameraProjection = match[2];
  var basicCameraView = match[1];
  var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
  var gameObject = match$1[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectBasicCameraViewComponent(gameObject, basicCameraView, match$1[0]);
  var state$2 = GameObjectAPI$Wonderjs.addGameObjectPerspectiveCameraProjectionComponent(gameObject, perspectiveCameraProjection, state$1);
  var state$3 = BasicCameraViewAPI$Wonderjs.activeBasicCameraView(basicCameraView, state$2);
  return /* tuple */[
          state$3,
          gameObject,
          GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject, state$3),
          /* tuple */[
            basicCameraView,
            perspectiveCameraProjection
          ]
        ];
}

function createCameraGameObject(state) {
  return createCameraGameObjectWithFunc(createBasicCameraViewPerspectiveCamera, state);
}

function createCameraGameObjectWithoutAspect(state) {
  var match = createCameraGameObjectWithFunc(createBasicCameraViewPerspectiveCamera, state);
  var match$1 = match[3];
  var cameraProjection = match$1[1];
  var state$1 = PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionAspect(cameraProjection, undefined, match[0]);
  return /* tuple */[
          state$1,
          match[1],
          match[2],
          /* tuple */[
            match$1[0],
            cameraProjection
          ]
        ];
}

function testBuildPMatrix(stateFunc, execFunc) {
  return Wonder_jest.test("build dirty pMatrix", (function (param) {
                var match = createBasicCameraViewPerspectiveCamera(Curry._1(stateFunc, /* () */0));
                var state = Curry._1(execFunc, match[0]);
                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraProjectionPMatrix(match[2], state)), new Float32Array(/* array */[
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
                              ]));
              }));
}

exports.createBasicCameraViewPerspectiveCamera = createBasicCameraViewPerspectiveCamera;
exports.createBasicCameraViewPerspectiveCameraWithoutAspect = createBasicCameraViewPerspectiveCameraWithoutAspect;
exports.createCameraGameObjectWithFunc = createCameraGameObjectWithFunc;
exports.createCameraGameObject = createCameraGameObject;
exports.createCameraGameObjectWithoutAspect = createCameraGameObjectWithoutAspect;
exports.testBuildPMatrix = testBuildPMatrix;
/* Wonder_jest Not a pure module */
