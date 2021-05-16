'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var EventTool$Wonderjs = require("../../../../unit/job/no_worker/tool/EventTool.js");
var FakeGlTool$Wonderjs = require("../../../../tool/gl/FakeGlTool.js");
var GameObjectAPI$Wonderjs = require("../../../../../src/api/GameObjectAPI.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var ManageEventAPI$Wonderjs = require("../../../../../src/api/event/ManageEventAPI.js");
var MouseEventTool$Wonderjs = require("../../../../unit/job/no_worker/tool/MouseEventTool.js");
var TouchEventTool$Wonderjs = require("../../../../unit/job/no_worker/tool/TouchEventTool.js");
var CustomEventTool$Wonderjs = require("../../../../unit/job/no_worker/tool/CustomEventTool.js");
var NoWorkerJobTool$Wonderjs = require("../../../../tool/service/job/no_worker/NoWorkerJobTool.js");
var KeyboardEventTool$Wonderjs = require("../../../../unit/job/no_worker/tool/KeyboardEventTool.js");

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

/*  Not a pure module */
