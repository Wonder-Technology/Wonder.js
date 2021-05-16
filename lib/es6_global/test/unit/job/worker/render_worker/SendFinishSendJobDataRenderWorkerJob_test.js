

import * as Most from "most";
import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as OptionTool$Wonderjs from "../../../../tool/service/atom/OptionTool.js";
import * as WorkerWorkerTool$Wonderjs from "../../../../integration/worker/tool/WorkerWorkerTool.js";
import * as RenderWorkerStateTool$Wonderjs from "../../../../tool/service/state/RenderWorkerStateTool.js";
import * as WorkerRenderWorkerTool$Wonderjs from "./tool/WorkerRenderWorkerTool.js";
import * as SendFinishSendJobDataRenderWorkerJob$Wonderjs from "../../../../../src/job/worker/render/init/SendFinishSendJobDataRenderWorkerJob.js";

Wonder_jest.describe("SendFinishSendJobRenderWorkerJob", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("send data to main worker", (function (param) {
                      return Wonder_jest.testPromise("test send data", undefined, (function (param) {
                                    var worker = Curry._1(WorkerRenderWorkerTool$Wonderjs.getSelf, /* () */0);
                                    var postMessageToWorker = WorkerWorkerTool$Wonderjs.stubPostMessage(sandbox, worker);
                                    var flag = /* array */["FINISH_SEND_JOB_DATA"];
                                    return Most.drain(SendFinishSendJobDataRenderWorkerJob$Wonderjs.execJob(flag, undefined, RenderWorkerStateTool$Wonderjs.getStateData(/* () */0))).then((function (param) {
                                                  return Promise.resolve(Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withOneArg({
                                                                          operateType: Caml_array.caml_array_get(OptionTool$Wonderjs.unsafeGet(flag), 0)
                                                                        }, postMessageToWorker))));
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
