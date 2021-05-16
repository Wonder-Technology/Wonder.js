

import * as Sinon from "../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as WorkerJobTool$Wonderjs from "../../../../../tool/service/workerJob/WorkerJobTool.js";
import * as TestWorkerTool$Wonderjs from "../../../tool/TestWorkerTool.js";
import * as SettingWorkerTool$Wonderjs from "../../../tool/SettingWorkerTool.js";
import * as TestMainWorkerTool$Wonderjs from "../tool/TestMainWorkerTool.js";
import * as MainInitJobMainWorkerTool$Wonderjs from "../tool/MainInitJobMainWorkerTool.js";
import * as SendInitRenderDataWorkerTool$Wonderjs from "../../tool/SendInitRenderDataWorkerTool.js";
import * as WorkerInstanceMainWorkerTool$Wonderjs from "../tool/WorkerInstanceMainWorkerTool.js";

Wonder_jest.describe("test send init render data main worker job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                SettingWorkerTool$Wonderjs.buildFakeCanvasForNotPassCanvasId(sandbox);
                TestMainWorkerTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, WorkerJobTool$Wonderjs.buildWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return TestWorkerTool$Wonderjs.clear(sandbox);
              }));
        return Wonder_jest.describe("send data to render worker", (function (param) {
                      var _buildInitRenderData = function (param) {
                        return SendInitRenderDataWorkerTool$Wonderjs.buildInitRenderData(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                      };
                      Wonder_jest.testPromise("test send data", undefined, (function (param) {
                              return MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function (postMessageToRenderWorker) {
                                            return Sinon.toCalledWith(/* array */[_buildInitRenderData(/* () */0)], Wonder_jest.Expect[/* expect */0](postMessageToRenderWorker));
                                          }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0));
                            }));
                      return Wonder_jest.testPromise("test send after send job data", undefined, (function (param) {
                                    return MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function (postMessageToRenderWorker) {
                                                  return Sinon.toCalledAfter(Sinon.withOneArg({
                                                                  operateType: "SEND_JOB_DATA",
                                                                  pipelineJobs: Sinon$1.match.any,
                                                                  jobs: Sinon$1.match.any
                                                                }, postMessageToRenderWorker), Wonder_jest.Expect[/* expect */0](Sinon.withOneArg(_buildInitRenderData(/* () */0), postMessageToRenderWorker)));
                                                }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
