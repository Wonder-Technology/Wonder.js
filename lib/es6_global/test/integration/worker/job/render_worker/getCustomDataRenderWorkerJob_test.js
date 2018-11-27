

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as WorkerDataAPI$Wonderjs from "../../../../../src/api/workerData/WorkerDataAPI.js";
import * as TestWorkerTool$Wonderjs from "../../tool/TestWorkerTool.js";
import * as FakeGlWorkerTool$Wonderjs from "../../tool/FakeGlWorkerTool.js";
import * as TestMainWorkerTool$Wonderjs from "../main_worker/tool/TestMainWorkerTool.js";
import * as WorkerJobWorkerTool$Wonderjs from "../../tool/WorkerJobWorkerTool.js";
import * as RenderWorkerStateTool$Wonderjs from "../../../../tool/service/state/RenderWorkerStateTool.js";
import * as RenderJobsRenderWorkerTool$Wonderjs from "./tool/RenderJobsRenderWorkerTool.js";
import * as SendRenderDataMainWorkerJob$Wonderjs from "../../../../../src/job/worker/main/loop/SendRenderDataMainWorkerJob.js";
import * as SendRenderDataMainWorkerTool$Wonderjs from "../main_worker/tool/SendRenderDataMainWorkerTool.js";
import * as SendRenderRenderDataWorkerTool$Wonderjs from "../tool/SendRenderRenderDataWorkerTool.js";
import * as OperateCustomRenderWorkerService$Wonderjs from "../../../../../src/service/state/render_worker/custom/OperateCustomRenderWorkerService.js";

describe("test get custom data render worker job", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        MainStateTool$Wonderjs.createState(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return TestWorkerTool$Wonderjs.clear(sandbox);
              }));
        describe("test send render data to render worker", (function () {
                return Wonder_jest.testPromise("send customData", (function () {
                              var match = SendRenderDataMainWorkerTool$Wonderjs.prepareForTestSendRenderData(sandbox);
                              var postMessageToRenderWorker = match[1];
                              var state = WorkerDataAPI$Wonderjs.setMainWorkerCustomData(100, match[0]);
                              MainStateTool$Wonderjs.setState(state);
                              return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(SendRenderDataMainWorkerJob$Wonderjs.execJob, (function () {
                                            return Promise.resolve(Sinon.toCalledWith(/* array */[SendRenderRenderDataWorkerTool$Wonderjs.buildRenderRenderData(undefined, undefined, undefined, undefined, 100, undefined, /* () */0)], Wonder_jest.Expect[/* expect */0](postMessageToRenderWorker)));
                                          }), undefined, /* () */0);
                            }));
              }));
        describe("test render worker job", (function () {
                return Wonder_jest.testPromise("get customData", (function () {
                              var state = TestMainWorkerTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                              var state$1 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
                              var state$2 = WorkerDataAPI$Wonderjs.setMainWorkerCustomData(100, state$1);
                              MainStateTool$Wonderjs.setState(state$2);
                              return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function () {
                                            var renderWorkerState = RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0);
                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](OperateCustomRenderWorkerService$Wonderjs.getCustomDataFromMainWorkerToRenderWorker(renderWorkerState)), 100));
                                          }), state$2, sandbox, undefined, /* () */0);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
