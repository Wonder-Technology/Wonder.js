

import * as Most from "most";
import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as WorkerJobTool$Wonderjs from "../../../../tool/service/workerJob/WorkerJobTool.js";
import * as WorkerMainWorkerTool$Wonderjs from "./tool/WorkerMainWorkerTool.js";
import * as WorkerInstanceMainWorkerTool$Wonderjs from "../../../../integration/worker/job/main_worker/tool/WorkerInstanceMainWorkerTool.js";
import * as CreateWorkerInstanceMainWorkerJob$Wonderjs from "../../../../../src/job/worker/main/init/CreateWorkerInstanceMainWorkerJob.js";

Wonder_jest.describe("CreateWorkerInstanceMainWorkerJob", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("create worker and set to state", (function (param) {
                      return Wonder_jest.testPromise("create render worker", undefined, (function (param) {
                                    var workerFileDir = "./worker/";
                                    var state = MainStateTool$Wonderjs.createState(/* () */0);
                                    var state$1 = WorkerJobTool$Wonderjs.createWithRecord(/* tuple */[
                                          /* record */[
                                            /* workerFileDir */workerFileDir,
                                            /* mainInitPipeline */"",
                                            /* mainLoopPipeline */"",
                                            /* workerPipeline */""
                                          ],
                                          1,
                                          1,
                                          1,
                                          1,
                                          1,
                                          1
                                        ], state);
                                    MainStateTool$Wonderjs.setState(state$1);
                                    Curry._1(WorkerMainWorkerTool$Wonderjs.buildFakeWorker, /* () */0);
                                    return Most.drain(CreateWorkerInstanceMainWorkerJob$Wonderjs.execJob(undefined, MainStateTool$Wonderjs.getStateData(/* () */0))).then((function (param) {
                                                  var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
                                                  return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker(state).path), "" + (String(workerFileDir) + "wd.render.worker.js")));
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
