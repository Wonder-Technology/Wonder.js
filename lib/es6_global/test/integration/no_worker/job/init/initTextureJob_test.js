

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_option from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "./../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as FakeGlTool$Wonderjs from "../../../../tool/gl/FakeGlTool.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as CubemapTextureAPI$Wonderjs from "../../../../../src/api/texture/CubemapTextureAPI.js";
import * as InitRenderJobTool$Wonderjs from "../../../../tool/job/no_worker/init/InitRenderJobTool.js";
import * as CubemapTextureTool$Wonderjs from "../../../../tool/service/texture/CubemapTextureTool.js";
import * as BasicSourceTextureAPI$Wonderjs from "../../../../../src/api/texture/BasicSourceTextureAPI.js";
import * as NoWorkerJobConfigTool$Wonderjs from "../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js";
import * as BasicSourceTextureTool$Wonderjs from "../../../../tool/service/texture/BasicSourceTextureTool.js";
import * as InitLightMaterialJobTool$Wonderjs from "../../../../tool/job/no_worker/init/InitLightMaterialJobTool.js";
import * as ArrayBufferViewSourceTextureAPI$Wonderjs from "../../../../../src/api/texture/ArrayBufferViewSourceTextureAPI.js";
import * as ArrayBufferViewSourceTextureTool$Wonderjs from "../../../../tool/service/texture/ArrayBufferViewSourceTextureTool.js";

Wonder_jest.describe("test init texture job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        var _buildNoWorkerJobConfig = function (param) {
          return NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"init_texture\"\n        }\n      ]\n    }\n  ]\n        ", undefined, "\n[\n        {\n          \"name\": \"init_texture\"\n        }\n]\n        ", undefined, /* () */0);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = InitLightMaterialJobTool$Wonderjs.initWithJobConfig(sandbox, _buildNoWorkerJobConfig(/* () */0));
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("init all textures", (function (param) {
                      Wonder_jest.describe("test basic source texture", (function (param) {
                              Wonder_jest.describe("test init one texture", (function (param) {
                                      return Wonder_jest.describe("create gl texture, save to glTextureMap", (function (param) {
                                                    var _prepare = function (state) {
                                                      var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state);
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
                                                            var state$1 = InitRenderJobTool$Wonderjs.exec(match[0]);
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureTool$Wonderjs.unsafeGetTexture(match[1], state$1)), match[2]);
                                                          }));
                                                    return Wonder_jest.test("if created before, not create", (function (param) {
                                                                  var match = _prepare(state[0]);
                                                                  var state$1 = InitRenderJobTool$Wonderjs.exec(match[0]);
                                                                  InitRenderJobTool$Wonderjs.exec(state$1);
                                                                  return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](match[3]));
                                                                }));
                                                  }));
                                    }));
                              return Wonder_jest.describe("test init two textures", (function (param) {
                                            return Wonder_jest.test("test create", (function (param) {
                                                          var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state[0]);
                                                          var match$1 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(match[0]);
                                                          var createTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                          Sinon.returns(1, Sinon.onCall(0, createTexture));
                                                          Sinon.returns(2, Sinon.onCall(1, createTexture));
                                                          var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                                                          var state$2 = InitRenderJobTool$Wonderjs.exec(state$1);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                          BasicSourceTextureTool$Wonderjs.unsafeGetTexture(match[1], state$2),
                                                                          BasicSourceTextureTool$Wonderjs.unsafeGetTexture(match$1[1], state$2)
                                                                        ]), /* tuple */[
                                                                      1,
                                                                      2
                                                                    ]);
                                                        }));
                                          }));
                            }));
                      Wonder_jest.describe("test arrayBufferView source texture", (function (param) {
                              return Wonder_jest.describe("test init two textures", (function (param) {
                                            return Wonder_jest.test("test create", (function (param) {
                                                          var match = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state[0]);
                                                          var match$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(match[0]);
                                                          var createTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                          Sinon.returns(1, Sinon.onCall(0, createTexture));
                                                          Sinon.returns(2, Sinon.onCall(1, createTexture));
                                                          var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                                                          var state$2 = InitRenderJobTool$Wonderjs.exec(state$1);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                          ArrayBufferViewSourceTextureTool$Wonderjs.unsafeGetTexture(match[1], state$2),
                                                                          ArrayBufferViewSourceTextureTool$Wonderjs.unsafeGetTexture(match$1[1], state$2)
                                                                        ]), /* tuple */[
                                                                      1,
                                                                      2
                                                                    ]);
                                                        }));
                                          }));
                            }));
                      return Wonder_jest.describe("test cubemap texture", (function (param) {
                                    Wonder_jest.describe("test init one texture", (function (param) {
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
                                                                  var state$1 = InitRenderJobTool$Wonderjs.exec(match[0]);
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapTextureTool$Wonderjs.unsafeGetTexture(match[1], state$1)), match[2]);
                                                                }));
                                                          return Wonder_jest.test("if created before, not create", (function (param) {
                                                                        var match = _prepare(state[0]);
                                                                        var state$1 = InitRenderJobTool$Wonderjs.exec(match[0]);
                                                                        InitRenderJobTool$Wonderjs.exec(state$1);
                                                                        return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](match[3]));
                                                                      }));
                                                        }));
                                          }));
                                    return Wonder_jest.describe("test init two textures", (function (param) {
                                                  return Wonder_jest.test("test create", (function (param) {
                                                                var match = CubemapTextureAPI$Wonderjs.createCubemapTexture(state[0]);
                                                                var match$1 = CubemapTextureAPI$Wonderjs.createCubemapTexture(match[0]);
                                                                var createTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                Sinon.returns(1, Sinon.onCall(0, createTexture));
                                                                Sinon.returns(2, Sinon.onCall(1, createTexture));
                                                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                                                                var state$2 = InitRenderJobTool$Wonderjs.exec(state$1);
                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                CubemapTextureTool$Wonderjs.unsafeGetTexture(match[1], state$2),
                                                                                CubemapTextureTool$Wonderjs.unsafeGetTexture(match$1[1], state$2)
                                                                              ]), /* tuple */[
                                                                            1,
                                                                            2
                                                                          ]);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
