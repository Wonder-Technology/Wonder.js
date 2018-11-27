

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as Js_primitive from "../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as EventTool$Wonderjs from "./tool/EventTool.js";
import * as ArrayService$Wonderjs from "../../../../src/service/atom/ArrayService.js";
import * as MainStateTool$Wonderjs from "../../../tool/service/state/MainStateTool.js";
import * as OptionService$Wonderjs from "../../../../src/service/atom/OptionService.js";
import * as ManageEventAPI$Wonderjs from "../../../../src/api/event/ManageEventAPI.js";
import * as MouseEventTool$Wonderjs from "./tool/MouseEventTool.js";
import * as TouchEventTool$Wonderjs from "./tool/TouchEventTool.js";
import * as CustomEventTool$Wonderjs from "./tool/CustomEventTool.js";
import * as NoWorkerJobTool$Wonderjs from "../../../tool/service/job/no_worker/NoWorkerJobTool.js";
import * as BrowserDetectTool$Wonderjs from "../../../tool/service/browserDetect/BrowserDetectTool.js";
import * as KeyboardEventTool$Wonderjs from "./tool/KeyboardEventTool.js";
import * as EventArcballCameraControllerTool$Wonderjs from "../../../tool/service/camera_controller/EventArcballCameraControllerTool.js";

