

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as EventTool$Wonderjs from "../../../../unit/job/no_worker/tool/EventTool.js";
import * as CameraTool$Wonderjs from "../../../../tool/service/camera/CameraTool.js";
import * as DirectorTool$Wonderjs from "../../../../tool/core/DirectorTool.js";
import * as TransformAPI$Wonderjs from "../../../../../src/api/TransformAPI.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as GameObjectTool$Wonderjs from "../../../../tool/service/gameObject/GameObjectTool.js";
import * as MouseEventTool$Wonderjs from "../../../../unit/job/no_worker/tool/MouseEventTool.js";
import * as NoWorkerJobTool$Wonderjs from "../../../../tool/service/job/no_worker/NoWorkerJobTool.js";
import * as KeyboardEventTool$Wonderjs from "../../../../unit/job/no_worker/tool/KeyboardEventTool.js";
import * as NoWorkerJobConfigTool$Wonderjs from "../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js";
import * as ArcballCameraControllerAPI$Wonderjs from "../../../../../src/api/camera_controller/ArcballCameraControllerAPI.js";
import * as ArcballCameraControllerTool$Wonderjs from "../../../../tool/service/camera_controller/ArcballCameraControllerTool.js";

describe("test init camera job", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("init perspectiveCameraProjection", (function () {
                var _buildNoWorkerJobConfig = function () {
                  return NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"init_camera\"\n        }\n      ]\n    }\n  ]\n        ", undefined, "\n[\n        {\n          \"name\": \"init_camera\"\n        }\n]\n        ", undefined, /* () */0);
                };
                return CameraTool$Wonderjs.testBuildPMatrix((function () {
                              return TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, undefined, _buildNoWorkerJobConfig(/* () */0), undefined, /* () */0);
                            }), DirectorTool$Wonderjs.init);
              }));
        describe("init arcballCameraController", (function () {
                var _prepare = function () {
                  var state = MouseEventTool$Wonderjs.prepareWithState(sandbox, TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, undefined, NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"init_event\"\n        },\n        {\n          \"name\": \"init_camera\"\n        }\n      ]\n    }\n  ]\n        ", undefined, "\n[\n\n    {\n          \"name\": \"init_event\"\n    },\n        {\n          \"name\": \"init_camera\"\n        }\n]\n        ", undefined, /* () */0), undefined, /* () */0), undefined, undefined, undefined, undefined, /* () */0);
                  MouseEventTool$Wonderjs.setPointerLocked();
                  return state;
                };
                describe("test init one arcballCameraController", (function () {
                        describe("bind event", (function () {
                                describe("bind point drag event", (function () {
                                        describe("change orbit", (function () {
                                                return Wonder_jest.test("set phi and theta", (function () {
                                                              var state = _prepare(/* () */0);
                                                              var match = ArcballCameraControllerTool$Wonderjs.createGameObject(state);
                                                              var cameraController = match[3][0];
                                                              var state$1 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerTheta(cameraController, 0.5, ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerPhi(cameraController, 1, ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerRotateSpeed(cameraController, 2.5, match[0])));
                                                              var state$2 = NoWorkerJobTool$Wonderjs.execInitJobs(state$1);
                                                              var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                                              EventTool$Wonderjs.triggerDomEvent("mousedown", EventTool$Wonderjs.getBody(/* () */0), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                              EventTool$Wonderjs.triggerDomEvent("mousemove", EventTool$Wonderjs.getBody(/* () */0), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, 1, 2, undefined, undefined, undefined, undefined, /* () */0));
                                                              var state$4 = EventTool$Wonderjs.restore(state$3);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                              ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerPhi(cameraController, state$4),
                                                                              ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerTheta(cameraController, state$4)
                                                                            ]), /* tuple */[
                                                                          1.025,
                                                                          0.45
                                                                        ]);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                describe("bind point scale event", (function () {
                                        Wonder_jest.test("preventDefault", (function () {
                                                var state = _prepare(/* () */0);
                                                var match = ArcballCameraControllerTool$Wonderjs.createGameObject(state);
                                                var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(match[0]);
                                                var preventDefaultFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                var stopPropagationFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                var state$2 = MainStateTool$Wonderjs.setState(state$1);
                                                EventTool$Wonderjs.triggerDomEvent("mousewheel", EventTool$Wonderjs.getBody(/* () */0), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, preventDefaultFunc, stopPropagationFunc, /* () */0));
                                                EventTool$Wonderjs.restore(state$2);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                Sinon.getCallCount(preventDefaultFunc),
                                                                Sinon.getCallCount(stopPropagationFunc)
                                                              ]), /* tuple */[
                                                            1,
                                                            1
                                                          ]);
                                              }));
                                        return Wonder_jest.test("set distance", (function () {
                                                      var state = _prepare(/* () */0);
                                                      var match = ArcballCameraControllerTool$Wonderjs.createGameObject(state);
                                                      var cameraController = match[3][0];
                                                      var state$1 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerWheelSpeed(cameraController, 2.5, match[0]);
                                                      var state$2 = NoWorkerJobTool$Wonderjs.execInitJobs(state$1);
                                                      var originDistance = ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerDistance(cameraController, state$2);
                                                      var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                                      EventTool$Wonderjs.triggerDomEvent("mousewheel", EventTool$Wonderjs.getBody(/* () */0), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, -3, undefined, undefined, undefined, /* () */0));
                                                      var state$4 = EventTool$Wonderjs.restore(state$3);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerDistance(cameraController, state$4)), originDistance - 2.5 * 3);
                                                    }));
                                      }));
                                describe("bind keydown event", (function () {
                                        describe("set target", (function () {
                                                var _prepare$1 = function () {
                                                  var state = _prepare(/* () */0);
                                                  var match = ArcballCameraControllerTool$Wonderjs.createGameObject(state);
                                                  var cameraController = match[3][0];
                                                  var transform = match[2];
                                                  var pos = /* tuple */[
                                                    1,
                                                    2,
                                                    3
                                                  ];
                                                  var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(transform, pos, match[0]);
                                                  TransformAPI$Wonderjs.getTransformPosition(transform, state$1);
                                                  var state$2 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerMoveSpeedY(cameraController, 0.2, ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerMoveSpeedX(cameraController, 0.1, ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerTarget(cameraController, pos, state$1)));
                                                  var state$3 = NoWorkerJobTool$Wonderjs.execInitJobs(state$2);
                                                  return /* tuple */[
                                                          state$3,
                                                          cameraController,
                                                          /* tuple */[
                                                            0.1,
                                                            0.2
                                                          ],
                                                          pos
                                                        ];
                                                };
                                                Wonder_jest.test("test move left", (function () {
                                                        var match = _prepare$1(/* () */0);
                                                        var match$1 = match[3];
                                                        var state = MainStateTool$Wonderjs.setState(match[0]);
                                                        EventTool$Wonderjs.triggerDomEvent("keydown", EventTool$Wonderjs.getBody(/* () */0), KeyboardEventTool$Wonderjs.buildKeyboardEvent(undefined, undefined, undefined, undefined, 65, /* () */0));
                                                        var state$1 = EventTool$Wonderjs.restore(state);
                                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerTarget(match[1], state$1)), /* tuple */[
                                                                    match$1[0] - match[2][0],
                                                                    match$1[1],
                                                                    match$1[2]
                                                                  ]);
                                                      }));
                                                Wonder_jest.test("test move right", (function () {
                                                        var match = _prepare$1(/* () */0);
                                                        var match$1 = match[3];
                                                        var state = MainStateTool$Wonderjs.setState(match[0]);
                                                        EventTool$Wonderjs.triggerDomEvent("keydown", EventTool$Wonderjs.getBody(/* () */0), KeyboardEventTool$Wonderjs.buildKeyboardEvent(undefined, undefined, undefined, undefined, 39, /* () */0));
                                                        var state$1 = EventTool$Wonderjs.restore(state);
                                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerTarget(match[1], state$1)), /* tuple */[
                                                                    match$1[0] + match[2][0],
                                                                    match$1[1],
                                                                    match$1[2]
                                                                  ]);
                                                      }));
                                                Wonder_jest.test("test move up", (function () {
                                                        var match = _prepare$1(/* () */0);
                                                        var match$1 = match[3];
                                                        var state = MainStateTool$Wonderjs.setState(match[0]);
                                                        EventTool$Wonderjs.triggerDomEvent("keydown", EventTool$Wonderjs.getBody(/* () */0), KeyboardEventTool$Wonderjs.buildKeyboardEvent(undefined, undefined, undefined, undefined, 87, /* () */0));
                                                        var state$1 = EventTool$Wonderjs.restore(state);
                                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerTarget(match[1], state$1)), /* tuple */[
                                                                    match$1[0],
                                                                    match$1[1] + match[2][1],
                                                                    match$1[2]
                                                                  ]);
                                                      }));
                                                return Wonder_jest.test("test move down", (function () {
                                                              var match = _prepare$1(/* () */0);
                                                              var match$1 = match[3];
                                                              var state = MainStateTool$Wonderjs.setState(match[0]);
                                                              EventTool$Wonderjs.triggerDomEvent("keydown", EventTool$Wonderjs.getBody(/* () */0), KeyboardEventTool$Wonderjs.buildKeyboardEvent(undefined, undefined, undefined, undefined, 83, /* () */0));
                                                              var state$1 = EventTool$Wonderjs.restore(state);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerTarget(match[1], state$1)), /* tuple */[
                                                                          match$1[0],
                                                                          match$1[1] - match[2][1],
                                                                          match$1[2]
                                                                        ]);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        describe("add event handleFunc to state", (function () {
                                return Wonder_jest.test("test unbind keydown event", (function () {
                                              var state = _prepare(/* () */0);
                                              var match = ArcballCameraControllerTool$Wonderjs.createGameObject(state);
                                              var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(match[0]);
                                              var preventDefaultFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var state$2 = GameObjectTool$Wonderjs.disposeGameObjectArcballCameraControllerComponent(match[1], match[3][0], state$1);
                                              var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                              EventTool$Wonderjs.triggerDomEvent("mousewheel", EventTool$Wonderjs.getBody(/* () */0), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, preventDefaultFunc, undefined, /* () */0));
                                              EventTool$Wonderjs.restore(state$3);
                                              return Sinon.toCalled(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](preventDefaultFunc)));
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test init two arcballCameraControllers", (function () {
                        var warn = /* record */[/* contents */1];
                        beforeEach((function () {
                                warn[0] = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                                return /* () */0;
                              }));
                        Wonder_jest.test("should warn: expect only has one arcballCameraController", (function () {
                                var state = _prepare(/* () */0);
                                var match = ArcballCameraControllerTool$Wonderjs.createGameObject(state);
                                var match$1 = ArcballCameraControllerTool$Wonderjs.createGameObject(match[0]);
                                var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(match$1[0]);
                                EventTool$Wonderjs.restore(state$1);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg("Warn: expect only has one arcballCameraController, but actual > 1. please dispose others.", warn[0]))), 3);
                              }));
                        return Wonder_jest.test("test bind keydown event", (function () {
                                      var state = _prepare(/* () */0);
                                      var match = ArcballCameraControllerTool$Wonderjs.createGameObject(state);
                                      var match$1 = ArcballCameraControllerTool$Wonderjs.createGameObject(match[0]);
                                      var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(match$1[0]);
                                      var preventDefaultFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                      var state$2 = MainStateTool$Wonderjs.setState(state$1);
                                      EventTool$Wonderjs.triggerDomEvent("mousewheel", EventTool$Wonderjs.getBody(/* () */0), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, preventDefaultFunc, undefined, /* () */0));
                                      EventTool$Wonderjs.restore(state$2);
                                      return Sinon.toCalledTwice(Wonder_jest.Expect[/* expect */0](preventDefaultFunc));
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
