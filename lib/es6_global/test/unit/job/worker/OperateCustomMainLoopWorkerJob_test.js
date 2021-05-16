

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as JobAPI$Wonderjs from "../../../../src/api/job/JobAPI.js";
import * as MostUtils$Wonderjs from "../../../../src/asset/utils/MostUtils.js";
import * as ArrayService$Wonderjs from "../../../../src/service/atom/ArrayService.js";
import * as MainStateTool$Wonderjs from "../../../tool/service/state/MainStateTool.js";
import * as WorkerJobTool$Wonderjs from "../../../tool/service/workerJob/WorkerJobTool.js";
import * as TestMainWorkerTool$Wonderjs from "../../../integration/worker/job/main_worker/tool/TestMainWorkerTool.js";
import * as StateDataMainService$Wonderjs from "../../../../src/service/state/main/state/StateDataMainService.js";
import * as RenderJobsRenderWorkerTool$Wonderjs from "../../../integration/worker/job/render_worker/tool/RenderJobsRenderWorkerTool.js";

Wonder_jest.describe("operate custom worker job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = WorkerJobTool$Wonderjs.create(WorkerJobTool$Wonderjs.buildWorkerJobConfig(undefined, WorkerJobTool$Wonderjs.buildMainInitPipelinesConfigWithoutCreateWorkerInstanceAndMessage(/* () */0), "[\n    {\n        \"name\": \"default\",\n        \"jobs\": [\n            {\n                \"name\": \"loop\",\n                \"link\": \"concat\",\n                \"jobs\": [\n                    {\n                        \"name\": \"tick\"\n                    },\n                    {\n                        \"name\": \"copy_arraybuffer\"\n                    }\n                ]\n            },\n            {\n                \"name\": \"copy_arraybuffer\",\n                \"link\": \"concat\",\n                \"jobs\": [\n                    {\n                        \"name\": \"copy_transform\"\n                    }\n                ]\n            },\n            {\n                \"name\": \"frame\",\n                \"link\": \"merge\",\n                \"jobs\": [\n                    {\n                        \"name\": \"loop\"\n                    }\n                ]\n            }\n        ]\n    }\n]", undefined, undefined, undefined, undefined, /* () */0), TestMainWorkerTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test operate custom job", (function (param) {
                      return Wonder_jest.describe("test operate main loop job", (function (param) {
                                    Wonder_jest.describe("addWorkerMainLoopJob", (function (param) {
                                            return Wonder_jest.describe("add job to main loop pipeline", (function (param) {
                                                          Wonder_jest.describe("test add job after target job", (function (param) {
                                                                  return Wonder_jest.testPromise("test add job to group job", undefined, (function (param) {
                                                                                var customData = /* array */[];
                                                                                var state$1 = JobAPI$Wonderjs.addWorkerMainLoopJob(/* tuple */[
                                                                                      "customJob1",
                                                                                      "copy_arraybuffer"
                                                                                    ], /* AFTER */1, (function (stateData) {
                                                                                        StateDataMainService$Wonderjs.unsafeGetState(stateData);
                                                                                        ArrayService$Wonderjs.push(1, customData);
                                                                                        return /* () */0;
                                                                                      }), state[0]);
                                                                                MainStateTool$Wonderjs.setState(state$1);
                                                                                return RenderJobsRenderWorkerTool$Wonderjs.execMainLoopJobs(sandbox, (function (param) {
                                                                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](customData), /* array */[1]));
                                                                                            }));
                                                                              }));
                                                                }));
                                                          return Wonder_jest.testPromise("test add job to head", undefined, (function (param) {
                                                                        state[0] = TestMainWorkerTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, WorkerJobTool$Wonderjs.buildWorkerJobConfig(undefined, undefined, "\n[\n    {\n        \"name\": \"default\",\n        \"jobs\": [\n            {\n                \"name\": \"loop\",\n                \"link\": \"concat\",\n                \"jobs\": [\n                    {\n                        \"name\": \"send_render_data\"\n                    }\n                ]\n            },\n            {\n                \"name\": \"begin_loop\",\n                \"link\": \"merge\",\n                \"jobs\": [\n                    {\n                        \"name\": \"loop\"\n                    }\n                ]\n            },\n            {\n                \"name\": \"frame\",\n                \"link\": \"concat\",\n                \"jobs\": [\n                    {\n                        \"name\": \"begin_loop\"\n                    }\n                ]\n            }\n        ]\n    }\n]\n    ", undefined, undefined, undefined, undefined, /* () */0), undefined, undefined, /* () */0);
                                                                        var customData = /* array */[];
                                                                        var state$1 = JobAPI$Wonderjs.addWorkerMainLoopJob(/* tuple */[
                                                                              "customJob2",
                                                                              "customJob1"
                                                                            ], /* BEFORE */0, (function (stateData) {
                                                                                ArrayService$Wonderjs.push(2, customData);
                                                                                return /* () */0;
                                                                              }), JobAPI$Wonderjs.addWorkerMainLoopJob(/* tuple */[
                                                                                  "customJob1",
                                                                                  "send_render_data"
                                                                                ], /* BEFORE */0, (function (stateData) {
                                                                                    StateDataMainService$Wonderjs.unsafeGetState(stateData);
                                                                                    ArrayService$Wonderjs.push(1, customData);
                                                                                    return /* () */0;
                                                                                  }), state[0]));
                                                                        MainStateTool$Wonderjs.setState(state$1);
                                                                        return RenderJobsRenderWorkerTool$Wonderjs.execMainLoopJobsWithJobHandleMap(sandbox, RenderJobsRenderWorkerTool$Wonderjs.createMainLoopJobHandleMap(/* :: */[
                                                                                        /* tuple */[
                                                                                          "send_render_data",
                                                                                          (function (flags, stateData) {
                                                                                              return MostUtils$Wonderjs.callFunc((function (param) {
                                                                                                            ArrayService$Wonderjs.push(10, customData);
                                                                                                            return undefined;
                                                                                                          }));
                                                                                            })
                                                                                        ],
                                                                                        /* [] */0
                                                                                      ]), (function (param) {
                                                                                      return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](customData), /* array */[
                                                                                                      2,
                                                                                                      1,
                                                                                                      10
                                                                                                    ]));
                                                                                    }));
                                                                      }));
                                                        }));
                                          }));
                                    return Wonder_jest.describe("removeWorkerMainLoopJob", (function (param) {
                                                  return Wonder_jest.testPromise("test remove custom added job", undefined, (function (param) {
                                                                var customData = /* array */[];
                                                                var state$1 = JobAPI$Wonderjs.removeWorkerMainLoopJob("customJob", JobAPI$Wonderjs.addWorkerMainLoopJob(/* tuple */[
                                                                          "customJob",
                                                                          "tick"
                                                                        ], /* AFTER */1, (function (stateData) {
                                                                            StateDataMainService$Wonderjs.unsafeGetState(stateData);
                                                                            ArrayService$Wonderjs.push(1, customData);
                                                                            return /* () */0;
                                                                          }), state[0]));
                                                                MainStateTool$Wonderjs.setState(state$1);
                                                                return RenderJobsRenderWorkerTool$Wonderjs.execMainLoopJobs(sandbox, (function (param) {
                                                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](customData), /* array */[]));
                                                                            }));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
