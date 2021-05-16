'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var FakeGlTool$Wonderjs = require("../../../../tool/gl/FakeGlTool.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var CubemapTextureAPI$Wonderjs = require("../../../../../src/api/texture/CubemapTextureAPI.js");
var InitRenderJobTool$Wonderjs = require("../../../../tool/job/no_worker/init/InitRenderJobTool.js");
var CubemapTextureTool$Wonderjs = require("../../../../tool/service/texture/CubemapTextureTool.js");
var BasicSourceTextureAPI$Wonderjs = require("../../../../../src/api/texture/BasicSourceTextureAPI.js");
var NoWorkerJobConfigTool$Wonderjs = require("../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js");
var BasicSourceTextureTool$Wonderjs = require("../../../../tool/service/texture/BasicSourceTextureTool.js");
var InitLightMaterialJobTool$Wonderjs = require("../../../../tool/job/no_worker/init/InitLightMaterialJobTool.js");
var ArrayBufferViewSourceTextureAPI$Wonderjs = require("../../../../../src/api/texture/ArrayBufferViewSourceTextureAPI.js");
var ArrayBufferViewSourceTextureTool$Wonderjs = require("../../../../tool/service/texture/ArrayBufferViewSourceTextureTool.js");

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

/*  Not a pure module */
