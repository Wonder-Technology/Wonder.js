'use strict';

var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var WorkerJobTool$Wonderjs = require("../../../../../tool/service/workerJob/WorkerJobTool.js");
var TestWorkerTool$Wonderjs = require("../../../tool/TestWorkerTool.js");
var SettingWorkerTool$Wonderjs = require("../../../tool/SettingWorkerTool.js");
var TestMainWorkerTool$Wonderjs = require("../tool/TestMainWorkerTool.js");
var MainInitJobMainWorkerTool$Wonderjs = require("../tool/MainInitJobMainWorkerTool.js");
var SendInitRenderDataWorkerTool$Wonderjs = require("../../tool/SendInitRenderDataWorkerTool.js");
var WorkerInstanceMainWorkerTool$Wonderjs = require("../tool/WorkerInstanceMainWorkerTool.js");

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

/*  Not a pure module */
