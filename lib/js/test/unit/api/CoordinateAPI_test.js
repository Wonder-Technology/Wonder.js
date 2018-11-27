'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../tool/TestTool.js");
var CameraTool$Wonderjs = require("../../tool/service/camera/CameraTool.js");
var TransformAPI$Wonderjs = require("../../../src/api/TransformAPI.js");
var CoordinateAPI$Wonderjs = require("../../../src/api/CoordinateAPI.js");
var UpdateCameraJob$Wonderjs = require("../../../src/job/no_worker/loop/UpdateCameraJob.js");
var UpdateTransformJob$Wonderjs = require("../../../src/job/no_worker/loop/UpdateTransformJob.js");
var CreateStateMainService$Wonderjs = require("../../../src/service/state/main/state/CreateStateMainService.js");
var PerspectiveCameraProjectionAPI$Wonderjs = require("../../../src/api/camera/PerspectiveCameraProjectionAPI.js");

describe("CoordinateAPI", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */CreateStateMainService$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.init(sandbox, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("convertWorldToScreen", (function () {
                describe("convert world coordinate to screen coordinate", (function () {
                        var _test = function (localPosition, param, param$1) {
                          var match = CameraTool$Wonderjs.createCameraGameObject(state[0]);
                          var match$1 = match[3];
                          var perspectiveCameraProjection = match$1[1];
                          var transform = match[2];
                          var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(transform, localPosition, match[0]);
                          var state$2 = TransformAPI$Wonderjs.lookAt(transform, /* tuple */[
                                0,
                                0,
                                0
                              ], state$1);
                          var state$3 = PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionAspect(perspectiveCameraProjection, 1000 / 2000, PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionFovy(perspectiveCameraProjection, 60, PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionFar(perspectiveCameraProjection, 100, PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionNear(perspectiveCameraProjection, 0.1, state$2))));
                          var state$4 = UpdateTransformJob$Wonderjs.execJob(undefined, state$3);
                          var state$5 = UpdateCameraJob$Wonderjs.execJob(undefined, state$4);
                          return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](CoordinateAPI$Wonderjs.convertWorldToScreen(match$1[0], perspectiveCameraProjection, /* tuple */[
                                              param[0],
                                              param[1],
                                              param[2],
                                              1000,
                                              2000
                                            ], state$5)), /* tuple */[
                                      param$1[0],
                                      param$1[1]
                                    ]);
                        };
                        Wonder_jest.test("test1", (function () {
                                return _test(/* tuple */[
                                            0,
                                            1,
                                            1
                                          ], /* tuple */[
                                            0,
                                            0,
                                            0
                                          ], /* tuple */[
                                            500,
                                            1000
                                          ]);
                              }));
                        Wonder_jest.test("test2", (function () {
                                return _test(/* tuple */[
                                            0,
                                            0,
                                            1
                                          ], /* tuple */[
                                            1,
                                            0.5,
                                            0
                                          ], /* tuple */[
                                            2232,
                                            134
                                          ]);
                              }));
                        describe("fix bug", (function () {
                                describe("if world coordinate is in the reverse direction, screen coordinate should be out of screen", (function () {
                                        return Wonder_jest.test("if the w(the coordinate(x,y,z,w) after perspective transform) < 0.0, set screen coordinate to be (-100.0, -100.0)", (function () {
                                                      return _test(/* tuple */[
                                                                  0,
                                                                  0,
                                                                  1
                                                                ], /* tuple */[
                                                                  0,
                                                                  0,
                                                                  100
                                                                ], /* tuple */[
                                                                  -100,
                                                                  -100
                                                                ]);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

/*  Not a pure module */
