

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "./../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as EventTool$Wonderjs from "../../../../unit/job/no_worker/tool/EventTool.js";
import * as FakeGlTool$Wonderjs from "../../../../tool/gl/FakeGlTool.js";
import * as GameObjectAPI$Wonderjs from "../../../../../src/api/GameObjectAPI.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as ManageEventAPI$Wonderjs from "../../../../../src/api/event/ManageEventAPI.js";
import * as MouseEventTool$Wonderjs from "../../../../unit/job/no_worker/tool/MouseEventTool.js";
import * as TouchEventTool$Wonderjs from "../../../../unit/job/no_worker/tool/TouchEventTool.js";
import * as CustomEventTool$Wonderjs from "../../../../unit/job/no_worker/tool/CustomEventTool.js";
import * as NoWorkerJobTool$Wonderjs from "../../../../tool/service/job/no_worker/NoWorkerJobTool.js";
import * as KeyboardEventTool$Wonderjs from "../../../../unit/job/no_worker/tool/KeyboardEventTool.js";

Wonder_jest.describe("test redo,undo event data", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test redo/undo binded event data map", (function (param) {
                var value = /* record */[/* contents */0];
                var _prepareDomEvent = function (value, onEventFunc, state) {
                  var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
                  var state$2 = Curry._2(onEventFunc, (function ($$event, state) {
                          value[0] = value[0] + 1 | 0;
                          return state;
                        }), state$1);
                  var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$2);
                  var state$3 = Curry._2(onEventFunc, (function ($$event, state) {
                          value[0] = value[0] + 2 | 0;
                          return state;
                        }), state$2);
                  return MainStateTool$Wonderjs.restore(state$3, copiedState);
                };
                var _prepareCustomEvent = function (value, onEventFunc, state) {
                  var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
                  var state$2 = Curry._2(onEventFunc, (function ($$event, state) {
                          value[0] = value[0] + 1 | 0;
                          return /* tuple */[
                                  state,
                                  $$event
                                ];
                        }), state$1);
                  var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$2);
                  var state$3 = Curry._2(onEventFunc, (function ($$event, state) {
                          value[0] = value[0] + 2 | 0;
                          return /* tuple */[
                                  state,
                                  $$event
                                ];
                        }), state$2);
                  return MainStateTool$Wonderjs.restore(state$3, copiedState);
                };
                beforeEach((function () {
                        value[0] = 0;
                        return /* () */0;
                      }));
                Wonder_jest.test("test restore mouseDomEventDataArrMap", (function (param) {
                        var state = MouseEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                        var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                        var restoredState = _prepareDomEvent(value, (function (handleFunc, state) {
                                return ManageEventAPI$Wonderjs.onMouseEvent(/* MouseDown */2, 0, handleFunc, state);
                              }), state$1);
                        var restoredState$1 = MainStateTool$Wonderjs.setState(restoredState);
                        EventTool$Wonderjs.triggerDomEvent("mousedown", EventTool$Wonderjs.getPointEventBindedDom(state$1), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                        EventTool$Wonderjs.restore(restoredState$1);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 1);
                      }));
                Wonder_jest.test("test restore keyboardDomEventDataArrMap", (function (param) {
                        var state = KeyboardEventTool$Wonderjs.prepare(sandbox, undefined, /* () */0);
                        var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                        var restoredState = _prepareDomEvent(value, (function (handleFunc, state) {
                                return ManageEventAPI$Wonderjs.onKeyboardEvent(/* KeyDown */10, 0, handleFunc, state);
                              }), state$1);
                        var restoredState$1 = MainStateTool$Wonderjs.setState(restoredState);
                        EventTool$Wonderjs.triggerDomEvent("keydown", EventTool$Wonderjs.getKeyboardEventBindedDom(state$1), KeyboardEventTool$Wonderjs.buildKeyboardEvent(undefined, undefined, undefined, undefined, undefined, /* () */0));
                        EventTool$Wonderjs.restore(restoredState$1);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 1);
                      }));
                Wonder_jest.test("test restore touchDomEventDataArrMap", (function (param) {
                        var state = TouchEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                        var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                        var restoredState = _prepareDomEvent(value, (function (handleFunc, state) {
                                return ManageEventAPI$Wonderjs.onTouchEvent(/* TouchStart */15, 0, handleFunc, state);
                              }), state$1);
                        var restoredState$1 = MainStateTool$Wonderjs.setState(restoredState);
                        EventTool$Wonderjs.triggerDomEvent("touchstart", EventTool$Wonderjs.getPointEventBindedDom(state$1), TouchEventTool$Wonderjs.buildTouchEvent(undefined, undefined, undefined, undefined, undefined, /* () */0));
                        EventTool$Wonderjs.restore(restoredState$1);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 1);
                      }));
                Wonder_jest.test("test restore customGlobalEventArrMap", (function (param) {
                        var restoredState = _prepareCustomEvent(value, (function (handleFunc, state) {
                                return ManageEventAPI$Wonderjs.onCustomGlobalEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), 0, handleFunc, state);
                              }), state[0]);
                        ManageEventAPI$Wonderjs.triggerCustomGlobalEvent(CustomEventTool$Wonderjs.createCustomEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), undefined, /* () */0), restoredState);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 1);
                      }));
                return Wonder_jest.test("test restore customGameObjectEventArrMap", (function (param) {
                              var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                              var gameObject = match[1];
                              var restoredState = _prepareCustomEvent(value, (function (handleFunc, state) {
                                      return ManageEventAPI$Wonderjs.onCustomGameObjectEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), gameObject, 0, handleFunc, state);
                                    }), match[0]);
                              ManageEventAPI$Wonderjs.triggerCustomGameObjectEvent(CustomEventTool$Wonderjs.createCustomEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), undefined, /* () */0), gameObject, restoredState);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 1);
                            }));
              }));
        Wonder_jest.describe("test copy mouseEventData", (function (param) {
                return Wonder_jest.test("set isDrag to false", (function (param) {
                              var state = MouseEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                              var state$1 = MouseEventTool$Wonderjs.setIsDrag(true, state);
                              var state$2 = NoWorkerJobTool$Wonderjs.execInitJobs(state$1);
                              var state$3 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$2);
                              var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$3);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MouseEventTool$Wonderjs.getIsDrag(copiedState)), false);
                            }));
              }));
        Wonder_jest.describe("test copy touchEventData", (function (param) {
                return Wonder_jest.test("set isDrag to false", (function (param) {
                              var state = TouchEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                              var state$1 = TouchEventTool$Wonderjs.setIsDrag(true, state);
                              var state$2 = NoWorkerJobTool$Wonderjs.execInitJobs(state$1);
                              var state$3 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$2);
                              var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$3);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TouchEventTool$Wonderjs.getIsDrag(copiedState)), false);
                            }));
              }));
        Wonder_jest.describe("test redo/undo mouseEventData", (function (param) {
                return Wonder_jest.test("test lastX, lastY", (function (param) {
                              var valueX = /* record */[/* contents */0];
                              var valueY = /* record */[/* contents */0];
                              var state = MouseEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                              MouseEventTool$Wonderjs.setNotPointerLocked();
                              var state$1 = MouseEventTool$Wonderjs.setLastXY(1, 2, state);
                              var state$2 = NoWorkerJobTool$Wonderjs.execInitJobs(state$1);
                              var state$3 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$2);
                              var state$4 = ManageEventAPI$Wonderjs.onMouseEvent(/* MouseDown */2, 0, (function ($$event, state) {
                                      var match = $$event[/* movementDelta */5];
                                      valueX[0] = valueX[0] + match[0] | 0;
                                      valueY[0] = valueY[0] + match[1] | 0;
                                      return state;
                                    }), state$3);
                              var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$4);
                              var state$5 = ManageEventAPI$Wonderjs.onMouseEvent(/* MouseDown */2, 0, (function ($$event, state) {
                                      valueX[0] = 100;
                                      valueY[0] = 110;
                                      return state;
                                    }), state$4);
                              var restoredState = MainStateTool$Wonderjs.restore(state$5, copiedState);
                              var restoredState$1 = MainStateTool$Wonderjs.setState(restoredState);
                              EventTool$Wonderjs.triggerDomEvent("mousedown", EventTool$Wonderjs.getPointEventBindedDom(state$5), MouseEventTool$Wonderjs.buildMouseEvent(10, 20, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                              EventTool$Wonderjs.restore(restoredState$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              valueX[0],
                                              valueY[0]
                                            ]), /* tuple */[
                                          0,
                                          0
                                        ]);
                            }));
              }));
        return Wonder_jest.describe("test redo/undo touchEventData", (function (param) {
                      return Wonder_jest.test("test lastX, lastY", (function (param) {
                                    var valueX = /* record */[/* contents */0];
                                    var valueY = /* record */[/* contents */0];
                                    var state = TouchEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                    var state$1 = TouchEventTool$Wonderjs.setLastXY(1, 2, state);
                                    var state$2 = NoWorkerJobTool$Wonderjs.execInitJobs(state$1);
                                    var state$3 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$2);
                                    var state$4 = ManageEventAPI$Wonderjs.onTouchEvent(/* TouchStart */15, 0, (function ($$event, state) {
                                            var match = $$event[/* movementDelta */4];
                                            valueX[0] = valueX[0] + match[0] | 0;
                                            valueY[0] = valueY[0] + match[1] | 0;
                                            return state;
                                          }), state$3);
                                    var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$4);
                                    var state$5 = ManageEventAPI$Wonderjs.onTouchEvent(/* TouchStart */15, 0, (function ($$event, state) {
                                            valueX[0] = 100;
                                            valueY[0] = 110;
                                            return state;
                                          }), state$4);
                                    var restoredState = MainStateTool$Wonderjs.restore(state$5, copiedState);
                                    var restoredState$1 = MainStateTool$Wonderjs.setState(restoredState);
                                    EventTool$Wonderjs.triggerDomEvent("touchstart", EventTool$Wonderjs.getPointEventBindedDom(state$5), TouchEventTool$Wonderjs.buildTouchEvent(undefined, /* array */[TouchEventTool$Wonderjs.buildTouchData(10, 20, /* () */0)], undefined, undefined, undefined, /* () */0));
                                    EventTool$Wonderjs.restore(restoredState$1);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                    valueX[0],
                                                    valueY[0]
                                                  ]), /* tuple */[
                                                0,
                                                0
                                              ]);
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
