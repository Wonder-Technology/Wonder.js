

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as MainStateTool$Wonderjs from "../../../tool/service/state/MainStateTool.js";
import * as TestWorkerTool$Wonderjs from "../tool/TestWorkerTool.js";
import * as ExtendIMGUITool$Wonderjs from "../../../tool/service/imgui/ExtendIMGUITool.js";
import * as IMGUIWorkerTool$Wonderjs from "../job/all/tool/IMGUIWorkerTool.js";
import * as RenderIMGUITool$Wonderjs from "../../../tool/service/imgui/RenderIMGUITool.js";
import * as RenderJobsRenderWorkerTool$Wonderjs from "../job/render_worker/tool/RenderJobsRenderWorkerTool.js";
import * as BasicSourceTextureRenderWorkerTool$Wonderjs from "../tool/texture/BasicSourceTextureRenderWorkerTool.js";

Wonder_jest.describe("test extend imgui in render worker", (function (param) {
        Sinon.getSandboxDefaultVal(/* () */0);
        MainStateTool$Wonderjs.createState(/* () */0);
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        MainStateTool$Wonderjs.createState(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return TestWorkerTool$Wonderjs.clear(sandbox);
              }));
        return Wonder_jest.describe("test extend by add skin data and add custom control", (function (param) {
                      return Wonder_jest.describe("test render", (function (param) {
                                    Wonder_jest.beforeAllPromise(undefined, (function (param) {
                                            return Curry._1(BasicSourceTextureRenderWorkerTool$Wonderjs.buildFakeCreateImageBitmapFunc, /* () */0);
                                          }));
                                    Wonder_jest.afterAllPromise(undefined, (function (param) {
                                            return Curry._1(BasicSourceTextureRenderWorkerTool$Wonderjs.clearFakeCreateImageBitmapFunc, /* () */0);
                                          }));
                                    return Wonder_jest.testPromise("test color buffer data", undefined, (function (param) {
                                                  var match = IMGUIWorkerTool$Wonderjs.prepareForTestInRenderWorkerJob(sandbox);
                                                  var bufferData = match[1];
                                                  var state = ExtendIMGUITool$Wonderjs.addExtendDataAndSetExecFunc(match[0]);
                                                  var bufferDataCallCountAfterInit = /* record */[/* contents */0];
                                                  return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function (param) {
                                                                return Promise.resolve(RenderIMGUITool$Wonderjs.judgeNoTextureProgramColorBufferData(bufferData, bufferDataCallCountAfterInit[0]));
                                                              }), state, sandbox, (function (state) {
                                                                bufferDataCallCountAfterInit[0] = Sinon.getCallCount(bufferData);
                                                                return /* () */0;
                                                              }), /* () */0);
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
