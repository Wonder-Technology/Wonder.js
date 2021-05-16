

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Js_option from "../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_option from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../../tool/TestTool.js";
import * as FakeGlTool$Wonderjs from "../../../../../tool/gl/FakeGlTool.js";
import * as SettingTool$Wonderjs from "../../../../../tool/service/setting/SettingTool.js";
import * as ArrayService$Wonderjs from "../../../../../../src/service/atom/ArrayService.js";
import * as TestWorkerTool$Wonderjs from "../../../../../integration/worker/tool/TestWorkerTool.js";
import * as CubemapTextureAPI$Wonderjs from "../../../../../../src/api/texture/CubemapTextureAPI.js";
import * as CubemapTextureTool$Wonderjs from "../../../../../tool/service/texture/CubemapTextureTool.js";
import * as TextureTypeService$Wonderjs from "../../../../../../src/service/primitive/texture/TextureTypeService.js";
import * as BufferTextureService$Wonderjs from "../../../../../../src/service/record/main/texture/BufferTextureService.js";
import * as CreateStateMainService$Wonderjs from "../../../../../../src/service/state/main/state/CreateStateMainService.js";
import * as BufferCubemapTextureService$Wonderjs from "../../../../../../src/service/record/main/texture/cubemap/BufferCubemapTextureService.js";

