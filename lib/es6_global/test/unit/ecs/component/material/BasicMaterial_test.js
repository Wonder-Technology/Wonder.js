

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as DisposeJob$Wonderjs from "../../../../../src/job/no_worker/loop/DisposeJob.js";
import * as FakeGlTool$Wonderjs from "../../../../tool/gl/FakeGlTool.js";
import * as SettingTool$Wonderjs from "../../../../tool/service/setting/SettingTool.js";
import * as GameObjectAPI$Wonderjs from "../../../../../src/api/GameObjectAPI.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as TypeArrayTool$Wonderjs from "../../../../tool/service/primitive/TypeArrayTool.js";
import * as GameObjectTool$Wonderjs from "../../../../tool/service/gameObject/GameObjectTool.js";
import * as AllMaterialTool$Wonderjs from "../../../../tool/service/material/AllMaterialTool.js";
import * as BasicMaterialAPI$Wonderjs from "../../../../../src/api/material/BasicMaterialAPI.js";
import * as BasicMaterialTool$Wonderjs from "../../../../tool/service/material/BasicMaterialTool.js";
import * as LightMaterialTool$Wonderjs from "../../../../tool/service/material/LightMaterialTool.js";
import * as BasicSourceTextureAPI$Wonderjs from "../../../../../src/api/texture/BasicSourceTextureAPI.js";
import * as BasicSourceTextureTool$Wonderjs from "../../../../tool/service/texture/BasicSourceTextureTool.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

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
                        return Wonder_jest.test("init emptyMapUnitArray", (function () {
                                      state[0] = TestTool$Wonderjs.initWithoutBuildFakeDom(sandbox, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 3, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                                      var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicMaterialTool$Wonderjs.getEmptyMapUnitArray(match[1], match[0])), /* array */[
                                                  2,
                                                  1,
                                                  0
                                                ]);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("init", (function () {
                describe("contract check", (function () {
                        return Wonder_jest.test("shouldn't dispose any material before init", (function () {
                                      state[0] = TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                      var match = BasicMaterialTool$Wonderjs.createGameObject(state[0]);
                                      var match$1 = BasicMaterialTool$Wonderjs.createGameObject(match[0]);
                                      var state$1 = BasicMaterialTool$Wonderjs.dispose(match[1], match[2], match$1[0]);
                                      return Wonder_jest.Expect[/* toThrowMessage */20]("expect not dispose any material before init", Wonder_jest.Expect[/* expect */0]((function () {
                                                        BasicMaterialTool$Wonderjs.initMaterials(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                                        return /* () */0;
                                                      })));
                                    }));
                      }));
                return /* () */0;
              }));
        describe("unsafeGetBasicMaterialGameObjects", (function () {
                return Wonder_jest.test("get material's gameObjects", (function () {
                              var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state[0]);
                              var material = match[1];
                              var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                              var gameObject1 = match$1[1];
                              var match$2 = GameObjectAPI$Wonderjs.createGameObject(match$1[0]);
                              var gameObject2 = match$2[1];
                              var state$1 = GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject1, material, match$2[0]);
                              var state$2 = GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject2, material, state$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialGameObjects(material, state$2)), /* array */[
                                          gameObject1,
                                          gameObject2
                                        ]);
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
                                return Wonder_jest.test("remove gameObject", (function () {
                                              var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state[0]);
                                              var basicMaterial1 = match[1];
                                              var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                                              var gameObject1 = match$1[1];
                                              var state$1 = GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject1, basicMaterial1, match$1[0]);
                                              var match$2 = GameObjectAPI$Wonderjs.createGameObject(state$1);
                                              var gameObject2 = match$2[1];
                                              var state$2 = GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject2, basicMaterial1, match$2[0]);
                                              var match$3 = GameObjectAPI$Wonderjs.createGameObject(state$2);
                                              var gameObject3 = match$3[1];
                                              var state$3 = GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject3, basicMaterial1, match$3[0]);
                                              var state$4 = GameObjectTool$Wonderjs.disposeGameObjectBasicMaterialComponent(gameObject1, basicMaterial1, state$3);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialGameObjects(basicMaterial1, state$4)), /* array */[
                                                          gameObject3,
                                                          gameObject2
                                                        ]);
                                            }));
                              }));
                        describe("test dispose not shared material", (function () {
                                Wonder_jest.test("remove from gameObjectsMap, nameMap, emptyMapUnitArrayMap", (function () {
                                        var match = BasicMaterialTool$Wonderjs.createGameObject(state[0]);
                                        var material1 = match[2];
                                        var state$1 = BasicMaterialAPI$Wonderjs.setBasicMaterialName(material1, "name", match[0]);
                                        var state$2 = GameObjectTool$Wonderjs.disposeGameObjectBasicMaterialComponent(match[1], material1, state$1);
                                        var match$1 = BasicMaterialTool$Wonderjs.getRecord(state$2);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                        BasicMaterialTool$Wonderjs.hasGameObject(material1, state$2),
                                                        SparseMapService$WonderCommonlib.has(material1, match$1[/* nameMap */10]),
                                                        SparseMapService$WonderCommonlib.has(material1, match$1[/* emptyMapUnitArrayMap */6])
                                                      ]), /* tuple */[
                                                    false,
                                                    false,
                                                    false
                                                  ]);
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
                                                                      var state = TestTool$Wonderjs.initWithoutBuildFakeDom(sandbox, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
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
                        describe("fix bug", (function () {
                                return Wonder_jest.test("if have create other gameObjects, shouldn't affect dispose basicMaterial gameObjects", (function () {
                                              var match = LightMaterialTool$Wonderjs.createGameObject(state[0]);
                                              var match$1 = BasicMaterialTool$Wonderjs.createGameObject(match[0]);
                                              var state$1 = DisposeJob$Wonderjs.execJob(undefined, GameObjectAPI$Wonderjs.batchDisposeGameObject(/* array */[
                                                        match[1],
                                                        match$1[1]
                                                      ], match$1[0]));
                                              var match$2 = BasicMaterialTool$Wonderjs.createGameObject(state$1);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialGameObjects(match$2[2], match$2[0])), /* array */[match$2[1]]);
                                            }));
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
        describe("getAllBasicMaterials", (function () {
                var _createBasicMaterialGameObjects = function (state) {
                  var match = BasicMaterialTool$Wonderjs.createGameObject(state[0]);
                  var match$1 = BasicMaterialTool$Wonderjs.createGameObject(match[0]);
                  var match$2 = BasicMaterialTool$Wonderjs.createGameObject(match$1[0]);
                  return /* tuple */[
                          match$2[0],
                          /* tuple */[
                            match[1],
                            match$1[1],
                            match$2[1]
                          ],
                          /* tuple */[
                            match[2],
                            match$1[2],
                            match$2[2]
                          ]
                        ];
                };
                Wonder_jest.test("get all components include the ones add or not add to gameObject", (function () {
                        var match = _createBasicMaterialGameObjects(state);
                        var match$1 = match[2];
                        var match$2 = BasicMaterialAPI$Wonderjs.createBasicMaterial(match[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicMaterialAPI$Wonderjs.getAllBasicMaterials(match$2[0])), /* array */[
                                    match$1[0],
                                    match$1[1],
                                    match$1[2],
                                    match$2[1]
                                  ]);
                      }));
                return Wonder_jest.test("test dispose", (function () {
                              var match = _createBasicMaterialGameObjects(state);
                              var match$1 = match[1];
                              var state$1 = GameObjectAPI$Wonderjs.disposeGameObject(match$1[2], GameObjectAPI$Wonderjs.disposeGameObject(match$1[1], match[0]));
                              var state$2 = DisposeJob$Wonderjs.execJob(undefined, state$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.getAllBasicMaterialComponents(state$2)), /* array */[match[2][0]]);
                            }));
              }));
        describe("contract check: is alive", (function () {
                describe("if material is disposed", (function () {
                        return Wonder_jest.test("unsafeGetBasicMaterialGameObjects should error", (function () {
                                      var getFunc = BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialGameObjects;
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

export {
  
}
/*  Not a pure module */
