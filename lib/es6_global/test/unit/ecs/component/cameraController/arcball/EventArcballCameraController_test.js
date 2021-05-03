

import * as Curry from "./../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "./../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as ViewTool$Wonderjs from "../../../../../tool/service/device/ViewTool.js";
import * as EventTool$Wonderjs from "../../../../job/no_worker/tool/EventTool.js";
import * as TransformAPI$Wonderjs from "../../../../../../src/api/TransformAPI.js";
import * as MainStateTool$Wonderjs from "../../../../../tool/service/state/MainStateTool.js";
import * as MouseEventTool$Wonderjs from "../../../../job/no_worker/tool/MouseEventTool.js";
import * as TouchEventTool$Wonderjs from "../../../../job/no_worker/tool/TouchEventTool.js";
import * as NoWorkerJobTool$Wonderjs from "../../../../../tool/service/job/no_worker/NoWorkerJobTool.js";
import * as KeyboardEventTool$Wonderjs from "../../../../job/no_worker/tool/KeyboardEventTool.js";
import * as EventCameraControllerTool$Wonderjs from "../../../../../tool/service/camera_controller/EventCameraControllerTool.js";
import * as ArcballCameraControllerAPI$Wonderjs from "../../../../../../src/api/camera_controller/ArcballCameraControllerAPI.js";
import * as ArcballCameraControllerTool$Wonderjs from "../../../../../tool/service/camera_controller/ArcballCameraControllerTool.js";

