

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as Js_primitive from "../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as GameObjectAPI$Wonderjs from "../../../../src/api/GameObjectAPI.js";
import * as MainStateTool$Wonderjs from "../../../tool/service/state/MainStateTool.js";
import * as BasicMaterialAPI$Wonderjs from "../../../../src/api/material/BasicMaterialAPI.js";
import * as FakeGlWorkerTool$Wonderjs from "../tool/FakeGlWorkerTool.js";
import * as BrowserDetectTool$Wonderjs from "../../../tool/service/browserDetect/BrowserDetectTool.js";
import * as CreateStateMainService$Wonderjs from "../../../../src/service/state/main/state/CreateStateMainService.js";
import * as RenderJobsRenderWorkerTool$Wonderjs from "../job/render_worker/tool/RenderJobsRenderWorkerTool.js";
import * as BasicSourceTextureRenderWorkerTool$Wonderjs from "../tool/BasicSourceTextureRenderWorkerTool.js";
import * as ArrayBufferViewSourceTextureRenderWorkerTool$Wonderjs from "../tool/ArrayBufferViewSourceTextureRenderWorkerTool.js";

describe("hot change texture with render worker", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        CreateStateMainService$Wonderjs.createState(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test change texture", (function () {
                describe("test basic material", (function () {
                        describe("test basic source texture", (function () {
                                describe("test map", (function () {
                                        var _prepare = function () {
                                          var match = BasicSourceTextureRenderWorkerTool$Wonderjs.prepareStateAndCreateTwoGameObjects(sandbox);
                                          var match$1 = match[5];
                                          var match$2 = match[4];
                                          var match$3 = match[3];
                                          var match$4 = match[2];
                                          var bindTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                          var state = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(bindTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
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
                                        beforeAll((function () {
                                                return Curry._1(BasicSourceTextureRenderWorkerTool$Wonderjs.buildFakeCreateImageBitmapFunc, /* () */0);
                                              }));
                                        afterAll((function () {
                                                return Curry._1(BasicSourceTextureRenderWorkerTool$Wonderjs.clearFakeCreateImageBitmapFunc, /* () */0);
                                              }));
                                        return Wonder_jest.testPromise("if the new texture if cached before, not bind", (function () {
                                                      var match = _prepare(/* () */0);
                                                      var bindTexture = match[6];
                                                      var map2 = match[4][1];
                                                      var gameObject1 = match[3][0];
                                                      BrowserDetectTool$Wonderjs.setChrome(/* () */0);
                                                      return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function () {
                                                                    var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
                                                                    var material1 = GameObjectAPI$Wonderjs.unsafeGetGameObjectBasicMaterialComponent(gameObject1, state);
                                                                    var state$1 = BasicMaterialAPI$Wonderjs.setBasicMaterialMap(material1, map2, state);
                                                                    return RenderJobsRenderWorkerTool$Wonderjs.mainLoopAndRender((function () {
                                                                                  return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(bindTexture)), 2));
                                                                                }), state$1, sandbox, undefined, /* () */0);
                                                                  }), match[0], sandbox, undefined, /* () */0);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        describe("test arrayBufferView source texture", (function () {
                                describe("test map", (function () {
                                        var _prepare = function () {
                                          var match = ArrayBufferViewSourceTextureRenderWorkerTool$Wonderjs.prepareStateAndCreateTwoGameObjects(sandbox);
                                          var match$1 = match[3];
                                          var match$2 = match[2];
                                          var match$3 = match[1];
                                          var bindTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                          var state = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(bindTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
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
                                        return Wonder_jest.testPromise("if the new texture if cached before, not bind", (function () {
                                                      var match = _prepare(/* () */0);
                                                      var bindTexture = match[4];
                                                      var map2 = match[2][1];
                                                      var gameObject1 = match[1][0];
                                                      BrowserDetectTool$Wonderjs.setChrome(/* () */0);
                                                      return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function () {
                                                                    var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
                                                                    var material1 = GameObjectAPI$Wonderjs.unsafeGetGameObjectBasicMaterialComponent(gameObject1, state);
                                                                    var state$1 = BasicMaterialAPI$Wonderjs.setBasicMaterialMap(material1, map2, state);
                                                                    return RenderJobsRenderWorkerTool$Wonderjs.mainLoopAndRender((function () {
                                                                                  return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(bindTexture)), 2));
                                                                                }), state$1, sandbox, undefined, /* () */0);
                                                                  }), match[0], sandbox, undefined, /* () */0);
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

export {
  
}
/*  Not a pure module */
