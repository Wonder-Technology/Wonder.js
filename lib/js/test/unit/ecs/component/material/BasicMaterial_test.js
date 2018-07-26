'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var FakeGlTool$Wonderjs = require("../../../../tool/gl/FakeGlTool.js");
var SettingTool$Wonderjs = require("../../../../tool/service/setting/SettingTool.js");
var GameObjectAPI$Wonderjs = require("../../../../../src/api/GameObjectAPI.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var TypeArrayTool$Wonderjs = require("../../../../tool/service/primitive/TypeArrayTool.js");
var GameObjectTool$Wonderjs = require("../../../../tool/service/gameObject/GameObjectTool.js");
var AllMaterialTool$Wonderjs = require("../../../../tool/service/material/AllMaterialTool.js");
var BasicMaterialAPI$Wonderjs = require("../../../../../src/api/material/BasicMaterialAPI.js");
var BasicMaterialTool$Wonderjs = require("../../../../tool/service/material/BasicMaterialTool.js");
var BasicSourceTextureAPI$Wonderjs = require("../../../../../src/api/texture/BasicSourceTextureAPI.js");
var BasicSourceTextureTool$Wonderjs = require("../../../../tool/service/texture/BasicSourceTextureTool.js");
var SparseMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/SparseMapService.js");

describe("BasicMaterial", (function () {
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
        describe("createBasicMaterial", (function () {
                Wonder_jest.test("create a new material which is just index(int)", (function () {
                        var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[1]), 0);
                      }));
                describe("set default value", (function () {
                        return Wonder_jest.test("set texture count to be 0", (function () {
                                      var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicMaterialTool$Wonderjs.getBasicSourceTextureCount(match[1], match[0])), 0);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("init", (function () {
                describe("contract check", (function () {
                        return Wonder_jest.test("shouldn't dispose any material before init", (function () {
                                      var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state[0]);
                                      var match$1 = BasicMaterialAPI$Wonderjs.createBasicMaterial(match[0]);
                                      var state$1 = BasicMaterialTool$Wonderjs.dispose(match[1], match$1[0]);
                                      return Wonder_jest.Expect[/* toThrowMessage */20]("expect component's gameObject exist, but actual not", Wonder_jest.Expect[/* expect */0]((function () {
                                                        BasicMaterialTool$Wonderjs.initMaterials(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                                        return /* () */0;
                                                      })));
                                    }));
                      }));
                return /* () */0;
              }));
        describe("unsafeGetBasicMaterialGameObject", (function () {
                return Wonder_jest.test("get material's gameObject", (function () {
                              var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state[0]);
                              var material = match[1];
                              var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                              var gameObject = match$1[1];
                              var state$1 = GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject, material, match$1[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialGameObject(material, state$1)), gameObject);
                            }));
              }));
        describe("operate data", (function () {
                Wonder_jest.test("get the data from array buffer may not equal to the value which is setted", (function () {
                        var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state[0]);
                        var material = match[1];
                        var color = /* array */[
                          0.2,
                          0.3,
                          0.5
                        ];
                        var state$1 = BasicMaterialAPI$Wonderjs.setBasicMaterialColor(material, color, match[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicMaterialAPI$Wonderjs.getBasicMaterialColor(material, state$1)), /* array */[
                                    0.20000000298023224,
                                    0.30000001192092896,
                                    0.5
                                  ]);
                      }));
                describe("getBasicMaterialColor", (function () {
                        return Wonder_jest.test("test default color", (function () {
                                      var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicMaterialAPI$Wonderjs.getBasicMaterialColor(match[1], match[0])), /* array */[
                                                  1,
                                                  1,
                                                  1
                                                ]);
                                    }));
                      }));
                describe("setBasicMaterialColor", (function () {
                        return Wonder_jest.test("test set color", (function () {
                                      var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state[0]);
                                      var material = match[1];
                                      var color = /* array */[
                                        0.2,
                                        0.3,
                                        0.5
                                      ];
                                      var state$1 = BasicMaterialAPI$Wonderjs.setBasicMaterialColor(material, color, match[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TypeArrayTool$Wonderjs.truncateArray(BasicMaterialAPI$Wonderjs.getBasicMaterialColor(material, state$1))), color);
                                    }));
                      }));
                describe("unsafeGetBasicMaterialMap", (function () {
                        return Wonder_jest.test("if has no map, error", (function () {
                                      var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state[0]);
                                      var material = match[1];
                                      var state$1 = match[0];
                                      return Wonder_jest.Expect[/* toThrowMessage */20]("expect data exist", Wonder_jest.Expect[/* expect */0]((function () {
                                                        return BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialMap(material, state$1);
                                                      })));
                                    }));
                      }));
                describe("setBasicMaterialMap", (function () {
                        var _prepare = function (state) {
                          var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state);
                          var material = match[1];
                          var match$1 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(match[0]);
                          var match$2 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(match$1[0]);
                          var map2 = match$2[1];
                          var state$1 = BasicMaterialAPI$Wonderjs.setBasicMaterialMap(material, map2, match$2[0]);
                          return /* tuple */[
                                  state$1,
                                  material,
                                  map2
                                ];
                        };
                        Wonder_jest.test("texture count + 1", (function () {
                                var match = _prepare(state[0]);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicMaterialTool$Wonderjs.getBasicSourceTextureCount(match[1], match[0])), 1);
                              }));
                        Wonder_jest.test("set map unit to 0", (function () {
                                var match = _prepare(state[0]);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicMaterialTool$Wonderjs.getMapUnit(match[1], match[0])), 0);
                              }));
                        return Wonder_jest.test("save texture index", (function () {
                                      var match = _prepare(state[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialMap(match[1], match[0])), match[2]);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("disposeComponent", (function () {
                describe("dispose data", (function () {
                        describe("test dispose shared material", (function () {
                                return Wonder_jest.test("descrease group count", (function () {
                                              var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state[0]);
                                              var material1 = match[1];
                                              var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                                              var gameObject1 = match$1[1];
                                              var state$1 = GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject1, material1, match$1[0]);
                                              var match$2 = GameObjectAPI$Wonderjs.createGameObject(state$1);
                                              var state$2 = GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(match$2[1], material1, match$2[0]);
                                              var state$3 = GameObjectTool$Wonderjs.disposeGameObjectBasicMaterialComponent(gameObject1, material1, state$2);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicMaterialTool$Wonderjs.getGroupCount(material1, state$3)), 0);
                                            }));
                              }));
                        describe("test dispose not shared material", (function () {
                                Wonder_jest.test("reset basicSourceTextureCount to 0 from textureCountMap", (function () {
                                        var match = BasicMaterialTool$Wonderjs.createGameObjectWithMap(state[0]);
                                        var material1 = match[2][0];
                                        var state$1 = GameObjectTool$Wonderjs.disposeGameObjectBasicMaterialComponent(match[1], material1, match[0]);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicMaterialTool$Wonderjs.getBasicSourceTextureCount(material1, state$1)), 0);
                                      }));
                                Wonder_jest.test("remove from gameObjectMap", (function () {
                                        var match = BasicMaterialTool$Wonderjs.createGameObject(state[0]);
                                        var material1 = match[2];
                                        var state$1 = GameObjectTool$Wonderjs.disposeGameObjectBasicMaterialComponent(match[1], material1, match[0]);
                                        var match$1 = BasicMaterialTool$Wonderjs.getRecord(state$1);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](SparseMapService$WonderCommonlib.has(material1, match$1[/* gameObjectMap */8])), false);
                                      }));
                                describe("test remove from type array", (function () {
                                        var _testRemoveFromTypeArr = function (state, valueTuple, defaultValue, param) {
                                          return AllMaterialTool$Wonderjs.testRemoveFromTypeArr(state, valueTuple, defaultValue, /* tuple */[
                                                      GameObjectTool$Wonderjs.disposeGameObjectBasicMaterialComponent,
                                                      param[0],
                                                      param[1],
                                                      param[2]
                                                    ]);
                                        };
                                        describe("remove from shaderIndices", (function () {
                                                return Wonder_jest.test("reset removed one's value", (function () {
                                                              return _testRemoveFromTypeArr(state, /* tuple */[
                                                                          1,
                                                                          2
                                                                        ], BasicMaterialTool$Wonderjs.getDefaultShaderIndex(state[0]), /* tuple */[
                                                                          BasicMaterialTool$Wonderjs.createGameObject,
                                                                          BasicMaterialTool$Wonderjs.getShaderIndex,
                                                                          BasicMaterialTool$Wonderjs.setShaderIndex
                                                                        ]);
                                                            }));
                                              }));
                                        describe("remove from colors", (function () {
                                                return Wonder_jest.test("reset removed one's value", (function () {
                                                              return _testRemoveFromTypeArr(state, /* tuple */[
                                                                          /* array */[
                                                                            1,
                                                                            0.2,
                                                                            0.3
                                                                          ],
                                                                          /* array */[
                                                                            0,
                                                                            0.2,
                                                                            0.3
                                                                          ]
                                                                        ], BasicMaterialTool$Wonderjs.getDefaultColor(state[0]), /* tuple */[
                                                                          BasicMaterialTool$Wonderjs.createGameObject,
                                                                          (function (material, state) {
                                                                              return TypeArrayTool$Wonderjs.truncateArray(BasicMaterialAPI$Wonderjs.getBasicMaterialColor(material, state));
                                                                            }),
                                                                          BasicMaterialAPI$Wonderjs.setBasicMaterialColor
                                                                        ]);
                                                            }));
                                              }));
                                        describe("test map typeArrays", (function () {
                                                describe("remove from textureIndices", (function () {
                                                        return Wonder_jest.test("reset material's all texture indices", (function () {
                                                                      var state = TestTool$Wonderjs.initWithoutBuildFakeDom(sandbox, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                                                                      var match = BasicMaterialTool$Wonderjs.createGameObjectWithMap(state);
                                                                      var material1 = match[2][0];
                                                                      var state$1 = match[0];
                                                                      var match$1 = BasicMaterialTool$Wonderjs.getRecord(state$1);
                                                                      var textureIndices = match$1[/* textureIndices */4];
                                                                      var sourceIndex = BasicMaterialTool$Wonderjs.getTextureIndicesIndex(material1, state$1);
                                                                      textureIndices[sourceIndex] = 1;
                                                                      textureIndices[sourceIndex + 1 | 0] = 2;
                                                                      textureIndices[sourceIndex + 2 | 0] = 3;
                                                                      var defaultTextureIndex = BasicMaterialTool$Wonderjs.getDefaultTextureIndex(/* () */0);
                                                                      GameObjectTool$Wonderjs.disposeGameObjectBasicMaterialComponent(match[1], material1, state$1);
                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](textureIndices.slice(0, 5)), new Uint32Array(/* array */[
                                                                                      defaultTextureIndex,
                                                                                      defaultTextureIndex,
                                                                                      3,
                                                                                      0,
                                                                                      0
                                                                                    ]));
                                                                    }));
                                                      }));
                                                describe("remove from mapUnits", (function () {
                                                        return Wonder_jest.test("reset removed one's value", (function () {
                                                                      var state$1 = state;
                                                                      var valueTuple = /* tuple */[
                                                                        1,
                                                                        2
                                                                      ];
                                                                      var defaultValue = BasicSourceTextureTool$Wonderjs.getDefaultUnit(/* () */0);
                                                                      var param = /* tuple */[
                                                                        BasicMaterialTool$Wonderjs.createGameObjectWithMap,
                                                                        BasicMaterialTool$Wonderjs.getMapUnit,
                                                                        BasicMaterialTool$Wonderjs.setMapUnit
                                                                      ];
                                                                      return AllMaterialTool$Wonderjs.testRemoveFromTypeArrWithMap(state$1, valueTuple, defaultValue, /* tuple */[
                                                                                  GameObjectTool$Wonderjs.disposeGameObjectBasicMaterialComponent,
                                                                                  param[0],
                                                                                  param[1],
                                                                                  param[2]
                                                                                ]);
                                                                    }));
                                                      }));
                                                return /* () */0;
                                              }));
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                describe("test add new one after dispose old one", (function () {
                        Wonder_jest.test("new one's data should be default value", (function () {
                                var match = BasicMaterialTool$Wonderjs.createGameObject(state[0]);
                                var material1 = match[2];
                                var color = /* array */[
                                  0.2,
                                  0.3,
                                  0.5
                                ];
                                var state$1 = BasicMaterialAPI$Wonderjs.setBasicMaterialColor(material1, color, match[0]);
                                var match$1 = BasicMaterialTool$Wonderjs.createGameObject(state$1);
                                var state$2 = GameObjectTool$Wonderjs.disposeGameObjectBasicMaterialComponent(match[1], material1, match$1[0]);
                                var match$2 = BasicMaterialTool$Wonderjs.createGameObject(state$2);
                                var state$3 = match$2[0];
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicMaterialAPI$Wonderjs.getBasicMaterialColor(match$2[2], state$3)), BasicMaterialTool$Wonderjs.getDefaultColor(state$3));
                              }));
                        Wonder_jest.test("use disposed index as new index firstly", (function () {
                                var match = BasicMaterialTool$Wonderjs.createGameObject(state[0]);
                                var material1 = match[2];
                                var match$1 = BasicMaterialTool$Wonderjs.createGameObject(match[0]);
                                var state$1 = GameObjectTool$Wonderjs.disposeGameObjectBasicMaterialComponent(match[1], material1, match$1[0]);
                                var match$2 = BasicMaterialTool$Wonderjs.createGameObject(state$1);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match$2[2]), material1);
                              }));
                        return Wonder_jest.test("if has no disposed index, get index from materialData.index", (function () {
                                      var match = BasicMaterialTool$Wonderjs.createGameObject(state[0]);
                                      var material1 = match[2];
                                      var match$1 = BasicMaterialTool$Wonderjs.createGameObject(match[0]);
                                      var state$1 = GameObjectTool$Wonderjs.disposeGameObjectBasicMaterialComponent(match[1], material1, match$1[0]);
                                      var match$2 = BasicMaterialTool$Wonderjs.createGameObject(state$1);
                                      var match$3 = BasicMaterialTool$Wonderjs.createGameObject(match$2[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      match$2[2],
                                                      match$3[2]
                                                    ]), /* tuple */[
                                                  material1,
                                                  match$1[2] + 1 | 0
                                                ]);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("contract check: is alive", (function () {
                describe("if material is disposed", (function () {
                        return Wonder_jest.test("unsafeGetBasicMaterialGameObject should error", (function () {
                                      var getFunc = BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialGameObject;
                                      var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state[0]);
                                      var material = match[1];
                                      var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                                      var gameObject = match$1[1];
                                      var state$1 = GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject, material, match$1[0]);
                                      var state$2 = GameObjectTool$Wonderjs.disposeGameObjectBasicMaterialComponent(gameObject, material, state$1);
                                      return Wonder_jest.Expect[/* toThrowMessage */20]("expect component alive, but actual not", Wonder_jest.Expect[/* expect */0]((function () {
                                                        return Curry._2(getFunc, material, state$2);
                                                      })));
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

/*  Not a pure module */