Wonder_jest.describe("test arcball cameraController event", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("bind arcballCameraController's event", (function (param) {
                      var _prepareKeyEvent = function (param) {
                        var state = EventCameraControllerTool$Wonderjs.prepareKeyboardEvent(sandbox);
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
                        var state$4 = ArcballCameraControllerAPI$Wonderjs.bindArcballCameraControllerEvent(cameraController, state$3);
                        return /* tuple */[
                                state$4,
                                cameraController,
                                /* tuple */[
                                  0.1,
                                  0.2
                                ],
                                pos
                              ];
                      };
                      Wonder_jest.describe("test bind one arcballCameraController's event", (function (param) {
                              var _prepareArcballCameraEvent = function (param) {
                                var state = EventCameraControllerTool$Wonderjs.prepareMouseEvent(sandbox);
                                var match = MouseEventTool$Wonderjs.prepareForPointerLock(sandbox, state);
                                var match$1 = ArcballCameraControllerTool$Wonderjs.createGameObject(match[0]);
                                var cameraController = match$1[3][0];
                                var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(match$1[0]);
                                var state$2 = ArcballCameraControllerAPI$Wonderjs.bindArcballCameraControllerEvent(cameraController, state$1);
                                return /* tuple */[
                                        cameraController,
                                        state$2
                                      ];
                              };
                              Wonder_jest.describe("bind event", (function (param) {
                                      Wonder_jest.describe("support pointer lock", (function (param) {
                                              Wonder_jest.describe("bind point drag start event", (function (param) {
                                                      var _prepareRequestLockAndEvent = function (param) {
                                                        var state = EventCameraControllerTool$Wonderjs.prepareMouseEvent(sandbox);
                                                        var match = MouseEventTool$Wonderjs.prepareForPointerLock(sandbox, state);
                                                        var match$1 = ArcballCameraControllerTool$Wonderjs.createGameObject(match[0]);
                                                        var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(match$1[0]);
                                                        var state$2 = ArcballCameraControllerAPI$Wonderjs.bindArcballCameraControllerEvent(match$1[3][0], state$1);
                                                        return /* tuple */[
                                                                match[1],
                                                                MainStateTool$Wonderjs.setState(state$2)
                                                              ];
                                                      };
                                                      Wonder_jest.test("if is mouse event, request canvas pointerLock", (function (param) {
                                                              var match = _prepareRequestLockAndEvent(/* () */0);
                                                              var state = match[1];
                                                              EventTool$Wonderjs.triggerDomEvent("mousedown", EventTool$Wonderjs.getPointEventBindedDom(state), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                              EventTool$Wonderjs.restore(state);
                                                              return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](match[0]));
                                                            }));
                                                      return Wonder_jest.test("else if is touch event, not request canvas pointerLock", (function (param) {
                                                                    var match = _prepareRequestLockAndEvent(/* () */0);
                                                                    var state = match[1];
                                                                    EventTool$Wonderjs.triggerDomEvent("touchstart", EventTool$Wonderjs.getPointEventBindedDom(state), TouchEventTool$Wonderjs.buildTouchEvent(undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                                    EventTool$Wonderjs.restore(state);
                                                                    return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](match[0])));
                                                                  }));
                                                    }));
                                              return Wonder_jest.describe("bind point drag drop event", (function (param) {
                                                            var _prepareForPointerLock = function (sandbox, pointerLockElement, state) {
                                                              var $$document$1 = document;
                                                              $$document$1.pointerLockElement = pointerLockElement;
                                                              var exitPointerLockStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                              $$document$1.exitPointerLock = exitPointerLockStub;
                                                              MouseEventTool$Wonderjs.prepareForPointerLock(sandbox, state);
                                                              return /* tuple */[
                                                                      state,
                                                                      exitPointerLockStub
                                                                    ];
                                                            };
                                                            var _prepareExitLockAndEvent = function (canvas, state) {
                                                              var match = _prepareForPointerLock(sandbox, canvas, state);
                                                              var match$1 = ArcballCameraControllerTool$Wonderjs.createGameObject(match[0]);
                                                              var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(match$1[0]);
                                                              var state$2 = ArcballCameraControllerAPI$Wonderjs.bindArcballCameraControllerEvent(match$1[3][0], state$1);
                                                              return /* tuple */[
                                                                      match[1],
                                                                      MainStateTool$Wonderjs.setState(state$2)
                                                                    ];
                                                            };
                                                            Wonder_jest.describe("if is mouse event", (function (param) {
                                                                    Wonder_jest.test("if document.pointerLockElement === canvas, exitPointerLock", (function (param) {
                                                                            var state = EventCameraControllerTool$Wonderjs.prepareMouseEvent(sandbox);
                                                                            var canvas = ViewTool$Wonderjs.unsafeGetCanvas(state);
                                                                            var match = _prepareExitLockAndEvent(canvas, state);
                                                                            var state$1 = match[1];
                                                                            EventTool$Wonderjs.triggerDomEvent("mousedown", EventTool$Wonderjs.getPointEventBindedDom(state$1), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                                            EventTool$Wonderjs.triggerDomEvent("mouseup", EventTool$Wonderjs.getPointEventBindedDom(state$1), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                                            EventTool$Wonderjs.restore(state$1);
                                                                            return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](match[0]));
                                                                          }));
                                                                    return Wonder_jest.test("else, not exitPointerLock", (function (param) {
                                                                                  var state = EventCameraControllerTool$Wonderjs.prepareMouseEvent(sandbox);
                                                                                  var match = _prepareExitLockAndEvent(1, state);
                                                                                  var state$1 = match[1];
                                                                                  EventTool$Wonderjs.triggerDomEvent("mousedown", EventTool$Wonderjs.getPointEventBindedDom(state$1), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                                                  EventTool$Wonderjs.triggerDomEvent("mouseup", EventTool$Wonderjs.getPointEventBindedDom(state$1), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                                                  EventTool$Wonderjs.restore(state$1);
                                                                                  return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](match[0])));
                                                                                }));
                                                                  }));
                                                            return Wonder_jest.describe("else if is touch event", (function (param) {
                                                                          return Wonder_jest.test("not exitPointerLock", (function (param) {
                                                                                        var state = EventCameraControllerTool$Wonderjs.prepareMouseEvent(sandbox);
                                                                                        var canvas = ViewTool$Wonderjs.unsafeGetCanvas(state);
                                                                                        var match = _prepareExitLockAndEvent(canvas, state);
                                                                                        var state$1 = match[1];
                                                                                        EventTool$Wonderjs.triggerDomEvent("touchstart", EventTool$Wonderjs.getPointEventBindedDom(state$1), TouchEventTool$Wonderjs.buildTouchEvent(undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                                                        EventTool$Wonderjs.triggerDomEvent("touchend", EventTool$Wonderjs.getPointEventBindedDom(state$1), TouchEventTool$Wonderjs.buildTouchEvent(undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                                                        EventTool$Wonderjs.restore(state$1);
                                                                                        return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](match[0])));
                                                                                      }));
                                                                        }));
                                                          }));
                                            }));
                                      Wonder_jest.describe("bind point drag over event", (function (param) {
                                              return Wonder_jest.describe("change orbit", (function (param) {
                                                            return Wonder_jest.test("set phi and theta", (function (param) {
                                                                          var match = _prepareArcballCameraEvent(/* () */0);
                                                                          var cameraController = match[0];
                                                                          var state = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerTheta(cameraController, 0.5, ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerPhi(cameraController, 1, ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerRotateSpeed(cameraController, 2.5, match[1])));
                                                                          var state$1 = MainStateTool$Wonderjs.setState(state);
                                                                          EventTool$Wonderjs.triggerDomEvent("mousedown", EventTool$Wonderjs.getPointEventBindedDom(state$1), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                                          EventTool$Wonderjs.triggerFirstMouseDragOverEvent(MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, 1, 2, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                                                          var state$2 = EventTool$Wonderjs.restore(state$1);
                                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                          ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerPhi(cameraController, state$2),
                                                                                          ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerTheta(cameraController, state$2)
                                                                                        ]), /* tuple */[
                                                                                      1.025,
                                                                                      0.45
                                                                                    ]);
                                                                        }));
                                                          }));
                                            }));
                                      Wonder_jest.describe("bind point scale event", (function (param) {
                                              Wonder_jest.test("preventDefault", (function (param) {
                                                      var match = _prepareArcballCameraEvent(/* () */0);
                                                      var preventDefaultFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                      var stopPropagationFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                      var state = MainStateTool$Wonderjs.setState(match[1]);
                                                      EventTool$Wonderjs.triggerDomEvent("mousewheel", EventTool$Wonderjs.getPointEventBindedDom(state), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, preventDefaultFunc, stopPropagationFunc, /* () */0));
                                                      EventTool$Wonderjs.restore(state);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      Sinon.getCallCount(preventDefaultFunc),
                                                                      Sinon.getCallCount(stopPropagationFunc)
                                                                    ]), /* tuple */[
                                                                  1,
                                                                  1
                                                                ]);
                                                    }));
                                              return Wonder_jest.test("set distance", (function (param) {
                                                            var match = _prepareArcballCameraEvent(/* () */0);
                                                            var cameraController = match[0];
                                                            var state = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerWheelSpeed(cameraController, 2.5, match[1]);
                                                            var originDistance = ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerDistance(cameraController, state);
                                                            var state$1 = MainStateTool$Wonderjs.setState(state);
                                                            EventTool$Wonderjs.triggerDomEvent("mousewheel", EventTool$Wonderjs.getPointEventBindedDom(state$1), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, -3, undefined, undefined, undefined, /* () */0));
                                                            var state$2 = EventTool$Wonderjs.restore(state$1);
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerDistance(cameraController, state$2)), originDistance - 2.5 * 3);
                                                          }));
                                            }));
                                      return Wonder_jest.describe("bind keydown event", (function (param) {
                                                    var _prepareKeyEvent = function (param) {
                                                      var state = EventCameraControllerTool$Wonderjs.prepareKeyboardEvent(sandbox);
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
                                                      var state$4 = ArcballCameraControllerAPI$Wonderjs.bindArcballCameraControllerEvent(cameraController, state$3);
                                                      return /* tuple */[
                                                              state$4,
                                                              cameraController,
                                                              /* tuple */[
                                                                0.1,
                                                                0.2
                                                              ],
                                                              pos
                                                            ];
                                                    };
                                                    Wonder_jest.test("if is combined key, not set target", (function (param) {
                                                            var match = _prepareKeyEvent(/* () */0);
                                                            var match$1 = match[3];
                                                            var state = MainStateTool$Wonderjs.setState(match[0]);
                                                            EventTool$Wonderjs.triggerDomEvent("keydown", EventTool$Wonderjs.getKeyboardEventBindedDom(state), KeyboardEventTool$Wonderjs.buildKeyboardEvent(true, undefined, undefined, undefined, 65, /* () */0));
                                                            var state$1 = EventTool$Wonderjs.restore(state);
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerTarget(match[1], state$1)), /* tuple */[
                                                                        match$1[0],
                                                                        match$1[1],
                                                                        match$1[2]
                                                                      ]);
                                                          }));
                                                    return Wonder_jest.describe("else, add direction into directionArray", (function (param) {
                                                                  Wonder_jest.describe("test keydown one direction", (function (param) {
                                                                          var _judgeChangeDirectionArray = function (keyCode, direction) {
                                                                            var match = _prepareKeyEvent(/* () */0);
                                                                            var state = MainStateTool$Wonderjs.setState(match[0]);
                                                                            EventTool$Wonderjs.triggerDomEvent("keydown", EventTool$Wonderjs.getKeyboardEventBindedDom(state), KeyboardEventTool$Wonderjs.buildKeyboardEvent(undefined, undefined, undefined, undefined, keyCode, /* () */0));
                                                                            var state$1 = EventTool$Wonderjs.restore(MainStateTool$Wonderjs.unsafeGetState(/* () */0));
                                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerDirectionArray(match[1], state$1)), /* array */[direction]);
                                                                          };
                                                                          Wonder_jest.test("test move left", (function (param) {
                                                                                  return _judgeChangeDirectionArray(65, /* Left */0);
                                                                                }));
                                                                          Wonder_jest.test("test move right", (function (param) {
                                                                                  return _judgeChangeDirectionArray(39, /* Right */1);
                                                                                }));
                                                                          Wonder_jest.test("test move up", (function (param) {
                                                                                  return _judgeChangeDirectionArray(87, /* Up */2);
                                                                                }));
                                                                          return Wonder_jest.test("test move down", (function (param) {
                                                                                        return _judgeChangeDirectionArray(83, /* Down */3);
                                                                                      }));
                                                                        }));
                                                                  return Wonder_jest.describe("test keydown multiple direction", (function (param) {
                                                                                Wonder_jest.describe("test should remove duplicate direction", (function (param) {
                                                                                        return Wonder_jest.test("test move up and up", (function (param) {
                                                                                                      var match = _prepareKeyEvent(/* () */0);
                                                                                                      var state = MainStateTool$Wonderjs.setState(match[0]);
                                                                                                      EventTool$Wonderjs.triggerDomEvent("keydown", EventTool$Wonderjs.getKeyboardEventBindedDom(state), KeyboardEventTool$Wonderjs.buildKeyboardEvent(undefined, undefined, undefined, undefined, 65, /* () */0));
                                                                                                      EventTool$Wonderjs.triggerDomEvent("keydown", EventTool$Wonderjs.getKeyboardEventBindedDom(state), KeyboardEventTool$Wonderjs.buildKeyboardEvent(undefined, undefined, undefined, undefined, 65, /* () */0));
                                                                                                      var state$1 = EventTool$Wonderjs.restore(MainStateTool$Wonderjs.unsafeGetState(/* () */0));
                                                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerDirectionArray(match[1], state$1)), /* array */[/* Left */0]);
                                                                                                    }));
                                                                                      }));
                                                                                var _judgeMultipleChangeDirectionArray = function (param, param$1) {
                                                                                  var match = _prepareKeyEvent(/* () */0);
                                                                                  var state = MainStateTool$Wonderjs.setState(match[0]);
                                                                                  EventTool$Wonderjs.triggerDomEvent("keydown", EventTool$Wonderjs.getKeyboardEventBindedDom(state), KeyboardEventTool$Wonderjs.buildKeyboardEvent(undefined, undefined, undefined, undefined, param[0], /* () */0));
                                                                                  EventTool$Wonderjs.triggerDomEvent("keydown", EventTool$Wonderjs.getKeyboardEventBindedDom(state), KeyboardEventTool$Wonderjs.buildKeyboardEvent(undefined, undefined, undefined, undefined, param[1], /* () */0));
                                                                                  var state$1 = EventTool$Wonderjs.restore(MainStateTool$Wonderjs.unsafeGetState(/* () */0));
                                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerDirectionArray(match[1], state$1)), /* array */[
                                                                                              param$1[0],
                                                                                              param$1[1]
                                                                                            ]);
                                                                                };
                                                                                Wonder_jest.test("test move left and up", (function (param) {
                                                                                        return _judgeMultipleChangeDirectionArray(/* tuple */[
                                                                                                    65,
                                                                                                    87
                                                                                                  ], /* tuple */[
                                                                                                    /* Left */0,
                                                                                                    /* Up */2
                                                                                                  ]);
                                                                                      }));
                                                                                Wonder_jest.test("test move left and down", (function (param) {
                                                                                        return _judgeMultipleChangeDirectionArray(/* tuple */[
                                                                                                    65,
                                                                                                    83
                                                                                                  ], /* tuple */[
                                                                                                    /* Left */0,
                                                                                                    /* Down */3
                                                                                                  ]);
                                                                                      }));
                                                                                Wonder_jest.test("test move right and up", (function (param) {
                                                                                        return _judgeMultipleChangeDirectionArray(/* tuple */[
                                                                                                    39,
                                                                                                    87
                                                                                                  ], /* tuple */[
                                                                                                    /* Right */1,
                                                                                                    /* Up */2
                                                                                                  ]);
                                                                                      }));
                                                                                return Wonder_jest.test("test move right and down", (function (param) {
                                                                                              return _judgeMultipleChangeDirectionArray(/* tuple */[
                                                                                                          39,
                                                                                                          83
                                                                                                        ], /* tuple */[
                                                                                                          /* Right */1,
                                                                                                          /* Down */3
                                                                                                        ]);
                                                                                            }));
                                                                              }));
                                                                }));
                                                  }));
                                    }));
                              return Wonder_jest.describe("add event handleFunc to state", (function (param) {
                                            var _preparePreventDefaultAndBindEvent = function (param) {
                                              var state = EventCameraControllerTool$Wonderjs.prepareMouseEvent(sandbox);
                                              var match = MouseEventTool$Wonderjs.prepareForPointerLock(sandbox, state);
                                              var match$1 = ArcballCameraControllerTool$Wonderjs.createGameObject(match[0]);
                                              var cameraController = match$1[3][0];
                                              var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(match$1[0]);
                                              var preventDefaultFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var state$2 = ArcballCameraControllerAPI$Wonderjs.bindArcballCameraControllerEvent(cameraController, state$1);
                                              return /* tuple */[
                                                      cameraController,
                                                      preventDefaultFunc,
                                                      match[1],
                                                      state$2
                                                    ];
                                            };
                                            Wonder_jest.test("test unbind point drag start event", (function (param) {
                                                    var match = _preparePreventDefaultAndBindEvent(/* () */0);
                                                    var state = ArcballCameraControllerAPI$Wonderjs.unbindArcballCameraControllerEvent(match[0], match[3]);
                                                    var state$1 = MainStateTool$Wonderjs.setState(state);
                                                    EventTool$Wonderjs.triggerDomEvent("mousedown", EventTool$Wonderjs.getPointEventBindedDom(state$1), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, match[1], undefined, /* () */0));
                                                    EventTool$Wonderjs.restore(state$1);
                                                    return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](match[2])));
                                                  }));
                                            Wonder_jest.test("test unbind point scale event", (function (param) {
                                                    var match = _preparePreventDefaultAndBindEvent(/* () */0);
                                                    var preventDefaultFunc = match[1];
                                                    var state = ArcballCameraControllerAPI$Wonderjs.unbindArcballCameraControllerPointScaleEvent(match[0], match[3]);
                                                    var state$1 = MainStateTool$Wonderjs.setState(state);
                                                    EventTool$Wonderjs.triggerDomEvent("mousewheel", EventTool$Wonderjs.getPointEventBindedDom(state$1), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, preventDefaultFunc, undefined, /* () */0));
                                                    EventTool$Wonderjs.restore(state$1);
                                                    return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](preventDefaultFunc)));
                                                  }));
                                            Wonder_jest.test("test unbind keydown event", (function (param) {
                                                    var match = _prepareKeyEvent(/* () */0);
                                                    var match$1 = match[3];
                                                    var cameraController = match[1];
                                                    var state = ArcballCameraControllerAPI$Wonderjs.unbindArcballCameraControllerEvent(cameraController, match[0]);
                                                    var state$1 = MainStateTool$Wonderjs.setState(state);
                                                    EventTool$Wonderjs.triggerDomEvent("keydown", EventTool$Wonderjs.getKeyboardEventBindedDom(state$1), KeyboardEventTool$Wonderjs.buildKeyboardEvent(undefined, undefined, undefined, undefined, 65, /* () */0));
                                                    var state$2 = EventTool$Wonderjs.restore(state$1);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerTarget(cameraController, state$2)), /* tuple */[
                                                                match$1[0],
                                                                match$1[1],
                                                                match$1[2]
                                                              ]);
                                                  }));
                                            return Wonder_jest.describe("fix bug", (function (param) {
                                                          return Wonder_jest.test("unbind should unbind cameraController's all binded functions", (function (param) {
                                                                        var match = _preparePreventDefaultAndBindEvent(/* () */0);
                                                                        var cameraController = match[0];
                                                                        var state = ArcballCameraControllerAPI$Wonderjs.bindArcballCameraControllerEvent(cameraController, match[3]);
                                                                        var state$1 = ArcballCameraControllerAPI$Wonderjs.unbindArcballCameraControllerEvent(cameraController, state);
                                                                        var state$2 = MainStateTool$Wonderjs.setState(state$1);
                                                                        EventTool$Wonderjs.triggerDomEvent("mousedown", EventTool$Wonderjs.getPointEventBindedDom(state$2), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, match[1], undefined, /* () */0));
                                                                        EventTool$Wonderjs.restore(state$2);
                                                                        return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](match[2])));
                                                                      }));
                                                        }));
                                          }));
                            }));
                      return Wonder_jest.describe("test bind two arcballCameraControllers' event", (function (param) {
                                    return Wonder_jest.test("test bind point scale event", (function (param) {
                                                  var state = EventCameraControllerTool$Wonderjs.prepareMouseEvent(sandbox);
                                                  var match = ArcballCameraControllerTool$Wonderjs.createGameObject(state);
                                                  var match$1 = ArcballCameraControllerTool$Wonderjs.createGameObject(match[0]);
                                                  var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(match$1[0]);
                                                  var state$2 = ArcballCameraControllerAPI$Wonderjs.bindArcballCameraControllerEvent(match[3][0], state$1);
                                                  var state$3 = ArcballCameraControllerAPI$Wonderjs.bindArcballCameraControllerEvent(match$1[3][0], state$2);
                                                  var preventDefaultFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                  var state$4 = MainStateTool$Wonderjs.setState(state$3);
                                                  EventTool$Wonderjs.triggerDomEvent("mousewheel", EventTool$Wonderjs.getPointEventBindedDom(state$4), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, preventDefaultFunc, undefined, /* () */0));
                                                  EventTool$Wonderjs.restore(state$4);
                                                  return Sinon.toCalledTwice(Wonder_jest.Expect[/* expect */0](preventDefaultFunc));
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