describe("InitEventJob", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        MainStateTool$Wonderjs.createState(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("bind dom event", (function () {
                describe("bind mouse event", (function () {
                        var _testMouseEvent = function (mouseEventName, mouseDomEventName) {
                          Wonder_jest.test("test bind", (function () {
                                  var state = MouseEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                  var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                  var value = /* record */[/* contents */0];
                                  var state$2 = ManageEventAPI$Wonderjs.onMouseEvent(mouseEventName, 0, (function (_, state) {
                                          value[0] = 1;
                                          return state;
                                        }), state$1);
                                  var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                  EventTool$Wonderjs.triggerDomEvent("" + (String(mouseDomEventName) + ""), EventTool$Wonderjs.getPointEventBindedDom(state$3), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                  EventTool$Wonderjs.restore(state$3);
                                  return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 1);
                                }));
                          describe("test unbind by handleFunc", (function () {
                                  Wonder_jest.test("test", (function () {
                                          var state = MouseEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                          var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                          var value = /* record */[/* contents */0];
                                          var handleFunc = function (_, state) {
                                            value[0] = value[0] + 1 | 0;
                                            return state;
                                          };
                                          var state$2 = ManageEventAPI$Wonderjs.onMouseEvent(mouseEventName, 0, handleFunc, state$1);
                                          var state$3 = ManageEventAPI$Wonderjs.offMouseEventByHandleFunc(mouseEventName, handleFunc, state$2);
                                          var state$4 = MainStateTool$Wonderjs.setState(state$3);
                                          EventTool$Wonderjs.triggerDomEvent("" + (String(mouseDomEventName) + ""), EventTool$Wonderjs.getPointEventBindedDom(state$4), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                          EventTool$Wonderjs.restore(state$4);
                                          return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 0);
                                        }));
                                  return Wonder_jest.test("test unbind one handleFunc of the eventName", (function () {
                                                var state = MouseEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                                var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                                var value = /* record */[/* contents */0];
                                                var handleFunc = function (_, state) {
                                                  value[0] = value[0] + 1 | 0;
                                                  return state;
                                                };
                                                var state$2 = ManageEventAPI$Wonderjs.onMouseEvent(mouseEventName, 0, handleFunc, state$1);
                                                var state$3 = ManageEventAPI$Wonderjs.onMouseEvent(mouseEventName, 0, (function (_, state) {
                                                        value[0] = value[0] + 10 | 0;
                                                        return state;
                                                      }), state$2);
                                                var state$4 = ManageEventAPI$Wonderjs.offMouseEventByHandleFunc(mouseEventName, handleFunc, state$3);
                                                var state$5 = MainStateTool$Wonderjs.setState(state$4);
                                                EventTool$Wonderjs.triggerDomEvent("" + (String(mouseDomEventName) + ""), EventTool$Wonderjs.getPointEventBindedDom(state$5), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                EventTool$Wonderjs.restore(state$5);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 10);
                                              }));
                                }));
                          return /* () */0;
                        };
                        describe("bind contextmenu event", (function () {
                                return Wonder_jest.test("preventDefault", (function () {
                                              var state = EventArcballCameraControllerTool$Wonderjs.prepareMouseEvent(sandbox);
                                              var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                              var preventDefaultFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var stopPropagationFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var state$2 = MainStateTool$Wonderjs.setState(state$1);
                                              EventTool$Wonderjs.triggerDomEvent("contextmenu", EventTool$Wonderjs.getBody(state$2), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, preventDefaultFunc, stopPropagationFunc, /* () */0));
                                              EventTool$Wonderjs.restore(state$2);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              Sinon.getCallCount(preventDefaultFunc),
                                                              Sinon.getCallCount(stopPropagationFunc)
                                                            ]), /* tuple */[
                                                          1,
                                                          1
                                                        ]);
                                            }));
                              }));
                        describe("bind mousedown event", (function () {
                                _testMouseEvent(/* MouseDown */2, "mousedown");
                                describe("test mouse event", (function () {
                                        describe("test locationInView", (function () {
                                                Wonder_jest.test("test view has no offsetParent", (function () {
                                                        var state = MouseEventTool$Wonderjs.prepare(sandbox, 1, 2, undefined, undefined, /* () */0);
                                                        var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                                        var valueX = /* record */[/* contents */0];
                                                        var valueY = /* record */[/* contents */0];
                                                        var state$2 = ManageEventAPI$Wonderjs.onMouseEvent(/* MouseDown */2, 0, (function ($$event, state) {
                                                                var match = $$event[/* locationInView */2];
                                                                valueX[0] = match[0];
                                                                valueY[0] = match[1];
                                                                return state;
                                                              }), state$1);
                                                        var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                                        EventTool$Wonderjs.triggerDomEvent("mousedown", EventTool$Wonderjs.getPointEventBindedDom(state$3), MouseEventTool$Wonderjs.buildMouseEvent(10, 20, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                        EventTool$Wonderjs.restore(state$3);
                                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                        valueX[0],
                                                                        valueY[0]
                                                                      ]), /* tuple */[
                                                                    9,
                                                                    18
                                                                  ]);
                                                      }));
                                                return Wonder_jest.test("test view has offsetParent", (function () {
                                                              var state = MouseEventTool$Wonderjs.prepare(sandbox, 1, 2, {
                                                                    offsetLeft: 11,
                                                                    offsetTop: 12,
                                                                    offsetParent: undefined
                                                                  }, undefined, /* () */0);
                                                              var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                                              var valueX = /* record */[/* contents */0];
                                                              var valueY = /* record */[/* contents */0];
                                                              var state$2 = ManageEventAPI$Wonderjs.onMouseEvent(/* MouseDown */2, 0, (function ($$event, state) {
                                                                      var match = $$event[/* locationInView */2];
                                                                      valueX[0] = match[0];
                                                                      valueY[0] = match[1];
                                                                      return state;
                                                                    }), state$1);
                                                              var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                                              EventTool$Wonderjs.triggerDomEvent("mousedown", EventTool$Wonderjs.getPointEventBindedDom(state$3), MouseEventTool$Wonderjs.buildMouseEvent(10, 20, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                              EventTool$Wonderjs.restore(state$3);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                              valueX[0],
                                                                              valueY[0]
                                                                            ]), /* tuple */[
                                                                          -2,
                                                                          6
                                                                        ]);
                                                            }));
                                              }));
                                        describe("test button", (function () {
                                                var _test = function (eventButton, targetButton) {
                                                  var state = MouseEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                                  var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                                  var button = /* record */[/* contents : Right */1];
                                                  var state$2 = ManageEventAPI$Wonderjs.onMouseEvent(/* MouseDown */2, 0, (function ($$event, state) {
                                                          button[0] = $$event[/* button */3];
                                                          return state;
                                                        }), state$1);
                                                  var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                                  EventTool$Wonderjs.triggerDomEvent("mousedown", EventTool$Wonderjs.getPointEventBindedDom(state$3), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, eventButton, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                  EventTool$Wonderjs.restore(state$3);
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](button[0]), targetButton);
                                                };
                                                Wonder_jest.test("test Left", (function () {
                                                        return _test(0, /* Left */0);
                                                      }));
                                                Wonder_jest.test("test Right", (function () {
                                                        return _test(1, /* Right */1);
                                                      }));
                                                return Wonder_jest.test("test Center", (function () {
                                                              return _test(2, /* Center */2);
                                                            }));
                                              }));
                                        describe("test movementDelta", (function () {
                                                describe("if is pointer locked", (function () {
                                                        return Wonder_jest.test("get data from event.movementX/movementY", (function () {
                                                                      var state = MouseEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                                                      MouseEventTool$Wonderjs.setPointerLocked();
                                                                      var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                                                      var valueX = /* record */[/* contents */0];
                                                                      var valueY = /* record */[/* contents */0];
                                                                      var state$2 = ManageEventAPI$Wonderjs.onMouseEvent(/* MouseDown */2, 0, (function ($$event, state) {
                                                                              var match = $$event[/* movementDelta */5];
                                                                              valueX[0] = match[0];
                                                                              valueY[0] = match[1];
                                                                              return state;
                                                                            }), state$1);
                                                                      var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                                                      EventTool$Wonderjs.triggerDomEvent("mousedown", EventTool$Wonderjs.getPointEventBindedDom(state$3), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, 1, 2, undefined, undefined, undefined, undefined, /* () */0));
                                                                      EventTool$Wonderjs.restore(state$3);
                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                      valueX[0],
                                                                                      valueY[0]
                                                                                    ]), /* tuple */[
                                                                                  1,
                                                                                  2
                                                                                ]);
                                                                    }));
                                                      }));
                                                describe("else, compute", (function () {
                                                        var _test = function (param, param$1, param$2) {
                                                          var state = MouseEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                                          MouseEventTool$Wonderjs.setNotPointerLocked();
                                                          var state$1 = MouseEventTool$Wonderjs.setLastXY(param[0], param[1], state);
                                                          var state$2 = NoWorkerJobTool$Wonderjs.execInitJobs(state$1);
                                                          var valueX = /* record */[/* contents */0];
                                                          var valueY = /* record */[/* contents */0];
                                                          var state$3 = ManageEventAPI$Wonderjs.onMouseEvent(/* MouseDown */2, 0, (function ($$event, state) {
                                                                  var match = $$event[/* movementDelta */5];
                                                                  valueX[0] = match[0];
                                                                  valueY[0] = match[1];
                                                                  return state;
                                                                }), state$2);
                                                          var state$4 = MainStateTool$Wonderjs.setState(state$3);
                                                          EventTool$Wonderjs.triggerDomEvent("mousedown", EventTool$Wonderjs.getPointEventBindedDom(state$4), MouseEventTool$Wonderjs.buildMouseEvent(param$1[0], param$1[1], undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                          EventTool$Wonderjs.restore(state$4);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                          valueX[0],
                                                                          valueY[0]
                                                                        ]), /* tuple */[
                                                                      param$2[0],
                                                                      param$2[1]
                                                                    ]);
                                                        };
                                                        Wonder_jest.test("test has no lastX, lastY", (function () {
                                                                return _test(/* tuple */[
                                                                            undefined,
                                                                            undefined
                                                                          ], /* tuple */[
                                                                            0,
                                                                            0
                                                                          ], /* tuple */[
                                                                            0,
                                                                            0
                                                                          ]);
                                                              }));
                                                        return Wonder_jest.test("test has lastX, lastY", (function () {
                                                                      return _test(/* tuple */[
                                                                                  1,
                                                                                  2
                                                                                ], /* tuple */[
                                                                                  10,
                                                                                  11
                                                                                ], /* tuple */[
                                                                                  9,
                                                                                  9
                                                                                ]);
                                                                    }));
                                                      }));
                                                return /* () */0;
                                              }));
                                        describe("test wheel", (function () {
                                                var _test = function (mouseEvent, targetWheel) {
                                                  var state = MouseEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                                  var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                                  var wheel = /* record */[/* contents */0];
                                                  var state$2 = ManageEventAPI$Wonderjs.onMouseEvent(/* MouseDown */2, 0, (function ($$event, state) {
                                                          wheel[0] = $$event[/* wheel */4];
                                                          return state;
                                                        }), state$1);
                                                  var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                                  EventTool$Wonderjs.triggerDomEvent("mousedown", EventTool$Wonderjs.getPointEventBindedDom(state$3), mouseEvent);
                                                  EventTool$Wonderjs.restore(state$3);
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](wheel[0]), targetWheel);
                                                };
                                                describe("if event.detail exist", (function () {
                                                        Wonder_jest.test("if event.detail !== 0, use it", (function () {
                                                                return _test(MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, /* () */0), -2);
                                                              }));
                                                        return Wonder_jest.test("else, use event.wheelDelta", (function () {
                                                                      return _test(MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, 0, 120, undefined, undefined, /* () */0), 1);
                                                                    }));
                                                      }));
                                                Wonder_jest.test("else, use event.wheelDelta", (function () {
                                                        return _test(MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, Js_primitive.some(undefined), 120, undefined, undefined, /* () */0), 1);
                                                      }));
                                                return Wonder_jest.test("else, return 0", (function () {
                                                              return _test(MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, Js_primitive.some(undefined), Js_primitive.some(undefined), undefined, undefined, /* () */0), 0);
                                                            }));
                                              }));
                                        describe("test other data", (function () {
                                                return Wonder_jest.test("test name, location", (function () {
                                                              var state = MouseEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                                              var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                                              var name = /* record */[/* contents : MouseUp */3];
                                                              var valueX = /* record */[/* contents */0];
                                                              var valueY = /* record */[/* contents */0];
                                                              var state$2 = ManageEventAPI$Wonderjs.onMouseEvent(/* MouseDown */2, 0, (function ($$event, state) {
                                                                      var match = $$event[/* location */1];
                                                                      valueX[0] = match[0];
                                                                      valueY[0] = match[1];
                                                                      name[0] = $$event[/* name */0];
                                                                      return state;
                                                                    }), state$1);
                                                              var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                                              EventTool$Wonderjs.triggerDomEvent("mousedown", EventTool$Wonderjs.getPointEventBindedDom(state$3), MouseEventTool$Wonderjs.buildMouseEvent(10, 20, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                              EventTool$Wonderjs.restore(state$3);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                              name[0],
                                                                              valueX[0],
                                                                              valueY[0]
                                                                            ]), /* tuple */[
                                                                          /* MouseDown */2,
                                                                          10,
                                                                          20
                                                                        ]);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                describe("test priority", (function () {
                                        return Wonder_jest.test("the higher priority handleFunc is executed first", (function () {
                                                      var state = MouseEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                                      var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                                      var value = /* record */[/* contents */2];
                                                      var state$2 = ManageEventAPI$Wonderjs.onMouseEvent(/* MouseDown */2, 0, (function (_, state) {
                                                              value[0] = value[0] - 2 | 0;
                                                              return state;
                                                            }), state$1);
                                                      var state$3 = ManageEventAPI$Wonderjs.onMouseEvent(/* MouseDown */2, 1, (function (_, state) {
                                                              value[0] = (value[0] << 1);
                                                              return state;
                                                            }), state$2);
                                                      var state$4 = MainStateTool$Wonderjs.setState(state$3);
                                                      EventTool$Wonderjs.triggerDomEvent("mousedown", EventTool$Wonderjs.getPointEventBindedDom(state$4), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                      EventTool$Wonderjs.restore(state$4);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 2);
                                                    }));
                                      }));
                                return Wonder_jest.test("if browser is unknown, fatal", (function () {
                                              var state = MouseEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, BrowserDetectTool$Wonderjs.setUnknown, /* () */0);
                                              return Wonder_jest.Expect[/* toThrowMessage */20]("unknown browser", Wonder_jest.Expect[/* expect */0]((function () {
                                                                NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                                                return /* () */0;
                                                              })));
                                            }));
                              }));
                        describe("bind mouseup event", (function () {
                                return _testMouseEvent(/* MouseUp */3, "mouseup");
                              }));
                        describe("bind click event", (function () {
                                return _testMouseEvent(/* Click */1, "click");
                              }));
                        describe("bind mousewheel event", (function () {
                                return _testMouseEvent(/* MouseWheel */5, "mousewheel");
                              }));
                        describe("bind mousemove event", (function () {
                                _testMouseEvent(/* MouseMove */4, "mousemove");
                                describe("test mouse event", (function () {
                                        describe("test movementDelta", (function () {
                                                return Wonder_jest.test("set lastX, lastY after handle", (function () {
                                                              var state = MouseEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                                              MouseEventTool$Wonderjs.setNotPointerLocked();
                                                              var state$1 = MouseEventTool$Wonderjs.setLastXY(undefined, undefined, state);
                                                              var state$2 = NoWorkerJobTool$Wonderjs.execInitJobs(state$1);
                                                              var valueX = /* record */[/* contents */0];
                                                              var valueY = /* record */[/* contents */0];
                                                              var state$3 = ManageEventAPI$Wonderjs.onMouseEvent(/* MouseMove */4, 0, (function ($$event, state) {
                                                                      var match = $$event[/* movementDelta */5];
                                                                      valueX[0] = valueX[0] + match[0] | 0;
                                                                      valueY[0] = valueY[0] + match[1] | 0;
                                                                      return state;
                                                                    }), state$2);
                                                              var state$4 = MainStateTool$Wonderjs.setState(state$3);
                                                              EventTool$Wonderjs.triggerDomEvent("mousemove", EventTool$Wonderjs.getPointEventBindedDom(state$4), MouseEventTool$Wonderjs.buildMouseEvent(10, 20, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                              EventTool$Wonderjs.triggerDomEvent("mousemove", EventTool$Wonderjs.getPointEventBindedDom(state$4), MouseEventTool$Wonderjs.buildMouseEvent(30, 50, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                              EventTool$Wonderjs.restore(state$4);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                              valueX[0],
                                                                              valueY[0]
                                                                            ]), /* tuple */[
                                                                          20,
                                                                          30
                                                                        ]);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        describe("bind mousedrag event", (function () {
                                Wonder_jest.test("test trigger event when mousemove after mousedown", (function () {
                                        var state = MouseEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                        var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                        var value = /* record */[/* contents */0];
                                        var state$2 = ManageEventAPI$Wonderjs.onMouseEvent(/* MouseDrag */6, 0, (function (_, state) {
                                                value[0] = value[0] + 1 | 0;
                                                return state;
                                              }), state$1);
                                        var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                        EventTool$Wonderjs.triggerDomEvent("mousedown", EventTool$Wonderjs.getPointEventBindedDom(state$3), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                        EventTool$Wonderjs.triggerDomEvent("mousemove", EventTool$Wonderjs.getPointEventBindedDom(state$3), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                        EventTool$Wonderjs.triggerDomEvent("mousemove", EventTool$Wonderjs.getPointEventBindedDom(state$3), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                        EventTool$Wonderjs.restore(state$3);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 2);
                                      }));
                                Wonder_jest.test("test stop event when mouseup", (function () {
                                        var state = MouseEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                        var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                        var value = /* record */[/* contents */0];
                                        var state$2 = ManageEventAPI$Wonderjs.onMouseEvent(/* MouseDrag */6, 0, (function (_, state) {
                                                value[0] = value[0] + 1 | 0;
                                                return state;
                                              }), state$1);
                                        var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                        EventTool$Wonderjs.triggerDomEvent("mousedown", EventTool$Wonderjs.getPointEventBindedDom(state$3), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                        EventTool$Wonderjs.triggerDomEvent("mousemove", EventTool$Wonderjs.getPointEventBindedDom(state$3), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                        EventTool$Wonderjs.triggerDomEvent("mouseup", EventTool$Wonderjs.getPointEventBindedDom(state$3), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                        EventTool$Wonderjs.triggerDomEvent("mousemove", EventTool$Wonderjs.getPointEventBindedDom(state$3), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                        EventTool$Wonderjs.restore(state$3);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 1);
                                      }));
                                describe("test unbind by handleFunc", (function () {
                                        return Wonder_jest.test("test", (function () {
                                                      var state = MouseEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                                      var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                                      var value = /* record */[/* contents */0];
                                                      var handleFunc = function (_, state) {
                                                        value[0] = value[0] + 1 | 0;
                                                        return state;
                                                      };
                                                      var state$2 = ManageEventAPI$Wonderjs.onMouseEvent(/* MouseDrag */6, 0, handleFunc, state$1);
                                                      var state$3 = ManageEventAPI$Wonderjs.offMouseEventByHandleFunc(/* MouseDrag */6, handleFunc, state$2);
                                                      var state$4 = MainStateTool$Wonderjs.setState(state$3);
                                                      EventTool$Wonderjs.triggerDomEvent("mousedown", EventTool$Wonderjs.getPointEventBindedDom(state$4), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                      EventTool$Wonderjs.triggerDomEvent("mousemove", EventTool$Wonderjs.getPointEventBindedDom(state$4), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                      EventTool$Wonderjs.restore(state$4);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 0);
                                                    }));
                                      }));
                                describe("test movement", (function () {
                                        var _prepare = function () {
                                          var state = MouseEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                          MouseEventTool$Wonderjs.setNotPointerLocked();
                                          var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                          var movementX = /* record */[/* contents */0];
                                          var movementY = /* record */[/* contents */0];
                                          var state$2 = ManageEventAPI$Wonderjs.onMouseEvent(/* MouseDrag */6, 0, (function ($$event, state) {
                                                  var match = $$event[/* movementDelta */5];
                                                  movementX[0] = match[0];
                                                  movementY[0] = match[1];
                                                  return state;
                                                }), state$1);
                                          return /* tuple */[
                                                  state$2,
                                                  /* tuple */[
                                                    movementX,
                                                    movementY
                                                  ]
                                                ];
                                        };
                                        Wonder_jest.test("if not set lastXY on mousemove event if mousedrag event is triggering", (function () {
                                                var match = _prepare(/* () */0);
                                                var match$1 = match[1];
                                                var state = MainStateTool$Wonderjs.setState(match[0]);
                                                EventTool$Wonderjs.triggerDomEvent("mousemove", EventTool$Wonderjs.getPointEventBindedDom(state), MouseEventTool$Wonderjs.buildMouseEvent(1, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                EventTool$Wonderjs.triggerDomEvent("mousedown", EventTool$Wonderjs.getPointEventBindedDom(state), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                EventTool$Wonderjs.triggerDomEvent("mousemove", EventTool$Wonderjs.getPointEventBindedDom(state), MouseEventTool$Wonderjs.buildMouseEvent(10, 20, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                EventTool$Wonderjs.triggerDomEvent("mousemove", EventTool$Wonderjs.getPointEventBindedDom(state), MouseEventTool$Wonderjs.buildMouseEvent(50, 70, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                EventTool$Wonderjs.restore(state);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                match$1[0][0],
                                                                match$1[1][0]
                                                              ]), /* tuple */[
                                                            40,
                                                            50
                                                          ]);
                                              }));
                                        return Wonder_jest.test("reset lastX,lastY when drag start", (function () {
                                                      var match = _prepare(/* () */0);
                                                      var match$1 = match[1];
                                                      var state = MainStateTool$Wonderjs.setState(match[0]);
                                                      EventTool$Wonderjs.triggerDomEvent("mousemove", EventTool$Wonderjs.getPointEventBindedDom(state), MouseEventTool$Wonderjs.buildMouseEvent(1, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                      EventTool$Wonderjs.triggerDomEvent("mousedown", EventTool$Wonderjs.getPointEventBindedDom(state), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                      EventTool$Wonderjs.triggerDomEvent("mousemove", EventTool$Wonderjs.getPointEventBindedDom(state), MouseEventTool$Wonderjs.buildMouseEvent(50, 80, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                      EventTool$Wonderjs.restore(state);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      match$1[0][0],
                                                                      match$1[1][0]
                                                                    ]), /* tuple */[
                                                                  0,
                                                                  0
                                                                ]);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                describe("bind keyboard event", (function () {
                        var _testKeyboardEvent = function (keyboardEventName, keyboardDomEventName) {
                          Wonder_jest.test("test bind", (function () {
                                  var state = KeyboardEventTool$Wonderjs.prepare(sandbox, undefined, /* () */0);
                                  var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                  var value = /* record */[/* contents */0];
                                  var state$2 = ManageEventAPI$Wonderjs.onKeyboardEvent(keyboardEventName, 0, (function (_, state) {
                                          value[0] = 1;
                                          return state;
                                        }), state$1);
                                  var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                  EventTool$Wonderjs.triggerDomEvent("" + (String(keyboardDomEventName) + ""), EventTool$Wonderjs.getKeyboardEventBindedDom(state$3), KeyboardEventTool$Wonderjs.buildKeyboardEvent(undefined, undefined, undefined, undefined, undefined, /* () */0));
                                  EventTool$Wonderjs.restore(state$3);
                                  return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 1);
                                }));
                          describe("test unbind by handleFunc", (function () {
                                  Wonder_jest.test("test", (function () {
                                          var state = KeyboardEventTool$Wonderjs.prepare(sandbox, undefined, /* () */0);
                                          var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                          var value = /* record */[/* contents */0];
                                          var handleFunc = function (_, state) {
                                            value[0] = value[0] + 1 | 0;
                                            return state;
                                          };
                                          var state$2 = ManageEventAPI$Wonderjs.onKeyboardEvent(keyboardEventName, 0, handleFunc, state$1);
                                          var state$3 = ManageEventAPI$Wonderjs.offKeyboardEventByHandleFunc(keyboardEventName, handleFunc, state$2);
                                          var state$4 = MainStateTool$Wonderjs.setState(state$3);
                                          EventTool$Wonderjs.triggerDomEvent("" + (String(keyboardDomEventName) + ""), EventTool$Wonderjs.getKeyboardEventBindedDom(state$4), KeyboardEventTool$Wonderjs.buildKeyboardEvent(undefined, undefined, undefined, undefined, undefined, /* () */0));
                                          EventTool$Wonderjs.restore(state$4);
                                          return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 0);
                                        }));
                                  return Wonder_jest.test("test unbind one handleFunc of the eventName", (function () {
                                                var state = KeyboardEventTool$Wonderjs.prepare(sandbox, undefined, /* () */0);
                                                var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                                var value = /* record */[/* contents */0];
                                                var handleFunc = function (_, state) {
                                                  value[0] = value[0] + 1 | 0;
                                                  return state;
                                                };
                                                var state$2 = ManageEventAPI$Wonderjs.onKeyboardEvent(keyboardEventName, 0, handleFunc, state$1);
                                                var state$3 = ManageEventAPI$Wonderjs.onKeyboardEvent(keyboardEventName, 0, (function (_, state) {
                                                        value[0] = value[0] + 10 | 0;
                                                        return state;
                                                      }), state$2);
                                                var state$4 = ManageEventAPI$Wonderjs.offKeyboardEventByHandleFunc(keyboardEventName, handleFunc, state$3);
                                                var state$5 = MainStateTool$Wonderjs.setState(state$4);
                                                EventTool$Wonderjs.triggerDomEvent("" + (String(keyboardDomEventName) + ""), EventTool$Wonderjs.getKeyboardEventBindedDom(state$5), KeyboardEventTool$Wonderjs.buildKeyboardEvent(undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                EventTool$Wonderjs.restore(state$5);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 10);
                                              }));
                                }));
                          return /* () */0;
                        };
                        describe("bind keyup event", (function () {
                                _testKeyboardEvent(/* KeyUp */7, "keyup");
                                describe("test keyboard event", (function () {
                                        Wonder_jest.test("test name, ctrlKey, altKey, shiftKey, metaKey,  keyCode", (function () {
                                                var state = KeyboardEventTool$Wonderjs.prepare(sandbox, undefined, /* () */0);
                                                var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                                var refEvent = /* record */[/* contents */-1];
                                                var state$2 = ManageEventAPI$Wonderjs.onKeyboardEvent(/* KeyUp */7, 0, (function ($$event, state) {
                                                        refEvent[0] = $$event;
                                                        return state;
                                                      }), state$1);
                                                var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                                EventTool$Wonderjs.triggerDomEvent("keyup", EventTool$Wonderjs.getKeyboardEventBindedDom(state$3), KeyboardEventTool$Wonderjs.buildKeyboardEvent(true, true, true, true, 9, /* () */0));
                                                EventTool$Wonderjs.restore(state$3);
                                                var match = refEvent[0];
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                match[/* name */0],
                                                                match[/* ctrlKey */2],
                                                                match[/* altKey */3],
                                                                match[/* shiftKey */4],
                                                                match[/* metaKey */5],
                                                                match[/* keyCode */1]
                                                              ]), /* tuple */[
                                                            /* KeyUp */7,
                                                            true,
                                                            true,
                                                            true,
                                                            true,
                                                            9
                                                          ]);
                                              }));
                                        describe("test key", (function () {
                                                Wonder_jest.test("test keyCode is in specialKeyMap", (function () {
                                                        var state = KeyboardEventTool$Wonderjs.prepare(sandbox, undefined, /* () */0);
                                                        var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                                        var key = /* record */[/* contents */""];
                                                        var state$2 = ManageEventAPI$Wonderjs.onKeyboardEvent(/* KeyUp */7, 0, (function ($$event, state) {
                                                                key[0] = $$event[/* key */6];
                                                                return state;
                                                              }), state$1);
                                                        var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                                        EventTool$Wonderjs.triggerDomEvent("keyup", EventTool$Wonderjs.getKeyboardEventBindedDom(state$3), KeyboardEventTool$Wonderjs.buildKeyboardEvent(undefined, undefined, undefined, undefined, 9, /* () */0));
                                                        EventTool$Wonderjs.restore(state$3);
                                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](key[0]), "tab");
                                                      }));
                                                describe("else", (function () {
                                                        return Wonder_jest.test("if shiftKey=true, get key from shiftKeyByCharCodeMap", (function () {
                                                                      var state = KeyboardEventTool$Wonderjs.prepare(sandbox, undefined, /* () */0);
                                                                      var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                                                      var keyArr = /* array */[];
                                                                      var state$2 = ManageEventAPI$Wonderjs.onKeyboardEvent(/* KeyUp */7, 0, (function ($$event, state) {
                                                                              ArrayService$Wonderjs.push($$event[/* key */6], keyArr);
                                                                              return state;
                                                                            }), state$1);
                                                                      var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                                                      EventTool$Wonderjs.triggerDomEvent("keyup", EventTool$Wonderjs.getKeyboardEventBindedDom(state$3), KeyboardEventTool$Wonderjs.buildKeyboardEvent(undefined, undefined, true, undefined, 51, /* () */0));
                                                                      EventTool$Wonderjs.triggerDomEvent("keyup", EventTool$Wonderjs.getKeyboardEventBindedDom(state$3), KeyboardEventTool$Wonderjs.buildKeyboardEvent(undefined, undefined, true, undefined, 52, /* () */0));
                                                                      EventTool$Wonderjs.triggerDomEvent("keyup", EventTool$Wonderjs.getKeyboardEventBindedDom(state$3), KeyboardEventTool$Wonderjs.buildKeyboardEvent(undefined, undefined, true, undefined, 187, /* () */0));
                                                                      EventTool$Wonderjs.restore(state$3);
                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](keyArr), /* array */[
                                                                                  "#",
                                                                                  "$",
                                                                                  "+"
                                                                                ]);
                                                                    }));
                                                      }));
                                                return /* () */0;
                                              }));
                                        return /* () */0;
                                      }));
                                describe("test priority", (function () {
                                        return Wonder_jest.test("the higher priority handleFunc is executed first", (function () {
                                                      var state = KeyboardEventTool$Wonderjs.prepare(sandbox, undefined, /* () */0);
                                                      var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                                      var value = /* record */[/* contents */5];
                                                      var state$2 = ManageEventAPI$Wonderjs.onKeyboardEvent(/* KeyUp */7, 0, (function (_, state) {
                                                              value[0] = value[0] + 1 | 0;
                                                              return state;
                                                            }), state$1);
                                                      var state$3 = ManageEventAPI$Wonderjs.onKeyboardEvent(/* KeyUp */7, 1, (function (_, state) {
                                                              value[0] = (value[0] << 1);
                                                              return state;
                                                            }), state$2);
                                                      var state$4 = MainStateTool$Wonderjs.setState(state$3);
                                                      EventTool$Wonderjs.triggerDomEvent("keyup", EventTool$Wonderjs.getKeyboardEventBindedDom(state$4), KeyboardEventTool$Wonderjs.buildKeyboardEvent(undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                      EventTool$Wonderjs.restore(state$4);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 11);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        describe("bind keydown event", (function () {
                                return _testKeyboardEvent(/* KeyDown */8, "keydown");
                              }));
                        describe("bind keypress event", (function () {
                                return _testKeyboardEvent(/* KeyPress */9, "keypress");
                              }));
                        return /* () */0;
                      }));
                describe("bind touch event", (function () {
                        var _testTouchEvent = function (touchEventName, touchDomEventName) {
                          Wonder_jest.test("test bind", (function () {
                                  var state = TouchEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                  var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                  var value = /* record */[/* contents */0];
                                  var state$2 = ManageEventAPI$Wonderjs.onTouchEvent(touchEventName, 0, (function (_, state) {
                                          value[0] = 1;
                                          return state;
                                        }), state$1);
                                  var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                  EventTool$Wonderjs.triggerDomEvent("" + (String(touchDomEventName) + ""), EventTool$Wonderjs.getPointEventBindedDom(state$3), TouchEventTool$Wonderjs.buildTouchEvent(undefined, undefined, undefined, /* () */0));
                                  EventTool$Wonderjs.restore(state$3);
                                  return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 1);
                                }));
                          describe("test unbind by handleFunc", (function () {
                                  Wonder_jest.test("test", (function () {
                                          var state = TouchEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                          var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                          var value = /* record */[/* contents */0];
                                          var handleFunc = function (_, state) {
                                            value[0] = value[0] + 1 | 0;
                                            return state;
                                          };
                                          var state$2 = ManageEventAPI$Wonderjs.onTouchEvent(touchEventName, 0, handleFunc, state$1);
                                          var state$3 = ManageEventAPI$Wonderjs.offTouchEventByHandleFunc(touchEventName, handleFunc, state$2);
                                          var state$4 = MainStateTool$Wonderjs.setState(state$3);
                                          EventTool$Wonderjs.triggerDomEvent("" + (String(touchDomEventName) + ""), EventTool$Wonderjs.getPointEventBindedDom(state$4), TouchEventTool$Wonderjs.buildTouchEvent(undefined, undefined, undefined, /* () */0));
                                          EventTool$Wonderjs.restore(state$4);
                                          return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 0);
                                        }));
                                  return Wonder_jest.test("test unbind one handleFunc of the eventName", (function () {
                                                var state = TouchEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                                var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                                var value = /* record */[/* contents */0];
                                                var handleFunc = function (_, state) {
                                                  value[0] = value[0] + 1 | 0;
                                                  return state;
                                                };
                                                var state$2 = ManageEventAPI$Wonderjs.onTouchEvent(touchEventName, 0, handleFunc, state$1);
                                                var state$3 = ManageEventAPI$Wonderjs.onTouchEvent(touchEventName, 0, (function (_, state) {
                                                        value[0] = value[0] + 10 | 0;
                                                        return state;
                                                      }), state$2);
                                                var state$4 = ManageEventAPI$Wonderjs.offTouchEventByHandleFunc(touchEventName, handleFunc, state$3);
                                                var state$5 = MainStateTool$Wonderjs.setState(state$4);
                                                EventTool$Wonderjs.triggerDomEvent("" + (String(touchDomEventName) + ""), EventTool$Wonderjs.getPointEventBindedDom(state$5), TouchEventTool$Wonderjs.buildTouchEvent(undefined, undefined, undefined, /* () */0));
                                                EventTool$Wonderjs.restore(state$5);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 10);
                                              }));
                                }));
                          return /* () */0;
                        };
                        describe("bind touchstart event", (function () {
                                _testTouchEvent(/* TouchStart */13, "touchstart");
                                describe("test touch event", (function () {
                                        describe("test locationInView", (function () {
                                                return Wonder_jest.test("test view has no offsetParent", (function () {
                                                              var state = TouchEventTool$Wonderjs.prepare(sandbox, 1, 2, undefined, undefined, /* () */0);
                                                              var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                                              var valueX = /* record */[/* contents */0];
                                                              var valueY = /* record */[/* contents */0];
                                                              var state$2 = ManageEventAPI$Wonderjs.onTouchEvent(/* TouchStart */13, 0, (function ($$event, state) {
                                                                      var match = $$event[/* locationInView */2];
                                                                      valueX[0] = match[0];
                                                                      valueY[0] = match[1];
                                                                      return state;
                                                                    }), state$1);
                                                              var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                                              EventTool$Wonderjs.triggerDomEvent("touchstart", EventTool$Wonderjs.getPointEventBindedDom(state$3), TouchEventTool$Wonderjs.buildTouchEvent(undefined, /* array */[TouchEventTool$Wonderjs.buildTouchData(10, 20, /* () */0)], undefined, /* () */0));
                                                              EventTool$Wonderjs.restore(state$3);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                              valueX[0],
                                                                              valueY[0]
                                                                            ]), /* tuple */[
                                                                          9,
                                                                          18
                                                                        ]);
                                                            }));
                                              }));
                                        describe("test touchData", (function () {
                                                return Wonder_jest.test("test", (function () {
                                                              var state = TouchEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                                              var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                                              var value = /* record */[/* contents */0];
                                                              var state$2 = ManageEventAPI$Wonderjs.onTouchEvent(/* TouchStart */13, 0, (function ($$event, state) {
                                                                      value[0] = $$event[/* touchData */3];
                                                                      return state;
                                                                    }), state$1);
                                                              var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                                              EventTool$Wonderjs.triggerDomEvent("touchstart", EventTool$Wonderjs.getPointEventBindedDom(state$3), TouchEventTool$Wonderjs.buildTouchEvent(undefined, /* array */[TouchEventTool$Wonderjs.buildTouchData(10, 20, /* () */0)], undefined, /* () */0));
                                                              EventTool$Wonderjs.restore(state$3);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), /* record */[
                                                                          /* clientX */0,
                                                                          /* clientY */0,
                                                                          /* pageX */10,
                                                                          /* pageY */20,
                                                                          /* identifier */0,
                                                                          /* screenX */0,
                                                                          /* screenY */0,
                                                                          /* radiusX */0,
                                                                          /* radiusY */0,
                                                                          /* rotationAngle */0,
                                                                          /* force */0
                                                                        ]);
                                                            }));
                                              }));
                                        describe("test movementDelta", (function () {
                                                describe("compute by lastX,lastY", (function () {
                                                        var _test = function (param, param$1, param$2) {
                                                          var state = TouchEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                                          var state$1 = TouchEventTool$Wonderjs.setLastXY(param[0], param[1], state);
                                                          var state$2 = NoWorkerJobTool$Wonderjs.execInitJobs(state$1);
                                                          var valueX = /* record */[/* contents */0];
                                                          var valueY = /* record */[/* contents */0];
                                                          var state$3 = ManageEventAPI$Wonderjs.onTouchEvent(/* TouchStart */13, 0, (function ($$event, state) {
                                                                  var match = $$event[/* movementDelta */4];
                                                                  valueX[0] = match[0];
                                                                  valueY[0] = match[1];
                                                                  return state;
                                                                }), state$2);
                                                          var state$4 = MainStateTool$Wonderjs.setState(state$3);
                                                          EventTool$Wonderjs.triggerDomEvent("touchstart", EventTool$Wonderjs.getPointEventBindedDom(state$4), TouchEventTool$Wonderjs.buildTouchEvent(undefined, /* array */[TouchEventTool$Wonderjs.buildTouchData(param$1[0], param$1[1], /* () */0)], undefined, /* () */0));
                                                          EventTool$Wonderjs.restore(state$4);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                          valueX[0],
                                                                          valueY[0]
                                                                        ]), /* tuple */[
                                                                      param$2[0],
                                                                      param$2[1]
                                                                    ]);
                                                        };
                                                        Wonder_jest.test("test has no lastX, lastY", (function () {
                                                                return _test(/* tuple */[
                                                                            undefined,
                                                                            undefined
                                                                          ], /* tuple */[
                                                                            0,
                                                                            0
                                                                          ], /* tuple */[
                                                                            0,
                                                                            0
                                                                          ]);
                                                              }));
                                                        return Wonder_jest.test("test has lastX, lastY", (function () {
                                                                      return _test(/* tuple */[
                                                                                  1,
                                                                                  2
                                                                                ], /* tuple */[
                                                                                  10,
                                                                                  11
                                                                                ], /* tuple */[
                                                                                  9,
                                                                                  9
                                                                                ]);
                                                                    }));
                                                      }));
                                                return /* () */0;
                                              }));
                                        return /* () */0;
                                      }));
                                describe("test priority", (function () {
                                        return Wonder_jest.test("the higher priority handleFunc is executed first", (function () {
                                                      var state = TouchEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                                      var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                                      var value = /* record */[/* contents */2];
                                                      var state$2 = ManageEventAPI$Wonderjs.onTouchEvent(/* TouchStart */13, 0, (function (_, state) {
                                                              value[0] = value[0] - 2 | 0;
                                                              return state;
                                                            }), state$1);
                                                      var state$3 = ManageEventAPI$Wonderjs.onTouchEvent(/* TouchStart */13, 1, (function (_, state) {
                                                              value[0] = (value[0] << 1);
                                                              return state;
                                                            }), state$2);
                                                      var state$4 = MainStateTool$Wonderjs.setState(state$3);
                                                      EventTool$Wonderjs.triggerDomEvent("touchstart", EventTool$Wonderjs.getPointEventBindedDom(state$4), TouchEventTool$Wonderjs.buildTouchEvent(undefined, undefined, undefined, /* () */0));
                                                      EventTool$Wonderjs.restore(state$4);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 2);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        describe("bind touchend event", (function () {
                                return _testTouchEvent(/* TouchEnd */11, "touchend");
                              }));
                        describe("bind touchtap event", (function () {
                                return Wonder_jest.test("test trigger event after touchstart and touchend event", (function () {
                                              var state = TouchEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                              var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                              var value = /* record */[/* contents */0];
                                              var state$2 = ManageEventAPI$Wonderjs.onTouchEvent(/* TouchTap */10, 0, (function (_, state) {
                                                      value[0] = 1;
                                                      return state;
                                                    }), state$1);
                                              var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                              EventTool$Wonderjs.triggerDomEvent("touchstart", EventTool$Wonderjs.getPointEventBindedDom(state$3), TouchEventTool$Wonderjs.buildTouchEvent(undefined, undefined, undefined, /* () */0));
                                              EventTool$Wonderjs.triggerDomEvent("touchend", EventTool$Wonderjs.getPointEventBindedDom(state$3), TouchEventTool$Wonderjs.buildTouchEvent(undefined, undefined, undefined, /* () */0));
                                              EventTool$Wonderjs.restore(state$3);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 1);
                                            }));
                              }));
                        describe("bind touchmove event", (function () {
                                _testTouchEvent(/* TouchMove */12, "touchmove");
                                describe("test touch event", (function () {
                                        describe("test movementDelta", (function () {
                                                return Wonder_jest.test("set lastX, lastY after handle", (function () {
                                                              var state = TouchEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                                              var state$1 = TouchEventTool$Wonderjs.setLastXY(undefined, undefined, state);
                                                              var state$2 = NoWorkerJobTool$Wonderjs.execInitJobs(state$1);
                                                              var valueX = /* record */[/* contents */0];
                                                              var valueY = /* record */[/* contents */0];
                                                              var state$3 = ManageEventAPI$Wonderjs.onTouchEvent(/* TouchMove */12, 0, (function ($$event, state) {
                                                                      var match = $$event[/* movementDelta */4];
                                                                      valueX[0] = valueX[0] + match[0] | 0;
                                                                      valueY[0] = valueY[0] + match[1] | 0;
                                                                      return state;
                                                                    }), state$2);
                                                              var state$4 = MainStateTool$Wonderjs.setState(state$3);
                                                              EventTool$Wonderjs.triggerDomEvent("touchmove", EventTool$Wonderjs.getPointEventBindedDom(state$4), TouchEventTool$Wonderjs.buildTouchEvent(undefined, /* array */[TouchEventTool$Wonderjs.buildTouchData(10, 20, /* () */0)], undefined, /* () */0));
                                                              EventTool$Wonderjs.triggerDomEvent("touchmove", EventTool$Wonderjs.getPointEventBindedDom(state$4), TouchEventTool$Wonderjs.buildTouchEvent(undefined, /* array */[TouchEventTool$Wonderjs.buildTouchData(30, 50, /* () */0)], undefined, /* () */0));
                                                              EventTool$Wonderjs.restore(state$4);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                              valueX[0],
                                                                              valueY[0]
                                                                            ]), /* tuple */[
                                                                          20,
                                                                          30
                                                                        ]);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        describe("bind touchdrag event", (function () {
                                Wonder_jest.test("test trigger event when touchmove after touchstart", (function () {
                                        var state = TouchEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                        var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                        var value = /* record */[/* contents */0];
                                        var state$2 = ManageEventAPI$Wonderjs.onTouchEvent(/* TouchDrag */14, 0, (function (_, state) {
                                                value[0] = value[0] + 1 | 0;
                                                return state;
                                              }), state$1);
                                        var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                        EventTool$Wonderjs.triggerDomEvent("touchstart", EventTool$Wonderjs.getPointEventBindedDom(state$3), TouchEventTool$Wonderjs.buildTouchEvent(undefined, undefined, undefined, /* () */0));
                                        EventTool$Wonderjs.triggerDomEvent("touchmove", EventTool$Wonderjs.getPointEventBindedDom(state$3), TouchEventTool$Wonderjs.buildTouchEvent(undefined, undefined, undefined, /* () */0));
                                        EventTool$Wonderjs.triggerDomEvent("touchmove", EventTool$Wonderjs.getPointEventBindedDom(state$3), TouchEventTool$Wonderjs.buildTouchEvent(undefined, undefined, undefined, /* () */0));
                                        EventTool$Wonderjs.restore(state$3);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 2);
                                      }));
                                Wonder_jest.test("test stop event when touchend", (function () {
                                        var state = TouchEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                        var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                        var value = /* record */[/* contents */0];
                                        var state$2 = ManageEventAPI$Wonderjs.onTouchEvent(/* TouchDrag */14, 0, (function (_, state) {
                                                value[0] = value[0] + 1 | 0;
                                                return state;
                                              }), state$1);
                                        var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                        EventTool$Wonderjs.triggerDomEvent("touchstart", EventTool$Wonderjs.getPointEventBindedDom(state$3), TouchEventTool$Wonderjs.buildTouchEvent(undefined, undefined, undefined, /* () */0));
                                        EventTool$Wonderjs.triggerDomEvent("touchmove", EventTool$Wonderjs.getPointEventBindedDom(state$3), TouchEventTool$Wonderjs.buildTouchEvent(undefined, undefined, undefined, /* () */0));
                                        EventTool$Wonderjs.triggerDomEvent("touchend", EventTool$Wonderjs.getPointEventBindedDom(state$3), TouchEventTool$Wonderjs.buildTouchEvent(undefined, undefined, undefined, /* () */0));
                                        EventTool$Wonderjs.triggerDomEvent("touchmove", EventTool$Wonderjs.getPointEventBindedDom(state$3), TouchEventTool$Wonderjs.buildTouchEvent(undefined, undefined, undefined, /* () */0));
                                        EventTool$Wonderjs.restore(state$3);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 1);
                                      }));
                                describe("test unbind by handleFunc", (function () {
                                        return Wonder_jest.test("test", (function () {
                                                      var state = TouchEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                                      var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                                      var value = /* record */[/* contents */0];
                                                      var handleFunc = function (_, state) {
                                                        value[0] = value[0] + 1 | 0;
                                                        return state;
                                                      };
                                                      var state$2 = ManageEventAPI$Wonderjs.onTouchEvent(/* TouchDrag */14, 0, handleFunc, state$1);
                                                      var state$3 = ManageEventAPI$Wonderjs.offTouchEventByHandleFunc(/* TouchDrag */14, handleFunc, state$2);
                                                      var state$4 = MainStateTool$Wonderjs.setState(state$3);
                                                      EventTool$Wonderjs.triggerDomEvent("touchstart", EventTool$Wonderjs.getPointEventBindedDom(state$4), TouchEventTool$Wonderjs.buildTouchEvent(undefined, undefined, undefined, /* () */0));
                                                      EventTool$Wonderjs.triggerDomEvent("touchmove", EventTool$Wonderjs.getPointEventBindedDom(state$4), TouchEventTool$Wonderjs.buildTouchEvent(undefined, undefined, undefined, /* () */0));
                                                      EventTool$Wonderjs.restore(state$4);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 0);
                                                    }));
                                      }));
                                describe("test movement", (function () {
                                        var _prepare = function () {
                                          var state = TouchEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                          var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                          var movementX = /* record */[/* contents */0];
                                          var movementY = /* record */[/* contents */0];
                                          var state$2 = ManageEventAPI$Wonderjs.onTouchEvent(/* TouchDrag */14, 0, (function ($$event, state) {
                                                  var match = $$event[/* movementDelta */4];
                                                  movementX[0] = match[0];
                                                  movementY[0] = match[1];
                                                  return state;
                                                }), state$1);
                                          return /* tuple */[
                                                  state$2,
                                                  /* tuple */[
                                                    movementX,
                                                    movementY
                                                  ]
                                                ];
                                        };
                                        Wonder_jest.test("if not set lastXY on touchmove event if touchdrag event is triggering", (function () {
                                                var match = _prepare(/* () */0);
                                                var match$1 = match[1];
                                                var state = MainStateTool$Wonderjs.setState(match[0]);
                                                EventTool$Wonderjs.triggerDomEvent("touchmove", EventTool$Wonderjs.getPointEventBindedDom(state), TouchEventTool$Wonderjs.buildTouchEvent(undefined, /* array */[TouchEventTool$Wonderjs.buildTouchData(1, 2, /* () */0)], undefined, /* () */0));
                                                EventTool$Wonderjs.triggerDomEvent("touchstart", EventTool$Wonderjs.getPointEventBindedDom(state), TouchEventTool$Wonderjs.buildTouchEvent(undefined, undefined, undefined, /* () */0));
                                                EventTool$Wonderjs.triggerDomEvent("touchmove", EventTool$Wonderjs.getPointEventBindedDom(state), TouchEventTool$Wonderjs.buildTouchEvent(undefined, /* array */[TouchEventTool$Wonderjs.buildTouchData(10, 20, /* () */0)], undefined, /* () */0));
                                                EventTool$Wonderjs.triggerDomEvent("touchmove", EventTool$Wonderjs.getPointEventBindedDom(state), TouchEventTool$Wonderjs.buildTouchEvent(undefined, /* array */[TouchEventTool$Wonderjs.buildTouchData(50, 70, /* () */0)], undefined, /* () */0));
                                                EventTool$Wonderjs.restore(state);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                match$1[0][0],
                                                                match$1[1][0]
                                                              ]), /* tuple */[
                                                            40,
                                                            50
                                                          ]);
                                              }));
                                        return Wonder_jest.test("reset lastX,lastY when drag start", (function () {
                                                      var match = _prepare(/* () */0);
                                                      var match$1 = match[1];
                                                      var state = MainStateTool$Wonderjs.setState(match[0]);
                                                      EventTool$Wonderjs.triggerDomEvent("touchmove", EventTool$Wonderjs.getPointEventBindedDom(state), TouchEventTool$Wonderjs.buildTouchEvent(undefined, /* array */[TouchEventTool$Wonderjs.buildTouchData(1, 2, /* () */0)], undefined, /* () */0));
                                                      EventTool$Wonderjs.triggerDomEvent("touchstart", EventTool$Wonderjs.getPointEventBindedDom(state), TouchEventTool$Wonderjs.buildTouchEvent(undefined, undefined, undefined, /* () */0));
                                                      EventTool$Wonderjs.triggerDomEvent("touchmove", EventTool$Wonderjs.getPointEventBindedDom(state), TouchEventTool$Wonderjs.buildTouchEvent(undefined, /* array */[TouchEventTool$Wonderjs.buildTouchData(50, 80, /* () */0)], undefined, /* () */0));
                                                      EventTool$Wonderjs.restore(state);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      match$1[0][0],
                                                                      match$1[1][0]
                                                                    ]), /* tuple */[
                                                                  0,
                                                                  0
                                                                ]);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("bind dom event to trigger point event", (function () {
                describe("bind mouse event to trigger point event", (function () {
                        var _testPointEvent = function (pointEventName, mouseDomEventName) {
                          Wonder_jest.test("test bind", (function () {
                                  var state = MouseEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                  var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                  var value = /* record */[/* contents */0];
                                  var state$2 = ManageEventAPI$Wonderjs.onCustomGlobalEvent(pointEventName, 0, (function ($$event, state) {
                                          value[0] = 1;
                                          return /* tuple */[
                                                  state,
                                                  $$event
                                                ];
                                        }), state$1);
                                  var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                  EventTool$Wonderjs.triggerDomEvent(mouseDomEventName, EventTool$Wonderjs.getPointEventBindedDom(state$3), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                  EventTool$Wonderjs.restore(state$3);
                                  return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 1);
                                }));
                          describe("test unbind by handleFunc", (function () {
                                  return Wonder_jest.test("test unbind one handleFunc of the eventName", (function () {
                                                var state = MouseEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                                var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                                var value = /* record */[/* contents */0];
                                                var handleFunc = function ($$event, state) {
                                                  value[0] = value[0] + 1 | 0;
                                                  return /* tuple */[
                                                          state,
                                                          $$event
                                                        ];
                                                };
                                                var state$2 = ManageEventAPI$Wonderjs.onCustomGlobalEvent(pointEventName, 0, handleFunc, state$1);
                                                var state$3 = ManageEventAPI$Wonderjs.onCustomGlobalEvent(pointEventName, 0, (function ($$event, state) {
                                                        value[0] = value[0] + 10 | 0;
                                                        return /* tuple */[
                                                                state,
                                                                $$event
                                                              ];
                                                      }), state$2);
                                                var state$4 = ManageEventAPI$Wonderjs.offCustomGlobalEventByHandleFunc(pointEventName, handleFunc, state$3);
                                                var state$5 = MainStateTool$Wonderjs.setState(state$4);
                                                EventTool$Wonderjs.triggerDomEvent(mouseDomEventName, EventTool$Wonderjs.getPointEventBindedDom(state$5), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                EventTool$Wonderjs.restore(state$5);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 10);
                                              }));
                                }));
                          describe("test unbind by eventName", (function () {
                                  return Wonder_jest.test("test", (function () {
                                                var state = MouseEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                                var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                                var value = /* record */[/* contents */0];
                                                var handleFunc = function ($$event, state) {
                                                  value[0] = value[0] + 1 | 0;
                                                  return /* tuple */[
                                                          state,
                                                          $$event
                                                        ];
                                                };
                                                var state$2 = ManageEventAPI$Wonderjs.onCustomGlobalEvent(pointEventName, 0, handleFunc, state$1);
                                                var state$3 = ManageEventAPI$Wonderjs.onCustomGlobalEvent(pointEventName, 0, (function ($$event, state) {
                                                        value[0] = value[0] + 10 | 0;
                                                        return /* tuple */[
                                                                state,
                                                                $$event
                                                              ];
                                                      }), state$2);
                                                var state$4 = ManageEventAPI$Wonderjs.offCustomGlobalEventByEventName(pointEventName, state$3);
                                                var state$5 = MainStateTool$Wonderjs.setState(state$4);
                                                EventTool$Wonderjs.triggerDomEvent(mouseDomEventName, EventTool$Wonderjs.getPointEventBindedDom(state$5), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                EventTool$Wonderjs.restore(state$5);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 0);
                                              }));
                                }));
                          return /* () */0;
                        };
                        describe("test trigger pointdown event", (function () {
                                _testPointEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), "mousedown");
                                describe("test point event", (function () {
                                        Wonder_jest.test("test event", (function () {
                                                var state = MouseEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                                var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                                var value = /* record */[/* contents */0];
                                                var state$2 = ManageEventAPI$Wonderjs.onCustomGlobalEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), 0, (function (customEvent, state) {
                                                        var match = OptionService$Wonderjs.unsafeGet(customEvent[/* userData */4]);
                                                        value[0] = match[/* event */6].pageX;
                                                        return /* tuple */[
                                                                state,
                                                                customEvent
                                                              ];
                                                      }), state$1);
                                                var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                                var mouseDomEvent = MouseEventTool$Wonderjs.buildMouseEvent(10, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                EventTool$Wonderjs.triggerDomEvent("mousedown", EventTool$Wonderjs.getPointEventBindedDom(state$3), mouseDomEvent);
                                                EventTool$Wonderjs.restore(state$3);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 10);
                                              }));
                                        return Wonder_jest.test("test name, location, locationInView, button, wheel, movementDelta", (function () {
                                                      var state = MouseEventTool$Wonderjs.prepare(sandbox, 1, 2, Js_primitive.some(undefined), undefined, /* () */0);
                                                      MouseEventTool$Wonderjs.setPointerLocked();
                                                      var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                                      var resultArr = /* array */[];
                                                      var state$2 = ManageEventAPI$Wonderjs.onCustomGlobalEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), 0, (function ($$event, state) {
                                                              var match = OptionService$Wonderjs.unsafeGet($$event[/* userData */4]);
                                                              resultArr.push(match[/* name */0], match[/* location */1], match[/* locationInView */2], match[/* button */3], match[/* wheel */4], match[/* movementDelta */5]);
                                                              return /* tuple */[
                                                                      state,
                                                                      $$event
                                                                    ];
                                                            }), state$1);
                                                      var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                                      var mouseDomEvent = MouseEventTool$Wonderjs.buildMouseEvent(10, 20, 0, 1, 2, 2, Js_primitive.some(undefined), undefined, undefined, /* () */0);
                                                      EventTool$Wonderjs.triggerDomEvent("mousedown", EventTool$Wonderjs.getPointEventBindedDom(state$3), mouseDomEvent);
                                                      EventTool$Wonderjs.restore(state$3);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](resultArr), /* array */[
                                                                  /* PointDown */1,
                                                                  /* tuple */[
                                                                    10,
                                                                    20
                                                                  ],
                                                                  /* tuple */[
                                                                    9,
                                                                    18
                                                                  ],
                                                                  /* Left */0,
                                                                  -2,
                                                                  /* tuple */[
                                                                    1,
                                                                    2
                                                                  ]
                                                                ]);
                                                    }));
                                      }));
                                describe("test priority", (function () {
                                        return Wonder_jest.test("the higher priority handleFunc is executed first", (function () {
                                                      var state = MouseEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                                      var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                                      var value = /* record */[/* contents */2];
                                                      var state$2 = ManageEventAPI$Wonderjs.onCustomGlobalEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), 0, (function ($$event, state) {
                                                              value[0] = value[0] - 2 | 0;
                                                              return /* tuple */[
                                                                      state,
                                                                      $$event
                                                                    ];
                                                            }), state$1);
                                                      var state$3 = ManageEventAPI$Wonderjs.onCustomGlobalEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), 1, (function ($$event, state) {
                                                              value[0] = (value[0] << 1);
                                                              return /* tuple */[
                                                                      state,
                                                                      $$event
                                                                    ];
                                                            }), state$2);
                                                      var state$4 = MainStateTool$Wonderjs.setState(state$3);
                                                      EventTool$Wonderjs.triggerDomEvent("mousedown", EventTool$Wonderjs.getPointEventBindedDom(state$4), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                      EventTool$Wonderjs.restore(state$4);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 2);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        describe("test trigger pointup event", (function () {
                                return _testPointEvent(CustomEventTool$Wonderjs.getPointUpEventName(/* () */0), "mouseup");
                              }));
                        describe("test trigger pointtap event", (function () {
                                return _testPointEvent(CustomEventTool$Wonderjs.getPointTapEventName(/* () */0), "click");
                              }));
                        describe("test trigger pointscale event", (function () {
                                return _testPointEvent(CustomEventTool$Wonderjs.getPointScaleEventName(/* () */0), "mousewheel");
                              }));
                        describe("test trigger pointmove event", (function () {
                                return _testPointEvent(CustomEventTool$Wonderjs.getPointMoveEventName(/* () */0), "mousemove");
                              }));
                        describe("test trigger pointdrag event", (function () {
                                return Wonder_jest.test("test trigger event when trigger mousedrag event", (function () {
                                              var state = MouseEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                              var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                              var value = /* record */[/* contents */0];
                                              var state$2 = ManageEventAPI$Wonderjs.onCustomGlobalEvent(CustomEventTool$Wonderjs.getPointDragEventName(/* () */0), 0, (function ($$event, state) {
                                                      value[0] = value[0] + 1 | 0;
                                                      return /* tuple */[
                                                              state,
                                                              $$event
                                                            ];
                                                    }), state$1);
                                              var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                              EventTool$Wonderjs.triggerDomEvent("mousedown", EventTool$Wonderjs.getPointEventBindedDom(state$3), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                              EventTool$Wonderjs.triggerDomEvent("mousemove", EventTool$Wonderjs.getPointEventBindedDom(state$3), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                              EventTool$Wonderjs.triggerDomEvent("mousemove", EventTool$Wonderjs.getPointEventBindedDom(state$3), MouseEventTool$Wonderjs.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                              EventTool$Wonderjs.restore(state$3);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 2);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("bind touch event to trigger point event", (function () {
                        var _testPointEvent = function (pointEventName, touchDomEventName) {
                          Wonder_jest.test("test bind", (function () {
                                  var state = TouchEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                  var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                  var value = /* record */[/* contents */0];
                                  var state$2 = ManageEventAPI$Wonderjs.onCustomGlobalEvent(pointEventName, 0, (function ($$event, state) {
                                          value[0] = 1;
                                          return /* tuple */[
                                                  state,
                                                  $$event
                                                ];
                                        }), state$1);
                                  var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                  EventTool$Wonderjs.triggerDomEvent(touchDomEventName, EventTool$Wonderjs.getPointEventBindedDom(state$3), TouchEventTool$Wonderjs.buildTouchEvent(undefined, undefined, undefined, /* () */0));
                                  EventTool$Wonderjs.restore(state$3);
                                  return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 1);
                                }));
                          describe("test unbind by handleFunc", (function () {
                                  return Wonder_jest.test("test unbind one handleFunc of the eventName", (function () {
                                                var state = TouchEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                                var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                                var value = /* record */[/* contents */0];
                                                var handleFunc = function ($$event, state) {
                                                  value[0] = value[0] + 1 | 0;
                                                  return /* tuple */[
                                                          state,
                                                          $$event
                                                        ];
                                                };
                                                var state$2 = ManageEventAPI$Wonderjs.onCustomGlobalEvent(pointEventName, 0, handleFunc, state$1);
                                                var state$3 = ManageEventAPI$Wonderjs.onCustomGlobalEvent(pointEventName, 0, (function ($$event, state) {
                                                        value[0] = value[0] + 10 | 0;
                                                        return /* tuple */[
                                                                state,
                                                                $$event
                                                              ];
                                                      }), state$2);
                                                var state$4 = ManageEventAPI$Wonderjs.offCustomGlobalEventByHandleFunc(pointEventName, handleFunc, state$3);
                                                var state$5 = MainStateTool$Wonderjs.setState(state$4);
                                                EventTool$Wonderjs.triggerDomEvent(touchDomEventName, EventTool$Wonderjs.getPointEventBindedDom(state$5), TouchEventTool$Wonderjs.buildTouchEvent(undefined, undefined, undefined, /* () */0));
                                                EventTool$Wonderjs.restore(state$5);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 10);
                                              }));
                                }));
                          describe("test unbind by eventName", (function () {
                                  return Wonder_jest.test("test", (function () {
                                                var state = TouchEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                                var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                                var value = /* record */[/* contents */0];
                                                var handleFunc = function ($$event, state) {
                                                  value[0] = value[0] + 1 | 0;
                                                  return /* tuple */[
                                                          state,
                                                          $$event
                                                        ];
                                                };
                                                var state$2 = ManageEventAPI$Wonderjs.onCustomGlobalEvent(pointEventName, 0, handleFunc, state$1);
                                                var state$3 = ManageEventAPI$Wonderjs.onCustomGlobalEvent(pointEventName, 0, (function ($$event, state) {
                                                        value[0] = value[0] + 10 | 0;
                                                        return /* tuple */[
                                                                state,
                                                                $$event
                                                              ];
                                                      }), state$2);
                                                var state$4 = ManageEventAPI$Wonderjs.offCustomGlobalEventByEventName(pointEventName, state$3);
                                                var state$5 = MainStateTool$Wonderjs.setState(state$4);
                                                EventTool$Wonderjs.triggerDomEvent(touchDomEventName, EventTool$Wonderjs.getPointEventBindedDom(state$5), TouchEventTool$Wonderjs.buildTouchEvent(undefined, undefined, undefined, /* () */0));
                                                EventTool$Wonderjs.restore(state$5);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 0);
                                              }));
                                }));
                          return /* () */0;
                        };
                        describe("test trigger pointdown event", (function () {
                                _testPointEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), "touchstart");
                                describe("test point event", (function () {
                                        Wonder_jest.test("test event", (function () {
                                                var state = TouchEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                                var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                                var value = /* record */[/* contents */0];
                                                var state$2 = ManageEventAPI$Wonderjs.onCustomGlobalEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), 0, (function (customEvent, state) {
                                                        var match = OptionService$Wonderjs.unsafeGet(customEvent[/* userData */4]);
                                                        var changedTouches = match[/* event */6].changedTouches;
                                                        value[0] = Caml_array.caml_array_get(changedTouches, 0).pageX;
                                                        return /* tuple */[
                                                                state,
                                                                customEvent
                                                              ];
                                                      }), state$1);
                                                var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                                var touchDomEvent = TouchEventTool$Wonderjs.buildTouchEvent(undefined, /* array */[TouchEventTool$Wonderjs.buildTouchData(10, undefined, /* () */0)], undefined, /* () */0);
                                                EventTool$Wonderjs.triggerDomEvent("touchstart", EventTool$Wonderjs.getPointEventBindedDom(state$3), touchDomEvent);
                                                EventTool$Wonderjs.restore(state$3);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 10);
                                              }));
                                        return Wonder_jest.test("test name, location, locationInView, button, wheel, movementDelta", (function () {
                                                      var state = TouchEventTool$Wonderjs.prepare(sandbox, 1, 2, Js_primitive.some(undefined), undefined, /* () */0);
                                                      var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                                      var resultArr = /* array */[];
                                                      var state$2 = ManageEventAPI$Wonderjs.onCustomGlobalEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), 0, (function ($$event, state) {
                                                              var match = OptionService$Wonderjs.unsafeGet($$event[/* userData */4]);
                                                              resultArr.push(match[/* name */0], match[/* location */1], match[/* locationInView */2], match[/* button */3], match[/* wheel */4], match[/* movementDelta */5]);
                                                              return /* tuple */[
                                                                      state,
                                                                      $$event
                                                                    ];
                                                            }), state$1);
                                                      var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                                      var touchDomEvent = TouchEventTool$Wonderjs.buildTouchEvent(undefined, /* array */[TouchEventTool$Wonderjs.buildTouchData(10, 20, /* () */0)], undefined, /* () */0);
                                                      EventTool$Wonderjs.triggerDomEvent("touchstart", EventTool$Wonderjs.getPointEventBindedDom(state$3), touchDomEvent);
                                                      EventTool$Wonderjs.restore(state$3);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](resultArr), /* array */[
                                                                  /* PointDown */1,
                                                                  /* tuple */[
                                                                    10,
                                                                    20
                                                                  ],
                                                                  /* tuple */[
                                                                    9,
                                                                    18
                                                                  ],
                                                                  undefined,
                                                                  undefined,
                                                                  /* tuple */[
                                                                    0,
                                                                    0
                                                                  ]
                                                                ]);
                                                    }));
                                      }));
                                describe("test priority", (function () {
                                        return Wonder_jest.test("the higher priority handleFunc is executed first", (function () {
                                                      var state = TouchEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                                      var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                                      var value = /* record */[/* contents */2];
                                                      var state$2 = ManageEventAPI$Wonderjs.onCustomGlobalEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), 0, (function ($$event, state) {
                                                              value[0] = value[0] - 2 | 0;
                                                              return /* tuple */[
                                                                      state,
                                                                      $$event
                                                                    ];
                                                            }), state$1);
                                                      var state$3 = ManageEventAPI$Wonderjs.onCustomGlobalEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), 1, (function ($$event, state) {
                                                              value[0] = (value[0] << 1);
                                                              return /* tuple */[
                                                                      state,
                                                                      $$event
                                                                    ];
                                                            }), state$2);
                                                      var state$4 = MainStateTool$Wonderjs.setState(state$3);
                                                      EventTool$Wonderjs.triggerDomEvent("touchstart", EventTool$Wonderjs.getPointEventBindedDom(state$4), TouchEventTool$Wonderjs.buildTouchEvent(undefined, undefined, undefined, /* () */0));
                                                      EventTool$Wonderjs.restore(state$4);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 2);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        describe("test trigger pointup event", (function () {
                                return _testPointEvent(CustomEventTool$Wonderjs.getPointUpEventName(/* () */0), "touchend");
                              }));
                        describe("test trigger pointtap event", (function () {
                                Wonder_jest.test("test bind", (function () {
                                        var state = TouchEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                        var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                        var value = /* record */[/* contents */0];
                                        var state$2 = ManageEventAPI$Wonderjs.onCustomGlobalEvent(CustomEventTool$Wonderjs.getPointTapEventName(/* () */0), 0, (function ($$event, state) {
                                                value[0] = 1;
                                                return /* tuple */[
                                                        state,
                                                        $$event
                                                      ];
                                              }), state$1);
                                        var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                        EventTool$Wonderjs.triggerDomEvent("touchstart", EventTool$Wonderjs.getPointEventBindedDom(state$3), TouchEventTool$Wonderjs.buildTouchEvent(undefined, undefined, undefined, /* () */0));
                                        EventTool$Wonderjs.triggerDomEvent("touchend", EventTool$Wonderjs.getPointEventBindedDom(state$3), TouchEventTool$Wonderjs.buildTouchEvent(undefined, undefined, undefined, /* () */0));
                                        EventTool$Wonderjs.restore(state$3);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 1);
                                      }));
                                describe("test unbind by handleFunc", (function () {
                                        return Wonder_jest.test("test unbind one handleFunc of the eventName", (function () {
                                                      var state = TouchEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                                      var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                                      var value = /* record */[/* contents */0];
                                                      var handleFunc = function ($$event, state) {
                                                        value[0] = value[0] + 1 | 0;
                                                        return /* tuple */[
                                                                state,
                                                                $$event
                                                              ];
                                                      };
                                                      var state$2 = ManageEventAPI$Wonderjs.onCustomGlobalEvent(CustomEventTool$Wonderjs.getPointTapEventName(/* () */0), 0, handleFunc, state$1);
                                                      var state$3 = ManageEventAPI$Wonderjs.onCustomGlobalEvent(CustomEventTool$Wonderjs.getPointTapEventName(/* () */0), 0, (function ($$event, state) {
                                                              value[0] = value[0] + 10 | 0;
                                                              return /* tuple */[
                                                                      state,
                                                                      $$event
                                                                    ];
                                                            }), state$2);
                                                      var state$4 = ManageEventAPI$Wonderjs.offCustomGlobalEventByHandleFunc(CustomEventTool$Wonderjs.getPointTapEventName(/* () */0), handleFunc, state$3);
                                                      var state$5 = MainStateTool$Wonderjs.setState(state$4);
                                                      EventTool$Wonderjs.triggerDomEvent("touchstart", EventTool$Wonderjs.getPointEventBindedDom(state$5), TouchEventTool$Wonderjs.buildTouchEvent(undefined, undefined, undefined, /* () */0));
                                                      EventTool$Wonderjs.triggerDomEvent("touchend", EventTool$Wonderjs.getPointEventBindedDom(state$5), TouchEventTool$Wonderjs.buildTouchEvent(undefined, undefined, undefined, /* () */0));
                                                      EventTool$Wonderjs.restore(state$5);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 10);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        describe("test trigger pointmove event", (function () {
                                return _testPointEvent(CustomEventTool$Wonderjs.getPointMoveEventName(/* () */0), "touchmove");
                              }));
                        describe("test trigger pointdrag event", (function () {
                                return Wonder_jest.test("test trigger event when trigger touchdrag event", (function () {
                                              var state = TouchEventTool$Wonderjs.prepare(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                              var state$1 = NoWorkerJobTool$Wonderjs.execInitJobs(state);
                                              var value = /* record */[/* contents */0];
                                              var state$2 = ManageEventAPI$Wonderjs.onCustomGlobalEvent(CustomEventTool$Wonderjs.getPointDragEventName(/* () */0), 0, (function ($$event, state) {
                                                      value[0] = value[0] + 1 | 0;
                                                      return /* tuple */[
                                                              state,
                                                              $$event
                                                            ];
                                                    }), state$1);
                                              var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                              EventTool$Wonderjs.triggerDomEvent("touchstart", EventTool$Wonderjs.getPointEventBindedDom(state$3), TouchEventTool$Wonderjs.buildTouchEvent(undefined, undefined, undefined, /* () */0));
                                              EventTool$Wonderjs.triggerDomEvent("touchmove", EventTool$Wonderjs.getPointEventBindedDom(state$3), TouchEventTool$Wonderjs.buildTouchEvent(undefined, undefined, undefined, /* () */0));
                                              EventTool$Wonderjs.triggerDomEvent("touchmove", EventTool$Wonderjs.getPointEventBindedDom(state$3), TouchEventTool$Wonderjs.buildTouchEvent(undefined, undefined, undefined, /* () */0));
                                              EventTool$Wonderjs.restore(state$3);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 2);
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
