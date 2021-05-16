'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../../../tool/TestTool.js");
var FakeGlTool$Wonderjs = require("../../../../../tool/gl/FakeGlTool.js");
var SettingTool$Wonderjs = require("../../../../../tool/service/setting/SettingTool.js");
var ArrayService$Wonderjs = require("../../../../../../src/service/atom/ArrayService.js");
var TestWorkerTool$Wonderjs = require("../../../../../integration/worker/tool/TestWorkerTool.js");
var LightMaterialAPI$Wonderjs = require("../../../../../../src/api/material/LightMaterialAPI.js");
var LightMaterialTool$Wonderjs = require("../../../../../tool/service/material/LightMaterialTool.js");
var TextureTypeService$Wonderjs = require("../../../../../../src/service/primitive/texture/TextureTypeService.js");
var CreateStateMainService$Wonderjs = require("../../../../../../src/service/state/main/state/CreateStateMainService.js");
var ArrayBufferViewSourceTextureAPI$Wonderjs = require("../../../../../../src/api/texture/ArrayBufferViewSourceTextureAPI.js");
var ArrayBufferViewSourceTextureTool$Wonderjs = require("../../../../../tool/service/texture/ArrayBufferViewSourceTextureTool.js");
var BufferArrayBufferViewSourceTextureService$Wonderjs = require("../../../../../../src/service/record/main/texture/source/arrayBufferView_source/BufferArrayBufferViewSourceTextureService.js");

