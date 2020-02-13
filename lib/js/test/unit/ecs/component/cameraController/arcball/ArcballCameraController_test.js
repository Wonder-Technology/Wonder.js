'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../../../tool/TestTool.js");
var EventTool$Wonderjs = require("../../../../job/no_worker/tool/EventTool.js");
var DisposeJob$Wonderjs = require("../../../../../../src/job/no_worker/loop/DisposeJob.js");
var GameObjectAPI$Wonderjs = require("../../../../../../src/api/GameObjectAPI.js");
var MainStateTool$Wonderjs = require("../../../../../tool/service/state/MainStateTool.js");
var GameObjectTool$Wonderjs = require("../../../../../tool/service/gameObject/GameObjectTool.js");
var MouseEventTool$Wonderjs = require("../../../../job/no_worker/tool/MouseEventTool.js");
var NoWorkerJobTool$Wonderjs = require("../../../../../tool/service/job/no_worker/NoWorkerJobTool.js");
var EventCameraControllerTool$Wonderjs = require("../../../../../tool/service/camera_controller/EventCameraControllerTool.js");
var ArcballCameraControllerAPI$Wonderjs = require("../../../../../../src/api/camera_controller/ArcballCameraControllerAPI.js");
var ArcballCameraControllerTool$Wonderjs = require("../../../../../tool/service/camera_controller/ArcballCameraControllerTool.js");
var MutableSparseMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/MutableSparseMapService.js");

