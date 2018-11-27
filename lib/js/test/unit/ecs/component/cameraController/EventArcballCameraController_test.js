'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var ViewTool$Wonderjs = require("../../../../tool/service/device/ViewTool.js");
var EventTool$Wonderjs = require("../../../job/no_worker/tool/EventTool.js");
var TransformAPI$Wonderjs = require("../../../../../src/api/TransformAPI.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var GameObjectTool$Wonderjs = require("../../../../tool/service/gameObject/GameObjectTool.js");
var MouseEventTool$Wonderjs = require("../../../job/no_worker/tool/MouseEventTool.js");
var TouchEventTool$Wonderjs = require("../../../job/no_worker/tool/TouchEventTool.js");
var NoWorkerJobTool$Wonderjs = require("../../../../tool/service/job/no_worker/NoWorkerJobTool.js");
var KeyboardEventTool$Wonderjs = require("../../../job/no_worker/tool/KeyboardEventTool.js");
var ArcballCameraControllerAPI$Wonderjs = require("../../../../../src/api/camera_controller/ArcballCameraControllerAPI.js");
var ArcballCameraControllerTool$Wonderjs = require("../../../../tool/service/camera_controller/ArcballCameraControllerTool.js");
var EventArcballCameraControllerTool$Wonderjs = require("../../../../tool/service/camera_controller/EventArcballCameraControllerTool.js");

describe("test arcball cameraController event", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("bind arcballCameraController's event", (function () {
                describe("test bind one arcballCameraController's event", (function () {
                        describe("bind event", (function () {
                                describe("support pointer lock", (function () {
                                        describe("bind point down event", (function () {
                                                Wonder_jest.test("if is mouse event, request canvas pointerLock", (function () {
                                                        var state = EventArcballCameraControllerTool$Wonderjs.prepareMouseEvent(sandbox);
                                                        var match = MouseEventTool$Wonderjs.prepareForPointerLock(sandbox, state);
                                                        var match$1 = ArcballCameraControllerTool$Wonderjs.createGameObject(match[0]);
                                                        var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(match$1[0]);
                                                        var state$2 = ArcballCameraControllerAPI$Wonderjs.bindArcballCameraControllerEvent(match$1[3][0], state$1);
                                                        var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                                        EventTool$Wonderjs.triggerDomEvent("mousedown", EventTool$Wonderjs.getPointEventBindedDom(state$3), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                        EventTool$Wonderjs.restore(state$3);
                                                        return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](match[1]));
                                                      }));
                                                return Wonder_jest.test("else if is touch event, not request canvas pointerLock", (function () {
                                                              var state = EventArcballCameraControllerTool$Wonderjs.prepareTouchEvent(sandbox);
                                                              var match = MouseEventTool$Wonderjs.prepareForPointerLock(sandbox, state);
                                                              var match$1 = ArcballCameraControllerTool$Wonderjs.createGameObject(match[0]);
                                                              var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(match$1[0]);
                                                              var state$2 = ArcballCameraControllerAPI$Wonderjs.bindArcballCameraControllerEvent(match$1[3][0], state$1);
                                                              var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                                              EventTool$Wonderjs.triggerDomEvent("touchstart", EventTool$Wonderjs.getPointEventBindedDom(state$3), TouchEventTool$Wonderjs.buildTouchEvent(undefined, undefined, undefined, /* () */0));
                                                              EventTool$Wonderjs.restore(state$3);
                                                              return Sinon.toCalled(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](match[1])));
                                                            }));
                                              }));
                                        describe("bind point up event", (function () {
                                                var _prepareForPointerLock = function (sandbox, pointerLockElement, state) {
                                                  var $$document$1 = document;
                                                  $$document$1.pointerLockElement = pointerLockElement;
                                                  var exitPointerLockStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                  $$document$1.exitPointerLock = exitPointerLockStub;
                                                  return /* tuple */[
                                                          state,
                                                          exitPointerLockStub
                                                        ];
                                                };
                                                describe("if is mouse event", (function () {
                                                        Wonder_jest.test("if document.pointerLockElement === canvas, exitPointerLock", (function () {
                                                                var state = EventArcballCameraControllerTool$Wonderjs.prepareMouseEvent(sandbox);
                                                                var canvas = ViewTool$Wonderjs.unsafeGetCanvas(state);
                                                                var match = _prepareForPointerLock(sandbox, canvas, state);
                                                                var match$1 = ArcballCameraControllerTool$Wonderjs.createGameObject(match[0]);
                                                                var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(match$1[0]);
                                                                var state$2 = ArcballCameraControllerAPI$Wonderjs.bindArcballCameraControllerEvent(match$1[3][0], state$1);
                                                                var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                                                EventTool$Wonderjs.triggerDomEvent("mouseup", EventTool$Wonderjs.getPointEventBindedDom(state$3), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                                EventTool$Wonderjs.restore(state$3);
                                                                return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](match[1]));
                                                              }));
                                                        return Wonder_jest.test("else, not exitPointerLock", (function () {
                                                                      var state = EventArcballCameraControllerTool$Wonderjs.prepareMouseEvent(sandbox);
                                                                      var match = _prepareForPointerLock(sandbox, 1, state);
                                                                      var match$1 = ArcballCameraControllerTool$Wonderjs.createGameObject(match[0]);
                                                                      var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(match$1[0]);
                                                                      var state$2 = ArcballCameraControllerAPI$Wonderjs.bindArcballCameraControllerEvent(match$1[3][0], state$1);
                                                                      var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                                                      EventTool$Wonderjs.triggerDomEvent("mouseup", EventTool$Wonderjs.getPointEventBindedDom(state$3), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                                      EventTool$Wonderjs.restore(state$3);
                                                                      return Sinon.toCalled(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](match[1])));
                                                                    }));
                                                      }));
                                                describe("else if is touch event", (function () {
                                                        return Wonder_jest.test("not exitPointerLock", (function () {
                                                                      var state = EventArcballCameraControllerTool$Wonderjs.prepareTouchEvent(sandbox);
                                                                      var canvas = ViewTool$Wonderjs.unsafeGetCanvas(state);
                                                                      var match = _prepareForPointerLock(sandbox, canvas, state);
                                                                      var match$1 = ArcballCameraControllerTool$Wonderjs.createGameObject(match[0]);
                                                                      var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(match$1[0]);
                                                                      var state$2 = MainStateTool$Wonderjs.setState(state$1);
                                                                      EventTool$Wonderjs.triggerDomEvent("touchstart", EventTool$Wonderjs.getPointEventBindedDom(state$2), TouchEventTool$Wonderjs.buildTouchEvent(undefined, undefined, undefined, /* () */0));
                                                                      EventTool$Wonderjs.restore(state$2);
                                                                      return Sinon.toCalled(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](match[1])));
                                                                    }));
                                                      }));
                                                return /* () */0;
                                              }));
                                        return /* () */0;
                                      }));
                                describe("bind point drag event", (function () {
                                        describe("change orbit", (function () {
                                                return Wonder_jest.test("set phi and theta", (function () {
                                                              var state = EventArcballCameraControllerTool$Wonderjs.prepareMouseEvent(sandbox);
                                                              var match = MouseEventTool$Wonderjs.prepareForPointerLock(sandbox, state);
                                                              var match$1 = ArcballCameraControllerTool$Wonderjs.createGameObject(match[0]);
                                                              var cameraController = match$1[3][0];
                                                              var state$1 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerTheta(cameraController, 0.5, ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerPhi(cameraController, 1, ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerRotateSpeed(cameraController, 2.5, match$1[0])));
                                                              var state$2 = NoWorkerJobTool$Wonderjs.execInitJobs(state$1);
                                                              var state$3 = ArcballCameraControllerAPI$Wonderjs.bindArcballCameraControllerEvent(cameraController, state$2);
                                                              var state$4 = MainStateTool$Wonderjs.setState(state$3);
                                                              EventTool$Wonderjs.triggerDomEvent("mousedown", EventTool$Wonderjs.getPointEventBindedDom(state$4), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                              EventTool$Wonderjs.triggerDomEvent("mousemove", EventTool$Wonderjs.getPointEventBindedDom(state$4), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, 1, 2, undefined, undefined, undefined, undefined, /* () */0));
                                                              var state$5 = EventTool$Wonderjs.restore(state$4);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                              ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerPhi(cameraController, state$5),
                                                                              ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerTheta(cameraController, state$5)
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
                                                var state = EventArcballCameraControllerTool$Wonderjs.prepareMouseEvent(sandbox);
                                                var match = ArcballCameraControllerTool$Wonderjs.createGameObject(state);
                                                var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(match[0]);
                                                var state$2 = ArcballCameraControllerAPI$Wonderjs.bindArcballCameraControllerEvent(match[3][0], state$1);
                                                var preventDefaultFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                var stopPropagationFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                                EventTool$Wonderjs.triggerDomEvent("mousewheel", EventTool$Wonderjs.getPointEventBindedDom(state$3), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, preventDefaultFunc, stopPropagationFunc, /* () */0));
                                                EventTool$Wonderjs.restore(state$3);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                Sinon.getCallCount(preventDefaultFunc),
                                                                Sinon.getCallCount(stopPropagationFunc)
                                                              ]), /* tuple */[
                                                            1,
                                                            1
                                                          ]);
                                              }));
                                        return Wonder_jest.test("set distance", (function () {
                                                      var state = EventArcballCameraControllerTool$Wonderjs.prepareMouseEvent(sandbox);
                                                      var match = ArcballCameraControllerTool$Wonderjs.createGameObject(state);
                                                      var cameraController = match[3][0];
                                                      var state$1 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerWheelSpeed(cameraController, 2.5, match[0]);
                                                      var state$2 = NoWorkerJobTool$Wonderjs.execInitJobs(state$1);
                                                      var state$3 = ArcballCameraControllerAPI$Wonderjs.bindArcballCameraControllerEvent(cameraController, state$2);
                                                      var originDistance = ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerDistance(cameraController, state$3);
                                                      var state$4 = MainStateTool$Wonderjs.setState(state$3);
                                                      EventTool$Wonderjs.triggerDomEvent("mousewheel", EventTool$Wonderjs.getPointEventBindedDom(state$4), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, -3, undefined, undefined, undefined, /* () */0));
                                                      var state$5 = EventTool$Wonderjs.restore(state$4);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerDistance(cameraController, state$5)), originDistance - 2.5 * 3);
                                                    }));
                                      }));
                                describe("bind keydown event", (function () {
                                        describe("set target", (function () {
                                                var _prepareMouseEvent = function () {
                                                  var state = EventArcballCameraControllerTool$Wonderjs.prepareMouseEvent(sandbox);
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
                                                Wonder_jest.test("test move left", (function () {
                                                        var match = _prepareMouseEvent(/* () */0);
                                                        var match$1 = match[3];
                                                        var state = MainStateTool$Wonderjs.setState(match[0]);
                                                        EventTool$Wonderjs.triggerDomEvent("keydown", EventTool$Wonderjs.getKeyboardEventBindedDom(state), KeyboardEventTool$Wonderjs.buildKeyboardEvent(undefined, undefined, undefined, undefined, 65, /* () */0));
                                                        var state$1 = EventTool$Wonderjs.restore(state);
                                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerTarget(match[1], state$1)), /* tuple */[
                                                                    match$1[0] - match[2][0],
                                                                    match$1[1],
                                                                    match$1[2]
                                                                  ]);
                                                      }));
                                                Wonder_jest.test("test move right", (function () {
                                                        var match = _prepareMouseEvent(/* () */0);
                                                        var match$1 = match[3];
                                                        var state = MainStateTool$Wonderjs.setState(match[0]);
                                                        EventTool$Wonderjs.triggerDomEvent("keydown", EventTool$Wonderjs.getKeyboardEventBindedDom(state), KeyboardEventTool$Wonderjs.buildKeyboardEvent(undefined, undefined, undefined, undefined, 39, /* () */0));
                                                        var state$1 = EventTool$Wonderjs.restore(state);
                                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerTarget(match[1], state$1)), /* tuple */[
                                                                    match$1[0] + match[2][0],
                                                                    match$1[1],
                                                                    match$1[2]
                                                                  ]);
                                                      }));
                                                Wonder_jest.test("test move up", (function () {
                                                        var match = _prepareMouseEvent(/* () */0);
                                                        var match$1 = match[3];
                                                        var state = MainStateTool$Wonderjs.setState(match[0]);
                                                        EventTool$Wonderjs.triggerDomEvent("keydown", EventTool$Wonderjs.getKeyboardEventBindedDom(state), KeyboardEventTool$Wonderjs.buildKeyboardEvent(undefined, undefined, undefined, undefined, 87, /* () */0));
                                                        var state$1 = EventTool$Wonderjs.restore(state);
                                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerTarget(match[1], state$1)), /* tuple */[
                                                                    match$1[0],
                                                                    match$1[1] + match[2][1],
                                                                    match$1[2]
                                                                  ]);
                                                      }));
                                                return Wonder_jest.test("test move down", (function () {
                                                              var match = _prepareMouseEvent(/* () */0);
                                                              var match$1 = match[3];
                                                              var state = MainStateTool$Wonderjs.setState(match[0]);
                                                              EventTool$Wonderjs.triggerDomEvent("keydown", EventTool$Wonderjs.getKeyboardEventBindedDom(state), KeyboardEventTool$Wonderjs.buildKeyboardEvent(undefined, undefined, undefined, undefined, 83, /* () */0));
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
                                              var state = EventArcballCameraControllerTool$Wonderjs.prepareMouseEvent(sandbox);
                                              var match = ArcballCameraControllerTool$Wonderjs.createGameObject(state);
                                              var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(match[0]);
                                              var preventDefaultFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var state$2 = GameObjectTool$Wonderjs.disposeGameObjectArcballCameraControllerComponent(match[1], match[3][0], state$1);
                                              var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                              EventTool$Wonderjs.triggerDomEvent("mousewheel", EventTool$Wonderjs.getPointEventBindedDom(state$3), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, preventDefaultFunc, undefined, /* () */0));
                                              EventTool$Wonderjs.restore(state$3);
                                              return Sinon.toCalled(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](preventDefaultFunc)));
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test bind two arcballCameraControllers' event", (function () {
                        return Wonder_jest.test("test bind keydown event", (function () {
                                      var state = EventArcballCameraControllerTool$Wonderjs.prepareMouseEvent(sandbox);
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
                return /* () */0;
              }));
        return /* () */0;
      }));

/*  Not a pure module */
