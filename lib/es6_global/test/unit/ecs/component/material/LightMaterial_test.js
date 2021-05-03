

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "./../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as DisposeJob$Wonderjs from "../../../../../src/job/no_worker/loop/DisposeJob.js";
import * as FakeGlTool$Wonderjs from "../../../../tool/gl/FakeGlTool.js";
import * as SettingTool$Wonderjs from "../../../../tool/service/setting/SettingTool.js";
import * as GameObjectAPI$Wonderjs from "../../../../../src/api/GameObjectAPI.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as TypeArrayTool$Wonderjs from "../../../../tool/service/primitive/TypeArrayTool.js";
import * as GameObjectTool$Wonderjs from "../../../../tool/service/gameObject/GameObjectTool.js";
import * as AllMaterialTool$Wonderjs from "../../../../tool/service/material/AllMaterialTool.js";
import * as LightMaterialAPI$Wonderjs from "../../../../../src/api/material/LightMaterialAPI.js";
import * as BasicMaterialTool$Wonderjs from "../../../../tool/service/material/BasicMaterialTool.js";
import * as LightMaterialTool$Wonderjs from "../../../../tool/service/material/LightMaterialTool.js";
import * as BasicSourceTextureAPI$Wonderjs from "../../../../../src/api/texture/BasicSourceTextureAPI.js";
import * as BasicSourceTextureTool$Wonderjs from "../../../../tool/service/texture/BasicSourceTextureTool.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as ArrayBufferViewSourceTextureAPI$Wonderjs from "../../../../../src/api/texture/ArrayBufferViewSourceTextureAPI.js";
import * as ArrayBufferViewSourceTextureTool$Wonderjs from "../../../../tool/service/texture/ArrayBufferViewSourceTextureTool.js";