Wonder_jest.describe("CubemapTexture", (function (param) {
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
        Wonder_jest.describe("createCubemapTexture", (function (param) {
                Wonder_jest.test("create a new texture which is just index(int)", (function (param) {
                        var match = CubemapTextureAPI$Wonderjs.createCubemapTexture(state[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match[1]), 0);
                      }));
                return Wonder_jest.test("shouldn't exceed buffer count", (function (param) {
                              var state = TestTool$Wonderjs.initWithoutBuildFakeDom(sandbox, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 2, undefined, undefined, /* () */0), /* () */0);
                              CubemapTextureAPI$Wonderjs.createCubemapTexture(state);
                              CubemapTextureAPI$Wonderjs.createCubemapTexture(state);
                              return Wonder_jest.Expect[/* toThrowMessage */21]("expect index: 2 <= maxIndex: 1, but actual not", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                CubemapTextureAPI$Wonderjs.createCubemapTexture(state);
                                                return /* () */0;
                                              })));
                            }));
              }));
        Wonder_jest.describe("test default data", (function (param) {
                Wonder_jest.describe("is need updates", (function (param) {
                        return Wonder_jest.test("default is need update", (function (param) {
                                      var match = CubemapTextureAPI$Wonderjs.createCubemapTexture(state[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapTextureTool$Wonderjs.getIsNeedUpdate(match[1], match[0])), true);
                                    }));
                      }));
                return Wonder_jest.describe("is flipY", (function (param) {
                              return Wonder_jest.test("default is false", (function (param) {
                                            var match = CubemapTextureAPI$Wonderjs.createCubemapTexture(state[0]);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapTextureAPI$Wonderjs.getCubemapTextureFlipY(match[1], match[0])), false);
                                          }));
                            }));
              }));
        Wonder_jest.describe("setCubemapTextureWrapS", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = CubemapTextureAPI$Wonderjs.createCubemapTexture(state[0]);
                              var texture = match[1];
                              var state$1 = CubemapTextureAPI$Wonderjs.setCubemapTextureWrapS(texture, /* Mirrored_repeat */1, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapTextureAPI$Wonderjs.getCubemapTextureWrapS(texture, state$1)), /* Mirrored_repeat */1);
                            }));
              }));
        Wonder_jest.describe("setCubemapTextureWrapT", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = CubemapTextureAPI$Wonderjs.createCubemapTexture(state[0]);
                              var texture = match[1];
                              var state$1 = CubemapTextureAPI$Wonderjs.setCubemapTextureWrapT(texture, /* Mirrored_repeat */1, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapTextureAPI$Wonderjs.getCubemapTextureWrapT(texture, state$1)), /* Mirrored_repeat */1);
                            }));
              }));
        Wonder_jest.describe("setCubemapTextureMagFilter", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = CubemapTextureAPI$Wonderjs.createCubemapTexture(state[0]);
                              var texture = match[1];
                              var state$1 = CubemapTextureAPI$Wonderjs.setCubemapTextureMagFilter(texture, /* Linear */1, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapTextureAPI$Wonderjs.getCubemapTextureMagFilter(texture, state$1)), /* Linear */1);
                            }));
              }));
        Wonder_jest.describe("setCubemapTextureMinFilter", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = CubemapTextureAPI$Wonderjs.createCubemapTexture(state[0]);
                              var texture = match[1];
                              var state$1 = CubemapTextureAPI$Wonderjs.setCubemapTextureMinFilter(texture, /* Linear */1, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapTextureAPI$Wonderjs.getCubemapTextureMinFilter(texture, state$1)), /* Linear */1);
                            }));
              }));
        Wonder_jest.describe("setCubemapTexturePXFormat", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = CubemapTextureAPI$Wonderjs.createCubemapTexture(state[0]);
                              var texture = match[1];
                              var state$1 = CubemapTextureAPI$Wonderjs.setCubemapTexturePXFormat(texture, /* Rgbas3tcdxt1 */6, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapTextureAPI$Wonderjs.getCubemapTexturePXFormat(texture, state$1)), /* Rgbas3tcdxt1 */6);
                            }));
              }));
        Wonder_jest.describe("setCubemapTextureNZFormat", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = CubemapTextureAPI$Wonderjs.createCubemapTexture(state[0]);
                              var texture = match[1];
                              var state$1 = CubemapTextureAPI$Wonderjs.setCubemapTextureNZFormat(texture, /* Rgbas3tcdxt1 */6, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapTextureAPI$Wonderjs.getCubemapTextureNZFormat(texture, state$1)), /* Rgbas3tcdxt1 */6);
                            }));
              }));
        Wonder_jest.describe("setCubemapTexturePXType", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = CubemapTextureAPI$Wonderjs.createCubemapTexture(state[0]);
                              var texture = match[1];
                              var state$1 = CubemapTextureAPI$Wonderjs.setCubemapTexturePXType(texture, 1, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapTextureAPI$Wonderjs.getCubemapTexturePXType(texture, state$1)), 1);
                            }));
              }));
        Wonder_jest.describe("setCubemapTextureNYType", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = CubemapTextureAPI$Wonderjs.createCubemapTexture(state[0]);
                              var texture = match[1];
                              var state$1 = CubemapTextureAPI$Wonderjs.setCubemapTextureNYType(texture, 1, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapTextureAPI$Wonderjs.getCubemapTextureNYType(texture, state$1)), 1);
                            }));
              }));
        Wonder_jest.describe("setCubemapTexturePXSource", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = CubemapTextureAPI$Wonderjs.createCubemapTexture(state[0]);
                              var texture = match[1];
                              var source = CubemapTextureTool$Wonderjs.buildSource(undefined, undefined, undefined, undefined, /* () */0);
                              var state$1 = CubemapTextureAPI$Wonderjs.setCubemapTexturePXSource(texture, source, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapTextureAPI$Wonderjs.unsafeGetCubemapTexturePXSource(texture, state$1)), source);
                            }));
              }));
        Wonder_jest.describe("setCubemapTextureNYSource", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = CubemapTextureAPI$Wonderjs.createCubemapTexture(state[0]);
                              var texture = match[1];
                              var source = CubemapTextureTool$Wonderjs.buildSource(undefined, undefined, undefined, undefined, /* () */0);
                              var state$1 = CubemapTextureAPI$Wonderjs.setCubemapTextureNYSource(texture, source, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapTextureAPI$Wonderjs.unsafeGetCubemapTextureNYSource(texture, state$1)), source);
                            }));
              }));
        Wonder_jest.describe("setCubemapTextureFlipY", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = CubemapTextureAPI$Wonderjs.createCubemapTexture(state[0]);
                              var texture = match[1];
                              var state$1 = CubemapTextureAPI$Wonderjs.setCubemapTextureFlipY(texture, false, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapTextureAPI$Wonderjs.getCubemapTextureFlipY(texture, state$1)), false);
                            }));
              }));
        Wonder_jest.describe("getCubemapTextureIsNeedUpdate", (function (param) {
                return Wonder_jest.test("default is true", (function (param) {
                              var match = CubemapTextureAPI$Wonderjs.createCubemapTexture(state[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapTextureAPI$Wonderjs.getCubemapTextureIsNeedUpdate(match[1], match[0])), true);
                            }));
              }));
        Wonder_jest.describe("setCubemapTextureIsNeedUpdate", (function (param) {
                return Wonder_jest.test("test set", (function (param) {
                              var match = CubemapTextureAPI$Wonderjs.createCubemapTexture(state[0]);
                              var texture = match[1];
                              var state$1 = CubemapTextureAPI$Wonderjs.setCubemapTextureIsNeedUpdate(texture, false, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapTextureAPI$Wonderjs.getCubemapTextureIsNeedUpdate(texture, state$1)), false);
                            }));
              }));
        Wonder_jest.describe("getAllTextures", (function (param) {
                return Wonder_jest.test("get all created textures", (function (param) {
                              var match = CubemapTextureAPI$Wonderjs.createCubemapTexture(state[0]);
                              var match$1 = CubemapTextureAPI$Wonderjs.createCubemapTexture(match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapTextureAPI$Wonderjs.getAllTextures(match$1[0])), /* array */[
                                          match[1],
                                          match$1[1]
                                        ]);
                            }));
              }));
        Wonder_jest.describe("initCubemapTexture", (function (param) {
                return Wonder_jest.describe("create gl texture, save to glTextureMap", (function (param) {
                              var _prepare = function (state) {
                                var match = CubemapTextureAPI$Wonderjs.createCubemapTexture(state);
                                var createTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                Sinon.returns(1, createTexture);
                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                return /* tuple */[
                                        state$1,
                                        match[1],
                                        1,
                                        createTexture
                                      ];
                              };
                              Wonder_jest.test("test create", (function (param) {
                                      var match = _prepare(state[0]);
                                      var texture = match[1];
                                      var state$1 = CubemapTextureAPI$Wonderjs.initCubemapTexture(texture, match[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapTextureTool$Wonderjs.unsafeGetTexture(texture, state$1)), match[2]);
                                    }));
                              return Wonder_jest.test("if created before, not create", (function (param) {
                                            var match = _prepare(state[0]);
                                            var texture = match[1];
                                            var state$1 = CubemapTextureAPI$Wonderjs.initCubemapTexture(texture, match[0]);
                                            CubemapTextureAPI$Wonderjs.initCubemapTexture(texture, state$1);
                                            return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](match[3]));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("disposeCubemapTexture", (function (param) {
                      Wonder_jest.test("if is remove texture, not dispose data", (function (param) {
                              var match = CubemapTextureAPI$Wonderjs.createCubemapTexture(state[0]);
                              var texture = match[1];
                              var source = CubemapTextureTool$Wonderjs.buildSource(undefined, undefined, undefined, undefined, /* () */0);
                              var state$1 = CubemapTextureAPI$Wonderjs.setCubemapTexturePXSource(texture, source, match[0]);
                              var state$2 = CubemapTextureAPI$Wonderjs.disposeCubemapTexture(texture, true, state$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Js_option.isNone(CubemapTextureTool$Wonderjs.getCubemapTexturePXSource(texture, state$2))), false);
                            }));
                      return Wonder_jest.describe("else, dispose data", (function (param) {
                                    Wonder_jest.test("remove from nameMap", (function (param) {
                                            var match = CubemapTextureAPI$Wonderjs.createCubemapTexture(state[0]);
                                            var texture = match[1];
                                            var state$1 = CubemapTextureAPI$Wonderjs.setCubemapTextureName(texture, "name", match[0]);
                                            var state$2 = CubemapTextureAPI$Wonderjs.disposeCubemapTexture(texture, false, state$1);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapTextureAPI$Wonderjs.getCubemapTextureName(texture, state$2)), undefined);
                                          }));
                                    Wonder_jest.test("remove from pxSourceMap, nxSourceMap, pySourceMap, nySourceMap, pzSourceMap, nzSourceMap", (function (param) {
                                            var match = CubemapTextureAPI$Wonderjs.createCubemapTexture(state[0]);
                                            var texture = match[1];
                                            var state$1 = CubemapTextureTool$Wonderjs.setAllSources(match[0], texture, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                            var state$2 = CubemapTextureAPI$Wonderjs.disposeCubemapTexture(texture, false, state$1);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            CubemapTextureTool$Wonderjs.getCubemapTexturePXSource(texture, state$2),
                                                            CubemapTextureTool$Wonderjs.getCubemapTextureNZSource(texture, state$2)
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
                                              var match = CubemapTextureAPI$Wonderjs.createCubemapTexture(state[0]);
                                              var texture1 = match[1];
                                              var match$1 = CubemapTextureAPI$Wonderjs.createCubemapTexture(match[0]);
                                              var texture2 = match$1[1];
                                              var state$1 = Curry._3(setValueFunc, texture1, param[0], match$1[0]);
                                              var state$2 = Curry._3(setValueFunc, texture2, value2, state$1);
                                              var state$3 = Curry._3(param$1[0], texture1, false, state$2);
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
                                                              ], BufferCubemapTextureService$Wonderjs.getDefaultWrapS(/* () */0), /* tuple */[
                                                                CubemapTextureAPI$Wonderjs.disposeCubemapTexture,
                                                                CubemapTextureAPI$Wonderjs.getCubemapTextureWrapS,
                                                                CubemapTextureAPI$Wonderjs.setCubemapTextureWrapS
                                                              ]);
                                                  }));
                                            Wonder_jest.test("remove from wrapTs", (function (param) {
                                                    return _testRemoveFromTypeArr(state, /* tuple */[
                                                                /* Repeat */2,
                                                                /* Mirrored_repeat */1
                                                              ], BufferCubemapTextureService$Wonderjs.getDefaultWrapT(/* () */0), /* tuple */[
                                                                CubemapTextureAPI$Wonderjs.disposeCubemapTexture,
                                                                CubemapTextureAPI$Wonderjs.getCubemapTextureWrapT,
                                                                CubemapTextureAPI$Wonderjs.setCubemapTextureWrapT
                                                              ]);
                                                  }));
                                            Wonder_jest.test("remove from magFilters", (function (param) {
                                                    return _testRemoveFromTypeArr(state, /* tuple */[
                                                                /* Linear_mipmap_nearest */3,
                                                                /* Nearest_mipmap_linear */4
                                                              ], BufferCubemapTextureService$Wonderjs.getDefaultMagFilter(/* () */0), /* tuple */[
                                                                CubemapTextureAPI$Wonderjs.disposeCubemapTexture,
                                                                CubemapTextureAPI$Wonderjs.getCubemapTextureMagFilter,
                                                                CubemapTextureAPI$Wonderjs.setCubemapTextureMagFilter
                                                              ]);
                                                  }));
                                            Wonder_jest.test("remove from minFilters", (function (param) {
                                                    return _testRemoveFromTypeArr(state, /* tuple */[
                                                                /* Linear_mipmap_nearest */3,
                                                                /* Nearest_mipmap_linear */4
                                                              ], BufferCubemapTextureService$Wonderjs.getDefaultMinFilter(/* () */0), /* tuple */[
                                                                CubemapTextureAPI$Wonderjs.disposeCubemapTexture,
                                                                CubemapTextureAPI$Wonderjs.getCubemapTextureMinFilter,
                                                                CubemapTextureAPI$Wonderjs.setCubemapTextureMinFilter
                                                              ]);
                                                  }));
                                            Wonder_jest.describe("remove from formats", (function (param) {
                                                    Wonder_jest.test("remove from pxFormats", (function (param) {
                                                            return _testRemoveFromTypeArr(state, /* tuple */[
                                                                        /* Rgbas3tcdxt3 */7,
                                                                        /* Alpha */2
                                                                      ], BufferCubemapTextureService$Wonderjs.getDefaultFormat(/* () */0), /* tuple */[
                                                                        CubemapTextureAPI$Wonderjs.disposeCubemapTexture,
                                                                        CubemapTextureAPI$Wonderjs.getCubemapTexturePXFormat,
                                                                        CubemapTextureAPI$Wonderjs.setCubemapTexturePXFormat
                                                                      ]);
                                                          }));
                                                    Wonder_jest.test("remove from nxFormats", (function (param) {
                                                            return _testRemoveFromTypeArr(state, /* tuple */[
                                                                        /* Rgbas3tcdxt3 */7,
                                                                        /* Alpha */2
                                                                      ], BufferCubemapTextureService$Wonderjs.getDefaultFormat(/* () */0), /* tuple */[
                                                                        CubemapTextureAPI$Wonderjs.disposeCubemapTexture,
                                                                        CubemapTextureAPI$Wonderjs.getCubemapTextureNXFormat,
                                                                        CubemapTextureAPI$Wonderjs.setCubemapTextureNXFormat
                                                                      ]);
                                                          }));
                                                    Wonder_jest.test("remove from pyFormats", (function (param) {
                                                            return _testRemoveFromTypeArr(state, /* tuple */[
                                                                        /* Rgbas3tcdxt3 */7,
                                                                        /* Alpha */2
                                                                      ], BufferCubemapTextureService$Wonderjs.getDefaultFormat(/* () */0), /* tuple */[
                                                                        CubemapTextureAPI$Wonderjs.disposeCubemapTexture,
                                                                        CubemapTextureAPI$Wonderjs.getCubemapTexturePYFormat,
                                                                        CubemapTextureAPI$Wonderjs.setCubemapTexturePYFormat
                                                                      ]);
                                                          }));
                                                    Wonder_jest.test("remove from nyFormats", (function (param) {
                                                            return _testRemoveFromTypeArr(state, /* tuple */[
                                                                        /* Rgbas3tcdxt3 */7,
                                                                        /* Alpha */2
                                                                      ], BufferCubemapTextureService$Wonderjs.getDefaultFormat(/* () */0), /* tuple */[
                                                                        CubemapTextureAPI$Wonderjs.disposeCubemapTexture,
                                                                        CubemapTextureAPI$Wonderjs.getCubemapTextureNYFormat,
                                                                        CubemapTextureAPI$Wonderjs.setCubemapTextureNYFormat
                                                                      ]);
                                                          }));
                                                    Wonder_jest.test("remove from pzFormats", (function (param) {
                                                            return _testRemoveFromTypeArr(state, /* tuple */[
                                                                        /* Rgbas3tcdxt3 */7,
                                                                        /* Alpha */2
                                                                      ], BufferCubemapTextureService$Wonderjs.getDefaultFormat(/* () */0), /* tuple */[
                                                                        CubemapTextureAPI$Wonderjs.disposeCubemapTexture,
                                                                        CubemapTextureAPI$Wonderjs.getCubemapTexturePZFormat,
                                                                        CubemapTextureAPI$Wonderjs.setCubemapTexturePZFormat
                                                                      ]);
                                                          }));
                                                    return Wonder_jest.test("remove from nzFormats", (function (param) {
                                                                  return _testRemoveFromTypeArr(state, /* tuple */[
                                                                              /* Rgbas3tcdxt3 */7,
                                                                              /* Alpha */2
                                                                            ], BufferCubemapTextureService$Wonderjs.getDefaultFormat(/* () */0), /* tuple */[
                                                                              CubemapTextureAPI$Wonderjs.disposeCubemapTexture,
                                                                              CubemapTextureAPI$Wonderjs.getCubemapTextureNZFormat,
                                                                              CubemapTextureAPI$Wonderjs.setCubemapTextureNZFormat
                                                                            ]);
                                                                }));
                                                  }));
                                            Wonder_jest.describe("remove from types", (function (param) {
                                                    Wonder_jest.test("remove from pxTypes", (function (param) {
                                                            return _testRemoveFromTypeArr(state, /* tuple */[
                                                                        TextureTypeService$Wonderjs.getUnsignedShort4444(/* () */0),
                                                                        TextureTypeService$Wonderjs.getUnsignedShort5551(/* () */0)
                                                                      ], BufferCubemapTextureService$Wonderjs.getDefaultType(/* () */0), /* tuple */[
                                                                        CubemapTextureAPI$Wonderjs.disposeCubemapTexture,
                                                                        CubemapTextureAPI$Wonderjs.getCubemapTexturePXType,
                                                                        CubemapTextureAPI$Wonderjs.setCubemapTexturePXType
                                                                      ]);
                                                          }));
                                                    Wonder_jest.test("remove from nxTypes", (function (param) {
                                                            return _testRemoveFromTypeArr(state, /* tuple */[
                                                                        TextureTypeService$Wonderjs.getUnsignedShort4444(/* () */0),
                                                                        TextureTypeService$Wonderjs.getUnsignedShort5551(/* () */0)
                                                                      ], BufferCubemapTextureService$Wonderjs.getDefaultType(/* () */0), /* tuple */[
                                                                        CubemapTextureAPI$Wonderjs.disposeCubemapTexture,
                                                                        CubemapTextureAPI$Wonderjs.getCubemapTextureNXType,
                                                                        CubemapTextureAPI$Wonderjs.setCubemapTextureNXType
                                                                      ]);
                                                          }));
                                                    Wonder_jest.test("remove from pyTypes", (function (param) {
                                                            return _testRemoveFromTypeArr(state, /* tuple */[
                                                                        TextureTypeService$Wonderjs.getUnsignedShort4444(/* () */0),
                                                                        TextureTypeService$Wonderjs.getUnsignedShort5551(/* () */0)
                                                                      ], BufferCubemapTextureService$Wonderjs.getDefaultType(/* () */0), /* tuple */[
                                                                        CubemapTextureAPI$Wonderjs.disposeCubemapTexture,
                                                                        CubemapTextureAPI$Wonderjs.getCubemapTexturePYType,
                                                                        CubemapTextureAPI$Wonderjs.setCubemapTexturePYType
                                                                      ]);
                                                          }));
                                                    Wonder_jest.test("remove from nyTypes", (function (param) {
                                                            return _testRemoveFromTypeArr(state, /* tuple */[
                                                                        TextureTypeService$Wonderjs.getUnsignedShort4444(/* () */0),
                                                                        TextureTypeService$Wonderjs.getUnsignedShort5551(/* () */0)
                                                                      ], BufferCubemapTextureService$Wonderjs.getDefaultType(/* () */0), /* tuple */[
                                                                        CubemapTextureAPI$Wonderjs.disposeCubemapTexture,
                                                                        CubemapTextureAPI$Wonderjs.getCubemapTextureNYType,
                                                                        CubemapTextureAPI$Wonderjs.setCubemapTextureNYType
                                                                      ]);
                                                          }));
                                                    Wonder_jest.test("remove from pzTypes", (function (param) {
                                                            return _testRemoveFromTypeArr(state, /* tuple */[
                                                                        TextureTypeService$Wonderjs.getUnsignedShort4444(/* () */0),
                                                                        TextureTypeService$Wonderjs.getUnsignedShort5551(/* () */0)
                                                                      ], BufferCubemapTextureService$Wonderjs.getDefaultType(/* () */0), /* tuple */[
                                                                        CubemapTextureAPI$Wonderjs.disposeCubemapTexture,
                                                                        CubemapTextureAPI$Wonderjs.getCubemapTexturePZType,
                                                                        CubemapTextureAPI$Wonderjs.setCubemapTexturePZType
                                                                      ]);
                                                          }));
                                                    return Wonder_jest.test("remove from nzTypes", (function (param) {
                                                                  return _testRemoveFromTypeArr(state, /* tuple */[
                                                                              TextureTypeService$Wonderjs.getUnsignedShort4444(/* () */0),
                                                                              TextureTypeService$Wonderjs.getUnsignedShort5551(/* () */0)
                                                                            ], BufferCubemapTextureService$Wonderjs.getDefaultType(/* () */0), /* tuple */[
                                                                              CubemapTextureAPI$Wonderjs.disposeCubemapTexture,
                                                                              CubemapTextureAPI$Wonderjs.getCubemapTextureNZType,
                                                                              CubemapTextureAPI$Wonderjs.setCubemapTextureNZType
                                                                            ]);
                                                                }));
                                                  }));
                                            Wonder_jest.test("remove from isNeedUpdates", (function (param) {
                                                    return _testRemoveFromTypeArr(state, /* tuple */[
                                                                true,
                                                                false
                                                              ], CubemapTextureTool$Wonderjs.getDefaultIsNeedUpdateBool(/* () */0), /* tuple */[
                                                                CubemapTextureAPI$Wonderjs.disposeCubemapTexture,
                                                                CubemapTextureTool$Wonderjs.getIsNeedUpdate,
                                                                CubemapTextureTool$Wonderjs.setIsNeedUpdate
                                                              ]);
                                                  }));
                                            return Wonder_jest.test("remove from flipYs", (function (param) {
                                                          return _testRemoveFromTypeArr(state, /* tuple */[
                                                                      true,
                                                                      false
                                                                    ], BufferTextureService$Wonderjs.getFlipYFromTypeArrayValue(BufferCubemapTextureService$Wonderjs.getDefaultFlipY(/* () */0)), /* tuple */[
                                                                      CubemapTextureAPI$Wonderjs.disposeCubemapTexture,
                                                                      CubemapTextureAPI$Wonderjs.getCubemapTextureFlipY,
                                                                      CubemapTextureAPI$Wonderjs.setCubemapTextureFlipY
                                                                    ]);
                                                        }));
                                          }));
                                    return Wonder_jest.describe("test remove worker data", (function (param) {
                                                  Wonder_jest.test("remove from needAddedSourceArray", (function (param) {
                                                          var state$1 = TestWorkerTool$Wonderjs.markUseWorker(state[0]);
                                                          var match = CubemapTextureAPI$Wonderjs.createCubemapTexture(state$1);
                                                          var texture = match[1];
                                                          var state$2 = CubemapTextureTool$Wonderjs.setAllSources(match[0], texture, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                          var state$3 = CubemapTextureAPI$Wonderjs.disposeCubemapTexture(texture, false, state$2);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapTextureTool$Wonderjs.getNeedAddedAllSourceArray(state$3).map((function (needAddedSourceArray) {
                                                                                return needAddedSourceArray.length;
                                                                              }))), /* array */[
                                                                      0,
                                                                      0,
                                                                      0,
                                                                      0,
                                                                      0,
                                                                      0
                                                                    ]);
                                                        }));
                                                  return Wonder_jest.test("remove from needInitedTextureIndexArray", (function (param) {
                                                                var match = CubemapTextureAPI$Wonderjs.createCubemapTexture(state[0]);
                                                                var texture = match[1];
                                                                var state$1 = CubemapTextureTool$Wonderjs.setAllSources(match[0], texture, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                                var needInitedTextureIndexArray = CubemapTextureTool$Wonderjs.getNeedInitedTextureIndexArray(state$1);
                                                                ArrayService$Wonderjs.push(texture, needInitedTextureIndexArray);
                                                                var state$2 = CubemapTextureAPI$Wonderjs.disposeCubemapTexture(texture, false, state$1);
                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapTextureTool$Wonderjs.getNeedInitedTextureIndexArray(state$2).length), 0);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