Wonder_jest.describe("ArrayBufferViewSourceTexture", (function (param) {
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
        Wonder_jest.describe("createArrayBufferViewSourceTexture", (function (param) {
                Wonder_jest.test("create a new texture which starts from arrayBufferViewSourceTextureIndexOffset", (function (param) {
                        var match = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match[1]), ArrayBufferViewSourceTextureTool$Wonderjs.generateArrayBufferViewSourceTextureIndex(0, match[0]));
                      }));
                return Wonder_jest.test("shouldn't exceed buffer count", (function (param) {
                              var state = TestTool$Wonderjs.initWithoutBuildFakeDom(sandbox, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, /* () */0), /* () */0);
                              ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state);
                              ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state);
                              return Wonder_jest.Expect[/* toThrowMessage */21]("expect index: 50 <= maxIndex: 49, but actual not", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state);
                                                return /* () */0;
                                              })));
                            }));
              }));
        Wonder_jest.describe("test default data", (function (param) {
                Wonder_jest.describe("is need updates", (function (param) {
                        return Wonder_jest.test("default is need update", (function (param) {
                                      var match = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayBufferViewSourceTextureTool$Wonderjs.isNeedUpdate(match[1], match[0])), true);
                                    }));
                      }));
                return Wonder_jest.describe("is flipY", (function (param) {
                              return Wonder_jest.test("default is true", (function (param) {
                                            var match = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state[0]);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayBufferViewSourceTextureAPI$Wonderjs.getArrayBufferViewSourceTextureFlipY(match[1], match[0])), true);
                                          }));
                            }));
              }));
        Wonder_jest.describe("setArrayBufferViewSourceTextureSource", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state[0]);
                              var texture = match[1];
                              var source = ArrayBufferViewSourceTextureTool$Wonderjs.buildSource(/* () */0);
                              var state$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureSource(texture, source, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayBufferViewSourceTextureAPI$Wonderjs.unsafeGetArrayBufferViewSourceTextureSource(texture, state$1)), source);
                            }));
              }));
        Wonder_jest.describe("setArrayBufferViewSourceTextureWidth", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state[0]);
                              var texture = match[1];
                              var state$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureWidth(texture, 5, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayBufferViewSourceTextureAPI$Wonderjs.getArrayBufferViewSourceTextureWidth(texture, state$1)), 5);
                            }));
              }));
        Wonder_jest.describe("setArrayBufferViewSourceTextureHeight", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state[0]);
                              var texture = match[1];
                              var state$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureHeight(texture, 5, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayBufferViewSourceTextureAPI$Wonderjs.getArrayBufferViewSourceTextureHeight(texture, state$1)), 5);
                            }));
              }));
        Wonder_jest.describe("setArrayBufferViewSourceTextureWrapS", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state[0]);
                              var texture = match[1];
                              var state$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureWrapS(texture, /* Mirrored_repeat */1, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayBufferViewSourceTextureAPI$Wonderjs.getArrayBufferViewSourceTextureWrapS(texture, state$1)), /* Mirrored_repeat */1);
                            }));
              }));
        Wonder_jest.describe("setArrayBufferViewSourceTextureWrapT", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state[0]);
                              var texture = match[1];
                              var state$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureWrapT(texture, /* Mirrored_repeat */1, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayBufferViewSourceTextureAPI$Wonderjs.getArrayBufferViewSourceTextureWrapT(texture, state$1)), /* Mirrored_repeat */1);
                            }));
              }));
        Wonder_jest.describe("setArrayBufferViewSourceTextureMagFilter", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state[0]);
                              var texture = match[1];
                              var state$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureMagFilter(texture, /* Linear */1, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayBufferViewSourceTextureAPI$Wonderjs.getArrayBufferViewSourceTextureMagFilter(texture, state$1)), /* Linear */1);
                            }));
              }));
        Wonder_jest.describe("setArrayBufferViewSourceTextureMinFilter", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state[0]);
                              var texture = match[1];
                              var state$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureMinFilter(texture, /* Linear */1, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayBufferViewSourceTextureAPI$Wonderjs.getArrayBufferViewSourceTextureMinFilter(texture, state$1)), /* Linear */1);
                            }));
              }));
        Wonder_jest.describe("setArrayBufferViewSourceTextureFormat", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state[0]);
                              var texture = match[1];
                              var state$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureFormat(texture, /* Rgba */1, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayBufferViewSourceTextureAPI$Wonderjs.getArrayBufferViewSourceTextureFormat(texture, state$1)), /* Rgba */1);
                            }));
              }));
        Wonder_jest.describe("setArrayBufferViewSourceTextureType", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state[0]);
                              var texture = match[1];
                              var state$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureType(texture, 1, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayBufferViewSourceTextureAPI$Wonderjs.getArrayBufferViewSourceTextureType(texture, state$1)), 1);
                            }));
              }));
        Wonder_jest.describe("setArrayBufferViewSourceTextureFlipY", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state[0]);
                              var texture = match[1];
                              var state$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureFlipY(texture, false, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayBufferViewSourceTextureAPI$Wonderjs.getArrayBufferViewSourceTextureFlipY(texture, state$1)), false);
                            }));
              }));
        return Wonder_jest.describe("dispose", (function (param) {
                      return Wonder_jest.describe("dispose from material", (function (param) {
                                    beforeEach((function () {
                                            state[0] = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                                            return /* () */0;
                                          }));
                                    Wonder_jest.describe("remove material from group", (function (param) {
                                            return Wonder_jest.test("test light material", (function (param) {
                                                          var match = LightMaterialTool$Wonderjs.createMaterialWithArrayBufferViewMap(state[0]);
                                                          var match$1 = match[2];
                                                          var specularMap = match$1[1];
                                                          var diffuseMap = match$1[0];
                                                          var match$2 = LightMaterialAPI$Wonderjs.createLightMaterial(match[0]);
                                                          var match$3 = LightMaterialTool$Wonderjs.setMaps(match$2[1], diffuseMap, specularMap, match$2[0]);
                                                          var state$1 = LightMaterialAPI$Wonderjs.batchDisposeLightMaterial(/* array */[match[1]], match$3[0]);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                          ArrayBufferViewSourceTextureTool$Wonderjs.unsafeGetMaterialDataArr(diffuseMap, state$1).length,
                                                                          ArrayBufferViewSourceTextureTool$Wonderjs.unsafeGetMaterialDataArr(specularMap, state$1).length
                                                                        ]), /* tuple */[
                                                                      1,
                                                                      1
                                                                    ]);
                                                        }));
                                          }));
                                    Wonder_jest.test("if other materials use the texture, not dispose texture data", (function (param) {
                                            var match = LightMaterialTool$Wonderjs.createMaterialWithArrayBufferViewMap(state[0]);
                                            var match$1 = match[2];
                                            var specularMap = match$1[1];
                                            var diffuseMap = match$1[0];
                                            var match$2 = LightMaterialAPI$Wonderjs.createLightMaterial(match[0]);
                                            var match$3 = LightMaterialTool$Wonderjs.setMaps(match$2[1], diffuseMap, specularMap, match$2[0]);
                                            var state$1 = LightMaterialAPI$Wonderjs.batchDisposeLightMaterial(/* array */[match[1]], match$3[0]);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            ArrayBufferViewSourceTextureAPI$Wonderjs.unsafeGetArrayBufferViewSourceTextureSource(diffuseMap, state$1),
                                                            ArrayBufferViewSourceTextureAPI$Wonderjs.unsafeGetArrayBufferViewSourceTextureSource(specularMap, state$1)
                                                          ]), /* tuple */[
                                                        match$1[2],
                                                        match$1[3]
                                                      ]);
                                          }));
                                    return Wonder_jest.describe("else", (function (param) {
                                                  Wonder_jest.test("remove from sourceMap, nameMap", (function (param) {
                                                          var match = LightMaterialTool$Wonderjs.createMaterialWithArrayBufferViewMap(state[0]);
                                                          var diffuseMap = match[2][0];
                                                          var state$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureName(diffuseMap, "name", match[0]);
                                                          var state$2 = LightMaterialAPI$Wonderjs.batchDisposeLightMaterial(/* array */[match[1]], state$1);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                          ArrayBufferViewSourceTextureTool$Wonderjs.getArrayBufferViewSourceTextureName(diffuseMap, state$2),
                                                                          ArrayBufferViewSourceTextureTool$Wonderjs.getArrayBufferViewSourceTextureSource(diffuseMap, state$2)
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
                                                            var match = LightMaterialTool$Wonderjs.createMaterialWithArrayBufferViewDiffuseMap(state[0]);
                                                            var texture1 = match[2][0];
                                                            var match$1 = LightMaterialTool$Wonderjs.createMaterialWithArrayBufferViewDiffuseMap(match[0]);
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
                                                                            ], BufferArrayBufferViewSourceTextureService$Wonderjs.getDefaultWrapS(/* () */0), /* tuple */[
                                                                              LightMaterialTool$Wonderjs.disposeLightMaterial,
                                                                              ArrayBufferViewSourceTextureAPI$Wonderjs.getArrayBufferViewSourceTextureWrapS,
                                                                              ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureWrapS
                                                                            ]);
                                                                }));
                                                          Wonder_jest.test("remove from wrapTs", (function (param) {
                                                                  return _testRemoveFromTypeArr(state, /* tuple */[
                                                                              /* Repeat */2,
                                                                              /* Mirrored_repeat */1
                                                                            ], BufferArrayBufferViewSourceTextureService$Wonderjs.getDefaultWrapT(/* () */0), /* tuple */[
                                                                              LightMaterialTool$Wonderjs.disposeLightMaterial,
                                                                              ArrayBufferViewSourceTextureAPI$Wonderjs.getArrayBufferViewSourceTextureWrapT,
                                                                              ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureWrapT
                                                                            ]);
                                                                }));
                                                          Wonder_jest.test("remove from magFilters", (function (param) {
                                                                  return _testRemoveFromTypeArr(state, /* tuple */[
                                                                              /* Linear_mipmap_nearest */3,
                                                                              /* Nearest_mipmap_linear */4
                                                                            ], BufferArrayBufferViewSourceTextureService$Wonderjs.getDefaultMagFilter(/* () */0), /* tuple */[
                                                                              LightMaterialTool$Wonderjs.disposeLightMaterial,
                                                                              ArrayBufferViewSourceTextureAPI$Wonderjs.getArrayBufferViewSourceTextureMagFilter,
                                                                              ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureMagFilter
                                                                            ]);
                                                                }));
                                                          Wonder_jest.test("remove from minFilters", (function (param) {
                                                                  return _testRemoveFromTypeArr(state, /* tuple */[
                                                                              /* Linear_mipmap_nearest */3,
                                                                              /* Nearest_mipmap_linear */4
                                                                            ], BufferArrayBufferViewSourceTextureService$Wonderjs.getDefaultMinFilter(/* () */0), /* tuple */[
                                                                              LightMaterialTool$Wonderjs.disposeLightMaterial,
                                                                              ArrayBufferViewSourceTextureAPI$Wonderjs.getArrayBufferViewSourceTextureMinFilter,
                                                                              ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureMinFilter
                                                                            ]);
                                                                }));
                                                          Wonder_jest.test("remove from formats", (function (param) {
                                                                  return _testRemoveFromTypeArr(state, /* tuple */[
                                                                              /* Rgba */1,
                                                                              /* Alpha */2
                                                                            ], BufferArrayBufferViewSourceTextureService$Wonderjs.getDefaultFormat(/* () */0), /* tuple */[
                                                                              LightMaterialTool$Wonderjs.disposeLightMaterial,
                                                                              ArrayBufferViewSourceTextureAPI$Wonderjs.getArrayBufferViewSourceTextureFormat,
                                                                              ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureFormat
                                                                            ]);
                                                                }));
                                                          Wonder_jest.test("remove from types", (function (param) {
                                                                  return _testRemoveFromTypeArr(state, /* tuple */[
                                                                              TextureTypeService$Wonderjs.getUnsignedShort4444(/* () */0),
                                                                              TextureTypeService$Wonderjs.getUnsignedShort5551(/* () */0)
                                                                            ], BufferArrayBufferViewSourceTextureService$Wonderjs.getDefaultType(/* () */0), /* tuple */[
                                                                              LightMaterialTool$Wonderjs.disposeLightMaterial,
                                                                              ArrayBufferViewSourceTextureAPI$Wonderjs.getArrayBufferViewSourceTextureType,
                                                                              ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureType
                                                                            ]);
                                                                }));
                                                          Wonder_jest.test("remove from flipYs", (function (param) {
                                                                  return _testRemoveFromTypeArr(state, /* tuple */[
                                                                              true,
                                                                              false
                                                                            ], true, /* tuple */[
                                                                              LightMaterialTool$Wonderjs.disposeLightMaterial,
                                                                              ArrayBufferViewSourceTextureAPI$Wonderjs.getArrayBufferViewSourceTextureFlipY,
                                                                              ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureFlipY
                                                                            ]);
                                                                }));
                                                          Wonder_jest.test("remove from widths", (function (param) {
                                                                  return _testRemoveFromTypeArr(state, /* tuple */[
                                                                              1,
                                                                              2
                                                                            ], BufferArrayBufferViewSourceTextureService$Wonderjs.getDefaultWidth(/* () */0), /* tuple */[
                                                                              LightMaterialTool$Wonderjs.disposeLightMaterial,
                                                                              ArrayBufferViewSourceTextureAPI$Wonderjs.getArrayBufferViewSourceTextureWidth,
                                                                              ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureWidth
                                                                            ]);
                                                                }));
                                                          return Wonder_jest.test("remove from heights", (function (param) {
                                                                        return _testRemoveFromTypeArr(state, /* tuple */[
                                                                                    1,
                                                                                    2
                                                                                  ], BufferArrayBufferViewSourceTextureService$Wonderjs.getDefaultHeight(/* () */0), /* tuple */[
                                                                                    LightMaterialTool$Wonderjs.disposeLightMaterial,
                                                                                    ArrayBufferViewSourceTextureAPI$Wonderjs.getArrayBufferViewSourceTextureHeight,
                                                                                    ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureHeight
                                                                                  ]);
                                                                      }));
                                                        }));
                                                  return Wonder_jest.describe("test remove worker data", (function (param) {
                                                                Wonder_jest.test("remove from needAddedSourceArray", (function (param) {
                                                                        var state$1 = TestWorkerTool$Wonderjs.markUseWorker(state[0]);
                                                                        var match = LightMaterialTool$Wonderjs.createMaterialWithArrayBufferViewMap(state$1);
                                                                        var state$2 = LightMaterialAPI$Wonderjs.batchDisposeLightMaterial(/* array */[match[1]], match[0]);
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayBufferViewSourceTextureTool$Wonderjs.getNeedAddedSourceArray(state$2).length), 0);
                                                                      }));
                                                                return Wonder_jest.test("remove from needInitedTextureIndexArray", (function (param) {
                                                                              var match = LightMaterialTool$Wonderjs.createMaterialWithArrayBufferViewMap(state[0]);
                                                                              var match$1 = match[2];
                                                                              var state$1 = match[0];
                                                                              var needInitedTextureIndexArray = ArrayBufferViewSourceTextureTool$Wonderjs.getNeedInitedTextureIndexArray(state$1);
                                                                              ArrayService$Wonderjs.push(match$1[1], ArrayService$Wonderjs.push(match$1[0], needInitedTextureIndexArray));
                                                                              var state$2 = LightMaterialAPI$Wonderjs.batchDisposeLightMaterial(/* array */[match[1]], state$1);
                                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayBufferViewSourceTextureTool$Wonderjs.getNeedInitedTextureIndexArray(state$2).length), 0);
                                                                            }));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