Wonder_jest.describe("LightMaterial", (function (param) {
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
        Wonder_jest.describe("createLightMaterial", (function (param) {
                return Wonder_jest.test("create a new material which is just index(int)", (function (param) {
                              var match = LightMaterialAPI$Wonderjs.createLightMaterial(state[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match[1]), 0);
                            }));
              }));
        Wonder_jest.describe("unsafeGetLightMaterialGameObjects", (function (param) {
                return Wonder_jest.test("get material's gameObjects", (function (param) {
                              var match = LightMaterialAPI$Wonderjs.createLightMaterial(state[0]);
                              var material = match[1];
                              var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                              var gameObject1 = match$1[1];
                              var match$2 = GameObjectAPI$Wonderjs.createGameObject(match$1[0]);
                              var gameObject2 = match$2[1];
                              var state$1 = GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject1, material, match$2[0]);
                              var state$2 = GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject2, material, state$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](LightMaterialAPI$Wonderjs.unsafeGetLightMaterialGameObjects(material, state$2)), /* array */[
                                          gameObject1,
                                          gameObject2
                                        ]);
                            }));
              }));
        Wonder_jest.describe("operate data", (function (param) {
                Wonder_jest.test("get the data from array buffer may not equal to the value which is setted", (function (param) {
                        var match = LightMaterialAPI$Wonderjs.createLightMaterial(state[0]);
                        var material = match[1];
                        var color = /* array */[
                          0.2,
                          0.3,
                          0.5
                        ];
                        var state$1 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseColor(material, color, match[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](LightMaterialAPI$Wonderjs.getLightMaterialDiffuseColor(material, state$1)), /* array */[
                                    0.20000000298023224,
                                    0.30000001192092896,
                                    0.5
                                  ]);
                      }));
                Wonder_jest.describe("getLightMaterialDiffuseColor", (function (param) {
                        return Wonder_jest.test("test default color", (function (param) {
                                      var match = LightMaterialAPI$Wonderjs.createLightMaterial(state[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](LightMaterialAPI$Wonderjs.getLightMaterialDiffuseColor(match[1], match[0])), /* array */[
                                                  1,
                                                  1,
                                                  1
                                                ]);
                                    }));
                      }));
                Wonder_jest.describe("setLightMaterialDiffuseColor", (function (param) {
                        return Wonder_jest.test("test set color", (function (param) {
                                      var match = LightMaterialAPI$Wonderjs.createLightMaterial(state[0]);
                                      var material = match[1];
                                      var color = /* array */[
                                        0.2,
                                        0.3,
                                        0.5
                                      ];
                                      var state$1 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseColor(material, color, match[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TypeArrayTool$Wonderjs.truncateArray(LightMaterialAPI$Wonderjs.getLightMaterialDiffuseColor(material, state$1))), color);
                                    }));
                      }));
                Wonder_jest.describe("getLightMaterialSpecularColor", (function (param) {
                        return Wonder_jest.test("test default color", (function (param) {
                                      var match = LightMaterialAPI$Wonderjs.createLightMaterial(state[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](LightMaterialAPI$Wonderjs.getLightMaterialSpecularColor(match[1], match[0])), /* array */[
                                                  1,
                                                  1,
                                                  1
                                                ]);
                                    }));
                      }));
                Wonder_jest.describe("setLightMaterialSpecularColor", (function (param) {
                        return Wonder_jest.test("test set color", (function (param) {
                                      var match = LightMaterialAPI$Wonderjs.createLightMaterial(state[0]);
                                      var material = match[1];
                                      var color = /* array */[
                                        0.2,
                                        0.3,
                                        0.5
                                      ];
                                      var state$1 = LightMaterialAPI$Wonderjs.setLightMaterialSpecularColor(material, color, match[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TypeArrayTool$Wonderjs.truncateArray(LightMaterialAPI$Wonderjs.getLightMaterialSpecularColor(material, state$1))), color);
                                    }));
                      }));
                Wonder_jest.describe("getLightMaterialShininess", (function (param) {
                        return Wonder_jest.test("test default shininess", (function (param) {
                                      var match = LightMaterialAPI$Wonderjs.createLightMaterial(state[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](LightMaterialAPI$Wonderjs.getLightMaterialShininess(match[1], match[0])), 32);
                                    }));
                      }));
                Wonder_jest.describe("setLightMaterialShininess", (function (param) {
                        return Wonder_jest.test("test set shininess", (function (param) {
                                      var match = LightMaterialAPI$Wonderjs.createLightMaterial(state[0]);
                                      var material = match[1];
                                      var state$1 = LightMaterialAPI$Wonderjs.setLightMaterialShininess(material, 30, match[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](LightMaterialAPI$Wonderjs.getLightMaterialShininess(material, state$1)), 30);
                                    }));
                      }));
                Wonder_jest.describe("unsafeGetLightMaterialDiffuseMap", (function (param) {
                        return Wonder_jest.test("if has no map, error", (function (param) {
                                      var match = LightMaterialAPI$Wonderjs.createLightMaterial(state[0]);
                                      var material = match[1];
                                      var state$1 = match[0];
                                      return Wonder_jest.Expect[/* toThrowMessage */21]("expect data exist", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                        return LightMaterialAPI$Wonderjs.unsafeGetLightMaterialDiffuseMap(material, state$1);
                                                      })));
                                    }));
                      }));
                Wonder_jest.describe("unsafeGetLightMaterialSpecularMap", (function (param) {
                        return Wonder_jest.test("if has no map, error", (function (param) {
                                      var match = LightMaterialAPI$Wonderjs.createLightMaterial(state[0]);
                                      var material = match[1];
                                      var state$1 = match[0];
                                      return Wonder_jest.Expect[/* toThrowMessage */21]("expect data exist", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                        return LightMaterialAPI$Wonderjs.unsafeGetLightMaterialSpecularMap(material, state$1);
                                                      })));
                                    }));
                      }));
                Wonder_jest.describe("setLightMaterialDiffuseMap, setLightMaterialSpecularMap", (function (param) {
                        var _prepare = function (state) {
                          var match = LightMaterialAPI$Wonderjs.createLightMaterial(state);
                          var material = match[1];
                          var match$1 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(match[0]);
                          var map1 = match$1[1];
                          var match$2 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(match$1[0]);
                          var map2 = match$2[1];
                          var state$1 = LightMaterialAPI$Wonderjs.setLightMaterialSpecularMap(material, map1, match$2[0]);
                          var state$2 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseMap(material, map2, state$1);
                          return /* tuple */[
                                  state$2,
                                  material,
                                  /* tuple */[
                                    map1,
                                    map2
                                  ]
                                ];
                        };
                        Wonder_jest.test("set map unit", (function (param) {
                                var match = _prepare(state[0]);
                                var material = match[1];
                                var state$1 = match[0];
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                LightMaterialAPI$Wonderjs.unsafeGetLightMaterialDiffuseMap(material, state$1),
                                                LightMaterialAPI$Wonderjs.unsafeGetLightMaterialSpecularMap(material, state$1)
                                              ]), /* tuple */[
                                            1,
                                            0
                                          ]);
                              }));
                        return Wonder_jest.test("save texture index", (function (param) {
                                      var match = _prepare(state[0]);
                                      var match$1 = match[2];
                                      var material = match[1];
                                      var state$1 = match[0];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      LightMaterialAPI$Wonderjs.unsafeGetLightMaterialDiffuseMap(material, state$1),
                                                      LightMaterialAPI$Wonderjs.unsafeGetLightMaterialSpecularMap(material, state$1)
                                                    ]), /* tuple */[
                                                  match$1[1],
                                                  match$1[0]
                                                ]);
                                    }));
                      }));
                return Wonder_jest.describe("removeLightMaterialDiffuseMap, removeLightMaterialSpecularMap", (function (param) {
                              var _prepare = function (state) {
                                var match = LightMaterialAPI$Wonderjs.createLightMaterial(state);
                                var material = match[1];
                                var match$1 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(match[0]);
                                var map1 = match$1[1];
                                var match$2 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(match$1[0]);
                                var map2 = match$2[1];
                                var state$1 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseMap(material, map2, LightMaterialAPI$Wonderjs.setLightMaterialSpecularMap(material, map1, match$2[0]));
                                return /* tuple */[
                                        state$1,
                                        material,
                                        /* tuple */[
                                          map1,
                                          map2
                                        ]
                                      ];
                              };
                              var _exec = function (material, state) {
                                return LightMaterialAPI$Wonderjs.removeLightMaterialDiffuseMap(material, LightMaterialAPI$Wonderjs.removeLightMaterialSpecularMap(material, state));
                              };
                              Wonder_jest.test("has map should return false", (function (param) {
                                      var match = _prepare(state[0]);
                                      var material = match[1];
                                      var state$1 = _exec(material, match[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      LightMaterialAPI$Wonderjs.hasLightMaterialDiffuseMap(material, state$1),
                                                      LightMaterialAPI$Wonderjs.hasLightMaterialSpecularMap(material, state$1)
                                                    ]), /* tuple */[
                                                  false,
                                                  false
                                                ]);
                                    }));
                              Wonder_jest.describe("remove map from group", (function (param) {
                                      Wonder_jest.test("test basicSourceTexture", (function (param) {
                                              var match = _prepare(state[0]);
                                              var match$1 = match[2];
                                              var state$1 = _exec(match[1], match[0]);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              BasicSourceTextureTool$Wonderjs.unsafeGetMaterialDataArr(match$1[0], state$1).length,
                                                              BasicSourceTextureTool$Wonderjs.unsafeGetMaterialDataArr(match$1[1], state$1).length
                                                            ]), /* tuple */[
                                                          0,
                                                          0
                                                        ]);
                                            }));
                                      return Wonder_jest.test("test arrayBufferViewSourceTexture", (function (param) {
                                                    var match = LightMaterialAPI$Wonderjs.createLightMaterial(state[0]);
                                                    var material = match[1];
                                                    var match$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(match[0]);
                                                    var map1 = match$1[1];
                                                    var match$2 = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(match$1[0]);
                                                    var map2 = match$2[1];
                                                    var state$1 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseMap(material, map2, LightMaterialAPI$Wonderjs.setLightMaterialSpecularMap(material, map1, match$2[0]));
                                                    var state$2 = _exec(material, state$1);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                    ArrayBufferViewSourceTextureTool$Wonderjs.unsafeGetMaterialDataArr(map1, state$2).length,
                                                                    ArrayBufferViewSourceTextureTool$Wonderjs.unsafeGetMaterialDataArr(map2, state$2).length
                                                                  ]), /* tuple */[
                                                                0,
                                                                0
                                                              ]);
                                                  }));
                                    }));
                              return Wonder_jest.describe("test set new map after remove", (function (param) {
                                            return Wonder_jest.test("should get correct map", (function (param) {
                                                          var match = _prepare(state[0]);
                                                          var material = match[1];
                                                          var state$1 = LightMaterialAPI$Wonderjs.removeLightMaterialSpecularMap(material, match[0]);
                                                          var match$1 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state$1);
                                                          var map3 = match$1[1];
                                                          var state$2 = LightMaterialAPI$Wonderjs.setLightMaterialSpecularMap(material, map3, match$1[0]);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                          LightMaterialAPI$Wonderjs.unsafeGetLightMaterialSpecularMap(material, state$2),
                                                                          LightMaterialAPI$Wonderjs.unsafeGetLightMaterialDiffuseMap(material, state$2)
                                                                        ]), /* tuple */[
                                                                      map3,
                                                                      match[2][1]
                                                                    ]);
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("disposeComponent", (function (param) {
                return Wonder_jest.describe("dispose data", (function (param) {
                              beforeEach((function () {
                                      state[0] = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                                      return /* () */0;
                                    }));
                              Wonder_jest.describe("test dispose shared material", (function (param) {
                                      return Wonder_jest.test("remove gameObject", (function (param) {
                                                    var match = LightMaterialAPI$Wonderjs.createLightMaterial(state[0]);
                                                    var lightMaterial1 = match[1];
                                                    var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                                                    var gameObject1 = match$1[1];
                                                    var state$1 = GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject1, lightMaterial1, match$1[0]);
                                                    var match$2 = GameObjectAPI$Wonderjs.createGameObject(state$1);
                                                    var gameObject2 = match$2[1];
                                                    var state$2 = GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject2, lightMaterial1, match$2[0]);
                                                    var match$3 = GameObjectAPI$Wonderjs.createGameObject(state$2);
                                                    var gameObject3 = match$3[1];
                                                    var state$3 = GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject3, lightMaterial1, match$3[0]);
                                                    var state$4 = GameObjectTool$Wonderjs.disposeGameObjectLightMaterialComponent(gameObject1, lightMaterial1, state$3);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](LightMaterialAPI$Wonderjs.unsafeGetLightMaterialGameObjects(lightMaterial1, state$4)), /* array */[
                                                                gameObject2,
                                                                gameObject3
                                                              ]);
                                                  }));
                                    }));
                              Wonder_jest.test("remove from nameMap", (function (param) {
                                      var match = LightMaterialTool$Wonderjs.createGameObject(state[0]);
                                      var material1 = match[2];
                                      var state$1 = LightMaterialAPI$Wonderjs.setLightMaterialName(material1, "name", match[0]);
                                      var state$2 = GameObjectTool$Wonderjs.disposeGameObjectLightMaterialComponent(match[1], material1, state$1);
                                      var match$1 = LightMaterialTool$Wonderjs.getRecord(state$2);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MutableSparseMapService$WonderCommonlib.has(material1, match$1[/* nameMap */13])), false);
                                    }));
                              Wonder_jest.describe("test remove from type array", (function (param) {
                                      var _testRemoveFromTypeArr = function (state, valueTuple, defaultValue, param) {
                                        return AllMaterialTool$Wonderjs.testRemoveFromTypeArr(state, valueTuple, defaultValue, /* tuple */[
                                                    GameObjectTool$Wonderjs.disposeGameObjectLightMaterialComponent,
                                                    param[0],
                                                    param[1],
                                                    param[2]
                                                  ]);
                                      };
                                      Wonder_jest.describe("remove from shaderIndices", (function (param) {
                                              return Wonder_jest.test("reset removed one's value", (function (param) {
                                                            return _testRemoveFromTypeArr(state, /* tuple */[
                                                                        1,
                                                                        2
                                                                      ], LightMaterialTool$Wonderjs.getDefaultShaderIndex(state[0]), /* tuple */[
                                                                        LightMaterialTool$Wonderjs.createGameObject,
                                                                        LightMaterialTool$Wonderjs.getShaderIndex,
                                                                        LightMaterialTool$Wonderjs.setShaderIndex
                                                                      ]);
                                                          }));
                                            }));
                                      Wonder_jest.describe("remove from diffuseColors", (function (param) {
                                              return Wonder_jest.test("reset removed one's value", (function (param) {
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
                                                                      ], LightMaterialTool$Wonderjs.getDefaultDiffuseColor(state[0]), /* tuple */[
                                                                        LightMaterialTool$Wonderjs.createGameObject,
                                                                        (function (material, state) {
                                                                            return TypeArrayTool$Wonderjs.truncateArray(LightMaterialAPI$Wonderjs.getLightMaterialDiffuseColor(material, state));
                                                                          }),
                                                                        LightMaterialAPI$Wonderjs.setLightMaterialDiffuseColor
                                                                      ]);
                                                          }));
                                            }));
                                      Wonder_jest.describe("remove from specularColors", (function (param) {
                                              return Wonder_jest.test("reset removed one's value", (function (param) {
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
                                                                      ], LightMaterialTool$Wonderjs.getDefaultSpecularColor(state[0]), /* tuple */[
                                                                        LightMaterialTool$Wonderjs.createGameObject,
                                                                        (function (material, state) {
                                                                            return TypeArrayTool$Wonderjs.truncateArray(LightMaterialAPI$Wonderjs.getLightMaterialSpecularColor(material, state));
                                                                          }),
                                                                        LightMaterialAPI$Wonderjs.setLightMaterialSpecularColor
                                                                      ]);
                                                          }));
                                            }));
                                      Wonder_jest.describe("remove from shininess", (function (param) {
                                              return Wonder_jest.test("reset removed one's value", (function (param) {
                                                            return _testRemoveFromTypeArr(state, /* tuple */[
                                                                        1,
                                                                        2
                                                                      ], LightMaterialTool$Wonderjs.getDefaultShininess(state[0]), /* tuple */[
                                                                        LightMaterialTool$Wonderjs.createGameObject,
                                                                        LightMaterialAPI$Wonderjs.getLightMaterialShininess,
                                                                        LightMaterialAPI$Wonderjs.setLightMaterialShininess
                                                                      ]);
                                                          }));
                                            }));
                                      return Wonder_jest.describe("test map typeArrays", (function (param) {
                                                    var _test = function (material2TextureIndex, getTextureIndicesFunc, state) {
                                                      var match = LightMaterialTool$Wonderjs.createGameObjectWithMap(state[0]);
                                                      var match$1 = LightMaterialTool$Wonderjs.createGameObjectWithMap(match[0]);
                                                      var state$1 = GameObjectTool$Wonderjs.disposeGameObjectLightMaterialComponent(match[1], match[2][0], match$1[0]);
                                                      var defaultTextureIndex = LightMaterialTool$Wonderjs.getDefaultTextureIndex(/* () */0);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Curry._1(getTextureIndicesFunc, state$1).slice(0, 3)), new Uint32Array(/* array */[
                                                                      defaultTextureIndex,
                                                                      material2TextureIndex,
                                                                      defaultTextureIndex
                                                                    ]));
                                                    };
                                                    beforeEach((function () {
                                                            state[0] = TestTool$Wonderjs.initWithoutBuildFakeDom(sandbox, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                                                            state[0] = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                                                            return /* () */0;
                                                          }));
                                                    Wonder_jest.describe("remove from diffuseTextureIndices", (function (param) {
                                                            return Wonder_jest.test("reset to default value", (function (param) {
                                                                          return _test(2, (function (state) {
                                                                                        return LightMaterialTool$Wonderjs.getRecord(state)[/* diffuseTextureIndices */6];
                                                                                      }), state);
                                                                        }));
                                                          }));
                                                    return Wonder_jest.describe("remove from specularTextureIndices", (function (param) {
                                                                  return Wonder_jest.test("reset to default value", (function (param) {
                                                                                return _test(3, (function (state) {
                                                                                              return LightMaterialTool$Wonderjs.getRecord(state)[/* specularTextureIndices */7];
                                                                                            }), state);
                                                                              }));
                                                                }));
                                                  }));
                                    }));
                              return Wonder_jest.describe("fix bug", (function (param) {
                                            return Wonder_jest.test("if have create other gameObjects, shouldn't affect dispose lightMaterial gameObjects", (function (param) {
                                                          var match = BasicMaterialTool$Wonderjs.createGameObject(state[0]);
                                                          var match$1 = LightMaterialTool$Wonderjs.createGameObject(match[0]);
                                                          var state$1 = DisposeJob$Wonderjs.execJob(undefined, GameObjectAPI$Wonderjs.batchDisposeGameObject(/* array */[
                                                                    match[1],
                                                                    match$1[1]
                                                                  ], match$1[0]));
                                                          var match$2 = LightMaterialTool$Wonderjs.createGameObject(state$1);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](LightMaterialAPI$Wonderjs.unsafeGetLightMaterialGameObjects(match$2[2], match$2[0])), /* array */[match$2[1]]);
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("getAllLightMaterials", (function (param) {
                var _createLightMaterialGameObjects = function (state) {
                  var match = LightMaterialTool$Wonderjs.createGameObject(state[0]);
                  var match$1 = LightMaterialTool$Wonderjs.createGameObject(match[0]);
                  var match$2 = LightMaterialTool$Wonderjs.createGameObject(match$1[0]);
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
                Wonder_jest.test("get all components include the ones add or not add to gameObject", (function (param) {
                        var match = _createLightMaterialGameObjects(state);
                        var match$1 = match[2];
                        var match$2 = LightMaterialAPI$Wonderjs.createLightMaterial(match[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](LightMaterialAPI$Wonderjs.getAllLightMaterials(match$2[0])), /* array */[
                                    match$1[0],
                                    match$1[1],
                                    match$1[2],
                                    match$2[1]
                                  ]);
                      }));
                return Wonder_jest.test("test dispose", (function (param) {
                              var match = _createLightMaterialGameObjects(state);
                              var match$1 = match[1];
                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                              var state$2 = GameObjectAPI$Wonderjs.disposeGameObject(match$1[2], GameObjectAPI$Wonderjs.disposeGameObject(match$1[1], state$1));
                              var state$3 = DisposeJob$Wonderjs.execJob(undefined, state$2);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.getAllLightMaterialComponents(state$3)), /* array */[match[2][0]]);
                            }));
              }));
        Wonder_jest.describe("test batch dispose lightMaterial", (function (param) {
                var _prepareAndExecForHasGameObject = function (state, execFunc) {
                  var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                  var match = LightMaterialAPI$Wonderjs.createLightMaterial(state$1);
                  var match$1 = LightMaterialTool$Wonderjs.createGameObjectWithMap(match[0]);
                  var match$2 = match$1[2];
                  var match$3 = match$2[1];
                  var material2 = match$2[0];
                  var match$4 = LightMaterialTool$Wonderjs.createGameObjectWithMap(match$1[0]);
                  var match$5 = match$4[2];
                  var match$6 = match$5[1];
                  var material3 = match$5[0];
                  var state$2 = Curry._2(execFunc, /* array */[
                        material2,
                        material3
                      ], match$4[0]);
                  return /* tuple */[
                          state$2,
                          /* tuple */[
                            match[1],
                            /* tuple */[
                              material2,
                              /* tuple */[
                                match$3[0],
                                match$3[1]
                              ]
                            ],
                            /* tuple */[
                              material3,
                              /* tuple */[
                                match$6[0],
                                match$6[1]
                              ]
                            ]
                          ]
                        ];
                };
                var _prepareAndExecForHasNoGameObject = function (state, execFunc) {
                  var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                  var match = LightMaterialAPI$Wonderjs.createLightMaterial(state$1);
                  var match$1 = LightMaterialTool$Wonderjs.createMaterialWithMap(match[0]);
                  var match$2 = match$1[2];
                  var material2 = match$1[1];
                  var match$3 = LightMaterialTool$Wonderjs.createMaterialWithMap(match$1[0]);
                  var match$4 = match$3[2];
                  var material3 = match$3[1];
                  var state$2 = Curry._2(execFunc, /* array */[
                        material2,
                        material3
                      ], match$3[0]);
                  return /* tuple */[
                          state$2,
                          /* tuple */[
                            match[1],
                            /* tuple */[
                              material2,
                              /* tuple */[
                                match$2[0],
                                match$2[1]
                              ]
                            ],
                            /* tuple */[
                              material3,
                              /* tuple */[
                                match$4[0],
                                match$4[1]
                              ]
                            ]
                          ]
                        ];
                };
                Wonder_jest.describe("batchDisposeLightMaterial", (function (param) {
                        var _exec = function (materialArr, state) {
                          var state$1 = LightMaterialAPI$Wonderjs.batchDisposeLightMaterial(materialArr, state);
                          return DisposeJob$Wonderjs.execJob(undefined, state$1);
                        };
                        Wonder_jest.describe("if material has gameObjects", (function (param) {
                                Wonder_jest.test("remove from gameObject", (function (param) {
                                        var match = _prepareAndExecForHasGameObject(state, _exec);
                                        var match$1 = match[1];
                                        var state$1 = match[0];
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                        LightMaterialTool$Wonderjs.hasGameObject(match$1[1][0], state$1),
                                                        LightMaterialTool$Wonderjs.hasGameObject(match$1[2][0], state$1)
                                                      ]), /* tuple */[
                                                    false,
                                                    false
                                                  ]);
                                      }));
                                return Wonder_jest.describe("dispose material data", (function (param) {
                                              Wonder_jest.test("dispose material", (function (param) {
                                                      var match = _prepareAndExecForHasGameObject(state, _exec);
                                                      var match$1 = match[1];
                                                      var state$1 = match[0];
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      LightMaterialTool$Wonderjs.isMaterialDisposed(match$1[0], state$1),
                                                                      LightMaterialTool$Wonderjs.isMaterialDisposed(match$1[1][0], state$1),
                                                                      LightMaterialTool$Wonderjs.isMaterialDisposed(match$1[2][0], state$1)
                                                                    ]), /* tuple */[
                                                                  false,
                                                                  true,
                                                                  true
                                                                ]);
                                                    }));
                                              return Wonder_jest.test("dispose material->maps", (function (param) {
                                                            var match = _prepareAndExecForHasGameObject(state, _exec);
                                                            var match$1 = match[1];
                                                            var match$2 = match$1[2][1];
                                                            var match$3 = match$1[1][1];
                                                            var state$1 = match[0];
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                            BasicSourceTextureTool$Wonderjs.isAlive(match$3[0], state$1),
                                                                            BasicSourceTextureTool$Wonderjs.isAlive(match$3[1], state$1),
                                                                            BasicSourceTextureTool$Wonderjs.isAlive(match$2[0], state$1),
                                                                            BasicSourceTextureTool$Wonderjs.isAlive(match$2[1], state$1)
                                                                          ]), /* tuple */[
                                                                        false,
                                                                        false,
                                                                        false,
                                                                        false
                                                                      ]);
                                                          }));
                                            }));
                              }));
                        return Wonder_jest.describe("else", (function (param) {
                                      return Wonder_jest.describe("dispose material data", (function (param) {
                                                    Wonder_jest.test("dispose material", (function (param) {
                                                            var match = _prepareAndExecForHasNoGameObject(state, _exec);
                                                            var match$1 = match[1];
                                                            var state$1 = match[0];
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                            LightMaterialTool$Wonderjs.isMaterialDisposed(match$1[0], state$1),
                                                                            LightMaterialTool$Wonderjs.isMaterialDisposed(match$1[1][0], state$1),
                                                                            LightMaterialTool$Wonderjs.isMaterialDisposed(match$1[2][0], state$1)
                                                                          ]), /* tuple */[
                                                                        false,
                                                                        true,
                                                                        true
                                                                      ]);
                                                          }));
                                                    return Wonder_jest.test("dispose material->maps", (function (param) {
                                                                  var match = _prepareAndExecForHasNoGameObject(state, _exec);
                                                                  var match$1 = match[1];
                                                                  var match$2 = match$1[2][1];
                                                                  var match$3 = match$1[1][1];
                                                                  var state$1 = match[0];
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                  BasicSourceTextureTool$Wonderjs.isAlive(match$3[0], state$1),
                                                                                  BasicSourceTextureTool$Wonderjs.isAlive(match$3[1], state$1),
                                                                                  BasicSourceTextureTool$Wonderjs.isAlive(match$2[0], state$1),
                                                                                  BasicSourceTextureTool$Wonderjs.isAlive(match$2[1], state$1)
                                                                                ]), /* tuple */[
                                                                              false,
                                                                              false,
                                                                              false,
                                                                              false
                                                                            ]);
                                                                }));
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("batchDisposeLightMaterialRemoveTexture", (function (param) {
                              var _exec = function (materialArr, state) {
                                var state$1 = LightMaterialAPI$Wonderjs.batchDisposeLightMaterialRemoveTexture(materialArr, state);
                                return DisposeJob$Wonderjs.execJob(undefined, state$1);
                              };
                              Wonder_jest.describe("if material has gameObjects", (function (param) {
                                      Wonder_jest.test("remove from gameObject", (function (param) {
                                              var match = _prepareAndExecForHasGameObject(state, _exec);
                                              var match$1 = match[1];
                                              var state$1 = match[0];
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              LightMaterialTool$Wonderjs.hasGameObject(match$1[1][0], state$1),
                                                              LightMaterialTool$Wonderjs.hasGameObject(match$1[2][0], state$1)
                                                            ]), /* tuple */[
                                                          false,
                                                          false
                                                        ]);
                                            }));
                                      return Wonder_jest.describe("dispose material data", (function (param) {
                                                    Wonder_jest.test("dispose material", (function (param) {
                                                            var match = _prepareAndExecForHasGameObject(state, _exec);
                                                            var match$1 = match[1];
                                                            var state$1 = match[0];
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                            LightMaterialTool$Wonderjs.isMaterialDisposed(match$1[0], state$1),
                                                                            LightMaterialTool$Wonderjs.isMaterialDisposed(match$1[1][0], state$1),
                                                                            LightMaterialTool$Wonderjs.isMaterialDisposed(match$1[2][0], state$1)
                                                                          ]), /* tuple */[
                                                                        false,
                                                                        true,
                                                                        true
                                                                      ]);
                                                          }));
                                                    return Wonder_jest.test("remove material->maps", (function (param) {
                                                                  var match = _prepareAndExecForHasGameObject(state, _exec);
                                                                  var match$1 = match[1];
                                                                  var match$2 = match$1[2][1];
                                                                  var match$3 = match$1[1][1];
                                                                  var state$1 = match[0];
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                  BasicSourceTextureTool$Wonderjs.isAlive(match$3[0], state$1),
                                                                                  BasicSourceTextureTool$Wonderjs.isAlive(match$3[1], state$1),
                                                                                  BasicSourceTextureTool$Wonderjs.isAlive(match$2[0], state$1),
                                                                                  BasicSourceTextureTool$Wonderjs.isAlive(match$2[1], state$1)
                                                                                ]), /* tuple */[
                                                                              true,
                                                                              true,
                                                                              true,
                                                                              true
                                                                            ]);
                                                                }));
                                                  }));
                                    }));
                              return Wonder_jest.describe("else", (function (param) {
                                            return Wonder_jest.describe("dispose material data", (function (param) {
                                                          Wonder_jest.test("dispose material", (function (param) {
                                                                  var match = _prepareAndExecForHasNoGameObject(state, _exec);
                                                                  var match$1 = match[1];
                                                                  var state$1 = match[0];
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                  LightMaterialTool$Wonderjs.isMaterialDisposed(match$1[0], state$1),
                                                                                  LightMaterialTool$Wonderjs.isMaterialDisposed(match$1[1][0], state$1),
                                                                                  LightMaterialTool$Wonderjs.isMaterialDisposed(match$1[2][0], state$1)
                                                                                ]), /* tuple */[
                                                                              false,
                                                                              true,
                                                                              true
                                                                            ]);
                                                                }));
                                                          return Wonder_jest.test("dispose material->maps", (function (param) {
                                                                        var match = _prepareAndExecForHasNoGameObject(state, _exec);
                                                                        var match$1 = match[1];
                                                                        var match$2 = match$1[2][1];
                                                                        var match$3 = match$1[1][1];
                                                                        var state$1 = match[0];
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                        BasicSourceTextureTool$Wonderjs.isAlive(match$3[0], state$1),
                                                                                        BasicSourceTextureTool$Wonderjs.isAlive(match$3[1], state$1),
                                                                                        BasicSourceTextureTool$Wonderjs.isAlive(match$2[0], state$1),
                                                                                        BasicSourceTextureTool$Wonderjs.isAlive(match$2[1], state$1)
                                                                                      ]), /* tuple */[
                                                                                    true,
                                                                                    true,
                                                                                    true,
                                                                                    true
                                                                                  ]);
                                                                      }));
                                                        }));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("contract check: is alive", (function (param) {
                      return Wonder_jest.describe("if material is disposed", (function (param) {
                                    var _testGetFunc = function (getFunc) {
                                      var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                                      var match = LightMaterialAPI$Wonderjs.createLightMaterial(state$1);
                                      var material = match[1];
                                      var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                                      var gameObject = match$1[1];
                                      var state$2 = GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject, material, match$1[0]);
                                      var state$3 = GameObjectTool$Wonderjs.disposeGameObjectLightMaterialComponent(gameObject, material, state$2);
                                      return Wonder_jest.Expect[/* toThrowMessage */21]("expect component alive, but actual not", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                        return Curry._2(getFunc, material, state$3);
                                                      })));
                                    };
                                    Wonder_jest.test("unsafeGetLightMaterialGameObjects should error", (function (param) {
                                            return _testGetFunc(LightMaterialAPI$Wonderjs.unsafeGetLightMaterialGameObjects);
                                          }));
                                    Wonder_jest.test("getLightMaterialDiffuseColor should error", (function (param) {
                                            return _testGetFunc(LightMaterialAPI$Wonderjs.getLightMaterialDiffuseColor);
                                          }));
                                    return Wonder_jest.test("getLightMaterialSpecularColor should error", (function (param) {
                                                  return _testGetFunc(LightMaterialAPI$Wonderjs.getLightMaterialSpecularColor);
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
