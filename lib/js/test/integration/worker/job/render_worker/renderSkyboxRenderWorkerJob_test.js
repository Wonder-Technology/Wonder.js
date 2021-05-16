'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var SkyboxTool$Wonderjs = require("../../../no_worker/job/tool/SkyboxTool.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var TestWorkerTool$Wonderjs = require("../../tool/TestWorkerTool.js");
var FakeGlWorkerTool$Wonderjs = require("../../tool/FakeGlWorkerTool.js");
var TestMainWorkerTool$Wonderjs = require("../main_worker/tool/TestMainWorkerTool.js");
var WorkerJobWorkerTool$Wonderjs = require("../../tool/WorkerJobWorkerTool.js");
var RenderSkyboxJobUtils$Wonderjs = require("../../../../../src/job/utils/RenderSkyboxJobUtils.js");
var SkyboxSceneMainService$Wonderjs = require("../../../../../src/service/state/main/scene/SkyboxSceneMainService.js");
var RenderJobsRenderWorkerTool$Wonderjs = require("./tool/RenderJobsRenderWorkerTool.js");
var SendRenderDataMainWorkerJob$Wonderjs = require("../../../../../src/job/worker/main/loop/SendRenderDataMainWorkerJob.js");
var SendRenderDataMainWorkerTool$Wonderjs = require("../main_worker/tool/SendRenderDataMainWorkerTool.js");
var CubemapTextureRenderWorkerTool$Wonderjs = require("../../tool/texture/CubemapTextureRenderWorkerTool.js");
var SendRenderRenderDataWorkerTool$Wonderjs = require("../tool/SendRenderRenderDataWorkerTool.js");

Wonder_jest.describe("test render skybox render worker job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        MainStateTool$Wonderjs.createState(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return TestWorkerTool$Wonderjs.clear(sandbox);
              }));
        Wonder_jest.describe("test send render data to render worker", (function (param) {
                return Wonder_jest.testPromise("send skyboxData", undefined, (function (param) {
                              var match = SendRenderDataMainWorkerTool$Wonderjs.prepareForTestSendRenderData(sandbox);
                              var postMessageToRenderWorker = match[1];
                              var match$1 = SkyboxTool$Wonderjs.prepareCubemapTexture(match[0]);
                              var state = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                              MainStateTool$Wonderjs.setState(state);
                              return RenderJobsRenderWorkerTool$Wonderjs.init((function (state) {
                                            return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(SendRenderDataMainWorkerJob$Wonderjs.execJob, (function (param) {
                                                          return Promise.resolve(Sinon.toCalledWith(/* array */[SendRenderRenderDataWorkerTool$Wonderjs.buildRenderRenderData(undefined, undefined, undefined, {
                                                                                cubemapTextureOpt: SkyboxSceneMainService$Wonderjs.getCubemapTexture(state),
                                                                                renderSkyboxGameObjectDataOpt: RenderSkyboxJobUtils$Wonderjs.getRenderData(state)
                                                                              }, undefined, undefined, undefined, undefined, /* () */0)], Wonder_jest.Expect[/* expect */0](postMessageToRenderWorker)));
                                                        }), undefined, /* () */0);
                                          }), state);
                            }));
              }));
        return Wonder_jest.describe("test render worker job", (function (param) {
                      Wonder_jest.beforeAllPromise(undefined, (function (param) {
                              return Curry._1(CubemapTextureRenderWorkerTool$Wonderjs.buildFakeCreateImageBitmapFunc, /* () */0);
                            }));
                      Wonder_jest.afterAllPromise(undefined, (function (param) {
                              return Curry._1(CubemapTextureRenderWorkerTool$Wonderjs.clearFakeCreateImageBitmapFunc, /* () */0);
                            }));
                      return Wonder_jest.describe("if skybox has cubemap texture", (function (param) {
                                    return Wonder_jest.describe("bind cubemap", (function (param) {
                                                  return Wonder_jest.testPromise("active texture unit", undefined, (function (param) {
                                                                var state = TestMainWorkerTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                                TestTool$Wonderjs.closeContractCheck(/* () */0);
                                                                var match = SkyboxTool$Wonderjs.prepareCubemapTexture(state);
                                                                var match$1 = SkyboxTool$Wonderjs.prepareGameObject(match[0]);
                                                                var createTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                Sinon.returns(11, Sinon.onCall(0, createTexture));
                                                                var activeTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                var bindTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                var state$1 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 8, undefined, undefined, undefined, undefined, undefined, undefined, 10, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createTexture), Caml_option.some(activeTexture), Caml_option.some(bindTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                                                                MainStateTool$Wonderjs.setState(state$1);
                                                                return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function (param) {
                                                                              return Promise.resolve(Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withOneArg(10, activeTexture))));
                                                                            }), state$1, sandbox, undefined, /* () */0);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
