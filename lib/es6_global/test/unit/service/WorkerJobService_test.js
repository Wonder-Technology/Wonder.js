

import * as Most from "most";
import * as Curry from "./../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "./../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as WorkerJobTool$Wonderjs from "../../tool/service/workerJob/WorkerJobTool.js";
import * as WorkerWorkerTool$Wonderjs from "../../integration/worker/tool/WorkerWorkerTool.js";
import * as RenderWorkerStateTool$Wonderjs from "../../tool/service/state/RenderWorkerStateTool.js";
import * as WorkerJobHandleSystem$Wonderjs from "../../../src/job/worker/WorkerJobHandleSystem.js";
import * as WorkerRenderWorkerTool$Wonderjs from "../job/worker/render_worker/tool/WorkerRenderWorkerTool.js";

Wonder_jest.describe("WorkerJobMainService", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("getRenderWorkerJobStreamArr", (function (param) {
                      var _buildWorkerJobs = function (param) {
                        return WorkerJobTool$Wonderjs.convertWorkerJobsToRecord(JSON.parse("\n                 [\n             {\n                 \"name\": \"send_finish_send_job_data\",\n                 \"flags\": [\n                     \"FINISH_SEND_JOB_DATA\"\n                 ]\n             },\n             {\n                 \"name\": \"send_finish_init_render_data\",\n                 \"flags\": [\n                     \"FINISH_INIT_RENDER\"\n                 ]\n             }\n         ]\n                 "));
                      };
                      Wonder_jest.testPromise("concat exec sub jobs", undefined, (function (param) {
                              var worker = Curry._1(WorkerRenderWorkerTool$Wonderjs.getSelf, /* () */0);
                              var postMessageToWorker = WorkerWorkerTool$Wonderjs.stubPostMessage(sandbox, worker);
                              return Most.drain(Most.mergeArray(WorkerJobTool$Wonderjs.getRenderWorkerJobStreamArr(WorkerJobTool$Wonderjs.getRenderWorkerPipelineJobs("default", WorkerJobTool$Wonderjs.convertWorkerPipelinesToRecord(JSON.parse("\n         [\n             {\n                 \"name\": \"default\",\n                 \"jobs\": {\n                     \"render\": [\n                         [\n                             {\n                                 \"name\": \"send_finish_send_job_data\"\n                             },\n\n                             {\n                                 \"name\": \"send_finish_init_render_data\"\n                             }\n                         ]\n                     ]\n                 }\n             }\n         ]\n                 "))), _buildWorkerJobs(/* () */0), /* tuple */[
                                                    WorkerJobHandleSystem$Wonderjs.createWorkerJobHandleMap,
                                                    WorkerJobHandleSystem$Wonderjs.getWorkerJobHandle
                                                  ], RenderWorkerStateTool$Wonderjs.getStateData(/* () */0)))).then((function (param) {
                                            return Promise.resolve(Sinon.toCalledBefore(Sinon.withOneArg({
                                                                operateType: "FINISH_INIT_RENDER"
                                                              }, postMessageToWorker), Wonder_jest.Expect[/* expect */0](Sinon.withOneArg({
                                                                    operateType: "FINISH_SEND_JOB_DATA"
                                                                  }, postMessageToWorker))));
                                          }));
                            }));
                      return Wonder_jest.testPromise("merge exec main jobs", undefined, (function (param) {
                                    var callCount = /* record */[/* contents */0];
                                    var worker = Curry._1(WorkerRenderWorkerTool$Wonderjs.getSelf, /* () */0);
                                    WorkerWorkerTool$Wonderjs.stubPostMessage(sandbox, worker);
                                    return Most.forEach((function (record) {
                                                    callCount[0] = callCount[0] + 1 | 0;
                                                    return /* () */0;
                                                  }), Most.mergeArray(WorkerJobTool$Wonderjs.getRenderWorkerJobStreamArr(WorkerJobTool$Wonderjs.getRenderWorkerPipelineJobs("default", WorkerJobTool$Wonderjs.convertWorkerPipelinesToRecord(JSON.parse("\n         [\n             {\n                 \"name\": \"default\",\n                 \"jobs\": {\n                     \"render\": [\n                         [\n                             {\n                                 \"name\": \"send_finish_send_job_data\"\n                             }\n                         ],\n                         [\n                             {\n                                 \"name\": \"send_finish_init_render_data\"\n                             }\n                         ]\n                     ]\n                 }\n             }\n         ]\n                 "))), _buildWorkerJobs(/* () */0), /* tuple */[
                                                          WorkerJobHandleSystem$Wonderjs.createWorkerJobHandleMap,
                                                          WorkerJobHandleSystem$Wonderjs.getWorkerJobHandle
                                                        ], RenderWorkerStateTool$Wonderjs.getStateData(/* () */0)))).then((function (param) {
                                                  return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](callCount[0]), 2));
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
