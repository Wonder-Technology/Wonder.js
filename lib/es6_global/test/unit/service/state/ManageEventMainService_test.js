

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_int32 from "../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../tool/TestTool.js";
import * as GameObjectAPI$Wonderjs from "../../../../src/api/GameObjectAPI.js";
import * as GameObjectTool$Wonderjs from "../../../tool/service/gameObject/GameObjectTool.js";
import * as ManageEventAPI$Wonderjs from "../../../../src/api/event/ManageEventAPI.js";
import * as CustomEventTool$Wonderjs from "../../job/no_worker/tool/CustomEventTool.js";
import * as CreateStateMainService$Wonderjs from "../../../../src/service/state/main/state/CreateStateMainService.js";

Wonder_jest.describe("ManageEventMainService", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */CreateStateMainService$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.init(sandbox, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test custom gameObject event", (function (param) {
                Wonder_jest.describe("test bind", (function (param) {
                        Wonder_jest.test("test bind one gameObject", (function (param) {
                                var value = /* record */[/* contents */0];
                                var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                                var gameObject = match[1];
                                var state$1 = ManageEventAPI$Wonderjs.onCustomGameObjectEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), gameObject, 0, (function ($$event, state) {
                                        value[0] = 1;
                                        return /* tuple */[
                                                state,
                                                $$event
                                              ];
                                      }), match[0]);
                                ManageEventAPI$Wonderjs.triggerCustomGameObjectEvent(CustomEventTool$Wonderjs.createCustomEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), undefined, /* () */0), gameObject, state$1);
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 1);
                              }));
                        return Wonder_jest.test("test bind three gameObjects", (function (param) {
                                      var value = /* record */[/* contents */1];
                                      var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                                      var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                                      var gameObject2 = match$1[1];
                                      var match$2 = GameObjectAPI$Wonderjs.createGameObject(match$1[0]);
                                      var state$1 = ManageEventAPI$Wonderjs.onCustomGameObjectEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), match[1], 0, (function ($$event, state) {
                                              value[0] = (value[0] << 1);
                                              return /* tuple */[
                                                      state,
                                                      $$event
                                                    ];
                                            }), match$2[0]);
                                      var state$2 = ManageEventAPI$Wonderjs.onCustomGameObjectEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), gameObject2, 0, (function ($$event, state) {
                                              value[0] = Caml_int32.imul(value[0], 3);
                                              return /* tuple */[
                                                      state,
                                                      $$event
                                                    ];
                                            }), state$1);
                                      var state$3 = ManageEventAPI$Wonderjs.onCustomGameObjectEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), gameObject2, 0, (function ($$event, state) {
                                              value[0] = (value[0] << 2);
                                              return /* tuple */[
                                                      state,
                                                      $$event
                                                    ];
                                            }), state$2);
                                      var match$3 = ManageEventAPI$Wonderjs.triggerCustomGameObjectEvent(CustomEventTool$Wonderjs.createCustomEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), undefined, /* () */0), gameObject2, state$3);
                                      ManageEventAPI$Wonderjs.triggerCustomGameObjectEvent(CustomEventTool$Wonderjs.createCustomEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), undefined, /* () */0), match$2[1], match$3[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 12);
                                    }));
                      }));
                Wonder_jest.describe("test unbind by handleFunc", (function (param) {
                        return Wonder_jest.test("test", (function (param) {
                                      var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                                      var gameObject = match[1];
                                      var value = /* record */[/* contents */0];
                                      var handleFunc = function ($$event, state) {
                                        value[0] = value[0] + 1 | 0;
                                        return /* tuple */[
                                                state,
                                                $$event
                                              ];
                                      };
                                      var state$1 = ManageEventAPI$Wonderjs.onCustomGameObjectEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), gameObject, 0, handleFunc, match[0]);
                                      var state$2 = ManageEventAPI$Wonderjs.onCustomGameObjectEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), gameObject, 0, (function ($$event, state) {
                                              value[0] = value[0] + 10 | 0;
                                              return /* tuple */[
                                                      state,
                                                      $$event
                                                    ];
                                            }), state$1);
                                      var state$3 = ManageEventAPI$Wonderjs.offCustomGameObjectEventByHandleFunc(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), gameObject, handleFunc, state$2);
                                      ManageEventAPI$Wonderjs.triggerCustomGameObjectEvent(CustomEventTool$Wonderjs.createCustomEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), undefined, /* () */0), gameObject, state$3);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 10);
                                    }));
                      }));
                Wonder_jest.describe("test unbind by target", (function (param) {
                        return Wonder_jest.test("test", (function (param) {
                                      var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                                      var gameObject1 = match[1];
                                      var value = /* record */[/* contents */0];
                                      var handleFunc = function ($$event, state) {
                                        value[0] = value[0] + 1 | 0;
                                        return /* tuple */[
                                                state,
                                                $$event
                                              ];
                                      };
                                      var state$1 = ManageEventAPI$Wonderjs.onCustomGameObjectEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), gameObject1, 0, handleFunc, match[0]);
                                      var state$2 = ManageEventAPI$Wonderjs.onCustomGameObjectEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), gameObject1, 0, (function ($$event, state) {
                                              value[0] = value[0] + 10 | 0;
                                              return /* tuple */[
                                                      state,
                                                      $$event
                                                    ];
                                            }), state$1);
                                      var state$3 = ManageEventAPI$Wonderjs.offCustomGameObjectEventByTarget(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), gameObject1, state$2);
                                      ManageEventAPI$Wonderjs.triggerCustomGameObjectEvent(CustomEventTool$Wonderjs.createCustomEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), undefined, /* () */0), gameObject1, state$3);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 0);
                                    }));
                      }));
                Wonder_jest.describe("test priority", (function (param) {
                        return Wonder_jest.test("the higher priority handleFunc is executed first", (function (param) {
                                      var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                                      var gameObject1 = match[1];
                                      var value = /* record */[/* contents */2];
                                      var state$1 = ManageEventAPI$Wonderjs.onCustomGameObjectEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), gameObject1, 1, (function ($$event, state) {
                                              value[0] = value[0] - 3 | 0;
                                              return /* tuple */[
                                                      state,
                                                      $$event
                                                    ];
                                            }), match[0]);
                                      var state$2 = ManageEventAPI$Wonderjs.onCustomGameObjectEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), gameObject1, 0, (function ($$event, state) {
                                              value[0] = (value[0] << 1);
                                              return /* tuple */[
                                                      state,
                                                      $$event
                                                    ];
                                            }), state$1);
                                      ManageEventAPI$Wonderjs.triggerCustomGameObjectEvent(CustomEventTool$Wonderjs.createCustomEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), undefined, /* () */0), gameObject1, state$2);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), -2);
                                    }));
                      }));
                Wonder_jest.describe("test broadcast custom gameObject event", (function (param) {
                        return Wonder_jest.test("trigger gameObject's and its all children' custom event", (function (param) {
                                      var value = /* record */[/* contents */0];
                                      var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                                      var gameObject1 = match[1];
                                      var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                                      var gameObject2 = match$1[1];
                                      var match$2 = GameObjectAPI$Wonderjs.createGameObject(match$1[0]);
                                      var gameObject3 = match$2[1];
                                      var state$1 = GameObjectTool$Wonderjs.addChild(gameObject2, gameObject3, GameObjectTool$Wonderjs.addChild(gameObject1, gameObject2, match$2[0]));
                                      var state$2 = ManageEventAPI$Wonderjs.onCustomGameObjectEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), gameObject1, 0, (function ($$event, state) {
                                              value[0] = value[0] + 1 | 0;
                                              return /* tuple */[
                                                      state,
                                                      $$event
                                                    ];
                                            }), state$1);
                                      var state$3 = ManageEventAPI$Wonderjs.onCustomGameObjectEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), gameObject2, 0, (function ($$event, state) {
                                              value[0] = value[0] + 2 | 0;
                                              return /* tuple */[
                                                      state,
                                                      $$event
                                                    ];
                                            }), state$2);
                                      var state$4 = ManageEventAPI$Wonderjs.onCustomGameObjectEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), gameObject3, 0, (function ($$event, state) {
                                              value[0] = value[0] + 3 | 0;
                                              return /* tuple */[
                                                      state,
                                                      $$event
                                                    ];
                                            }), state$3);
                                      ManageEventAPI$Wonderjs.broadcastCustomGameObjectEvent(CustomEventTool$Wonderjs.createCustomEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), undefined, /* () */0), gameObject1, state$4);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 6);
                                    }));
                      }));
                return Wonder_jest.describe("test emit custom gameObject event", (function (param) {
                              return Wonder_jest.test("trigger gameObject's and its all parents' custom event", (function (param) {
                                            var value = /* record */[/* contents */2];
                                            var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                                            var gameObject1 = match[1];
                                            var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                                            var gameObject2 = match$1[1];
                                            var match$2 = GameObjectAPI$Wonderjs.createGameObject(match$1[0]);
                                            var gameObject3 = match$2[1];
                                            var state$1 = GameObjectTool$Wonderjs.addChild(gameObject2, gameObject3, GameObjectTool$Wonderjs.addChild(gameObject1, gameObject2, match$2[0]));
                                            var state$2 = ManageEventAPI$Wonderjs.onCustomGameObjectEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), gameObject1, 0, (function ($$event, state) {
                                                    value[0] = value[0] + 1 | 0;
                                                    return /* tuple */[
                                                            state,
                                                            $$event
                                                          ];
                                                  }), state$1);
                                            var state$3 = ManageEventAPI$Wonderjs.onCustomGameObjectEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), gameObject2, 0, (function ($$event, state) {
                                                    value[0] = value[0] + 2 | 0;
                                                    return /* tuple */[
                                                            state,
                                                            $$event
                                                          ];
                                                  }), state$2);
                                            var state$4 = ManageEventAPI$Wonderjs.onCustomGameObjectEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), gameObject3, 0, (function ($$event, state) {
                                                    value[0] = Caml_int32.imul(value[0], 3);
                                                    return /* tuple */[
                                                            state,
                                                            $$event
                                                          ];
                                                  }), state$3);
                                            ManageEventAPI$Wonderjs.emitCustomGameObjectEvent(CustomEventTool$Wonderjs.createCustomEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), undefined, /* () */0), gameObject3, state$4);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 9);
                                          }));
                            }));
              }));
        return Wonder_jest.describe("test stopPropagation", (function (param) {
                      Wonder_jest.describe("test custom gameObject event", (function (param) {
                              return Wonder_jest.test("if stopPropagation, gameObject's less priority handleFunc shouldn't be executed", (function (param) {
                                            var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                                            var gameObject1 = match[1];
                                            var value = /* record */[/* contents */2];
                                            var state$1 = ManageEventAPI$Wonderjs.onCustomGameObjectEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), gameObject1, 1, (function ($$event, state) {
                                                    value[0] = value[0] - 3 | 0;
                                                    return /* tuple */[
                                                            state,
                                                            ManageEventAPI$Wonderjs.stopPropagationCustomEvent($$event)
                                                          ];
                                                  }), match[0]);
                                            var state$2 = ManageEventAPI$Wonderjs.onCustomGameObjectEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), gameObject1, 0, (function ($$event, state) {
                                                    value[0] = (value[0] << 1);
                                                    return /* tuple */[
                                                            state,
                                                            $$event
                                                          ];
                                                  }), state$1);
                                            ManageEventAPI$Wonderjs.triggerCustomGameObjectEvent(CustomEventTool$Wonderjs.createCustomEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), undefined, /* () */0), gameObject1, state$2);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), -1);
                                          }));
                            }));
                      return Wonder_jest.describe("test custom global event", (function (param) {
                                    return Wonder_jest.test("if stopPropagation, less priority handleFunc shouldn't be executed", (function (param) {
                                                  var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                                                  var value = /* record */[/* contents */2];
                                                  var state$1 = ManageEventAPI$Wonderjs.onCustomGlobalEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), 1, (function ($$event, state) {
                                                          value[0] = value[0] - 3 | 0;
                                                          return /* tuple */[
                                                                  state,
                                                                  ManageEventAPI$Wonderjs.stopPropagationCustomEvent($$event)
                                                                ];
                                                        }), match[0]);
                                                  var state$2 = ManageEventAPI$Wonderjs.onCustomGlobalEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), 0, (function ($$event, state) {
                                                          value[0] = (value[0] << 1);
                                                          return /* tuple */[
                                                                  state,
                                                                  $$event
                                                                ];
                                                        }), state$1);
                                                  ManageEventAPI$Wonderjs.triggerCustomGlobalEvent(CustomEventTool$Wonderjs.createCustomEvent(CustomEventTool$Wonderjs.getPointDownEventName(/* () */0), undefined, /* () */0), state$2);
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), -1);
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
