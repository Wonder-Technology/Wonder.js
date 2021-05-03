'use strict';

var Most = require("most");
var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var WorkerJobTool$Wonderjs = require("../../../../tool/service/workerJob/WorkerJobTool.js");
var WorkerMainWorkerTool$Wonderjs = require("./tool/WorkerMainWorkerTool.js");
var WorkerInstanceMainWorkerTool$Wonderjs = require("../../../../integration/worker/job/main_worker/tool/WorkerInstanceMainWorkerTool.js");
var CreateWorkerInstanceMainWorkerJob$Wonderjs = require("../../../../../src/job/worker/main/init/CreateWorkerInstanceMainWorkerJob.js");

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

/*  Not a pure module */
