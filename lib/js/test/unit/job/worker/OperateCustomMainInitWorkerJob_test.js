'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var JobAPI$Wonderjs = require("../../../../src/api/job/JobAPI.js");
var MostUtils$Wonderjs = require("../../../../src/asset/utils/MostUtils.js");
var ArrayService$Wonderjs = require("../../../../src/service/atom/ArrayService.js");
var MainStateTool$Wonderjs = require("../../../tool/service/state/MainStateTool.js");
var WorkerJobTool$Wonderjs = require("../../../tool/service/workerJob/WorkerJobTool.js");
var SettingWorkerTool$Wonderjs = require("../../../integration/worker/tool/SettingWorkerTool.js");
var TestMainWorkerTool$Wonderjs = require("../../../integration/worker/job/main_worker/tool/TestMainWorkerTool.js");
var StateDataMainService$Wonderjs = require("../../../../src/service/state/main/state/StateDataMainService.js");
var MainInitJobMainWorkerTool$Wonderjs = require("../../../integration/worker/job/main_worker/tool/MainInitJobMainWorkerTool.js");
var WorkerInstanceMainWorkerTool$Wonderjs = require("../../../integration/worker/job/main_worker/tool/WorkerInstanceMainWorkerTool.js");

Wonder_jest.describe("operate custom worker job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                SettingWorkerTool$Wonderjs.buildFakeCanvasForNotPassCanvasId(sandbox);
                state[0] = TestMainWorkerTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test operate custom job", (function (param) {
                      return Wonder_jest.describe("test operate main init job", (function (param) {
                                    Wonder_jest.describe("addWorkerMainInitJob", (function (param) {
                                            return Wonder_jest.describe("add job to main init pipeline", (function (param) {
                                                          Wonder_jest.describe("test add job after target job", (function (param) {
                                                                  Wonder_jest.testPromise("test add job to group job", undefined, (function (param) {
                                                                          var customData = /* array */[];
                                                                          JobAPI$Wonderjs.addWorkerMainInitJob(/* tuple */[
                                                                                "customJob1",
                                                                                "transfer_job_data"
                                                                              ], /* AFTER */1, (function (stateData) {
                                                                                  StateDataMainService$Wonderjs.unsafeGetState(stateData);
                                                                                  ArrayService$Wonderjs.push(1, customData);
                                                                                  return /* () */0;
                                                                                }), state[0]);
                                                                          return MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function (postMessageToRenderWorker) {
                                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](customData), /* array */[1]);
                                                                                      }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0));
                                                                        }));
                                                                  Wonder_jest.testPromise("test add job to concat job and merge job", undefined, (function (param) {
                                                                          var customData = /* array */[];
                                                                          JobAPI$Wonderjs.addWorkerMainInitJob(/* tuple */[
                                                                                "customJob2",
                                                                                "send_job_data"
                                                                              ], /* AFTER */1, (function (stateData) {
                                                                                  ArrayService$Wonderjs.push(2, customData);
                                                                                  return /* () */0;
                                                                                }), JobAPI$Wonderjs.addWorkerMainInitJob(/* tuple */[
                                                                                    "customJob1",
                                                                                    "transfer_job_data"
                                                                                  ], /* AFTER */1, (function (stateData) {
                                                                                      StateDataMainService$Wonderjs.unsafeGetState(stateData);
                                                                                      ArrayService$Wonderjs.push(1, customData);
                                                                                      return /* () */0;
                                                                                    }), state[0]));
                                                                          return MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function (postMessageToRenderWorker) {
                                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](customData), /* array */[
                                                                                                    2,
                                                                                                    1
                                                                                                  ]);
                                                                                      }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0));
                                                                        }));
                                                                  return Wonder_jest.testPromise("test add two job", undefined, (function (param) {
                                                                                var customData = /* array */[];
                                                                                JobAPI$Wonderjs.addWorkerMainInitJob(/* tuple */[
                                                                                      "customJob2",
                                                                                      "customJob1"
                                                                                    ], /* AFTER */1, (function (stateData) {
                                                                                        ArrayService$Wonderjs.push(2, customData);
                                                                                        return /* () */0;
                                                                                      }), JobAPI$Wonderjs.addWorkerMainInitJob(/* tuple */[
                                                                                          "customJob1",
                                                                                          "send_init_render_data"
                                                                                        ], /* AFTER */1, (function (stateData) {
                                                                                            StateDataMainService$Wonderjs.unsafeGetState(stateData);
                                                                                            ArrayService$Wonderjs.push(1, customData);
                                                                                            return /* () */0;
                                                                                          }), state[0]));
                                                                                return MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function (postMessageToRenderWorker) {
                                                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](customData), /* array */[
                                                                                                          1,
                                                                                                          2
                                                                                                        ]);
                                                                                            }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0));
                                                                              }));
                                                                }));
                                                          return Wonder_jest.testPromise("test add job to head", undefined, (function (param) {
                                                                        state[0] = TestMainWorkerTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, WorkerJobTool$Wonderjs.buildWorkerJobConfig(undefined, "\n[\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"begin_init\",\n          \"link\": \"merge\",\n          \"jobs\": [\n            {\n              \"name\": \"init\"\n            }\n          ]\n        },\n        {\n          \"name\": \"init\",\n          \"link\": \"concat\",\n          \"jobs\": [\n            {\n              \"name\": \"init_script\"\n            }\n            ]\n          },\n        {\n          \"name\": \"frame\",\n          \"link\": \"concat\",\n          \"jobs\": [\n            {\n              \"name\": \"begin_init\"\n            }\n          ]\n        }\n      ]\n    }\n  ]\n    ", undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, undefined, /* () */0);
                                                                        var customData = /* array */[];
                                                                        JobAPI$Wonderjs.addWorkerMainInitJob(/* tuple */[
                                                                              "customJob2",
                                                                              "customJob1"
                                                                            ], /* BEFORE */0, (function (stateData) {
                                                                                ArrayService$Wonderjs.push(2, customData);
                                                                                return /* () */0;
                                                                              }), JobAPI$Wonderjs.addWorkerMainInitJob(/* tuple */[
                                                                                  "customJob1",
                                                                                  "init_script"
                                                                                ], /* BEFORE */0, (function (stateData) {
                                                                                    StateDataMainService$Wonderjs.unsafeGetState(stateData);
                                                                                    ArrayService$Wonderjs.push(1, customData);
                                                                                    return /* () */0;
                                                                                  }), state[0]));
                                                                        return MainInitJobMainWorkerTool$Wonderjs.testWithJobHandleMap(sandbox, MainInitJobMainWorkerTool$Wonderjs.createMainInitJobHandleMap(/* :: */[
                                                                                        /* tuple */[
                                                                                          "init_script",
                                                                                          (function (flags, stateData) {
                                                                                              return MostUtils$Wonderjs.callFunc((function (param) {
                                                                                                            ArrayService$Wonderjs.push(10, customData);
                                                                                                            return undefined;
                                                                                                          }));
                                                                                            })
                                                                                        ],
                                                                                        /* [] */0
                                                                                      ]), WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function (postMessageToRenderWorker) {
                                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](customData), /* array */[
                                                                                                  2,
                                                                                                  1,
                                                                                                  10
                                                                                                ]);
                                                                                    }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0));
                                                                      }));
                                                        }));
                                          }));
                                    return Wonder_jest.describe("removeWorkerMainInitJob", (function (param) {
                                                  Wonder_jest.testPromise("test remove custom added job", undefined, (function (param) {
                                                          var customData = /* array */[];
                                                          JobAPI$Wonderjs.removeWorkerMainInitJob("customJob", JobAPI$Wonderjs.addWorkerMainInitJob(/* tuple */[
                                                                    "customJob",
                                                                    "transfer_job_data"
                                                                  ], /* AFTER */1, (function (stateData) {
                                                                      StateDataMainService$Wonderjs.unsafeGetState(stateData);
                                                                      ArrayService$Wonderjs.push(1, customData);
                                                                      return /* () */0;
                                                                    }), state[0]));
                                                          return MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function (postMessageToRenderWorker) {
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](customData), /* array */[]);
                                                                      }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0));
                                                        }));
                                                  return Wonder_jest.describe("test remove default job", (function (param) {
                                                                Wonder_jest.testPromise("test remove group job", undefined, (function (param) {
                                                                        JobAPI$Wonderjs.removeWorkerMainInitJob("transfer_job_data", state[0]);
                                                                        return MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function (postMessageToRenderWorker) {
                                                                                      return Sinon.toCalledWith(/* array */[{
                                                                                                    operateType: "SEND_JOB_DATA",
                                                                                                    pipelineJobs: Sinon$1.match.any,
                                                                                                    jobs: Sinon$1.match.any
                                                                                                  }], Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](postMessageToRenderWorker)));
                                                                                    }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0));
                                                                      }));
                                                                return Wonder_jest.testPromise("test remove atom job", undefined, (function (param) {
                                                                              JobAPI$Wonderjs.removeWorkerMainInitJob("get_finish_send_job_data", JobAPI$Wonderjs.removeWorkerMainInitJob("send_job_data", state[0]));
                                                                              return MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function (postMessageToRenderWorker) {
                                                                                            return Sinon.toCalledWith(/* array */[{
                                                                                                          operateType: "SEND_JOB_DATA",
                                                                                                          pipelineJobs: Sinon$1.match.any,
                                                                                                          jobs: Sinon$1.match.any
                                                                                                        }], Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](postMessageToRenderWorker)));
                                                                                          }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0));
                                                                            }));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
