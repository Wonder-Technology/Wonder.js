

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_option from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "./../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as SkyboxTool$Wonderjs from "../../../no_worker/job/tool/SkyboxTool.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as TestWorkerTool$Wonderjs from "../../tool/TestWorkerTool.js";
import * as FakeGlWorkerTool$Wonderjs from "../../tool/FakeGlWorkerTool.js";
import * as TestMainWorkerTool$Wonderjs from "../main_worker/tool/TestMainWorkerTool.js";
import * as WorkerJobWorkerTool$Wonderjs from "../../tool/WorkerJobWorkerTool.js";
import * as RenderSkyboxJobUtils$Wonderjs from "../../../../../src/job/utils/RenderSkyboxJobUtils.js";
import * as SkyboxSceneMainService$Wonderjs from "../../../../../src/service/state/main/scene/SkyboxSceneMainService.js";
import * as RenderJobsRenderWorkerTool$Wonderjs from "./tool/RenderJobsRenderWorkerTool.js";
import * as SendRenderDataMainWorkerJob$Wonderjs from "../../../../../src/job/worker/main/loop/SendRenderDataMainWorkerJob.js";
import * as SendRenderDataMainWorkerTool$Wonderjs from "../main_worker/tool/SendRenderDataMainWorkerTool.js";
import * as CubemapTextureRenderWorkerTool$Wonderjs from "../../tool/texture/CubemapTextureRenderWorkerTool.js";
import * as SendRenderRenderDataWorkerTool$Wonderjs from "../tool/SendRenderRenderDataWorkerTool.js";

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

export {
  
}
/*  Not a pure module */
