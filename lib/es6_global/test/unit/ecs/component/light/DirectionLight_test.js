

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as GameObjectAPI$Wonderjs from "../../../../../src/api/GameObjectAPI.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as TypeArrayTool$Wonderjs from "../../../../tool/service/primitive/TypeArrayTool.js";
import * as GameObjectTool$Wonderjs from "../../../../tool/service/gameObject/GameObjectTool.js";
import * as DirectionLightAPI$Wonderjs from "../../../../../src/api/light/DirectionLightAPI.js";
import * as DirectionLightTool$Wonderjs from "../../../../tool/service/light/DirectionLightTool.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

describe("DirectionLight", (function () {
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
        describe("createDirectionLight", (function () {
                Wonder_jest.test("create a new light which is just index(int)", (function () {
                        var match = DirectionLightAPI$Wonderjs.createDirectionLight(state[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[1]), 0);
                      }));
                Wonder_jest.test("set is render to true", (function () {
                        var match = DirectionLightAPI$Wonderjs.createDirectionLight(state[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](DirectionLightAPI$Wonderjs.getDirectionLightIsRender(match[1], match[0])), true);
                      }));
                describe("contract check", (function () {
                        describe("limit the total is-render light count of light to 4", (function () {
                                Wonder_jest.test("test create", (function () {
                                        var match = DirectionLightAPI$Wonderjs.createDirectionLight(state[0]);
                                        var match$1 = DirectionLightAPI$Wonderjs.createDirectionLight(match[0]);
                                        var match$2 = DirectionLightAPI$Wonderjs.createDirectionLight(match$1[0]);
                                        var match$3 = DirectionLightAPI$Wonderjs.createDirectionLight(match$2[0]);
                                        var state$1 = match$3[0];
                                        return Wonder_jest.Expect[/* toThrowMessage */20]("expect light count: 5 <= max count: 4", Wonder_jest.Expect[/* expect */0]((function () {
                                                          DirectionLightAPI$Wonderjs.createDirectionLight(state$1);
                                                          return /* () */0;
                                                        })));
                                      }));
                                Wonder_jest.test("test create after dispose", (function () {
                                        var match = DirectionLightTool$Wonderjs.createGameObject(state[0]);
                                        var match$1 = DirectionLightTool$Wonderjs.createGameObject(match[0]);
                                        var match$2 = DirectionLightTool$Wonderjs.createGameObject(match$1[0]);
                                        var match$3 = DirectionLightTool$Wonderjs.createGameObject(match$2[0]);
                                        var state$1 = GameObjectTool$Wonderjs.disposeGameObject(match[1], match$3[0]);
                                        return Wonder_jest.Expect[/* toThrow */18](Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0]((function () {
                                                              DirectionLightAPI$Wonderjs.createDirectionLight(state$1);
                                                              return /* () */0;
                                                            }))));
                                      }));
                                return Wonder_jest.test("test set is render to false", (function () {
                                              var match = DirectionLightAPI$Wonderjs.createDirectionLight(state[0]);
                                              var match$1 = DirectionLightAPI$Wonderjs.createDirectionLight(match[0]);
                                              var match$2 = DirectionLightAPI$Wonderjs.createDirectionLight(match$1[0]);
                                              var match$3 = DirectionLightAPI$Wonderjs.createDirectionLight(match$2[0]);
                                              var state$1 = DirectionLightAPI$Wonderjs.setDirectionLightIsRender(match$3[1], false, match$3[0]);
                                              return Wonder_jest.Expect[/* toThrow */18](Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0]((function () {
                                                                    DirectionLightAPI$Wonderjs.createDirectionLight(state$1);
                                                                    return /* () */0;
                                                                  }))));
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("unsafeGetDirectionLightGameObject", (function () {
                return Wonder_jest.test("get light's gameObject", (function () {
                              var match = DirectionLightAPI$Wonderjs.createDirectionLight(state[0]);
                              var light = match[1];
                              var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                              var gameObject = match$1[1];
                              var state$1 = GameObjectAPI$Wonderjs.addGameObjectDirectionLightComponent(gameObject, light, match$1[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](DirectionLightAPI$Wonderjs.unsafeGetDirectionLightGameObject(light, state$1)), gameObject);
                            }));
              }));
        describe("getDirectionLightColor", (function () {
                return Wonder_jest.test("test default color", (function () {
                              var match = DirectionLightAPI$Wonderjs.createDirectionLight(state[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](DirectionLightAPI$Wonderjs.getDirectionLightColor(match[1], match[0])), /* array */[
                                          1,
                                          1,
                                          1
                                        ]);
                            }));
              }));
        describe("setDirectionLightColor", (function () {
                return Wonder_jest.test("test set color", (function () {
                              var match = DirectionLightAPI$Wonderjs.createDirectionLight(state[0]);
                              var light = match[1];
                              var color = /* array */[
                                0.2,
                                0.3,
                                0.5
                              ];
                              var state$1 = DirectionLightAPI$Wonderjs.setDirectionLightColor(light, color, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TypeArrayTool$Wonderjs.truncateArray(DirectionLightAPI$Wonderjs.getDirectionLightColor(light, state$1))), color);
                            }));
              }));
        describe("getDirectionLightIntensity", (function () {
                return Wonder_jest.test("test default intensity", (function () {
                              var match = DirectionLightAPI$Wonderjs.createDirectionLight(state[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](DirectionLightAPI$Wonderjs.getDirectionLightIntensity(match[1], match[0])), 1);
                            }));
              }));
        describe("setDirectionLightIntensity", (function () {
                return Wonder_jest.test("test set intensity", (function () {
                              var match = DirectionLightAPI$Wonderjs.createDirectionLight(state[0]);
                              var light = match[1];
                              var state$1 = DirectionLightAPI$Wonderjs.setDirectionLightIntensity(light, 2, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](DirectionLightAPI$Wonderjs.getDirectionLightIntensity(light, state$1)), 2);
                            }));
              }));
        describe("disposeComponent", (function () {
                describe("dispose data", (function () {
                        Wonder_jest.test("mark disposed", (function () {
                                var match = DirectionLightTool$Wonderjs.createGameObject(state[0]);
                                var light1 = match[2];
                                var state$1 = GameObjectTool$Wonderjs.disposeGameObjectDirectionLightComponent(match[1], light1, match[0]);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](DirectionLightTool$Wonderjs.isAlive(light1, state$1)), false);
                              }));
                        Wonder_jest.test("remove from gameObjectMap", (function () {
                                var match = DirectionLightTool$Wonderjs.createGameObject(state[0]);
                                var light1 = match[2];
                                var state$1 = GameObjectTool$Wonderjs.disposeGameObjectDirectionLightComponent(match[1], light1, match[0]);
                                var match$1 = DirectionLightTool$Wonderjs.getRecord(state$1);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](SparseMapService$WonderCommonlib.has(light1, match$1[/* gameObjectMap */5])), false);
                              }));
                        describe("remove from renderLightArr", (function () {
                                return Wonder_jest.test("test", (function () {
                                              var match = DirectionLightTool$Wonderjs.createGameObject(state[0]);
                                              var match$1 = DirectionLightTool$Wonderjs.createGameObject(match[0]);
                                              var state$1 = GameObjectTool$Wonderjs.disposeGameObjectDirectionLightComponent(match[1], match[2], match$1[0]);
                                              var match$2 = DirectionLightTool$Wonderjs.getRecord(state$1);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match$2[/* renderLightArr */4]), /* array */[match$1[2]]);
                                            }));
                              }));
                        describe("test remove from type array", (function () {
                                describe("remove from colors", (function () {
                                        var _prepare = function (state) {
                                          var match = DirectionLightTool$Wonderjs.createGameObject(state[0]);
                                          var light1 = match[2];
                                          var gameObject1 = match[1];
                                          var match$1 = DirectionLightTool$Wonderjs.createGameObject(match[0]);
                                          var light2 = match$1[2];
                                          var color1 = /* array */[
                                            1,
                                            1,
                                            0
                                          ];
                                          var color2 = /* array */[
                                            0,
                                            1,
                                            0
                                          ];
                                          var state$1 = DirectionLightAPI$Wonderjs.setDirectionLightColor(light1, color1, match$1[0]);
                                          var state$2 = DirectionLightAPI$Wonderjs.setDirectionLightColor(light2, color2, state$1);
                                          var state$3 = GameObjectTool$Wonderjs.disposeGameObjectDirectionLightComponent(gameObject1, light1, state$2);
                                          return /* tuple */[
                                                  state$3,
                                                  /* tuple */[
                                                    gameObject1,
                                                    match$1[1]
                                                  ],
                                                  /* tuple */[
                                                    color1,
                                                    color2
                                                  ],
                                                  /* tuple */[
                                                    light1,
                                                    light2
                                                  ]
                                                ];
                                        };
                                        return Wonder_jest.test("reset removed one's value", (function () {
                                                      var match = _prepare(state);
                                                      var state$1 = match[0];
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      DirectionLightTool$Wonderjs.getColor(0, state$1),
                                                                      DirectionLightTool$Wonderjs.getColor(1, state$1)
                                                                    ]), /* tuple */[
                                                                  DirectionLightTool$Wonderjs.getDefaultColor(/* () */0),
                                                                  match[2][1]
                                                                ]);
                                                    }));
                                      }));
                                describe("remove from intensities", (function () {
                                        var _prepare = function (state) {
                                          var match = DirectionLightTool$Wonderjs.createGameObject(state[0]);
                                          var light1 = match[2];
                                          var gameObject1 = match[1];
                                          var match$1 = DirectionLightTool$Wonderjs.createGameObject(match[0]);
                                          var light2 = match$1[2];
                                          var state$1 = DirectionLightAPI$Wonderjs.setDirectionLightIntensity(light1, 2, match$1[0]);
                                          var state$2 = DirectionLightAPI$Wonderjs.setDirectionLightIntensity(light2, 3, state$1);
                                          var state$3 = GameObjectTool$Wonderjs.disposeGameObjectDirectionLightComponent(gameObject1, light1, state$2);
                                          return /* tuple */[
                                                  state$3,
                                                  /* tuple */[
                                                    gameObject1,
                                                    match$1[1]
                                                  ],
                                                  /* tuple */[
                                                    2,
                                                    3
                                                  ],
                                                  /* tuple */[
                                                    light1,
                                                    light2
                                                  ]
                                                ];
                                        };
                                        return Wonder_jest.test("reset removed one's value", (function () {
                                                      var match = _prepare(state);
                                                      var state$1 = match[0];
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      DirectionLightTool$Wonderjs.getIntensity(0, state$1),
                                                                      DirectionLightTool$Wonderjs.getIntensity(1, state$1)
                                                                    ]), /* tuple */[
                                                                  DirectionLightTool$Wonderjs.getDefaultIntensity(/* () */0),
                                                                  match[2][1]
                                                                ]);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("contract check: is alive", (function () {
                describe("if light is disposed", (function () {
                        var _testGetFunc = function (getFunc) {
                          var match = DirectionLightAPI$Wonderjs.createDirectionLight(state[0]);
                          var light = match[1];
                          var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                          var gameObject = match$1[1];
                          var state$1 = GameObjectAPI$Wonderjs.addGameObjectDirectionLightComponent(gameObject, light, match$1[0]);
                          var state$2 = GameObjectTool$Wonderjs.disposeGameObjectDirectionLightComponent(gameObject, light, state$1);
                          return Wonder_jest.Expect[/* toThrowMessage */20]("expect component alive, but actual not", Wonder_jest.Expect[/* expect */0]((function () {
                                            return Curry._2(getFunc, light, state$2);
                                          })));
                        };
                        Wonder_jest.test("unsafeGetDirectionLightGameObject should error", (function () {
                                return _testGetFunc(DirectionLightAPI$Wonderjs.unsafeGetDirectionLightGameObject);
                              }));
                        Wonder_jest.test("getDirectionLightColor should error", (function () {
                                return _testGetFunc(DirectionLightAPI$Wonderjs.getDirectionLightColor);
                              }));
                        return Wonder_jest.test("getDirectionLightIntensity should error", (function () {
                                      return _testGetFunc(DirectionLightAPI$Wonderjs.getDirectionLightIntensity);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("isMaxCount", (function () {
                Wonder_jest.test("if already have created max count lights, return true", (function () {
                        var match = DirectionLightAPI$Wonderjs.createDirectionLight(state[0]);
                        var match$1 = DirectionLightAPI$Wonderjs.createDirectionLight(match[0]);
                        var match$2 = DirectionLightAPI$Wonderjs.createDirectionLight(match$1[0]);
                        var match$3 = DirectionLightAPI$Wonderjs.createDirectionLight(match$2[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](DirectionLightAPI$Wonderjs.isMaxCount(match$3[0])), true);
                      }));
                return Wonder_jest.test("test set is render", (function () {
                              var match = DirectionLightAPI$Wonderjs.createDirectionLight(state[0]);
                              var match$1 = DirectionLightAPI$Wonderjs.createDirectionLight(match[0]);
                              var match$2 = DirectionLightAPI$Wonderjs.createDirectionLight(match$1[0]);
                              var match$3 = DirectionLightAPI$Wonderjs.createDirectionLight(match$2[0]);
                              var state$1 = DirectionLightAPI$Wonderjs.setDirectionLightIsRender(match$3[1], false, match$3[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](DirectionLightAPI$Wonderjs.isMaxCount(state$1)), false);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
