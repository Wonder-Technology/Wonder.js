'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var EventTool$Wonderjs = require("../../../job/no_worker/tool/EventTool.js");
var DisposeJob$Wonderjs = require("../../../../../src/job/no_worker/loop/DisposeJob.js");
var GameObjectAPI$Wonderjs = require("../../../../../src/api/GameObjectAPI.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var GameObjectTool$Wonderjs = require("../../../../tool/service/gameObject/GameObjectTool.js");
var ManageEventAPI$Wonderjs = require("../../../../../src/api/event/ManageEventAPI.js");
var MouseEventTool$Wonderjs = require("../../../job/no_worker/tool/MouseEventTool.js");
var NoWorkerJobTool$Wonderjs = require("../../../../tool/service/job/no_worker/NoWorkerJobTool.js");
var NameEventService$Wonderjs = require("../../../../../src/service/record/main/event/NameEventService.js");
var SparseMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/SparseMapService.js");
var ArcballCameraControllerAPI$Wonderjs = require("../../../../../src/api/camera_controller/ArcballCameraControllerAPI.js");
var ArcballCameraControllerTool$Wonderjs = require("../../../../tool/service/camera_controller/ArcballCameraControllerTool.js");
var EventArcballCameraControllerTool$Wonderjs = require("../../../../tool/service/camera_controller/EventArcballCameraControllerTool.js");

describe("ArcballCameraController", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.init(sandbox, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("createArcballCameraController", (function () {
                Wonder_jest.test("create a new camera which is just index(int)", (function () {
                        var match = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(state[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[1]), 0);
                      }));
                describe("change state", (function () {
                        return Wonder_jest.test("state->index + 1", (function () {
                                      var match = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(state[0]);
                                      var record = match[0][/* arcballCameraControllerRecord */24];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](record[/* index */0]), 1);
                                    }));
                      }));
                return Wonder_jest.test("add to dirty array", (function () {
                              var match = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(state[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerTool$Wonderjs.getDirtyArray(match[0])), /* array */[match[1]]);
                            }));
              }));
        describe("unsafeGetArcballCameraControllerGameObject", (function () {
                return Wonder_jest.test("get cameraController's gameObject", (function () {
                              var match = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(state[0]);
                              var cameraController = match[1];
                              var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                              var gameObject = match$1[1];
                              var state$1 = GameObjectAPI$Wonderjs.addGameObjectArcballCameraControllerComponent(gameObject, cameraController, match$1[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerGameObject(cameraController, state$1)), gameObject);
                            }));
              }));
        describe("bind/unbind arcballCameraController event", (function () {
                var _prepareMouseEvent = function (sandbox) {
                  var state = EventArcballCameraControllerTool$Wonderjs.prepareMouseEvent(sandbox);
                  var match = ArcballCameraControllerTool$Wonderjs.createGameObject(state);
                  var cameraController = match[3][0];
                  var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(match[0]);
                  var state$2 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerTheta(cameraController, 0.5, ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerPhi(cameraController, 1, ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerRotateSpeed(cameraController, 2.5, state$1)));
                  return /* tuple */[
                          state$2,
                          cameraController,
                          1,
                          0.5
                        ];
                };
                var _triggerEvent = function (state) {
                  var state$1 = MainStateTool$Wonderjs.setState(state);
                  EventTool$Wonderjs.triggerDomEvent("mousedown", EventTool$Wonderjs.getPointEventBindedDom(state$1), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                  EventTool$Wonderjs.triggerDomEvent("mousemove", EventTool$Wonderjs.getPointEventBindedDom(state$1), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, 1, 2, undefined, undefined, undefined, undefined, /* () */0));
                  return EventTool$Wonderjs.restore(state$1);
                };
                describe("if unbind event, arcballCameraController event shouldn't work", (function () {
                        return Wonder_jest.test("test point drag event", (function () {
                                      var match = _prepareMouseEvent(sandbox);
                                      var cameraController = match[1];
                                      var state = ArcballCameraControllerAPI$Wonderjs.unbindArcballCameraControllerEvent(cameraController, match[0]);
                                      var state$1 = _triggerEvent(state);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerPhi(cameraController, state$1),
                                                      ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerTheta(cameraController, state$1)
                                                    ]), /* tuple */[
                                                  match[2],
                                                  match[3]
                                                ]);
                                    }));
                      }));
                describe("if bind event after unbind event, arcballCameraController event should work", (function () {
                        return Wonder_jest.test("test point drag event", (function () {
                                      var match = _prepareMouseEvent(sandbox);
                                      var cameraController = match[1];
                                      var match$1 = MouseEventTool$Wonderjs.prepareForPointerLock(sandbox, match[0]);
                                      var state = ArcballCameraControllerAPI$Wonderjs.unbindArcballCameraControllerEvent(cameraController, match$1[0]);
                                      var state$1 = ArcballCameraControllerAPI$Wonderjs.bindArcballCameraControllerEvent(cameraController, state);
                                      var state$2 = _triggerEvent(state$1);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* <> */6], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerPhi(cameraController, state$2),
                                                      ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerTheta(cameraController, state$2)
                                                    ]), /* tuple */[
                                                  match[2],
                                                  match[3]
                                                ]);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("dispose component", (function () {
                var _prepareTwo = function (state) {
                  var match = ArcballCameraControllerTool$Wonderjs.createGameObject(state[0]);
                  var match$1 = ArcballCameraControllerTool$Wonderjs.createGameObject(match[0]);
                  return /* tuple */[
                          match$1[0],
                          match[1],
                          match[3][0],
                          match$1[1],
                          match$1[3][0]
                        ];
                };
                describe("dispose data", (function () {
                        Wonder_jest.test("dirtyArray: remove from array(include duplicated ones)", (function () {
                                var match = ArcballCameraControllerTool$Wonderjs.createGameObject(state[0]);
                                var cameraController1 = match[3][0];
                                var state$1 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerPhi(cameraController1, 0.1, ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerDistance(cameraController1, 11, match[0]));
                                var state$2 = GameObjectTool$Wonderjs.disposeGameObjectArcballCameraControllerComponent(match[1], cameraController1, state$1);
                                var match$1 = state$2[/* arcballCameraControllerRecord */24];
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match$1[/* dirtyArray */6]), /* array */[]);
                              }));
                        Wonder_jest.test("remove from distanceMap, minDistanceMap, phiMap, thetaMap, thetaMarginMap, targetMap, moveSpeedXMap, moveSpeedYMap, rotateSpeedMap, wheelSpeedMap, gameObjectMap", (function () {
                                var match = _prepareTwo(state);
                                var cameraController1 = match[2];
                                var state$1 = GameObjectTool$Wonderjs.disposeGameObjectArcballCameraControllerComponent(match[1], cameraController1, match[0]);
                                var match$1 = state$1[/* arcballCameraControllerRecord */24];
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                SparseMapService$WonderCommonlib.has(cameraController1, match$1[/* distanceMap */7]),
                                                SparseMapService$WonderCommonlib.has(cameraController1, match$1[/* minDistanceMap */8]),
                                                SparseMapService$WonderCommonlib.has(cameraController1, match$1[/* phiMap */9]),
                                                SparseMapService$WonderCommonlib.has(cameraController1, match$1[/* thetaMap */10]),
                                                SparseMapService$WonderCommonlib.has(cameraController1, match$1[/* thetaMarginMap */11]),
                                                SparseMapService$WonderCommonlib.has(cameraController1, match$1[/* targetMap */12]),
                                                SparseMapService$WonderCommonlib.has(cameraController1, match$1[/* moveSpeedXMap */13]),
                                                SparseMapService$WonderCommonlib.has(cameraController1, match$1[/* moveSpeedYMap */14]),
                                                SparseMapService$WonderCommonlib.has(cameraController1, match$1[/* rotateSpeedMap */15]),
                                                SparseMapService$WonderCommonlib.has(cameraController1, match$1[/* wheelSpeedMap */16]),
                                                SparseMapService$WonderCommonlib.has(cameraController1, match$1[/* gameObjectMap */17])
                                              ]), /* tuple */[
                                            false,
                                            false,
                                            false,
                                            false,
                                            false,
                                            false,
                                            false,
                                            false,
                                            false,
                                            false,
                                            false
                                          ]);
                              }));
                        describe("remove from eventHandleFunc map", (function () {
                                Wonder_jest.test("unbind event", (function () {
                                        var state = MouseEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                        var match = ArcballCameraControllerTool$Wonderjs.createGameObject(state);
                                        var cameraController1 = match[3][0];
                                        var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(match[0]);
                                        var value = /* record */[/* contents */0];
                                        var pointDownHandleFunc = function ($$event, state) {
                                          value[0] = value[0] + 20 | 0;
                                          return /* tuple */[
                                                  state,
                                                  $$event
                                                ];
                                        };
                                        var pointUpHandleFunc = function ($$event, state) {
                                          value[0] = value[0] + 21 | 0;
                                          return /* tuple */[
                                                  state,
                                                  $$event
                                                ];
                                        };
                                        var pointDragHandleFunc = function ($$event, state) {
                                          value[0] = value[0] + 1 | 0;
                                          return /* tuple */[
                                                  state,
                                                  $$event
                                                ];
                                        };
                                        var pointScaleHandleFunc = function ($$event, state) {
                                          value[0] = value[0] + 2 | 0;
                                          return /* tuple */[
                                                  state,
                                                  $$event
                                                ];
                                        };
                                        var keydownHandleFunc = function (_, state) {
                                          value[0] = value[0] + 3 | 0;
                                          return state;
                                        };
                                        var state$2 = ManageEventAPI$Wonderjs.onKeyboardEvent(/* KeyDown */8, 0, keydownHandleFunc, ManageEventAPI$Wonderjs.onCustomGlobalEvent(NameEventService$Wonderjs.getPointScaleEventName(/* () */0), 0, pointScaleHandleFunc, ManageEventAPI$Wonderjs.onCustomGlobalEvent(NameEventService$Wonderjs.getPointDragEventName(/* () */0), 0, pointDragHandleFunc, ManageEventAPI$Wonderjs.onCustomGlobalEvent(NameEventService$Wonderjs.getPointUpEventName(/* () */0), 0, pointUpHandleFunc, ManageEventAPI$Wonderjs.onCustomGlobalEvent(NameEventService$Wonderjs.getPointDownEventName(/* () */0), 0, pointDownHandleFunc, state$1)))));
                                        var state$3 = ArcballCameraControllerTool$Wonderjs.setKeydownEventHandleFunc(cameraController1, keydownHandleFunc, ArcballCameraControllerTool$Wonderjs.setPointScaleEventHandleFunc(cameraController1, pointScaleHandleFunc, ArcballCameraControllerTool$Wonderjs.setPointDragEventHandleFunc(cameraController1, pointDragHandleFunc, ArcballCameraControllerTool$Wonderjs.setPointUpEventHandleFunc(cameraController1, pointUpHandleFunc, ArcballCameraControllerTool$Wonderjs.setPointDownEventHandleFunc(cameraController1, pointDownHandleFunc, state$2)))));
                                        var state$4 = GameObjectTool$Wonderjs.disposeGameObjectArcballCameraControllerComponent(match[1], cameraController1, state$3);
                                        var state$5 = MainStateTool$Wonderjs.setState(state$4);
                                        EventTool$Wonderjs.triggerDomEvent("mousewheel", EventTool$Wonderjs.getPointEventBindedDom(state$5), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                        EventTool$Wonderjs.triggerDomEvent("mousedown", EventTool$Wonderjs.getPointEventBindedDom(state$5), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                        EventTool$Wonderjs.triggerDomEvent("mousemove", EventTool$Wonderjs.getPointEventBindedDom(state$5), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                        EventTool$Wonderjs.triggerDomEvent("mouseup", EventTool$Wonderjs.getPointEventBindedDom(state$5), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                        EventTool$Wonderjs.triggerDomEvent("keydown", EventTool$Wonderjs.getPointEventBindedDom(state$5), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                        EventTool$Wonderjs.restore(state$5);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 0);
                                      }));
                                return Wonder_jest.test("remove from map", (function () {
                                              var match = ArcballCameraControllerTool$Wonderjs.createGameObject(state[0]);
                                              var cameraController1 = match[3][0];
                                              var value = /* record */[/* contents */0];
                                              var pointDownHandleFunc = function ($$event, state) {
                                                value[0] = value[0] + 1 | 0;
                                                return /* tuple */[
                                                        state,
                                                        $$event
                                                      ];
                                              };
                                              var pointUpHandleFunc = function ($$event, state) {
                                                value[0] = value[0] + 1 | 0;
                                                return /* tuple */[
                                                        state,
                                                        $$event
                                                      ];
                                              };
                                              var pointDragHandleFunc = function ($$event, state) {
                                                value[0] = value[0] + 1 | 0;
                                                return /* tuple */[
                                                        state,
                                                        $$event
                                                      ];
                                              };
                                              var pointScaleHandleFunc = function ($$event, state) {
                                                value[0] = value[0] + 2 | 0;
                                                return /* tuple */[
                                                        state,
                                                        $$event
                                                      ];
                                              };
                                              var keydownHandleFunc = function (_, state) {
                                                value[0] = value[0] + 3 | 0;
                                                return state;
                                              };
                                              var state$1 = ArcballCameraControllerTool$Wonderjs.setKeydownEventHandleFunc(cameraController1, keydownHandleFunc, ArcballCameraControllerTool$Wonderjs.setPointScaleEventHandleFunc(cameraController1, pointScaleHandleFunc, ArcballCameraControllerTool$Wonderjs.setPointDragEventHandleFunc(cameraController1, pointDragHandleFunc, ArcballCameraControllerTool$Wonderjs.setPointUpEventHandleFunc(cameraController1, pointUpHandleFunc, ArcballCameraControllerTool$Wonderjs.setPointDownEventHandleFunc(cameraController1, pointDownHandleFunc, match[0])))));
                                              var state$2 = GameObjectTool$Wonderjs.disposeGameObjectArcballCameraControllerComponent(match[1], cameraController1, state$1);
                                              var match$1 = state$2[/* arcballCameraControllerRecord */24];
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              SparseMapService$WonderCommonlib.has(cameraController1, match$1[/* pointDownEventHandleFuncMap */1]),
                                                              SparseMapService$WonderCommonlib.has(cameraController1, match$1[/* pointUpEventHandleFuncMap */2]),
                                                              SparseMapService$WonderCommonlib.has(cameraController1, match$1[/* pointDragEventHandleFuncMap */3]),
                                                              SparseMapService$WonderCommonlib.has(cameraController1, match$1[/* pointScaleEventHandleFuncMap */4]),
                                                              SparseMapService$WonderCommonlib.has(cameraController1, match$1[/* keydownEventHandleFuncMap */5])
                                                            ]), /* tuple */[
                                                          false,
                                                          false,
                                                          false,
                                                          false,
                                                          false
                                                        ]);
                                            }));
                              }));
                        describe("fix bug", (function () {
                                return Wonder_jest.test("dispose component;\n  loopBody;\n  loopBody;\n\ncomponent should be removed from gameObject\n  ", (function () {
                                              var match = ArcballCameraControllerTool$Wonderjs.createGameObject(state[0]);
                                              var gameObject1 = match[1];
                                              var state$1 = GameObjectAPI$Wonderjs.disposeGameObjectArcballCameraControllerComponent(gameObject1, match[3][0], match[0]);
                                              var state$2 = DisposeJob$Wonderjs.execJob(undefined, state$1);
                                              var state$3 = DisposeJob$Wonderjs.execJob(undefined, state$2);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.hasGameObjectArcballCameraControllerComponent(gameObject1, state$3)), false);
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("unsafeGetDistance", (function () {
                return Wonder_jest.test("test", (function () {
                              var match = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(state[0]);
                              var cameraController = match[1];
                              var state$1 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerDistance(cameraController, 65, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerDistance(cameraController, state$1)), 65);
                            }));
              }));
        describe("unsafeGetDistance", (function () {
                Wonder_jest.test("test", (function () {
                        var match = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(state[0]);
                        var cameraController = match[1];
                        var state$1 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerDistance(cameraController, 65, match[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerDistance(cameraController, state$1)), 65);
                      }));
                return Wonder_jest.test("constrain distance", (function () {
                              var match = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(state[0]);
                              var cameraController = match[1];
                              var state$1 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerMinDistance(cameraController, 2, match[0]);
                              var state$2 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerDistance(cameraController, 1, state$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerDistance(cameraController, state$2)), 2);
                            }));
              }));
        describe("unsafeGetMinDistance", (function () {
                return Wonder_jest.test("test", (function () {
                              var match = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(state[0]);
                              var cameraController = match[1];
                              var state$1 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerMinDistance(cameraController, 65, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerMinDistance(cameraController, state$1)), 65);
                            }));
              }));
        describe("unsafeGetWheelSpeed", (function () {
                return Wonder_jest.test("test", (function () {
                              var match = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(state[0]);
                              var cameraController = match[1];
                              var state$1 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerWheelSpeed(cameraController, 65, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerWheelSpeed(cameraController, state$1)), 65);
                            }));
              }));
        describe("unsafeGetRotateSpeed", (function () {
                return Wonder_jest.test("test", (function () {
                              var match = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(state[0]);
                              var cameraController = match[1];
                              var state$1 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerRotateSpeed(cameraController, 65, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerRotateSpeed(cameraController, state$1)), 65);
                            }));
              }));
        describe("unsafeGetPhi", (function () {
                return Wonder_jest.test("test", (function () {
                              var match = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(state[0]);
                              var cameraController = match[1];
                              var state$1 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerPhi(cameraController, 65, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerPhi(cameraController, state$1)), 65);
                            }));
              }));
        describe("unsafeGetTheta", (function () {
                Wonder_jest.test("test", (function () {
                        var match = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(state[0]);
                        var cameraController = match[1];
                        var state$1 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerTheta(cameraController, 0.5, match[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerTheta(cameraController, state$1)), 0.5);
                      }));
                return Wonder_jest.test("constrain theta", (function () {
                              var match = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(state[0]);
                              var cameraController = match[1];
                              var state$1 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerTheta(cameraController, 3.2, ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerThetaMargin(cameraController, 1, match[0]));
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerTheta(cameraController, state$1)), Math.PI - 1);
                            }));
              }));
        describe("unsafeGetThetaMargin", (function () {
                Wonder_jest.test("test", (function () {
                        var match = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(state[0]);
                        var cameraController = match[1];
                        var state$1 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerThetaMargin(cameraController, 1, match[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerThetaMargin(cameraController, state$1)), 1);
                      }));
                return Wonder_jest.test("constrain theta", (function () {
                              var match = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(state[0]);
                              var cameraController = match[1];
                              var state$1 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerThetaMargin(cameraController, 1, ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerTheta(cameraController, 3.2, match[0]));
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerTheta(cameraController, state$1)), Math.PI - 1);
                            }));
              }));
        describe("unsafeGetTarget", (function () {
                return Wonder_jest.test("test", (function () {
                              var match = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(state[0]);
                              var cameraController = match[1];
                              var target = /* tuple */[
                                1,
                                2,
                                5
                              ];
                              var state$1 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerTarget(cameraController, target, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerTarget(cameraController, state$1)), target);
                            }));
              }));
        describe("unsafeGetMoveSpeedX", (function () {
                return Wonder_jest.test("test", (function () {
                              var match = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(state[0]);
                              var cameraController = match[1];
                              var state$1 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerMoveSpeedX(cameraController, 65, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerMoveSpeedX(cameraController, state$1)), 65);
                            }));
              }));
        describe("unsafeGetMoveSpeedY", (function () {
                return Wonder_jest.test("test", (function () {
                              var match = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(state[0]);
                              var cameraController = match[1];
                              var state$1 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerMoveSpeedY(cameraController, 65, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerMoveSpeedY(cameraController, state$1)), 65);
                            }));
              }));
        return /* () */0;
      }));

/*  Not a pure module */
