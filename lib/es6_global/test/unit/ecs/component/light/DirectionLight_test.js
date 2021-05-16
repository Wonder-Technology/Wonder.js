

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
import * as TransformGameObjectTool$Wonderjs from "../../../../tool/service/transform/TransformGameObjectTool.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

Wonder_jest.describe("DirectionLight", (function (param) {
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
        Wonder_jest.describe("createDirectionLight", (function (param) {
                Wonder_jest.test("create a new light which is just index(int)", (function (param) {
                        var match = DirectionLightAPI$Wonderjs.createDirectionLight(state[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match[1]), 0);
                      }));
                Wonder_jest.test("set is render to true", (function (param) {
                        var match = DirectionLightAPI$Wonderjs.createDirectionLight(state[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](DirectionLightAPI$Wonderjs.getDirectionLightIsRender(match[1], match[0])), true);
                      }));
                return Wonder_jest.describe("contract check", (function (param) {
                              return Wonder_jest.describe("limit the total is-render light count of light to 4", (function (param) {
                                            Wonder_jest.test("test create", (function (param) {
                                                    var match = DirectionLightAPI$Wonderjs.createDirectionLight(state[0]);
                                                    var match$1 = DirectionLightAPI$Wonderjs.createDirectionLight(match[0]);
                                                    var match$2 = DirectionLightAPI$Wonderjs.createDirectionLight(match$1[0]);
                                                    var match$3 = DirectionLightAPI$Wonderjs.createDirectionLight(match$2[0]);
                                                    var state$1 = match$3[0];
                                                    return Wonder_jest.Expect[/* toThrowMessage */21]("expect light count: 5 <= max count: 4", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                                      DirectionLightAPI$Wonderjs.createDirectionLight(state$1);
                                                                      return /* () */0;
                                                                    })));
                                                  }));
                                            Wonder_jest.test("test create after dispose", (function (param) {
                                                    var match = DirectionLightTool$Wonderjs.createGameObject(state[0]);
                                                    var match$1 = DirectionLightTool$Wonderjs.createGameObject(match[0]);
                                                    var match$2 = DirectionLightTool$Wonderjs.createGameObject(match$1[0]);
                                                    var match$3 = DirectionLightTool$Wonderjs.createGameObject(match$2[0]);
                                                    var state$1 = GameObjectTool$Wonderjs.disposeGameObject(match[1], match$3[0]);
                                                    return Wonder_jest.Expect[/* toThrow */18](Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0]((function (param) {
                                                                          DirectionLightAPI$Wonderjs.createDirectionLight(state$1);
                                                                          return /* () */0;
                                                                        }))));
                                                  }));
                                            return Wonder_jest.test("test set is render to false", (function (param) {
                                                          var match = DirectionLightAPI$Wonderjs.createDirectionLight(state[0]);
                                                          var match$1 = DirectionLightAPI$Wonderjs.createDirectionLight(match[0]);
                                                          var match$2 = DirectionLightAPI$Wonderjs.createDirectionLight(match$1[0]);
                                                          var match$3 = DirectionLightAPI$Wonderjs.createDirectionLight(match$2[0]);
                                                          var state$1 = DirectionLightAPI$Wonderjs.setDirectionLightIsRender(match$3[1], false, match$3[0]);
                                                          return Wonder_jest.Expect[/* toThrow */18](Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0]((function (param) {
                                                                                DirectionLightAPI$Wonderjs.createDirectionLight(state$1);
                                                                                return /* () */0;
                                                                              }))));
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("unsafeGetDirectionLightGameObject", (function (param) {
                return Wonder_jest.test("get light's gameObject", (function (param) {
                              var match = DirectionLightAPI$Wonderjs.createDirectionLight(state[0]);
                              var light = match[1];
                              var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                              var gameObject = match$1[1];
                              var state$1 = GameObjectAPI$Wonderjs.addGameObjectDirectionLightComponent(gameObject, light, match$1[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](DirectionLightAPI$Wonderjs.unsafeGetDirectionLightGameObject(light, state$1)), gameObject);
                            }));
              }));
        Wonder_jest.describe("getDirectionLightColor", (function (param) {
                return Wonder_jest.test("test default color", (function (param) {
                              var match = DirectionLightAPI$Wonderjs.createDirectionLight(state[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](DirectionLightAPI$Wonderjs.getDirectionLightColor(match[1], match[0])), /* array */[
                                          1,
                                          1,
                                          1
                                        ]);
                            }));
              }));
        Wonder_jest.describe("setDirectionLightColor", (function (param) {
                return Wonder_jest.test("test set color", (function (param) {
                              var match = DirectionLightAPI$Wonderjs.createDirectionLight(state[0]);
                              var light = match[1];
                              var color = /* array */[
                                0.2,
                                0.3,
                                0.5
                              ];
                              var state$1 = DirectionLightAPI$Wonderjs.setDirectionLightColor(light, color, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TypeArrayTool$Wonderjs.truncateArray(DirectionLightAPI$Wonderjs.getDirectionLightColor(light, state$1))), color);
                            }));
              }));
        Wonder_jest.describe("getDirectionLightIntensity", (function (param) {
                return Wonder_jest.test("test default intensity", (function (param) {
                              var match = DirectionLightAPI$Wonderjs.createDirectionLight(state[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](DirectionLightAPI$Wonderjs.getDirectionLightIntensity(match[1], match[0])), 1);
                            }));
              }));
        Wonder_jest.describe("setDirectionLightIntensity", (function (param) {
                return Wonder_jest.test("test set intensity", (function (param) {
                              var match = DirectionLightAPI$Wonderjs.createDirectionLight(state[0]);
                              var light = match[1];
                              var state$1 = DirectionLightAPI$Wonderjs.setDirectionLightIntensity(light, 2, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](DirectionLightAPI$Wonderjs.getDirectionLightIntensity(light, state$1)), 2);
                            }));
              }));
        Wonder_jest.describe("disposeComponent", (function (param) {
                return Wonder_jest.describe("dispose data", (function (param) {
                              Wonder_jest.test("mark disposed", (function (param) {
                                      var match = DirectionLightTool$Wonderjs.createGameObject(state[0]);
                                      var light1 = match[2];
                                      var state$1 = GameObjectTool$Wonderjs.disposeGameObjectDirectionLightComponent(match[1], light1, match[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](DirectionLightTool$Wonderjs.isAlive(light1, state$1)), false);
                                    }));
                              Wonder_jest.test("remove from gameObjectMap", (function (param) {
                                      var match = DirectionLightTool$Wonderjs.createGameObject(state[0]);
                                      var light1 = match[2];
                                      var state$1 = GameObjectTool$Wonderjs.disposeGameObjectDirectionLightComponent(match[1], light1, match[0]);
                                      var match$1 = DirectionLightTool$Wonderjs.getRecord(state$1);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MutableSparseMapService$WonderCommonlib.has(light1, match$1[/* gameObjectMap */5])), false);
                                    }));
                              Wonder_jest.describe("remove from renderLightArr", (function (param) {
                                      return Wonder_jest.test("test", (function (param) {
                                                    var match = DirectionLightTool$Wonderjs.createGameObject(state[0]);
                                                    var match$1 = DirectionLightTool$Wonderjs.createGameObject(match[0]);
                                                    var state$1 = GameObjectTool$Wonderjs.disposeGameObjectDirectionLightComponent(match[1], match[2], match$1[0]);
                                                    var match$2 = DirectionLightTool$Wonderjs.getRecord(state$1);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match$2[/* renderLightArr */4]), /* array */[match$1[2]]);
                                                  }));
                                    }));
                              return Wonder_jest.describe("test remove from type array", (function (param) {
                                            Wonder_jest.describe("remove from colors", (function (param) {
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
                                                    return Wonder_jest.test("reset removed one's value", (function (param) {
                                                                  var match = _prepare(state);
                                                                  var state$1 = match[0];
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                  DirectionLightTool$Wonderjs.getColor(0, state$1),
                                                                                  DirectionLightTool$Wonderjs.getColor(1, state$1)
                                                                                ]), /* tuple */[
                                                                              DirectionLightTool$Wonderjs.getDefaultColor(/* () */0),
                                                                              match[2][1]
                                                                            ]);
                                                                }));
                                                  }));
                                            return Wonder_jest.describe("remove from intensities", (function (param) {
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
                                                          return Wonder_jest.test("reset removed one's value", (function (param) {
                                                                        var match = _prepare(state);
                                                                        var state$1 = match[0];
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                        DirectionLightTool$Wonderjs.getIntensity(0, state$1),
                                                                                        DirectionLightTool$Wonderjs.getIntensity(1, state$1)
                                                                                      ]), /* tuple */[
                                                                                    DirectionLightTool$Wonderjs.getDefaultIntensity(/* () */0),
                                                                                    match[2][1]
                                                                                  ]);
                                                                      }));
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("contract check: is alive", (function (param) {
                return Wonder_jest.describe("if light is disposed", (function (param) {
                              var _testGetFunc = function (getFunc) {
                                var match = DirectionLightAPI$Wonderjs.createDirectionLight(state[0]);
                                var light = match[1];
                                var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                                var gameObject = match$1[1];
                                var state$1 = GameObjectAPI$Wonderjs.addGameObjectDirectionLightComponent(gameObject, light, match$1[0]);
                                var state$2 = GameObjectTool$Wonderjs.disposeGameObjectDirectionLightComponent(gameObject, light, state$1);
                                return Wonder_jest.Expect[/* toThrowMessage */21]("expect component alive, but actual not", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                  return Curry._2(getFunc, light, state$2);
                                                })));
                              };
                              Wonder_jest.test("unsafeGetDirectionLightGameObject should error", (function (param) {
                                      return _testGetFunc(DirectionLightAPI$Wonderjs.unsafeGetDirectionLightGameObject);
                                    }));
                              Wonder_jest.test("getDirectionLightColor should error", (function (param) {
                                      return _testGetFunc(DirectionLightAPI$Wonderjs.getDirectionLightColor);
                                    }));
                              return Wonder_jest.test("getDirectionLightIntensity should error", (function (param) {
                                            return _testGetFunc(DirectionLightAPI$Wonderjs.getDirectionLightIntensity);
                                          }));
                            }));
              }));
        Wonder_jest.describe("isMaxCount", (function (param) {
                Wonder_jest.test("if already have created max count lights, return true", (function (param) {
                        var match = DirectionLightAPI$Wonderjs.createDirectionLight(state[0]);
                        var match$1 = DirectionLightAPI$Wonderjs.createDirectionLight(match[0]);
                        var match$2 = DirectionLightAPI$Wonderjs.createDirectionLight(match$1[0]);
                        var match$3 = DirectionLightAPI$Wonderjs.createDirectionLight(match$2[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](DirectionLightAPI$Wonderjs.isMaxCount(match$3[0])), true);
                      }));
                return Wonder_jest.test("test set is render", (function (param) {
                              var match = DirectionLightAPI$Wonderjs.createDirectionLight(state[0]);
                              var match$1 = DirectionLightAPI$Wonderjs.createDirectionLight(match[0]);
                              var match$2 = DirectionLightAPI$Wonderjs.createDirectionLight(match$1[0]);
                              var match$3 = DirectionLightAPI$Wonderjs.createDirectionLight(match$2[0]);
                              var state$1 = DirectionLightAPI$Wonderjs.setDirectionLightIsRender(match$3[1], false, match$3[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](DirectionLightAPI$Wonderjs.isMaxCount(state$1)), false);
                            }));
              }));
        return Wonder_jest.describe("getDirection", (function (param) {
                      return Wonder_jest.describe("fix bug", (function (param) {
                                    var _prepare = function (state) {
                                      var match = DirectionLightTool$Wonderjs.createGameObject(state);
                                      var light = match[2];
                                      var gameObject = match[1];
                                      var state$1 = TransformGameObjectTool$Wonderjs.setLocalEulerAngles(gameObject, /* tuple */[
                                            45,
                                            22,
                                            60
                                          ], match[0]);
                                      var direction = DirectionLightTool$Wonderjs.getDirection(light, state$1);
                                      return /* tuple */[
                                              state$1,
                                              direction,
                                              gameObject,
                                              light
                                            ];
                                    };
                                    Wonder_jest.test("direction shouldn't affected by scale if scale is always postive", (function (param) {
                                            var match = _prepare(state[0]);
                                            var state$1 = TransformGameObjectTool$Wonderjs.setLocalScale(match[2], /* tuple */[
                                                  0.45,
                                                  0.45,
                                                  0.45
                                                ], match[0]);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](DirectionLightTool$Wonderjs.getDirection(match[3], state$1)), match[1]);
                                          }));
                                    return Wonder_jest.test("direction should be affected by scale if scale change to negative from positive", (function (param) {
                                                  var match = _prepare(state[0]);
                                                  var gameObject = match[2];
                                                  var state$1 = TransformGameObjectTool$Wonderjs.setLocalScale(gameObject, /* tuple */[
                                                        0.45,
                                                        0.45,
                                                        0.45
                                                      ], match[0]);
                                                  var state$2 = TransformGameObjectTool$Wonderjs.setLocalScale(gameObject, /* tuple */[
                                                        -0.45,
                                                        0.45,
                                                        0.45
                                                      ], state$1);
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* <> */6], Wonder_jest.Expect[/* expect */0](DirectionLightTool$Wonderjs.getDirection(match[3], state$2)), match[1]);
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