Wonder_jest.describe("ArcballCameraController", (function (param) {
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
        Wonder_jest.describe("createArcballCameraController", (function (param) {
                Wonder_jest.test("create a new camera which is just index(int)", (function (param) {
                        var match = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(state[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match[1]), 0);
                      }));
                return Wonder_jest.describe("change state", (function (param) {
                              return Wonder_jest.test("state->index + 1", (function (param) {
                                            var match = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(state[0]);
                                            var record = match[0][/* arcballCameraControllerRecord */25];
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](record[/* index */0]), 1);
                                          }));
                            }));
              }));
        Wonder_jest.describe("unsafeGetArcballCameraControllerGameObject", (function (param) {
                return Wonder_jest.test("get cameraController's gameObject", (function (param) {
                              var match = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(state[0]);
                              var cameraController = match[1];
                              var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                              var gameObject = match$1[1];
                              var state$1 = GameObjectAPI$Wonderjs.addGameObjectArcballCameraControllerComponent(gameObject, cameraController, match$1[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerGameObject(cameraController, state$1)), gameObject);
                            }));
              }));
        Wonder_jest.describe("bind/unbind arcballCameraController event", (function (param) {
                var _prepareMouseEvent = function (sandbox) {
                  var state = EventCameraControllerTool$Wonderjs.prepareMouseEvent(sandbox);
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
                  EventTool$Wonderjs.triggerFirstMouseDragOverEvent(MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, 1, 2, undefined, undefined, undefined, undefined, /* () */0), state$1);
                  return EventTool$Wonderjs.restore(state$1);
                };
                Wonder_jest.describe("if unbind event, arcballCameraController event shouldn't work", (function (param) {
                        return Wonder_jest.test("test point drag event", (function (param) {
                                      var match = _prepareMouseEvent(sandbox);
                                      var cameraController = match[1];
                                      var state = ArcballCameraControllerAPI$Wonderjs.unbindArcballCameraControllerEvent(cameraController, match[0]);
                                      var state$1 = _triggerEvent(state);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerPhi(cameraController, state$1),
                                                      ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerTheta(cameraController, state$1)
                                                    ]), /* tuple */[
                                                  match[2],
                                                  match[3]
                                                ]);
                                    }));
                      }));
                return Wonder_jest.describe("if bind event after unbind event, arcballCameraController event should work", (function (param) {
                              return Wonder_jest.test("test point drag event", (function (param) {
                                            var match = _prepareMouseEvent(sandbox);
                                            var cameraController = match[1];
                                            var match$1 = MouseEventTool$Wonderjs.prepareForPointerLock(sandbox, match[0]);
                                            var state = ArcballCameraControllerAPI$Wonderjs.unbindArcballCameraControllerEvent(cameraController, match$1[0]);
                                            var state$1 = ArcballCameraControllerAPI$Wonderjs.bindArcballCameraControllerEvent(cameraController, state);
                                            var state$2 = _triggerEvent(state$1);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* <> */6], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerPhi(cameraController, state$2),
                                                            ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerTheta(cameraController, state$2)
                                                          ]), /* tuple */[
                                                        match[2],
                                                        match[3]
                                                      ]);
                                          }));
                            }));
              }));
        Wonder_jest.describe("dispose component", (function (param) {
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
                return Wonder_jest.describe("dispose data", (function (param) {
                              Wonder_jest.test("remove from distanceMap, minDistanceMap, phiMap, thetaMap, thetaMarginMap, targetMap, moveSpeedXMap, moveSpeedYMap, rotateSpeedMap, wheelSpeedMap, gameObjectMap, directionArrayMap", (function (param) {
                                      var match = _prepareTwo(state);
                                      var cameraController1 = match[2];
                                      var state$1 = GameObjectTool$Wonderjs.disposeGameObjectArcballCameraControllerComponent(match[1], cameraController1, match[0]);
                                      var match$1 = state$1[/* arcballCameraControllerRecord */25];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      MutableSparseMapService$WonderCommonlib.has(cameraController1, match$1[/* distanceMap */7]),
                                                      MutableSparseMapService$WonderCommonlib.has(cameraController1, match$1[/* minDistanceMap */8]),
                                                      MutableSparseMapService$WonderCommonlib.has(cameraController1, match$1[/* phiMap */9]),
                                                      MutableSparseMapService$WonderCommonlib.has(cameraController1, match$1[/* thetaMap */10]),
                                                      MutableSparseMapService$WonderCommonlib.has(cameraController1, match$1[/* thetaMarginMap */11]),
                                                      MutableSparseMapService$WonderCommonlib.has(cameraController1, match$1[/* targetMap */12]),
                                                      MutableSparseMapService$WonderCommonlib.has(cameraController1, match$1[/* moveSpeedXMap */13]),
                                                      MutableSparseMapService$WonderCommonlib.has(cameraController1, match$1[/* moveSpeedYMap */14]),
                                                      MutableSparseMapService$WonderCommonlib.has(cameraController1, match$1[/* rotateSpeedMap */15]),
                                                      MutableSparseMapService$WonderCommonlib.has(cameraController1, match$1[/* wheelSpeedMap */16]),
                                                      MutableSparseMapService$WonderCommonlib.has(cameraController1, match$1[/* gameObjectMap */18]),
                                                      MutableSparseMapService$WonderCommonlib.has(cameraController1, match$1[/* directionArrayMap */17])
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
                                                  false,
                                                  false
                                                ]);
                                    }));
                              Wonder_jest.describe("remove from eventHandleFunc map", (function (param) {
                                      return Wonder_jest.test("remove from map", (function (param) {
                                                    var match = ArcballCameraControllerTool$Wonderjs.createGameObject(state[0]);
                                                    var cameraController1 = match[3][0];
                                                    var value = /* record */[/* contents */0];
                                                    var pointDragStartHandleFunc = function ($$event, state) {
                                                      value[0] = value[0] + 1 | 0;
                                                      return /* tuple */[
                                                              state,
                                                              $$event
                                                            ];
                                                    };
                                                    var pointDragDropHandleFunc = function ($$event, state) {
                                                      value[0] = value[0] + 1 | 0;
                                                      return /* tuple */[
                                                              state,
                                                              $$event
                                                            ];
                                                    };
                                                    var pointDragOverHandleFunc = function ($$event, state) {
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
                                                    var keydownHandleFunc = function ($$event, state) {
                                                      value[0] = value[0] + 3 | 0;
                                                      return state;
                                                    };
                                                    var keyupHandleFunc = function ($$event, state) {
                                                      value[0] = value[0] + 3 | 0;
                                                      return state;
                                                    };
                                                    var state$1 = ArcballCameraControllerTool$Wonderjs.addKeyupEventHandleFunc(cameraController1, keyupHandleFunc, ArcballCameraControllerTool$Wonderjs.addKeydownEventHandleFunc(cameraController1, keydownHandleFunc, ArcballCameraControllerTool$Wonderjs.addPointScaleEventHandleFunc(cameraController1, pointScaleHandleFunc, ArcballCameraControllerTool$Wonderjs.addPointDragOverEventHandleFunc(cameraController1, pointDragOverHandleFunc, ArcballCameraControllerTool$Wonderjs.addPointDragDropEventHandleFunc(cameraController1, pointDragDropHandleFunc, ArcballCameraControllerTool$Wonderjs.addPointDragStartEventHandleFunc(cameraController1, pointDragStartHandleFunc, match[0]))))));
                                                    var state$2 = GameObjectTool$Wonderjs.disposeGameObjectArcballCameraControllerComponent(match[1], cameraController1, state$1);
                                                    var match$1 = state$2[/* arcballCameraControllerRecord */25];
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                    MutableSparseMapService$WonderCommonlib.has(cameraController1, match$1[/* pointDragStartEventHandleFuncListMap */1]),
                                                                    MutableSparseMapService$WonderCommonlib.has(cameraController1, match$1[/* pointDragDropEventHandleFuncListMap */2]),
                                                                    MutableSparseMapService$WonderCommonlib.has(cameraController1, match$1[/* pointDragOverEventHandleFuncListMap */3]),
                                                                    MutableSparseMapService$WonderCommonlib.has(cameraController1, match$1[/* pointScaleEventHandleFuncListMap */4]),
                                                                    MutableSparseMapService$WonderCommonlib.has(cameraController1, match$1[/* keydownEventHandleFuncListMap */5]),
                                                                    MutableSparseMapService$WonderCommonlib.has(cameraController1, match$1[/* keyupEventHandleFuncListMap */6])
                                                                  ]), /* tuple */[
                                                                false,
                                                                false,
                                                                false,
                                                                false,
                                                                false,
                                                                false
                                                              ]);
                                                  }));
                                    }));
                              return Wonder_jest.describe("fix bug", (function (param) {
                                            return Wonder_jest.test("dispose component;\n  loopBody;\n  loopBody;\n\ncomponent should be removed from gameObject\n  ", (function (param) {
                                                          var match = ArcballCameraControllerTool$Wonderjs.createGameObject(state[0]);
                                                          var gameObject1 = match[1];
                                                          var state$1 = GameObjectAPI$Wonderjs.disposeGameObjectArcballCameraControllerComponent(gameObject1, match[3][0], match[0]);
                                                          var state$2 = DisposeJob$Wonderjs.execJob(undefined, state$1);
                                                          var state$3 = DisposeJob$Wonderjs.execJob(undefined, state$2);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.hasGameObjectArcballCameraControllerComponent(gameObject1, state$3)), false);
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("unsafeGetDistance", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(state[0]);
                              var cameraController = match[1];
                              var state$1 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerDistance(cameraController, 65, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerDistance(cameraController, state$1)), 65);
                            }));
              }));
        Wonder_jest.describe("unsafeGetDistance", (function (param) {
                Wonder_jest.test("test", (function (param) {
                        var match = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(state[0]);
                        var cameraController = match[1];
                        var state$1 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerDistance(cameraController, 65, match[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerDistance(cameraController, state$1)), 65);
                      }));
                return Wonder_jest.test("constrain distance", (function (param) {
                              var match = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(state[0]);
                              var cameraController = match[1];
                              var state$1 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerMinDistance(cameraController, 2, match[0]);
                              var state$2 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerDistance(cameraController, 1, state$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerDistance(cameraController, state$2)), 2);
                            }));
              }));
        Wonder_jest.describe("unsafeGetMinDistance", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(state[0]);
                              var cameraController = match[1];
                              var state$1 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerMinDistance(cameraController, 65, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerMinDistance(cameraController, state$1)), 65);
                            }));
              }));
        Wonder_jest.describe("unsafeGetWheelSpeed", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(state[0]);
                              var cameraController = match[1];
                              var state$1 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerWheelSpeed(cameraController, 65, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerWheelSpeed(cameraController, state$1)), 65);
                            }));
              }));
        Wonder_jest.describe("unsafeGetRotateSpeed", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(state[0]);
                              var cameraController = match[1];
                              var state$1 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerRotateSpeed(cameraController, 65, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerRotateSpeed(cameraController, state$1)), 65);
                            }));
              }));
        Wonder_jest.describe("unsafeGetPhi", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(state[0]);
                              var cameraController = match[1];
                              var state$1 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerPhi(cameraController, 65, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerPhi(cameraController, state$1)), 65);
                            }));
              }));
        Wonder_jest.describe("unsafeGetTheta", (function (param) {
                Wonder_jest.test("test", (function (param) {
                        var match = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(state[0]);
                        var cameraController = match[1];
                        var state$1 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerTheta(cameraController, 0.5, match[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerTheta(cameraController, state$1)), 0.5);
                      }));
                return Wonder_jest.test("constrain theta", (function (param) {
                              var match = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(state[0]);
                              var cameraController = match[1];
                              var state$1 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerTheta(cameraController, 3.2, ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerThetaMargin(cameraController, 1, match[0]));
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerTheta(cameraController, state$1)), Math.PI - 1);
                            }));
              }));
        Wonder_jest.describe("unsafeGetThetaMargin", (function (param) {
                Wonder_jest.test("test", (function (param) {
                        var match = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(state[0]);
                        var cameraController = match[1];
                        var state$1 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerThetaMargin(cameraController, 1, match[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerThetaMargin(cameraController, state$1)), 1);
                      }));
                return Wonder_jest.test("constrain theta", (function (param) {
                              var match = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(state[0]);
                              var cameraController = match[1];
                              var state$1 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerThetaMargin(cameraController, 1, ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerTheta(cameraController, 3.2, match[0]));
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerTheta(cameraController, state$1)), Math.PI - 1);
                            }));
              }));
        Wonder_jest.describe("unsafeGetTarget", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(state[0]);
                              var cameraController = match[1];
                              var target = /* tuple */[
                                1,
                                2,
                                5
                              ];
                              var state$1 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerTarget(cameraController, target, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerTarget(cameraController, state$1)), target);
                            }));
              }));
        Wonder_jest.describe("unsafeGetDirectionArray", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(state[0]);
                              var cameraController = match[1];
                              var directionArray = /* array */[
                                /* Left */0,
                                /* Up */2
                              ];
                              var state$1 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerDirectionArray(cameraController, directionArray, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerDirectionArray(cameraController, state$1)), directionArray);
                            }));
              }));
        Wonder_jest.describe("unsafeGetMoveSpeedX", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(state[0]);
                              var cameraController = match[1];
                              var state$1 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerMoveSpeedX(cameraController, 65, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerMoveSpeedX(cameraController, state$1)), 65);
                            }));
              }));
        return Wonder_jest.describe("unsafeGetMoveSpeedY", (function (param) {
                      return Wonder_jest.test("test", (function (param) {
                                    var match = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController(state[0]);
                                    var cameraController = match[1];
                                    var state$1 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerMoveSpeedY(cameraController, 65, match[0]);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerMoveSpeedY(cameraController, state$1)), 65);
                                  }));
                    }));
      }));

/*  Not a pure module */
