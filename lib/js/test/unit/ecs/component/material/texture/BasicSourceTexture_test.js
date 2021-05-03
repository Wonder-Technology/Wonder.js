'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Js_option = require("bs-platform/lib/js/js_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../../../tool/TestTool.js");
var FakeGlTool$Wonderjs = require("../../../../../tool/gl/FakeGlTool.js");
var SettingTool$Wonderjs = require("../../../../../tool/service/setting/SettingTool.js");
var ArrayService$Wonderjs = require("../../../../../../src/service/atom/ArrayService.js");
var OptionService$Wonderjs = require("../../../../../../src/service/atom/OptionService.js");
var TestWorkerTool$Wonderjs = require("../../../../../integration/worker/tool/TestWorkerTool.js");
var LightMaterialAPI$Wonderjs = require("../../../../../../src/api/material/LightMaterialAPI.js");
var LightMaterialTool$Wonderjs = require("../../../../../tool/service/material/LightMaterialTool.js");
var TextureTypeService$Wonderjs = require("../../../../../../src/service/primitive/texture/TextureTypeService.js");
var BasicSourceTextureAPI$Wonderjs = require("../../../../../../src/api/texture/BasicSourceTextureAPI.js");
var BasicSourceTextureTool$Wonderjs = require("../../../../../tool/service/texture/BasicSourceTextureTool.js");
var CreateStateMainService$Wonderjs = require("../../../../../../src/service/state/main/state/CreateStateMainService.js");
var BufferBasicSourceTextureService$Wonderjs = require("../../../../../../src/service/record/main/texture/source/basic_source/BufferBasicSourceTextureService.js");

