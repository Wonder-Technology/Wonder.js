

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../../tool/TestTool.js";
import * as SettingTool$Wonderjs from "../../../../../tool/service/setting/SettingTool.js";
import * as CreateStateMainService$Wonderjs from "../../../../../../src/service/state/main/state/CreateStateMainService.js";
import * as ArrayBufferViewSourceTextureAPI$Wonderjs from "../../../../../../src/api/texture/ArrayBufferViewSourceTextureAPI.js";
import * as ArrayBufferViewSourceTextureTool$Wonderjs from "../../../../../tool/service/texture/ArrayBufferViewSourceTextureTool.js";

describe("ArrayBufferViewTexture", (function () {
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
        describe("createArrayBufferViewSourceTexture", (function () {
                Wonder_jest.test("create a new texture which starts from arrayBufferViewSourceTextureIndexOffset", (function () {
                        var match = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[1]), ArrayBufferViewSourceTextureTool$Wonderjs.generateArrayBufferViewSourceTextureIndex(0, match[0]));
                      }));
                return Wonder_jest.test("shouldn't exceed buffer count", (function () {
                              var state = TestTool$Wonderjs.initWithoutBuildFakeDom(sandbox, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 2, undefined, undefined, /* () */0), /* () */0);
                              ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state);
                              ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state);
                              return Wonder_jest.Expect[/* toThrowMessage */20]("expect index: 52 <= maxIndex: 51, but actual not", Wonder_jest.Expect[/* expect */0]((function () {
                                                ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state);
                                                return /* () */0;
                                              })));
                            }));
              }));
        describe("test default data", (function () {
                describe("is need updates", (function () {
                        return Wonder_jest.test("default is need update", (function () {
                                      var match = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayBufferViewSourceTextureTool$Wonderjs.isNeedUpdate(match[1], match[0])), true);
                                    }));
                      }));
                describe("is flipY", (function () {
                        return Wonder_jest.test("default is true", (function () {
                                      var match = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayBufferViewSourceTextureAPI$Wonderjs.getArrayBufferViewSourceTextureFlipY(match[1], match[0])), true);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("setArrayBufferViewSourceTextureSource", (function () {
                return Wonder_jest.test("test", (function () {
                              var match = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state[0]);
                              var texture = match[1];
                              var source = ArrayBufferViewSourceTextureTool$Wonderjs.buildSource(/* () */0);
                              var state$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureSource(texture, source, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayBufferViewSourceTextureAPI$Wonderjs.unsafeGetArrayBufferViewSourceTextureSource(texture, state$1)), source);
                            }));
              }));
        describe("setArrayBufferViewSourceTextureWidth", (function () {
                return Wonder_jest.test("test", (function () {
                              var match = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state[0]);
                              var texture = match[1];
                              var state$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureWidth(texture, 5, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayBufferViewSourceTextureAPI$Wonderjs.getArrayBufferViewSourceTextureWidth(texture, state$1)), 5);
                            }));
              }));
        describe("setArrayBufferViewSourceTextureHeight", (function () {
                return Wonder_jest.test("test", (function () {
                              var match = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state[0]);
                              var texture = match[1];
                              var state$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureHeight(texture, 5, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayBufferViewSourceTextureAPI$Wonderjs.getArrayBufferViewSourceTextureHeight(texture, state$1)), 5);
                            }));
              }));
        describe("setArrayBufferViewSourceTextureWrapS", (function () {
                return Wonder_jest.test("test", (function () {
                              var match = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state[0]);
                              var texture = match[1];
                              var state$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureWrapS(texture, /* Mirrored_repeat */1, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayBufferViewSourceTextureAPI$Wonderjs.getArrayBufferViewSourceTextureWrapS(texture, state$1)), /* Mirrored_repeat */1);
                            }));
              }));
        describe("setArrayBufferViewSourceTextureWrapT", (function () {
                return Wonder_jest.test("test", (function () {
                              var match = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state[0]);
                              var texture = match[1];
                              var state$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureWrapT(texture, /* Mirrored_repeat */1, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayBufferViewSourceTextureAPI$Wonderjs.getArrayBufferViewSourceTextureWrapT(texture, state$1)), /* Mirrored_repeat */1);
                            }));
              }));
        describe("setArrayBufferViewSourceTextureMagFilter", (function () {
                return Wonder_jest.test("test", (function () {
                              var match = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state[0]);
                              var texture = match[1];
                              var state$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureMagFilter(texture, /* Linear */1, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayBufferViewSourceTextureAPI$Wonderjs.getArrayBufferViewSourceTextureMagFilter(texture, state$1)), /* Linear */1);
                            }));
              }));
        describe("setArrayBufferViewSourceTextureMinFilter", (function () {
                return Wonder_jest.test("test", (function () {
                              var match = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state[0]);
                              var texture = match[1];
                              var state$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureMinFilter(texture, /* Linear */1, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayBufferViewSourceTextureAPI$Wonderjs.getArrayBufferViewSourceTextureMinFilter(texture, state$1)), /* Linear */1);
                            }));
              }));
        describe("setArrayBufferViewSourceTextureFormat", (function () {
                return Wonder_jest.test("test", (function () {
                              var match = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state[0]);
                              var texture = match[1];
                              var state$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureFormat(texture, 1, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayBufferViewSourceTextureAPI$Wonderjs.getArrayBufferViewSourceTextureFormat(texture, state$1)), 1);
                            }));
              }));
        describe("setArrayBufferViewSourceTextureType", (function () {
                return Wonder_jest.test("test", (function () {
                              var match = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state[0]);
                              var texture = match[1];
                              var state$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureType(texture, 1, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayBufferViewSourceTextureAPI$Wonderjs.getArrayBufferViewSourceTextureType(texture, state$1)), 1);
                            }));
              }));
        describe("setArrayBufferViewSourceTextureFlipY", (function () {
                return Wonder_jest.test("test", (function () {
                              var match = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state[0]);
                              var texture = match[1];
                              var state$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureFlipY(texture, false, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayBufferViewSourceTextureAPI$Wonderjs.getArrayBufferViewSourceTextureFlipY(texture, state$1)), false);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
