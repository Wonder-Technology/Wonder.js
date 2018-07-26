'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var GameObjectAPI$Wonderjs = require("../../../../../src/api/GameObjectAPI.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var PointLightAPI$Wonderjs = require("../../../../../src/api/light/PointLightAPI.js");
var TypeArrayTool$Wonderjs = require("../../../../tool/service/primitive/TypeArrayTool.js");
var GameObjectTool$Wonderjs = require("../../../../tool/service/gameObject/GameObjectTool.js");
var PointLightTool$Wonderjs = require("../../../../tool/service/light/PointLightTool.js");
var SparseMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/SparseMapService.js");

describe("PointLight", (function () {
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
        describe("createPointLight", (function () {
                Wonder_jest.test("create a new light which is just index(int)", (function () {
                        var match = PointLightAPI$Wonderjs.createPointLight(state[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[1]), 0);
                      }));
                describe("contract check", (function () {
                        describe("limit the total alive count of light to 4", (function () {
                                Wonder_jest.test("test create", (function () {
                                        var match = PointLightAPI$Wonderjs.createPointLight(state[0]);
                                        var match$1 = PointLightAPI$Wonderjs.createPointLight(match[0]);
                                        var match$2 = PointLightAPI$Wonderjs.createPointLight(match$1[0]);
                                        var match$3 = PointLightAPI$Wonderjs.createPointLight(match$2[0]);
                                        var state$1 = match$3[0];
                                        return Wonder_jest.Expect[/* toThrowMessage */20]("expect index: 4 <= maxIndex: 3, but actual not", Wonder_jest.Expect[/* expect */0]((function () {
                                                          PointLightAPI$Wonderjs.createPointLight(state$1);
                                                          return /* () */0;
                                                        })));
                                      }));
                                return Wonder_jest.test("test create after dispose", (function () {
                                              var match = PointLightTool$Wonderjs.createGameObject(state[0]);
                                              var match$1 = PointLightTool$Wonderjs.createGameObject(match[0]);
                                              var match$2 = PointLightTool$Wonderjs.createGameObject(match$1[0]);
                                              var match$3 = PointLightTool$Wonderjs.createGameObject(match$2[0]);
                                              var state$1 = GameObjectTool$Wonderjs.disposeGameObject(match[1], match$3[0]);
                                              return Wonder_jest.Expect[/* toThrow */18](Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0]((function () {
                                                                    PointLightAPI$Wonderjs.createPointLight(state$1);
                                                                    return /* () */0;
                                                                  }))));
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("unsafeGetPointLightGameObject", (function () {
                return Wonder_jest.test("get light's gameObject", (function () {
                              var match = PointLightAPI$Wonderjs.createPointLight(state[0]);
                              var light = match[1];
                              var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                              var gameObject = match$1[1];
                              var state$1 = GameObjectAPI$Wonderjs.addGameObjectPointLightComponent(gameObject, light, match$1[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](PointLightAPI$Wonderjs.unsafeGetPointLightGameObject(light, state$1)), gameObject);
                            }));
              }));
        describe("getPointLightColor", (function () {
                return Wonder_jest.test("test default color", (function () {
                              var match = PointLightAPI$Wonderjs.createPointLight(state[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](PointLightAPI$Wonderjs.getPointLightColor(match[1], match[0])), /* array */[
                                          1,
                                          1,
                                          1
                                        ]);
                            }));
              }));
        describe("setPointLightColor", (function () {
                return Wonder_jest.test("test set color", (function () {
                              var match = PointLightAPI$Wonderjs.createPointLight(state[0]);
                              var light = match[1];
                              var color = /* array */[
                                0.2,
                                0.3,
                                0.5
                              ];
                              var state$1 = PointLightAPI$Wonderjs.setPointLightColor(light, color, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TypeArrayTool$Wonderjs.truncateArray(PointLightAPI$Wonderjs.getPointLightColor(light, state$1))), color);
                            }));
              }));
        describe("getPointLightIntensity", (function () {
                return Wonder_jest.test("test default intensity", (function () {
                              var match = PointLightAPI$Wonderjs.createPointLight(state[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](PointLightAPI$Wonderjs.getPointLightIntensity(match[1], match[0])), 1);
                            }));
              }));
        describe("setPointLightIntensity", (function () {
                return Wonder_jest.test("test set intensity", (function () {
                              var match = PointLightAPI$Wonderjs.createPointLight(state[0]);
                              var light = match[1];
                              var state$1 = PointLightAPI$Wonderjs.setPointLightIntensity(light, 2, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](PointLightAPI$Wonderjs.getPointLightIntensity(light, state$1)), 2);
                            }));
              }));
        describe("getPointLightConstant", (function () {
                return Wonder_jest.test("test default constant", (function () {
                              var match = PointLightAPI$Wonderjs.createPointLight(state[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](PointLightAPI$Wonderjs.getPointLightConstant(match[1], match[0])), 1);
                            }));
              }));
        describe("setPointLightConstant", (function () {
                return Wonder_jest.test("test set constant", (function () {
                              var match = PointLightAPI$Wonderjs.createPointLight(state[0]);
                              var light = match[1];
                              var state$1 = PointLightAPI$Wonderjs.setPointLightConstant(light, 2, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](PointLightAPI$Wonderjs.getPointLightConstant(light, state$1)), 2);
                            }));
              }));
        describe("getPointLightLinear", (function () {
                return Wonder_jest.test("test default linear", (function () {
                              var match = PointLightAPI$Wonderjs.createPointLight(state[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TypeArrayTool$Wonderjs.truncateFloatValue(5, PointLightAPI$Wonderjs.getPointLightLinear(match[1], match[0]))), 0.07);
                            }));
              }));
        describe("setPointLightLinear", (function () {
                return Wonder_jest.test("test set linear", (function () {
                              var match = PointLightAPI$Wonderjs.createPointLight(state[0]);
                              var light = match[1];
                              var state$1 = PointLightAPI$Wonderjs.setPointLightLinear(light, 2, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TypeArrayTool$Wonderjs.truncateFloatValue(5, PointLightAPI$Wonderjs.getPointLightLinear(light, state$1))), 2);
                            }));
              }));
        describe("getPointLightQuadratic", (function () {
                return Wonder_jest.test("test default quadratic", (function () {
                              var match = PointLightAPI$Wonderjs.createPointLight(state[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TypeArrayTool$Wonderjs.truncateFloatValue(5, PointLightAPI$Wonderjs.getPointLightQuadratic(match[1], match[0]))), 0.017);
                            }));
              }));
        describe("setPointLightQuadratic", (function () {
                return Wonder_jest.test("test set quadratic", (function () {
                              var match = PointLightAPI$Wonderjs.createPointLight(state[0]);
                              var light = match[1];
                              var state$1 = PointLightAPI$Wonderjs.setPointLightQuadratic(light, 2, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](PointLightAPI$Wonderjs.getPointLightQuadratic(light, state$1)), 2);
                            }));
              }));
        describe("getPointLightRange", (function () {
                return Wonder_jest.test("test default range", (function () {
                              var match = PointLightAPI$Wonderjs.createPointLight(state[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](PointLightAPI$Wonderjs.getPointLightRange(match[1], match[0])), 65);
                            }));
              }));
        describe("setPointLightRange", (function () {
                return Wonder_jest.test("test set range", (function () {
                              var match = PointLightAPI$Wonderjs.createPointLight(state[0]);
                              var light = match[1];
                              var state$1 = PointLightAPI$Wonderjs.setPointLightRange(light, 2, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](PointLightAPI$Wonderjs.getPointLightRange(light, state$1)), 2);
                            }));
              }));
        describe("disposeComponent", (function () {
                describe("dispose data", (function () {
                        Wonder_jest.test("mark disposed", (function () {
                                var match = PointLightTool$Wonderjs.createGameObject(state[0]);
                                var light1 = match[2];
                                var state$1 = GameObjectTool$Wonderjs.disposeGameObjectPointLightComponent(match[1], light1, match[0]);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](PointLightTool$Wonderjs.isAlive(light1, state$1)), false);
                              }));
                        Wonder_jest.test("remove from gameObjectMap", (function () {
                                var match = PointLightTool$Wonderjs.createGameObject(state[0]);
                                var light1 = match[2];
                                var state$1 = GameObjectTool$Wonderjs.disposeGameObjectPointLightComponent(match[1], light1, match[0]);
                                var match$1 = PointLightTool$Wonderjs.getRecord(state$1);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](SparseMapService$WonderCommonlib.has(light1, match$1[/* gameObjectMap */9])), false);
                              }));
                        describe("test remove from type array", (function () {
                                describe("remove from colors", (function () {
                                        var _prepare = function (state) {
                                          var match = PointLightTool$Wonderjs.createGameObject(state[0]);
                                          var light1 = match[2];
                                          var gameObject1 = match[1];
                                          var match$1 = PointLightTool$Wonderjs.createGameObject(match[0]);
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
                                          var state$1 = PointLightAPI$Wonderjs.setPointLightColor(light1, color1, match$1[0]);
                                          var state$2 = PointLightAPI$Wonderjs.setPointLightColor(light2, color2, state$1);
                                          var state$3 = GameObjectTool$Wonderjs.disposeGameObjectPointLightComponent(gameObject1, light1, state$2);
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
                                        return Wonder_jest.test("swap with last one and reset removed one's value", (function () {
                                                      var match = _prepare(state);
                                                      var state$1 = match[0];
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      PointLightTool$Wonderjs.getColor(0, state$1),
                                                                      PointLightTool$Wonderjs.getColor(1, state$1)
                                                                    ]), /* tuple */[
                                                                  match[2][1],
                                                                  PointLightTool$Wonderjs.getDefaultColor(/* () */0)
                                                                ]);
                                                    }));
                                      }));
                                describe("remove from intensities", (function () {
                                        var _prepare = function (state) {
                                          var match = PointLightTool$Wonderjs.createGameObject(state[0]);
                                          var light1 = match[2];
                                          var gameObject1 = match[1];
                                          var match$1 = PointLightTool$Wonderjs.createGameObject(match[0]);
                                          var light2 = match$1[2];
                                          var state$1 = PointLightAPI$Wonderjs.setPointLightIntensity(light1, 2, match$1[0]);
                                          var state$2 = PointLightAPI$Wonderjs.setPointLightIntensity(light2, 3, state$1);
                                          var state$3 = GameObjectTool$Wonderjs.disposeGameObjectPointLightComponent(gameObject1, light1, state$2);
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
                                        return Wonder_jest.test("swap with last one and reset removed one's value", (function () {
                                                      var match = _prepare(state);
                                                      var state$1 = match[0];
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      PointLightTool$Wonderjs.getIntensity(0, state$1),
                                                                      PointLightTool$Wonderjs.getIntensity(1, state$1)
                                                                    ]), /* tuple */[
                                                                  match[2][1],
                                                                  PointLightTool$Wonderjs.getDefaultIntensity(/* () */0)
                                                                ]);
                                                    }));
                                      }));
                                describe("remove from constants", (function () {
                                        var _prepare = function (state) {
                                          var match = PointLightTool$Wonderjs.createGameObject(state[0]);
                                          var light1 = match[2];
                                          var gameObject1 = match[1];
                                          var match$1 = PointLightTool$Wonderjs.createGameObject(match[0]);
                                          var light2 = match$1[2];
                                          var state$1 = PointLightAPI$Wonderjs.setPointLightConstant(light1, 2, match$1[0]);
                                          var state$2 = PointLightAPI$Wonderjs.setPointLightConstant(light2, 3, state$1);
                                          var state$3 = GameObjectTool$Wonderjs.disposeGameObjectPointLightComponent(gameObject1, light1, state$2);
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
                                        return Wonder_jest.test("swap with last one and reset removed one's value", (function () {
                                                      var match = _prepare(state);
                                                      var state$1 = match[0];
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      PointLightTool$Wonderjs.getConstant(0, state$1),
                                                                      PointLightTool$Wonderjs.getConstant(1, state$1)
                                                                    ]), /* tuple */[
                                                                  match[2][1],
                                                                  PointLightTool$Wonderjs.getDefaultConstant(/* () */0)
                                                                ]);
                                                    }));
                                      }));
                                describe("remove from linears", (function () {
                                        var _prepare = function (state) {
                                          var match = PointLightTool$Wonderjs.createGameObject(state[0]);
                                          var light1 = match[2];
                                          var gameObject1 = match[1];
                                          var match$1 = PointLightTool$Wonderjs.createGameObject(match[0]);
                                          var light2 = match$1[2];
                                          var state$1 = PointLightAPI$Wonderjs.setPointLightLinear(light1, 2, match$1[0]);
                                          var state$2 = PointLightAPI$Wonderjs.setPointLightLinear(light2, 3, state$1);
                                          var state$3 = GameObjectTool$Wonderjs.disposeGameObjectPointLightComponent(gameObject1, light1, state$2);
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
                                        return Wonder_jest.test("swap with last one and reset removed one's value", (function () {
                                                      var match = _prepare(state);
                                                      var state$1 = match[0];
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      PointLightTool$Wonderjs.getLinear(0, state$1),
                                                                      TypeArrayTool$Wonderjs.truncateFloatValue(5, PointLightTool$Wonderjs.getLinear(1, state$1))
                                                                    ]), /* tuple */[
                                                                  match[2][1],
                                                                  PointLightTool$Wonderjs.getDefaultLinear(/* () */0)
                                                                ]);
                                                    }));
                                      }));
                                describe("remove from quadratics", (function () {
                                        var _prepare = function (state) {
                                          var match = PointLightTool$Wonderjs.createGameObject(state[0]);
                                          var light1 = match[2];
                                          var gameObject1 = match[1];
                                          var match$1 = PointLightTool$Wonderjs.createGameObject(match[0]);
                                          var light2 = match$1[2];
                                          var state$1 = PointLightAPI$Wonderjs.setPointLightQuadratic(light1, 2, match$1[0]);
                                          var state$2 = PointLightAPI$Wonderjs.setPointLightQuadratic(light2, 3, state$1);
                                          var state$3 = GameObjectTool$Wonderjs.disposeGameObjectPointLightComponent(gameObject1, light1, state$2);
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
                                        return Wonder_jest.test("swap with last one and reset removed one's value", (function () {
                                                      var match = _prepare(state);
                                                      var state$1 = match[0];
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      PointLightTool$Wonderjs.getQuadratic(0, state$1),
                                                                      TypeArrayTool$Wonderjs.truncateFloatValue(5, PointLightTool$Wonderjs.getQuadratic(1, state$1))
                                                                    ]), /* tuple */[
                                                                  match[2][1],
                                                                  PointLightTool$Wonderjs.getDefaultQuadratic(/* () */0)
                                                                ]);
                                                    }));
                                      }));
                                describe("remove from ranges", (function () {
                                        var _prepare = function (state) {
                                          var match = PointLightTool$Wonderjs.createGameObject(state[0]);
                                          var light1 = match[2];
                                          var gameObject1 = match[1];
                                          var match$1 = PointLightTool$Wonderjs.createGameObject(match[0]);
                                          var light2 = match$1[2];
                                          var state$1 = PointLightAPI$Wonderjs.setPointLightRange(light1, 2, match$1[0]);
                                          var state$2 = PointLightAPI$Wonderjs.setPointLightRange(light2, 3, state$1);
                                          var state$3 = GameObjectTool$Wonderjs.disposeGameObjectPointLightComponent(gameObject1, light1, state$2);
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
                                        return Wonder_jest.test("swap with last one and reset removed one's value", (function () {
                                                      var match = _prepare(state);
                                                      var state$1 = match[0];
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      PointLightTool$Wonderjs.getRange(0, state$1),
                                                                      PointLightTool$Wonderjs.getRange(1, state$1)
                                                                    ]), /* tuple */[
                                                                  match[2][1],
                                                                  PointLightTool$Wonderjs.getDefaultRange(/* () */0)
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
                          var match = PointLightAPI$Wonderjs.createPointLight(state[0]);
                          var light = match[1];
                          var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                          var gameObject = match$1[1];
                          var state$1 = GameObjectAPI$Wonderjs.addGameObjectPointLightComponent(gameObject, light, match$1[0]);
                          var state$2 = GameObjectTool$Wonderjs.disposeGameObjectPointLightComponent(gameObject, light, state$1);
                          return Wonder_jest.Expect[/* toThrowMessage */20]("expect component alive, but actual not", Wonder_jest.Expect[/* expect */0]((function () {
                                            return Curry._2(getFunc, light, state$2);
                                          })));
                        };
                        Wonder_jest.test("unsafeGetPointLightGameObject should error", (function () {
                                return _testGetFunc(PointLightAPI$Wonderjs.unsafeGetPointLightGameObject);
                              }));
                        Wonder_jest.test("getPointLightColor should error", (function () {
                                return _testGetFunc(PointLightAPI$Wonderjs.getPointLightColor);
                              }));
                        Wonder_jest.test("getPointLightIntensity should error", (function () {
                                return _testGetFunc(PointLightAPI$Wonderjs.getPointLightIntensity);
                              }));
                        Wonder_jest.test("getPointLightConstant should error", (function () {
                                return _testGetFunc(PointLightAPI$Wonderjs.getPointLightConstant);
                              }));
                        Wonder_jest.test("getPointLightLinear should error", (function () {
                                return _testGetFunc(PointLightAPI$Wonderjs.getPointLightLinear);
                              }));
                        Wonder_jest.test("getPointLightQuadratic should error", (function () {
                                return _testGetFunc(PointLightAPI$Wonderjs.getPointLightQuadratic);
                              }));
                        return Wonder_jest.test("getPointLightRange should error", (function () {
                                      return _testGetFunc(PointLightAPI$Wonderjs.getPointLightRange);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("getLightCount", (function () {
                describe("contract check", (function () {
                        return Wonder_jest.test("count should <= max buffer count", (function () {
                                      return Wonder_jest.Expect[/* toThrowMessage */20]("light count: 5 <= max buffer count: 4", Wonder_jest.Expect[/* expect */0]((function () {
                                                        var newrecord = Caml_array.caml_array_dup(state[0]);
                                                        var init = state[0][/* pointLightRecord */21];
                                                        newrecord[/* pointLightRecord */21] = /* record */[
                                                          /* index */5,
                                                          /* buffer */init[/* buffer */1],
                                                          /* colors */init[/* colors */2],
                                                          /* intensities */init[/* intensities */3],
                                                          /* constants */init[/* constants */4],
                                                          /* linears */init[/* linears */5],
                                                          /* quadratics */init[/* quadratics */6],
                                                          /* ranges */init[/* ranges */7],
                                                          /* mappedIndexMap */init[/* mappedIndexMap */8],
                                                          /* gameObjectMap */init[/* gameObjectMap */9]
                                                        ];
                                                        PointLightTool$Wonderjs.getLightCount(newrecord);
                                                        return /* () */0;
                                                      })));
                                    }));
                      }));
                return /* () */0;
              }));
        describe("setRangeLevel", (function () {
                var _test = function (level, param, state) {
                  var match = PointLightAPI$Wonderjs.createPointLight(state[0]);
                  var light = match[1];
                  var state$1 = PointLightAPI$Wonderjs.setPointLightRangeLevel(light, level, match[0]);
                  return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                  TypeArrayTool$Wonderjs.truncateFloatValue(7, PointLightAPI$Wonderjs.getPointLightRange(light, state$1)),
                                  TypeArrayTool$Wonderjs.truncateFloatValue(7, PointLightAPI$Wonderjs.getPointLightLinear(light, state$1)),
                                  TypeArrayTool$Wonderjs.truncateFloatValue(7, PointLightAPI$Wonderjs.getPointLightQuadratic(light, state$1))
                                ]), /* tuple */[
                              param[0],
                              param[1],
                              param[2]
                            ]);
                };
                Wonder_jest.test("test set level 0", (function () {
                        return _test(0, /* tuple */[
                                    7,
                                    0.7,
                                    1.8
                                  ], state);
                      }));
                Wonder_jest.test("test set level 1", (function () {
                        return _test(1, /* tuple */[
                                    13,
                                    0.35,
                                    0.44
                                  ], state);
                      }));
                Wonder_jest.test("test set level 2", (function () {
                        return _test(2, /* tuple */[
                                    20,
                                    0.22,
                                    0.20
                                  ], state);
                      }));
                Wonder_jest.test("test set level 3", (function () {
                        return _test(3, /* tuple */[
                                    32,
                                    0.14,
                                    0.07
                                  ], state);
                      }));
                Wonder_jest.test("test set level 4", (function () {
                        return _test(4, /* tuple */[
                                    50,
                                    0.09,
                                    0.032
                                  ], state);
                      }));
                Wonder_jest.test("test set level 5", (function () {
                        return _test(5, /* tuple */[
                                    65,
                                    0.07,
                                    0.017
                                  ], state);
                      }));
                Wonder_jest.test("test set level 6", (function () {
                        return _test(6, /* tuple */[
                                    100,
                                    0.045,
                                    0.0075
                                  ], state);
                      }));
                Wonder_jest.test("test set level 7", (function () {
                        return _test(7, /* tuple */[
                                    160,
                                    0.027,
                                    0.0028
                                  ], state);
                      }));
                Wonder_jest.test("test set level 8", (function () {
                        return _test(8, /* tuple */[
                                    200,
                                    0.022,
                                    0.0019
                                  ], state);
                      }));
                Wonder_jest.test("test set level 9", (function () {
                        return _test(9, /* tuple */[
                                    325,
                                    0.014,
                                    0.0007
                                  ], state);
                      }));
                Wonder_jest.test("test set level 10", (function () {
                        return _test(10, /* tuple */[
                                    600,
                                    0.007,
                                    0.0002
                                  ], state);
                      }));
                Wonder_jest.test("test set level 11", (function () {
                        return _test(11, /* tuple */[
                                    3250,
                                    0.0014,
                                    0.000007
                                  ], state);
                      }));
                return Wonder_jest.test("if level > 11, fatal", (function () {
                              var match = PointLightAPI$Wonderjs.createPointLight(state[0]);
                              var light = match[1];
                              var state$1 = match[0];
                              return Wonder_jest.Expect[/* toThrowMessage */20]("shouldn't exceed point light range", Wonder_jest.Expect[/* expect */0]((function () {
                                                PointLightAPI$Wonderjs.setPointLightRangeLevel(light, 12, state$1);
                                                return /* () */0;
                                              })));
                            }));
              }));
        return /* () */0;
      }));

/*  Not a pure module */
