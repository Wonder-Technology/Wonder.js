

import * as Curry from "./../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "./../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../../tool/TestTool.js";
import * as EventTool$Wonderjs from "../../../../job/no_worker/tool/EventTool.js";
import * as GameObjectAPI$Wonderjs from "../../../../../../src/api/GameObjectAPI.js";
import * as MainStateTool$Wonderjs from "../../../../../tool/service/state/MainStateTool.js";
import * as GameObjectTool$Wonderjs from "../../../../../tool/service/gameObject/GameObjectTool.js";
import * as MouseEventTool$Wonderjs from "../../../../job/no_worker/tool/MouseEventTool.js";
import * as NoWorkerJobTool$Wonderjs from "../../../../../tool/service/job/no_worker/NoWorkerJobTool.js";
import * as FlyCameraControllerAPI$Wonderjs from "../../../../../../src/api/camera_controller/FlyCameraControllerAPI.js";
import * as FlyCameraControllerTool$Wonderjs from "../../../../../tool/service/camera_controller/FlyCameraControllerTool.js";
import * as EventCameraControllerTool$Wonderjs from "../../../../../tool/service/camera_controller/EventCameraControllerTool.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

Wonder_jest.describe("FlyCameraController", (function (param) {
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
        Wonder_jest.describe("createFlyCameraController", (function (param) {
                Wonder_jest.test("create a new camera contoller which is just index(int)", (function (param) {
                        var match = FlyCameraControllerAPI$Wonderjs.createFlyCameraController(state[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match[1]), 0);
                      }));
                return Wonder_jest.describe("change state", (function (param) {
                              return Wonder_jest.test("state->index + 1", (function (param) {
                                            var match = FlyCameraControllerAPI$Wonderjs.createFlyCameraController(state[0]);
                                            var record = match[0][/* flyCameraControllerRecord */26];
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](record[/* index */0]), 1);
                                          }));
                            }));
              }));
        Wonder_jest.describe("unsafeGetFlyCameraControllerGameObject", (function (param) {
                return Wonder_jest.test("get cameraController's gameObject", (function (param) {
                              var match = FlyCameraControllerAPI$Wonderjs.createFlyCameraController(state[0]);
                              var cameraController = match[1];
                              var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                              var gameObject = match$1[1];
                              var state$1 = GameObjectAPI$Wonderjs.addGameObjectFlyCameraControllerComponent(gameObject, cameraController, match$1[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FlyCameraControllerAPI$Wonderjs.unsafeGetFlyCameraControllerGameObject(cameraController, state$1)), gameObject);
                            }));
              }));
        Wonder_jest.describe("bind/unbind FlyCameraController event", (function (param) {
                var _prepareMouseEvent = function (sandbox) {
                  var state = EventCameraControllerTool$Wonderjs.prepareMouseEvent(sandbox);
                  var match = FlyCameraControllerTool$Wonderjs.createGameObject(state);
                  var cameraController = match[3][0];
                  var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(match[0]);
                  var eulerAngleDiff = /* record */[
                    /* diffX */1.45,
                    /* diffY */0
                  ];
                  var translationDiff = /* tuple */[
                    0,
                    0,
                    2
                  ];
                  var state$2 = FlyCameraControllerTool$Wonderjs.setTranslationDiff(cameraController, translationDiff, FlyCameraControllerTool$Wonderjs.setEulerAngleDiff(cameraController, eulerAngleDiff, FlyCameraControllerAPI$Wonderjs.setFlyCameraControllerRotateSpeed(cameraController, 2.5, state$1)));
                  return /* tuple */[
                          state$2,
                          cameraController,
                          eulerAngleDiff,
                          translationDiff
                        ];
                };
                var _triggerEvent = function (state) {
                  var state$1 = MainStateTool$Wonderjs.setState(state);
                  EventTool$Wonderjs.triggerDomEvent("mousedown", EventTool$Wonderjs.getPointEventBindedDom(state$1), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                  EventTool$Wonderjs.triggerFirstMouseDragOverEvent(MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, 1, 2, undefined, undefined, undefined, undefined, /* () */0), state$1);
                  return EventTool$Wonderjs.restore(state$1);
                };
                Wonder_jest.describe("if unbind event, FlyCameraController event shouldn't work", (function (param) {
                        return Wonder_jest.test("test point drag event", (function (param) {
                                      var match = _prepareMouseEvent(sandbox);
                                      var cameraController = match[1];
                                      var state = FlyCameraControllerAPI$Wonderjs.unbindFlyCameraControllerEvent(cameraController, match[0]);
                                      var state$1 = _triggerEvent(state);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      FlyCameraControllerTool$Wonderjs.unsafeGetEulerAngleDiff(cameraController, state$1),
                                                      FlyCameraControllerTool$Wonderjs.unsafeGetTranslationDiff(cameraController, state$1)
                                                    ]), /* tuple */[
                                                  match[2],
                                                  match[3]
                                                ]);
                                    }));
                      }));
                return Wonder_jest.describe("if bind event after unbind event, FlyCameraController event should work", (function (param) {
                              return Wonder_jest.test("test point drag event", (function (param) {
                                            var match = _prepareMouseEvent(sandbox);
                                            var cameraController = match[1];
                                            var match$1 = MouseEventTool$Wonderjs.prepareForPointerLock(sandbox, match[0]);
                                            var state = FlyCameraControllerAPI$Wonderjs.unbindFlyCameraControllerEvent(cameraController, match$1[0]);
                                            var state$1 = FlyCameraControllerAPI$Wonderjs.bindFlyCameraControllerEvent(cameraController, state);
                                            var state$2 = _triggerEvent(state$1);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* <> */6], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            FlyCameraControllerTool$Wonderjs.unsafeGetEulerAngleDiff(cameraController, state$2),
                                                            FlyCameraControllerTool$Wonderjs.unsafeGetTranslationDiff(cameraController, state$2)
                                                          ]), /* tuple */[
                                                        match[2],
                                                        match[3]
                                                      ]);
                                          }));
                            }));
              }));
        Wonder_jest.describe("dispose component", (function (param) {
                var _prepareTwo = function (state) {
                  var match = FlyCameraControllerTool$Wonderjs.createGameObject(state[0]);
                  var match$1 = FlyCameraControllerTool$Wonderjs.createGameObject(match[0]);
                  return /* tuple */[
                          match$1[0],
                          match[1],
                          match[3][0],
                          match$1[1],
                          match$1[3][0]
                        ];
                };
                return Wonder_jest.describe("dispose data", (function (param) {
                              Wonder_jest.test("remove from eulerAngleDiffMap, translationDiffMap, moveSpeedMap, rotateSpeedMap, wheelSpeedMap, gameObjectMap, directionArrayMap", (function (param) {
                                      var match = _prepareTwo(state);
                                      var cameraController1 = match[2];
                                      var state$1 = GameObjectTool$Wonderjs.disposeGameObjectFlyCameraControllerComponent(match[1], cameraController1, match[0]);
                                      var match$1 = state$1[/* flyCameraControllerRecord */26];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      MutableSparseMapService$WonderCommonlib.has(cameraController1, match$1[/* moveSpeedMap */7]),
                                                      MutableSparseMapService$WonderCommonlib.has(cameraController1, match$1[/* eulerAngleDiffMap */10]),
                                                      MutableSparseMapService$WonderCommonlib.has(cameraController1, match$1[/* translationDiffMap */11]),
                                                      MutableSparseMapService$WonderCommonlib.has(cameraController1, match$1[/* wheelSpeedMap */8]),
                                                      MutableSparseMapService$WonderCommonlib.has(cameraController1, match$1[/* gameObjectMap */12]),
                                                      MutableSparseMapService$WonderCommonlib.has(cameraController1, match$1[/* directionArrayMap */14])
                                                    ]), /* tuple */[
                                                  false,
                                                  false,
                                                  false,
                                                  false,
                                                  false,
                                                  false
                                                ]);
                                    }));
                              return Wonder_jest.describe("remove from eventHandleFunc map", (function (param) {
                                            return Wonder_jest.test("remove from map", (function (param) {
                                                          var match = FlyCameraControllerTool$Wonderjs.createGameObject(state[0]);
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
                                                          var state$1 = FlyCameraControllerTool$Wonderjs.addKeyupEventHandleFunc(cameraController1, keyupHandleFunc, FlyCameraControllerTool$Wonderjs.addKeydownEventHandleFunc(cameraController1, keydownHandleFunc, FlyCameraControllerTool$Wonderjs.addPointScaleEventHandleFunc(cameraController1, pointScaleHandleFunc, FlyCameraControllerTool$Wonderjs.addPointDragOverEventHandleFunc(cameraController1, pointDragOverHandleFunc, FlyCameraControllerTool$Wonderjs.addPointDragDropEventHandleFunc(cameraController1, pointDragDropHandleFunc, FlyCameraControllerTool$Wonderjs.addPointDragStartEventHandleFunc(cameraController1, pointDragStartHandleFunc, match[0]))))));
                                                          var state$2 = GameObjectTool$Wonderjs.disposeGameObjectFlyCameraControllerComponent(match[1], cameraController1, state$1);
                                                          var match$1 = state$2[/* flyCameraControllerRecord */26];
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
                            }));
              }));
        Wonder_jest.describe("unsafeGetWheelSpeed", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = FlyCameraControllerAPI$Wonderjs.createFlyCameraController(state[0]);
                              var cameraController = match[1];
                              var state$1 = FlyCameraControllerAPI$Wonderjs.setFlyCameraControllerWheelSpeed(cameraController, 65, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FlyCameraControllerAPI$Wonderjs.unsafeGetFlyCameraControllerWheelSpeed(cameraController, state$1)), 65);
                            }));
              }));
        Wonder_jest.describe("unsafeGetRotateSpeed", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = FlyCameraControllerAPI$Wonderjs.createFlyCameraController(state[0]);
                              var cameraController = match[1];
                              var state$1 = FlyCameraControllerAPI$Wonderjs.setFlyCameraControllerRotateSpeed(cameraController, 65, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FlyCameraControllerAPI$Wonderjs.unsafeGetFlyCameraControllerRotateSpeed(cameraController, state$1)), 65);
                            }));
              }));
        Wonder_jest.describe("unsafeGetMoveSpeed", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = FlyCameraControllerAPI$Wonderjs.createFlyCameraController(state[0]);
                              var cameraController = match[1];
                              var state$1 = FlyCameraControllerAPI$Wonderjs.setFlyCameraControllerMoveSpeed(cameraController, 65, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FlyCameraControllerAPI$Wonderjs.unsafeGetFlyCameraControllerMoveSpeed(cameraController, state$1)), 65);
                            }));
              }));
        Wonder_jest.describe("unsafeGetEulerAngleDiff", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = FlyCameraControllerAPI$Wonderjs.createFlyCameraController(state[0]);
                              var cameraController = match[1];
                              var value = /* record */[
                                /* diffX */2.0,
                                /* diffY */1.0
                              ];
                              var state$1 = FlyCameraControllerTool$Wonderjs.setEulerAngleDiff(cameraController, value, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FlyCameraControllerTool$Wonderjs.unsafeGetEulerAngleDiff(cameraController, state$1)), value);
                            }));
              }));
        Wonder_jest.describe("unsafeGetDirectionArray", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = FlyCameraControllerAPI$Wonderjs.createFlyCameraController(state[0]);
                              var cameraController = match[1];
                              var directionArray = /* array */[
                                /* Left */0,
                                /* Up */2
                              ];
                              var state$1 = FlyCameraControllerAPI$Wonderjs.setFlyCameraControllerDirectionArray(cameraController, directionArray, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FlyCameraControllerAPI$Wonderjs.unsafeGetFlyCameraControllerDirectionArray(cameraController, state$1)), directionArray);
                            }));
              }));
        return Wonder_jest.describe("unsafeGetTranslationDiff", (function (param) {
                      return Wonder_jest.test("test", (function (param) {
                                    var match = FlyCameraControllerAPI$Wonderjs.createFlyCameraController(state[0]);
                                    var cameraController = match[1];
                                    var value = /* tuple */[
                                      1.0,
                                      2.0,
                                      3.0
                                    ];
                                    var state$1 = FlyCameraControllerTool$Wonderjs.setTranslationDiff(cameraController, value, match[0]);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FlyCameraControllerTool$Wonderjs.unsafeGetTranslationDiff(cameraController, state$1)), value);
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
