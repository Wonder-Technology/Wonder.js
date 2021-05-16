'use strict';

var Most = require("most");
var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var OptionTool$Wonderjs = require("../../../../tool/service/atom/OptionTool.js");
var WorkerWorkerTool$Wonderjs = require("../../../../integration/worker/tool/WorkerWorkerTool.js");
var RenderWorkerStateTool$Wonderjs = require("../../../../tool/service/state/RenderWorkerStateTool.js");
var WorkerRenderWorkerTool$Wonderjs = require("./tool/WorkerRenderWorkerTool.js");
var SendFinishSendJobDataRenderWorkerJob$Wonderjs = require("../../../../../src/job/worker/render/init/SendFinishSendJobDataRenderWorkerJob.js");

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

/*  Not a pure module */
