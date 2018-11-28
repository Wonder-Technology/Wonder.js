

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as SettingTool$Wonderjs from "../../../../tool/service/setting/SettingTool.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as FakeGlWorkerTool$Wonderjs from "../../../../integration/worker/tool/FakeGlWorkerTool.js";
import * as MainStateDataTool$Wonderjs from "../../../../tool/service/state/MainStateDataTool.js";
import * as SettingWorkerTool$Wonderjs from "../../../../integration/worker/tool/SettingWorkerTool.js";
import * as TestMainWorkerTool$Wonderjs from "../../../../integration/worker/job/main_worker/tool/TestMainWorkerTool.js";
import * as WorkerJobWorkerTool$Wonderjs from "../../../../integration/worker/tool/WorkerJobWorkerTool.js";
import * as RenderWorkerStateTool$Wonderjs from "../../../../tool/service/state/RenderWorkerStateTool.js";
import * as MainInitJobMainWorkerTool$Wonderjs from "../../../../integration/worker/job/main_worker/tool/MainInitJobMainWorkerTool.js";
import * as SendInitRenderDataWorkerTool$Wonderjs from "../../../../integration/worker/job/tool/SendInitRenderDataWorkerTool.js";
import * as WorkerInstanceMainWorkerTool$Wonderjs from "../../../../integration/worker/job/main_worker/tool/WorkerInstanceMainWorkerTool.js";
import * as GetIsDebugDataRenderWorkerJob$Wonderjs from "../../../../../src/job/worker/render/init/GetIsDebugDataRenderWorkerJob.js";

describe("GetIsDebugDataRenderWorkerJob", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestMainWorkerTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("get isDebug data and set to main state data", (function () {
                return Wonder_jest.testPromise("test", (function () {
                              FakeGlWorkerTool$Wonderjs.setFakeGlToRenderWorkerState(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), RenderWorkerStateTool$Wonderjs.createStateAndSetToStateData(/* () */0));
                              return WorkerJobWorkerTool$Wonderjs.execRenderWorkerJob(GetIsDebugDataRenderWorkerJob$Wonderjs.execJob, (function () {
                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](MainStateDataTool$Wonderjs.getIsDebug(MainStateTool$Wonderjs.getStateData(/* () */0))), true));
                                          }), Js_primitive.some({
                                              data: {
                                                isDebug: true
                                              }
                                            }), undefined, /* () */0);
                            }));
              }));
        describe("test sended init render data->isDebug", (function () {
                beforeEach((function () {
                        return SettingWorkerTool$Wonderjs.buildFakeCanvasForNotPassCanvasId(sandbox);
                      }));
                Wonder_jest.testPromise("test false", (function () {
                        MainStateDataTool$Wonderjs.setIsDebug(false);
                        return MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function (postMessageToRenderWorker) {
                                      return Sinon.toCalledWith(/* array */[SendInitRenderDataWorkerTool$Wonderjs.buildInitRenderData(false, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0)], Wonder_jest.Expect[/* expect */0](postMessageToRenderWorker));
                                    }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0));
                      }));
                return Wonder_jest.testPromise("test true", (function () {
                              MainStateDataTool$Wonderjs.setIsDebug(true);
                              return MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function (postMessageToRenderWorker) {
                                            return Sinon.toCalledWith(/* array */[SendInitRenderDataWorkerTool$Wonderjs.buildInitRenderData(true, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0)], Wonder_jest.Expect[/* expect */0](postMessageToRenderWorker));
                                          }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0));
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
