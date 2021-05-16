'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var WorkerDataAPI$Wonderjs = require("../../../../../src/api/workerData/WorkerDataAPI.js");
var TestWorkerTool$Wonderjs = require("../../tool/TestWorkerTool.js");
var FakeGlWorkerTool$Wonderjs = require("../../tool/FakeGlWorkerTool.js");
var TestMainWorkerTool$Wonderjs = require("../main_worker/tool/TestMainWorkerTool.js");
var WorkerJobWorkerTool$Wonderjs = require("../../tool/WorkerJobWorkerTool.js");
var RenderWorkerStateTool$Wonderjs = require("../../../../tool/service/state/RenderWorkerStateTool.js");
var RenderJobsRenderWorkerTool$Wonderjs = require("./tool/RenderJobsRenderWorkerTool.js");
var SendRenderDataMainWorkerJob$Wonderjs = require("../../../../../src/job/worker/main/loop/SendRenderDataMainWorkerJob.js");
var SendRenderDataMainWorkerTool$Wonderjs = require("../main_worker/tool/SendRenderDataMainWorkerTool.js");
var SendRenderRenderDataWorkerTool$Wonderjs = require("../tool/SendRenderRenderDataWorkerTool.js");
var OperateCustomRenderWorkerService$Wonderjs = require("../../../../../src/service/state/render_worker/custom/OperateCustomRenderWorkerService.js");

Wonder_jest.describe("test get custom data render worker job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        MainStateTool$Wonderjs.createState(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return TestWorkerTool$Wonderjs.clear(sandbox);
              }));
        Wonder_jest.describe("test send render data to render worker", (function (param) {
                return Wonder_jest.testPromise("send customData", undefined, (function (param) {
                              var match = SendRenderDataMainWorkerTool$Wonderjs.prepareForTestSendRenderData(sandbox);
                              var postMessageToRenderWorker = match[1];
                              var state = WorkerDataAPI$Wonderjs.setMainWorkerCustomData(100, match[0]);
                              MainStateTool$Wonderjs.setState(state);
                              return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(SendRenderDataMainWorkerJob$Wonderjs.execJob, (function (param) {
                                            return Promise.resolve(Sinon.toCalledWith(/* array */[SendRenderRenderDataWorkerTool$Wonderjs.buildRenderRenderData(undefined, undefined, undefined, undefined, undefined, undefined, 100, undefined, /* () */0)], Wonder_jest.Expect[/* expect */0](postMessageToRenderWorker)));
                                          }), undefined, /* () */0);
                            }));
              }));
        return Wonder_jest.describe("test render worker job", (function (param) {
                      return Wonder_jest.testPromise("get customData", undefined, (function (param) {
                                    var state = TestMainWorkerTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                    var state$1 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
                                    var state$2 = WorkerDataAPI$Wonderjs.setMainWorkerCustomData(100, state$1);
                                    MainStateTool$Wonderjs.setState(state$2);
                                    return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function (param) {
                                                  var renderWorkerState = RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0);
                                                  return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OperateCustomRenderWorkerService$Wonderjs.getCustomDataFromMainWorkerToRenderWorker(renderWorkerState)), 100));
                                                }), state$2, sandbox, undefined, /* () */0);
                                  }));
                    }));
      }));

/*  Not a pure module */
