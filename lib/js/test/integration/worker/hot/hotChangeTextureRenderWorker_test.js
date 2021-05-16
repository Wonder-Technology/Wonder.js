'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var GameObjectAPI$Wonderjs = require("../../../../src/api/GameObjectAPI.js");
var MainStateTool$Wonderjs = require("../../../tool/service/state/MainStateTool.js");
var FakeGlWorkerTool$Wonderjs = require("../tool/FakeGlWorkerTool.js");
var LightMaterialAPI$Wonderjs = require("../../../../src/api/material/LightMaterialAPI.js");
var BrowserDetectTool$Wonderjs = require("../../../tool/service/browserDetect/BrowserDetectTool.js");
var CreateStateMainService$Wonderjs = require("../../../../src/service/state/main/state/CreateStateMainService.js");
var RenderJobsRenderWorkerTool$Wonderjs = require("../job/render_worker/tool/RenderJobsRenderWorkerTool.js");
var BasicSourceTextureRenderWorkerTool$Wonderjs = require("../tool/texture/BasicSourceTextureRenderWorkerTool.js");
var ArrayBufferViewSourceTextureRenderWorkerTool$Wonderjs = require("../tool/texture/ArrayBufferViewSourceTextureRenderWorkerTool.js");

Wonder_jest.describe("hot change texture with render worker", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        CreateStateMainService$Wonderjs.createState(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test change texture", (function (param) {
                      return Wonder_jest.describe("test light material", (function (param) {
                                    Wonder_jest.describe("test basic source texture", (function (param) {
                                            return Wonder_jest.describe("test map", (function (param) {
                                                          var _prepare = function (param) {
                                                            var match = BasicSourceTextureRenderWorkerTool$Wonderjs.prepareStateAndCreateTwoGameObjects(sandbox);
                                                            var match$1 = match[5];
                                                            var match$2 = match[4];
                                                            var match$3 = match[3];
                                                            var match$4 = match[2];
                                                            var bindTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                            var state = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(bindTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                            return /* tuple */[
                                                                    state,
                                                                    match[1],
                                                                    /* tuple */[
                                                                      match$4[0],
                                                                      match$4[1],
                                                                      match$4[2],
                                                                      match$4[3]
                                                                    ],
                                                                    /* tuple */[
                                                                      match$3[0],
                                                                      match$3[1]
                                                                    ],
                                                                    /* tuple */[
                                                                      match$2[0],
                                                                      match$2[1]
                                                                    ],
                                                                    /* tuple */[
                                                                      match$1[0],
                                                                      match$1[1]
                                                                    ],
                                                                    bindTexture
                                                                  ];
                                                          };
                                                          Wonder_jest.beforeAllPromise(undefined, (function (param) {
                                                                  return Curry._1(BasicSourceTextureRenderWorkerTool$Wonderjs.buildFakeCreateImageBitmapFunc, /* () */0);
                                                                }));
                                                          Wonder_jest.afterAllPromise(undefined, (function (param) {
                                                                  return Curry._1(BasicSourceTextureRenderWorkerTool$Wonderjs.clearFakeCreateImageBitmapFunc, /* () */0);
                                                                }));
                                                          return Wonder_jest.testPromise("not cache texture", undefined, (function (param) {
                                                                        var match = _prepare(/* () */0);
                                                                        var bindTexture = match[6];
                                                                        var map2 = match[4][1];
                                                                        var gameObject1 = match[3][0];
                                                                        var state = BrowserDetectTool$Wonderjs.setChrome(match[0]);
                                                                        return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function (param) {
                                                                                      var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
                                                                                      var material1 = GameObjectAPI$Wonderjs.unsafeGetGameObjectLightMaterialComponent(gameObject1, state);
                                                                                      var state$1 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseMap(material1, map2, state);
                                                                                      return RenderJobsRenderWorkerTool$Wonderjs.mainLoopAndRender((function (param) {
                                                                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(bindTexture)), 4));
                                                                                                  }), state$1, sandbox, undefined, /* () */0);
                                                                                    }), state, sandbox, undefined, /* () */0);
                                                                      }));
                                                        }));
                                          }));
                                    return Wonder_jest.describe("test arrayBufferView source texture", (function (param) {
                                                  return Wonder_jest.describe("test map", (function (param) {
                                                                var _prepare = function (param) {
                                                                  var match = ArrayBufferViewSourceTextureRenderWorkerTool$Wonderjs.prepareStateAndCreateTwoGameObjects(sandbox);
                                                                  var match$1 = match[3];
                                                                  var match$2 = match[2];
                                                                  var match$3 = match[1];
                                                                  var bindTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                  var state = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(bindTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                                  return /* tuple */[
                                                                          state,
                                                                          /* tuple */[
                                                                            match$3[0],
                                                                            match$3[1]
                                                                          ],
                                                                          /* tuple */[
                                                                            match$2[0],
                                                                            match$2[1]
                                                                          ],
                                                                          /* tuple */[
                                                                            match$1[0],
                                                                            match$1[1]
                                                                          ],
                                                                          bindTexture
                                                                        ];
                                                                };
                                                                return Wonder_jest.testPromise("not cache texture", undefined, (function (param) {
                                                                              var match = _prepare(/* () */0);
                                                                              var bindTexture = match[4];
                                                                              var map2 = match[2][1];
                                                                              var gameObject1 = match[1][0];
                                                                              var state = BrowserDetectTool$Wonderjs.setChrome(match[0]);
                                                                              return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function (param) {
                                                                                            var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
                                                                                            var material1 = GameObjectAPI$Wonderjs.unsafeGetGameObjectLightMaterialComponent(gameObject1, state);
                                                                                            var state$1 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseMap(material1, map2, state);
                                                                                            return RenderJobsRenderWorkerTool$Wonderjs.mainLoopAndRender((function (param) {
                                                                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(bindTexture)), 4));
                                                                                                        }), state$1, sandbox, undefined, /* () */0);
                                                                                          }), state, sandbox, undefined, /* () */0);
                                                                            }));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
