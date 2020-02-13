'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var ViewTool$Wonderjs = require("../../../../../tool/service/device/ViewTool.js");
var EventTool$Wonderjs = require("../../../../job/no_worker/tool/EventTool.js");
var ViewService$Wonderjs = require("../../../../../../src/service/record/main/device/ViewService.js");
var MainStateTool$Wonderjs = require("../../../../../tool/service/state/MainStateTool.js");
var MouseEventTool$Wonderjs = require("../../../../job/no_worker/tool/MouseEventTool.js");
var TouchEventTool$Wonderjs = require("../../../../job/no_worker/tool/TouchEventTool.js");
var NoWorkerJobTool$Wonderjs = require("../../../../../tool/service/job/no_worker/NoWorkerJobTool.js");
var KeyboardEventTool$Wonderjs = require("../../../../job/no_worker/tool/KeyboardEventTool.js");
var FlyCameraControllerAPI$Wonderjs = require("../../../../../../src/api/camera_controller/FlyCameraControllerAPI.js");
var FlyCameraControllerTool$Wonderjs = require("../../../../../tool/service/camera_controller/FlyCameraControllerTool.js");
var EventCameraControllerTool$Wonderjs = require("../../../../../tool/service/camera_controller/EventCameraControllerTool.js");

Wonder_jest.describe("test fly cameraController event", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("bind flyCameraController's event", (function (param) {
                      var _prepareMouseEvent = function (canvasHeight) {
                        var state = EventCameraControllerTool$Wonderjs.prepareMouseEvent(sandbox);
                        var canvas = ViewService$Wonderjs.unsafeGetCanvas(state[/* viewRecord */8]);
                        canvas.height = canvasHeight;
                        return state;
                      };
                      var _prepareKeyEvent = function (param) {
                        var state = EventCameraControllerTool$Wonderjs.prepareKeyboardEvent(sandbox);
                        var match = FlyCameraControllerTool$Wonderjs.createGameObject(state);
                        var cameraController = match[3][0];
                        var positionDiff = /* tuple */[
                          0,
                          0,
                          0
                        ];
                        var state$1 = FlyCameraControllerTool$Wonderjs.setTranslationDiff(cameraController, positionDiff, FlyCameraControllerAPI$Wonderjs.setFlyCameraControllerMoveSpeed(cameraController, 0.8, match[0]));
                        var state$2 = NoWorkerJobTool$Wonderjs.execInitJobs(state$1);
                        var state$3 = FlyCameraControllerAPI$Wonderjs.bindFlyCameraControllerEvent(cameraController, state$2);
                        return /* tuple */[
                                state$3,
                                cameraController,
                                0.8,
                                positionDiff
                              ];
                      };
                      Wonder_jest.describe("test bind one flyCameraController's event", (function (param) {
                              var _prepareFlyCameraEvent = function (canvasHeight) {
                                var state = _prepareMouseEvent(canvasHeight);
                                var match = MouseEventTool$Wonderjs.prepareForPointerLock(sandbox, state);
                                var match$1 = FlyCameraControllerTool$Wonderjs.createGameObject(match[0]);
                                var cameraController = match$1[3][0];
                                var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(match$1[0]);
                                var state$2 = FlyCameraControllerAPI$Wonderjs.bindFlyCameraControllerEvent(cameraController, state$1);
                                return /* tuple */[
                                        cameraController,
                                        MainStateTool$Wonderjs.setState(state$2)
                                      ];
                              };
                              return Wonder_jest.describe("bind event", (function (param) {
                                            Wonder_jest.describe("support pointer lock", (function (param) {
                                                    Wonder_jest.describe("bind point drag start event", (function (param) {
                                                            var _prepareFlyCameraRequestLockAndEvent = function (param) {
                                                              var state = _prepareMouseEvent(100);
                                                              var match = MouseEventTool$Wonderjs.prepareForPointerLock(sandbox, state);
                                                              var match$1 = FlyCameraControllerTool$Wonderjs.createGameObject(match[0]);
                                                              var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(match$1[0]);
                                                              var state$2 = FlyCameraControllerAPI$Wonderjs.bindFlyCameraControllerEvent(match$1[3][0], state$1);
                                                              return /* tuple */[
                                                                      match[1],
                                                                      MainStateTool$Wonderjs.setState(state$2)
                                                                    ];
                                                            };
                                                            Wonder_jest.test("if is mouse event, request canvas pointerLock", (function (param) {
                                                                    var match = _prepareFlyCameraRequestLockAndEvent(/* () */0);
                                                                    var state = match[1];
                                                                    EventTool$Wonderjs.triggerDomEvent("mousedown", EventTool$Wonderjs.getPointEventBindedDom(state), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                                    EventTool$Wonderjs.restore(state);
                                                                    return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](match[0]));
                                                                  }));
                                                            return Wonder_jest.test("else if is touch event, not request canvas pointerLock", (function (param) {
                                                                          var match = _prepareFlyCameraRequestLockAndEvent(/* () */0);
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
                                                                  var _prepareFlycameraExitLockAndBindEvent = function (canvas, state) {
                                                                    var match = _prepareForPointerLock(sandbox, canvas, state);
                                                                    var match$1 = FlyCameraControllerTool$Wonderjs.createGameObject(match[0]);
                                                                    var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(match$1[0]);
                                                                    var state$2 = FlyCameraControllerAPI$Wonderjs.bindFlyCameraControllerEvent(match$1[3][0], state$1);
                                                                    return /* tuple */[
                                                                            match[1],
                                                                            MainStateTool$Wonderjs.setState(state$2)
                                                                          ];
                                                                  };
                                                                  Wonder_jest.describe("if is mouse event", (function (param) {
                                                                          Wonder_jest.test("if document.pointerLockElement === canvas, exitPointerLock", (function (param) {
                                                                                  var state = _prepareMouseEvent(100);
                                                                                  var canvas = ViewTool$Wonderjs.unsafeGetCanvas(state);
                                                                                  var match = _prepareFlycameraExitLockAndBindEvent(canvas, state);
                                                                                  var state$1 = match[1];
                                                                                  EventTool$Wonderjs.triggerDomEvent("mousedown", EventTool$Wonderjs.getPointEventBindedDom(state$1), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                                                  EventTool$Wonderjs.triggerDomEvent("mouseup", EventTool$Wonderjs.getPointEventBindedDom(state$1), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                                                  EventTool$Wonderjs.restore(state$1);
                                                                                  return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](match[0]));
                                                                                }));
                                                                          return Wonder_jest.test("else, not exitPointerLock", (function (param) {
                                                                                        var state = _prepareMouseEvent(100);
                                                                                        var match = _prepareFlycameraExitLockAndBindEvent(1, state);
                                                                                        var state$1 = match[1];
                                                                                        EventTool$Wonderjs.triggerDomEvent("mousedown", EventTool$Wonderjs.getPointEventBindedDom(state$1), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                                                        EventTool$Wonderjs.triggerDomEvent("mouseup", EventTool$Wonderjs.getPointEventBindedDom(state$1), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                                                        EventTool$Wonderjs.restore(state$1);
                                                                                        return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](match[0])));
                                                                                      }));
                                                                        }));
                                                                  return Wonder_jest.describe("else if is touch event", (function (param) {
                                                                                return Wonder_jest.test("not exitPointerLock", (function (param) {
                                                                                              var state = _prepareMouseEvent(100);
                                                                                              var canvas = ViewTool$Wonderjs.unsafeGetCanvas(state);
                                                                                              var match = _prepareFlycameraExitLockAndBindEvent(canvas, state);
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
                                                                  return Wonder_jest.test("set euler angle diff value", (function (param) {
                                                                                var match = _prepareFlyCameraEvent(100);
                                                                                var cameraController = match[0];
                                                                                var state = FlyCameraControllerTool$Wonderjs.setEulerAngleDiff(cameraController, /* record */[
                                                                                      /* diffX */0,
                                                                                      /* diffY */0
                                                                                    ], FlyCameraControllerAPI$Wonderjs.setFlyCameraControllerRotateSpeed(cameraController, 200, match[1]));
                                                                                EventTool$Wonderjs.triggerDomEvent("mousedown", EventTool$Wonderjs.getPointEventBindedDom(state), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                                                EventTool$Wonderjs.triggerFirstMouseDragOverEvent(MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, 1, 2, undefined, undefined, undefined, undefined, /* () */0), state);
                                                                                var state$1 = EventTool$Wonderjs.restore(state);
                                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FlyCameraControllerTool$Wonderjs.unsafeGetEulerAngleDiff(cameraController, state$1)), /* record */[
                                                                                            /* diffX */4,
                                                                                            /* diffY */2
                                                                                          ]);
                                                                              }));
                                                                }));
                                                  }));
                                            Wonder_jest.describe("bind point scale event", (function (param) {
                                                    Wonder_jest.test("preventDefault", (function (param) {
                                                            var match = _prepareFlyCameraEvent(100);
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
                                                    return Wonder_jest.test("set translation diff value", (function (param) {
                                                                  var match = _prepareFlyCameraEvent(100);
                                                                  var cameraController = match[0];
                                                                  var state = FlyCameraControllerAPI$Wonderjs.setFlyCameraControllerWheelSpeed(cameraController, 2.5, match[1]);
                                                                  var state$1 = MainStateTool$Wonderjs.setState(state);
                                                                  EventTool$Wonderjs.triggerDomEvent("mousewheel", EventTool$Wonderjs.getPointEventBindedDom(state$1), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, -3, undefined, undefined, undefined, /* () */0));
                                                                  var state$2 = EventTool$Wonderjs.restore(state$1);
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FlyCameraControllerTool$Wonderjs.unsafeGetTranslationDiff(cameraController, state$2)), /* tuple */[
                                                                              0,
                                                                              0,
                                                                              -7.5
                                                                            ]);
                                                                }));
                                                  }));
                                            Wonder_jest.describe("bind keydown event", (function (param) {
                                                    Wonder_jest.test("if is combined key, not add direction into directionArray ", (function (param) {
                                                            var match = _prepareKeyEvent(/* () */0);
                                                            var state = MainStateTool$Wonderjs.setState(match[0]);
                                                            EventTool$Wonderjs.triggerDomEvent("keydown", EventTool$Wonderjs.getKeyboardEventBindedDom(state), KeyboardEventTool$Wonderjs.buildKeyboardEvent(true, undefined, undefined, undefined, 65, /* () */0));
                                                            var state$1 = EventTool$Wonderjs.restore(state);
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FlyCameraControllerAPI$Wonderjs.unsafeGetFlyCameraControllerDirectionArray(match[1], state$1).length), 0);
                                                          }));
                                                    return Wonder_jest.describe("else, add direction into directionArray", (function (param) {
                                                                  Wonder_jest.describe("test keydown one direction", (function (param) {
                                                                          var _judgeChangeDirectionArray = function (keyCode, direction) {
                                                                            var match = _prepareKeyEvent(/* () */0);
                                                                            var state = MainStateTool$Wonderjs.setState(match[0]);
                                                                            EventTool$Wonderjs.triggerDomEvent("keydown", EventTool$Wonderjs.getKeyboardEventBindedDom(state), KeyboardEventTool$Wonderjs.buildKeyboardEvent(undefined, undefined, undefined, undefined, keyCode, /* () */0));
                                                                            var state$1 = EventTool$Wonderjs.restore(MainStateTool$Wonderjs.unsafeGetState(/* () */0));
                                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FlyCameraControllerAPI$Wonderjs.unsafeGetFlyCameraControllerDirectionArray(match[1], state$1)), /* array */[direction]);
                                                                          };
                                                                          Wonder_jest.test("test move left", (function (param) {
                                                                                  return _judgeChangeDirectionArray(65, /* Left */0);
                                                                                }));
                                                                          Wonder_jest.test("test move right", (function (param) {
                                                                                  return _judgeChangeDirectionArray(39, /* Right */1);
                                                                                }));
                                                                          Wonder_jest.test("test move up", (function (param) {
                                                                                  return _judgeChangeDirectionArray(81, /* Up */2);
                                                                                }));
                                                                          Wonder_jest.test("test move down", (function (param) {
                                                                                  return _judgeChangeDirectionArray(69, /* Down */3);
                                                                                }));
                                                                          Wonder_jest.test("test move front", (function (param) {
                                                                                  return _judgeChangeDirectionArray(87, /* Front */4);
                                                                                }));
                                                                          return Wonder_jest.test("test move back", (function (param) {
                                                                                        return _judgeChangeDirectionArray(83, /* Back */5);
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
                                                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FlyCameraControllerAPI$Wonderjs.unsafeGetFlyCameraControllerDirectionArray(match[1], state$1)), /* array */[/* Left */0]);
                                                                                                    }));
                                                                                      }));
                                                                                var _judgeMultipleChangeDirectionArray = function (param, param$1) {
                                                                                  var match = _prepareKeyEvent(/* () */0);
                                                                                  var state = MainStateTool$Wonderjs.setState(match[0]);
                                                                                  EventTool$Wonderjs.triggerDomEvent("keydown", EventTool$Wonderjs.getKeyboardEventBindedDom(state), KeyboardEventTool$Wonderjs.buildKeyboardEvent(undefined, undefined, undefined, undefined, param[0], /* () */0));
                                                                                  EventTool$Wonderjs.triggerDomEvent("keydown", EventTool$Wonderjs.getKeyboardEventBindedDom(state), KeyboardEventTool$Wonderjs.buildKeyboardEvent(undefined, undefined, undefined, undefined, param[1], /* () */0));
                                                                                  var state$1 = EventTool$Wonderjs.restore(MainStateTool$Wonderjs.unsafeGetState(/* () */0));
                                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FlyCameraControllerAPI$Wonderjs.unsafeGetFlyCameraControllerDirectionArray(match[1], state$1)), /* array */[
                                                                                              param$1[0],
                                                                                              param$1[1]
                                                                                            ]);
                                                                                };
                                                                                Wonder_jest.test("test move left and up", (function (param) {
                                                                                        return _judgeMultipleChangeDirectionArray(/* tuple */[
                                                                                                    65,
                                                                                                    81
                                                                                                  ], /* tuple */[
                                                                                                    /* Left */0,
                                                                                                    /* Up */2
                                                                                                  ]);
                                                                                      }));
                                                                                Wonder_jest.test("test move right and down", (function (param) {
                                                                                        return _judgeMultipleChangeDirectionArray(/* tuple */[
                                                                                                    39,
                                                                                                    69
                                                                                                  ], /* tuple */[
                                                                                                    /* Right */1,
                                                                                                    /* Down */3
                                                                                                  ]);
                                                                                      }));
                                                                                Wonder_jest.test("test move up and front", (function (param) {
                                                                                        return _judgeMultipleChangeDirectionArray(/* tuple */[
                                                                                                    81,
                                                                                                    87
                                                                                                  ], /* tuple */[
                                                                                                    /* Up */2,
                                                                                                    /* Front */4
                                                                                                  ]);
                                                                                      }));
                                                                                Wonder_jest.test("test move down and back", (function (param) {
                                                                                        return _judgeMultipleChangeDirectionArray(/* tuple */[
                                                                                                    69,
                                                                                                    83
                                                                                                  ], /* tuple */[
                                                                                                    /* Down */3,
                                                                                                    /* Back */5
                                                                                                  ]);
                                                                                      }));
                                                                                Wonder_jest.test("test move front and left", (function (param) {
                                                                                        return _judgeMultipleChangeDirectionArray(/* tuple */[
                                                                                                    87,
                                                                                                    65
                                                                                                  ], /* tuple */[
                                                                                                    /* Front */4,
                                                                                                    /* Left */0
                                                                                                  ]);
                                                                                      }));
                                                                                return Wonder_jest.test("test move back", (function (param) {
                                                                                              return _judgeMultipleChangeDirectionArray(/* tuple */[
                                                                                                          83,
                                                                                                          39
                                                                                                        ], /* tuple */[
                                                                                                          /* Back */5,
                                                                                                          /* Right */1
                                                                                                        ]);
                                                                                            }));
                                                                              }));
                                                                }));
                                                  }));
                                            return Wonder_jest.describe("bind keyup event", (function (param) {
                                                          return Wonder_jest.describe("test remove direction from directionArray", (function (param) {
                                                                        var _judgeChangeDirectionArray = function (param, keyupCode, direction) {
                                                                          var match = _prepareKeyEvent(/* () */0);
                                                                          var state = MainStateTool$Wonderjs.setState(match[0]);
                                                                          EventTool$Wonderjs.triggerDomEvent("keydown", EventTool$Wonderjs.getKeyboardEventBindedDom(state), KeyboardEventTool$Wonderjs.buildKeyboardEvent(undefined, undefined, undefined, undefined, param[0], /* () */0));
                                                                          EventTool$Wonderjs.triggerDomEvent("keydown", EventTool$Wonderjs.getKeyboardEventBindedDom(state), KeyboardEventTool$Wonderjs.buildKeyboardEvent(undefined, undefined, undefined, undefined, param[1], /* () */0));
                                                                          EventTool$Wonderjs.triggerDomEvent("keyup", EventTool$Wonderjs.getKeyboardEventBindedDom(state), KeyboardEventTool$Wonderjs.buildKeyboardEvent(undefined, undefined, undefined, undefined, keyupCode, /* () */0));
                                                                          var state$1 = EventTool$Wonderjs.restore(MainStateTool$Wonderjs.unsafeGetState(/* () */0));
                                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FlyCameraControllerAPI$Wonderjs.unsafeGetFlyCameraControllerDirectionArray(match[1], state$1)), /* array */[direction]);
                                                                        };
                                                                        Wonder_jest.test("test keydown left and up, then keyup left", (function (param) {
                                                                                return _judgeChangeDirectionArray(/* tuple */[
                                                                                            65,
                                                                                            81
                                                                                          ], 65, /* Up */2);
                                                                              }));
                                                                        Wonder_jest.test("test keydown left and up, then keyup up", (function (param) {
                                                                                return _judgeChangeDirectionArray(/* tuple */[
                                                                                            65,
                                                                                            81
                                                                                          ], 81, /* Left */0);
                                                                              }));
                                                                        Wonder_jest.test("test keydown left and up, then keyup up", (function (param) {
                                                                                return _judgeChangeDirectionArray(/* tuple */[
                                                                                            65,
                                                                                            81
                                                                                          ], 81, /* Left */0);
                                                                              }));
                                                                        Wonder_jest.test("test move right and down, then keyup right", (function (param) {
                                                                                return _judgeChangeDirectionArray(/* tuple */[
                                                                                            39,
                                                                                            69
                                                                                          ], 39, /* Down */3);
                                                                              }));
                                                                        Wonder_jest.test("test move up and front, then keyup front", (function (param) {
                                                                                return _judgeChangeDirectionArray(/* tuple */[
                                                                                            81,
                                                                                            87
                                                                                          ], 87, /* Up */2);
                                                                              }));
                                                                        Wonder_jest.test("test move down and back, then keyup down", (function (param) {
                                                                                return _judgeChangeDirectionArray(/* tuple */[
                                                                                            69,
                                                                                            83
                                                                                          ], 69, /* Back */5);
                                                                              }));
                                                                        return Wonder_jest.test("test move front and left, then keyup left", (function (param) {
                                                                                      return _judgeChangeDirectionArray(/* tuple */[
                                                                                                  87,
                                                                                                  65
                                                                                                ], 65, /* Front */4);
                                                                                    }));
                                                                      }));
                                                        }));
                                          }));
                            }));
                      Wonder_jest.describe("add event handleFunc to state", (function (param) {
                              var _prepareFlyCameraBindEvent = function (param) {
                                var state = _prepareMouseEvent(100);
                                var match = FlyCameraControllerTool$Wonderjs.createGameObject(state);
                                var cameraController = match[3][0];
                                var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(match[0]);
                                var preventDefaultFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                return /* tuple */[
                                        cameraController,
                                        preventDefaultFunc,
                                        FlyCameraControllerAPI$Wonderjs.bindFlyCameraControllerEvent(cameraController, state$1)
                                      ];
                              };
                              Wonder_jest.test("test unbind point drag start event", (function (param) {
                                      var match = _prepareFlyCameraBindEvent(/* () */0);
                                      var match$1 = MouseEventTool$Wonderjs.prepareForPointerLock(sandbox, match[2]);
                                      var state = FlyCameraControllerAPI$Wonderjs.unbindFlyCameraControllerEvent(match[0], match$1[0]);
                                      var state$1 = MainStateTool$Wonderjs.setState(state);
                                      EventTool$Wonderjs.triggerDomEvent("mousedown", EventTool$Wonderjs.getPointEventBindedDom(state$1), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, match[1], undefined, /* () */0));
                                      EventTool$Wonderjs.restore(state$1);
                                      return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](match$1[1])));
                                    }));
                              Wonder_jest.test("test unbind point scale event", (function (param) {
                                      var match = _prepareFlyCameraBindEvent(/* () */0);
                                      var preventDefaultFunc = match[1];
                                      var state = FlyCameraControllerAPI$Wonderjs.unbindFlyCameraControllerPointScaleEvent(match[0], match[2]);
                                      var state$1 = MainStateTool$Wonderjs.setState(state);
                                      EventTool$Wonderjs.triggerDomEvent("mousewheel", EventTool$Wonderjs.getPointEventBindedDom(state$1), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, preventDefaultFunc, undefined, /* () */0));
                                      EventTool$Wonderjs.restore(state$1);
                                      return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](preventDefaultFunc)));
                                    }));
                              return Wonder_jest.test("test unbind keydown event", (function (param) {
                                            var match = _prepareKeyEvent(/* () */0);
                                            var match$1 = match[3];
                                            var cameraController = match[1];
                                            var state = FlyCameraControllerAPI$Wonderjs.unbindFlyCameraControllerEvent(cameraController, match[0]);
                                            var state$1 = MainStateTool$Wonderjs.setState(state);
                                            EventTool$Wonderjs.triggerDomEvent("keydown", EventTool$Wonderjs.getKeyboardEventBindedDom(state$1), KeyboardEventTool$Wonderjs.buildKeyboardEvent(undefined, undefined, undefined, undefined, 65, /* () */0));
                                            var state$2 = EventTool$Wonderjs.restore(state$1);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FlyCameraControllerTool$Wonderjs.unsafeGetTranslationDiff(cameraController, state$2)), /* tuple */[
                                                        match$1[0],
                                                        match$1[1],
                                                        match$1[2]
                                                      ]);
                                          }));
                            }));
                      return Wonder_jest.describe("test bind two flyCameraControllers' event", (function (param) {
                                    return Wonder_jest.test("test bind point scale event", (function (param) {
                                                  var state = _prepareMouseEvent(100);
                                                  var match = FlyCameraControllerTool$Wonderjs.createGameObject(state);
                                                  var match$1 = FlyCameraControllerTool$Wonderjs.createGameObject(match[0]);
                                                  var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(match$1[0]);
                                                  var state$2 = FlyCameraControllerAPI$Wonderjs.bindFlyCameraControllerEvent(match[3][0], state$1);
                                                  var state$3 = FlyCameraControllerAPI$Wonderjs.bindFlyCameraControllerEvent(match$1[3][0], state$2);
                                                  var preventDefaultFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                  var state$4 = MainStateTool$Wonderjs.setState(state$3);
                                                  EventTool$Wonderjs.triggerDomEvent("mousewheel", EventTool$Wonderjs.getPointEventBindedDom(state$4), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, preventDefaultFunc, undefined, /* () */0));
                                                  EventTool$Wonderjs.restore(state$4);
                                                  return Sinon.toCalledTwice(Wonder_jest.Expect[/* expect */0](preventDefaultFunc));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