Wonder_jest.describe("BasicSourceTexture", (function (param) {
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
        Wonder_jest.describe("createBasicSourceTexture", (function (param) {
                Wonder_jest.test("create a new texture which is just index(int)", (function (param) {
                        var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match[1]), 0);
                      }));
                return Wonder_jest.test("shouldn't exceed buffer count", (function (param) {
                              var state = TestTool$Wonderjs.initWithoutBuildFakeDom(sandbox, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                              BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state);
                              BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state);
                              return Wonder_jest.Expect[/* toThrowMessage */21]("expect index: 2 <= maxIndex: 1, but actual not", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state);
                                                return /* () */0;
                                              })));
                            }));
              }));
        Wonder_jest.describe("test default data", (function (param) {
                Wonder_jest.describe("is need updates", (function (param) {
                        return Wonder_jest.test("default is need update", (function (param) {
                                      var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureTool$Wonderjs.getIsNeedUpdate(match[1], match[0])), true);
                                    }));
                      }));
                return Wonder_jest.describe("is flipY", (function (param) {
                              return Wonder_jest.test("default is true", (function (param) {
                                            var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state[0]);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureFlipY(match[1], match[0])), true);
                                          }));
                            }));
              }));
        Wonder_jest.describe("getBasicSourceTextureWidth", (function (param) {
                Wonder_jest.describe("if set source", (function (param) {
                        var _prepare = function (state) {
                          var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state[0]);
                          var texture = match[1];
                          var source = {
                            width: 100
                          };
                          var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureSource(texture, source, match[0]);
                          return /* tuple */[
                                  state$1,
                                  texture,
                                  source
                                ];
                        };
                        return Wonder_jest.test("return source.width", (function (param) {
                                      var match = _prepare(state);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureWidth(match[1], match[0])), match[2].width);
                                    }));
                      }));
                return Wonder_jest.test("else, fatal", (function (param) {
                              var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state[0]);
                              var texture = match[1];
                              var state$1 = match[0];
                              return Wonder_jest.Expect[/* toThrowMessage */21]("source should exist", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                return BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureWidth(texture, state$1);
                                              })));
                            }));
              }));
        Wonder_jest.describe("getBasicSourceTextureHeight", (function (param) {
                Wonder_jest.describe("if set source", (function (param) {
                        var _prepare = function (state) {
                          var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state[0]);
                          var texture = match[1];
                          var source = {
                            height: 100
                          };
                          var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureSource(texture, source, match[0]);
                          return /* tuple */[
                                  state$1,
                                  texture,
                                  source
                                ];
                        };
                        return Wonder_jest.test("return source.height", (function (param) {
                                      var match = _prepare(state);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureHeight(match[1], match[0])), match[2].height);
                                    }));
                      }));
                return Wonder_jest.test("else, fatal", (function (param) {
                              var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state[0]);
                              var texture = match[1];
                              var state$1 = match[0];
                              return Wonder_jest.Expect[/* toThrowMessage */21]("source should exist", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                return BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureHeight(texture, state$1);
                                              })));
                            }));
              }));
        Wonder_jest.describe("setBasicSourceTextureWrapS", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state[0]);
                              var texture = match[1];
                              var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureWrapS(texture, /* Mirrored_repeat */1, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureWrapS(texture, state$1)), /* Mirrored_repeat */1);
                            }));
              }));
        Wonder_jest.describe("setBasicSourceTextureWrapT", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state[0]);
                              var texture = match[1];
                              var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureWrapT(texture, /* Mirrored_repeat */1, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureWrapT(texture, state$1)), /* Mirrored_repeat */1);
                            }));
              }));
        Wonder_jest.describe("setBasicSourceTextureMagFilter", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state[0]);
                              var texture = match[1];
                              var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureMagFilter(texture, /* Linear */1, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureMagFilter(texture, state$1)), /* Linear */1);
                            }));
              }));
        Wonder_jest.describe("setBasicSourceTextureMinFilter", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state[0]);
                              var texture = match[1];
                              var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureMinFilter(texture, /* Linear */1, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureMinFilter(texture, state$1)), /* Linear */1);
                            }));
              }));
        Wonder_jest.describe("setBasicSourceTextureFormat", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state[0]);
                              var texture = match[1];
                              var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureFormat(texture, /* Rgb */0, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureFormat(texture, state$1)), /* Rgb */0);
                            }));
              }));
        Wonder_jest.describe("setBasicSourceTextureType", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state[0]);
                              var texture = match[1];
                              var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureType(texture, 1, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureType(texture, state$1)), 1);
                            }));
              }));
        Wonder_jest.describe("setBasicSourceTextureFlipY", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state[0]);
                              var texture = match[1];
                              var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureFlipY(texture, false, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureFlipY(texture, state$1)), false);
                            }));
              }));
        Wonder_jest.describe("getBasicSourceTextureIsNeedUpdate", (function (param) {
                return Wonder_jest.test("default is true", (function (param) {
                              var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureIsNeedUpdate(match[1], match[0])), true);
                            }));
              }));
        Wonder_jest.describe("setBasicSourceTextureIsNeedUpdate", (function (param) {
                return Wonder_jest.test("test set", (function (param) {
                              var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state[0]);
                              var texture = match[1];
                              var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureIsNeedUpdate(texture, false, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureIsNeedUpdate(texture, state$1)), false);
                            }));
              }));
        Wonder_jest.describe("getAllTextures", (function (param) {
                return Wonder_jest.test("get all created textures", (function (param) {
                              var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state[0]);
                              var match$1 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureAPI$Wonderjs.getAllTextures(match$1[0])), /* array */[
                                          match[1],
                                          match$1[1]
                                        ]);
                            }));
              }));
        Wonder_jest.describe("dispose from material", (function (param) {
                beforeEach((function () {
                        state[0] = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                        return /* () */0;
                      }));
                Wonder_jest.describe("remove material from group", (function (param) {
                        return Wonder_jest.test("test light material", (function (param) {
                                      var match = LightMaterialTool$Wonderjs.createMaterialWithMap(state[0]);
                                      var match$1 = match[2];
                                      var specularMap = match$1[1];
                                      var diffuseMap = match$1[0];
                                      var match$2 = LightMaterialAPI$Wonderjs.createLightMaterial(match[0]);
                                      var match$3 = LightMaterialTool$Wonderjs.setMaps(match$2[1], diffuseMap, specularMap, match$2[0]);
                                      var state$1 = LightMaterialAPI$Wonderjs.batchDisposeLightMaterial(/* array */[match[1]], match$3[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      BasicSourceTextureTool$Wonderjs.unsafeGetMaterialDataArr(diffuseMap, state$1).length,
                                                      BasicSourceTextureTool$Wonderjs.unsafeGetMaterialDataArr(specularMap, state$1).length
                                                    ]), /* tuple */[
                                                  1,
                                                  1
                                                ]);
                                    }));
                      }));
                Wonder_jest.test("if other materials use the texture, not dispose texture data", (function (param) {
                        var match = LightMaterialTool$Wonderjs.createMaterialWithMap(state[0]);
                        var match$1 = match[2];
                        var specularMap = match$1[1];
                        var diffuseMap = match$1[0];
                        var match$2 = LightMaterialAPI$Wonderjs.createLightMaterial(match[0]);
                        var match$3 = LightMaterialTool$Wonderjs.setMaps(match$2[1], diffuseMap, specularMap, match$2[0]);
                        var state$1 = LightMaterialAPI$Wonderjs.batchDisposeLightMaterial(/* array */[match[1]], match$3[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                        BasicSourceTextureAPI$Wonderjs.unsafeGetBasicSourceTextureSource(diffuseMap, state$1),
                                        BasicSourceTextureAPI$Wonderjs.unsafeGetBasicSourceTextureSource(specularMap, state$1)
                                      ]), /* tuple */[
                                    match$1[2],
                                    match$1[3]
                                  ]);
                      }));
                Wonder_jest.test("if is remove texture, not dispose data", (function (param) {
                        var match = LightMaterialTool$Wonderjs.createMaterialWithMap(state[0]);
                        var state$1 = LightMaterialAPI$Wonderjs.batchDisposeLightMaterialRemoveTexture(/* array */[match[1]], match[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Js_option.isNone(BasicSourceTextureTool$Wonderjs.getBasicSourceTextureSource(match[2][0], state$1))), false);
                      }));
                return Wonder_jest.describe("else", (function (param) {
                              Wonder_jest.test("remove from sourceMap, nameMap", (function (param) {
                                      var match = LightMaterialTool$Wonderjs.createMaterialWithMap(state[0]);
                                      var diffuseMap = match[2][0];
                                      var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureName(diffuseMap, "name", match[0]);
                                      var state$2 = LightMaterialAPI$Wonderjs.batchDisposeLightMaterial(/* array */[match[1]], state$1);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureName(diffuseMap, state$2),
                                                      BasicSourceTextureTool$Wonderjs.getBasicSourceTextureSource(diffuseMap, state$2)
                                                    ]), /* tuple */[
                                                  undefined,
                                                  undefined
                                                ]);
                                    }));
                              Wonder_jest.describe("test remove from type array", (function (param) {
                                      var _testRemoveFromTypeArr = function (state, param, defaultValue, param$1) {
                                        var setValueFunc = param$1[2];
                                        var getValueFunc = param$1[1];
                                        var value2 = param[1];
                                        var match = LightMaterialTool$Wonderjs.createMaterialWithDiffuseMap(state[0]);
                                        var texture1 = match[2][0];
                                        var match$1 = LightMaterialTool$Wonderjs.createMaterialWithDiffuseMap(match[0]);
                                        var texture2 = match$1[2][0];
                                        var state$1 = Curry._3(setValueFunc, texture1, param[0], match$1[0]);
                                        var state$2 = Curry._3(setValueFunc, texture2, value2, state$1);
                                        var state$3 = Curry._2(param$1[0], match[1], state$2);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                        Curry._2(getValueFunc, texture1, state$3),
                                                        Curry._2(getValueFunc, texture2, state$3)
                                                      ]), /* tuple */[
                                                    defaultValue,
                                                    value2
                                                  ]);
                                      };
                                      Wonder_jest.test("remove from wrapSs", (function (param) {
                                              return _testRemoveFromTypeArr(state, /* tuple */[
                                                          /* Repeat */2,
                                                          /* Mirrored_repeat */1
                                                        ], BufferBasicSourceTextureService$Wonderjs.getDefaultWrapS(/* () */0), /* tuple */[
                                                          LightMaterialTool$Wonderjs.disposeLightMaterial,
                                                          BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureWrapS,
                                                          BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureWrapS
                                                        ]);
                                            }));
                                      Wonder_jest.test("remove from wrapTs", (function (param) {
                                              return _testRemoveFromTypeArr(state, /* tuple */[
                                                          /* Repeat */2,
                                                          /* Mirrored_repeat */1
                                                        ], BufferBasicSourceTextureService$Wonderjs.getDefaultWrapT(/* () */0), /* tuple */[
                                                          LightMaterialTool$Wonderjs.disposeLightMaterial,
                                                          BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureWrapT,
                                                          BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureWrapT
                                                        ]);
                                            }));
                                      Wonder_jest.test("remove from magFilters", (function (param) {
                                              return _testRemoveFromTypeArr(state, /* tuple */[
                                                          /* Linear_mipmap_nearest */3,
                                                          /* Nearest_mipmap_linear */4
                                                        ], BufferBasicSourceTextureService$Wonderjs.getDefaultMagFilter(/* () */0), /* tuple */[
                                                          LightMaterialTool$Wonderjs.disposeLightMaterial,
                                                          BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureMagFilter,
                                                          BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureMagFilter
                                                        ]);
                                            }));
                                      Wonder_jest.test("remove from minFilters", (function (param) {
                                              return _testRemoveFromTypeArr(state, /* tuple */[
                                                          /* Linear_mipmap_nearest */3,
                                                          /* Nearest_mipmap_linear */4
                                                        ], BufferBasicSourceTextureService$Wonderjs.getDefaultMinFilter(/* () */0), /* tuple */[
                                                          LightMaterialTool$Wonderjs.disposeLightMaterial,
                                                          BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureMinFilter,
                                                          BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureMinFilter
                                                        ]);
                                            }));
                                      Wonder_jest.test("remove from formats", (function (param) {
                                              return _testRemoveFromTypeArr(state, /* tuple */[
                                                          /* Rgba */1,
                                                          /* Alpha */2
                                                        ], BufferBasicSourceTextureService$Wonderjs.getDefaultFormat(/* () */0), /* tuple */[
                                                          LightMaterialTool$Wonderjs.disposeLightMaterial,
                                                          BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureFormat,
                                                          BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureFormat
                                                        ]);
                                            }));
                                      Wonder_jest.test("remove from types", (function (param) {
                                              return _testRemoveFromTypeArr(state, /* tuple */[
                                                          TextureTypeService$Wonderjs.getUnsignedShort4444(/* () */0),
                                                          TextureTypeService$Wonderjs.getUnsignedShort5551(/* () */0)
                                                        ], BufferBasicSourceTextureService$Wonderjs.getDefaultType(/* () */0), /* tuple */[
                                                          LightMaterialTool$Wonderjs.disposeLightMaterial,
                                                          BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureType,
                                                          BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureType
                                                        ]);
                                            }));
                                      Wonder_jest.test("remove from isNeedUpdates", (function (param) {
                                              return _testRemoveFromTypeArr(state, /* tuple */[
                                                          true,
                                                          false
                                                        ], true, /* tuple */[
                                                          LightMaterialTool$Wonderjs.disposeLightMaterial,
                                                          BasicSourceTextureTool$Wonderjs.getIsNeedUpdate,
                                                          BasicSourceTextureTool$Wonderjs.setIsNeedUpdate
                                                        ]);
                                            }));
                                      return Wonder_jest.test("remove from flipYs", (function (param) {
                                                    return _testRemoveFromTypeArr(state, /* tuple */[
                                                                true,
                                                                false
                                                              ], true, /* tuple */[
                                                                LightMaterialTool$Wonderjs.disposeLightMaterial,
                                                                BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureFlipY,
                                                                BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureFlipY
                                                              ]);
                                                  }));
                                    }));
                              return Wonder_jest.describe("test remove worker data", (function (param) {
                                            Wonder_jest.test("remove from needAddedSourceArray", (function (param) {
                                                    var state$1 = TestWorkerTool$Wonderjs.markUseWorker(state[0]);
                                                    var match = LightMaterialTool$Wonderjs.createMaterialWithMap(state$1);
                                                    var state$2 = LightMaterialAPI$Wonderjs.batchDisposeLightMaterial(/* array */[match[1]], match[0]);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureTool$Wonderjs.getNeedAddedSourceArray(state$2).length), 0);
                                                  }));
                                            return Wonder_jest.test("remove from needInitedTextureIndexArray", (function (param) {
                                                          var match = LightMaterialTool$Wonderjs.createMaterialWithMap(state[0]);
                                                          var match$1 = match[2];
                                                          var state$1 = match[0];
                                                          var needInitedTextureIndexArray = BasicSourceTextureTool$Wonderjs.getNeedInitedTextureIndexArray(state$1);
                                                          ArrayService$Wonderjs.push(match$1[1], ArrayService$Wonderjs.push(match$1[0], needInitedTextureIndexArray));
                                                          var state$2 = LightMaterialAPI$Wonderjs.batchDisposeLightMaterial(/* array */[match[1]], state$1);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureTool$Wonderjs.getNeedInitedTextureIndexArray(state$2).length), 0);
                                                        }));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("disposeBasicSourceTexture", (function (param) {
                      Wonder_jest.test("clear texture's materials", (function (param) {
                              var match = LightMaterialTool$Wonderjs.createMaterialWithMap(state[0]);
                              var match$1 = match[2];
                              var match$2 = LightMaterialAPI$Wonderjs.createLightMaterial(match[0]);
                              var match$3 = LightMaterialTool$Wonderjs.setMaps(match$2[1], match$1[0], match$1[1], match$2[0]);
                              var match$4 = match$3[1];
                              var specularMap = match$4[1];
                              var state$1 = BasicSourceTextureAPI$Wonderjs.disposeBasicSourceTexture(specularMap, false, match$3[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              OptionService$Wonderjs.unsafeGet(BasicSourceTextureTool$Wonderjs.getMaterialDataArr(match$4[0], state$1)).length,
                                              Js_option.isNone(BasicSourceTextureTool$Wonderjs.getMaterialDataArr(specularMap, state$1))
                                            ]), /* tuple */[
                                          2,
                                          true
                                        ]);
                            }));
                      Wonder_jest.test("if is remove texture, not dispose data", (function (param) {
                              var match = LightMaterialTool$Wonderjs.createMaterialWithMap(state[0]);
                              var specularMap = match[2][1];
                              var state$1 = BasicSourceTextureAPI$Wonderjs.disposeBasicSourceTexture(specularMap, true, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Js_option.isNone(BasicSourceTextureTool$Wonderjs.getBasicSourceTextureSource(specularMap, state$1))), false);
                            }));
                      return Wonder_jest.test("else, dispose data", (function (param) {
                                    var match = LightMaterialTool$Wonderjs.createMaterialWithMap(state[0]);
                                    var specularMap = match[2][1];
                                    var state$1 = BasicSourceTextureAPI$Wonderjs.disposeBasicSourceTexture(specularMap, false, match[0]);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Js_option.isNone(BasicSourceTextureTool$Wonderjs.getBasicSourceTextureSource(specularMap, state$1))), true);
                                  }));
                    }));
      }));

/*  Not a pure module */
