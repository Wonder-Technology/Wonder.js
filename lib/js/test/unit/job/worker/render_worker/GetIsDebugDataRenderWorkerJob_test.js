'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var SettingTool$Wonderjs = require("../../../../tool/service/setting/SettingTool.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var FakeGlWorkerTool$Wonderjs = require("../../../../integration/worker/tool/FakeGlWorkerTool.js");
var MainStateDataTool$Wonderjs = require("../../../../tool/service/state/MainStateDataTool.js");
var SettingWorkerTool$Wonderjs = require("../../../../integration/worker/tool/SettingWorkerTool.js");
var TestMainWorkerTool$Wonderjs = require("../../../../integration/worker/job/main_worker/tool/TestMainWorkerTool.js");
var WorkerJobWorkerTool$Wonderjs = require("../../../../integration/worker/tool/WorkerJobWorkerTool.js");
var RenderWorkerStateTool$Wonderjs = require("../../../../tool/service/state/RenderWorkerStateTool.js");
var MainInitJobMainWorkerTool$Wonderjs = require("../../../../integration/worker/job/main_worker/tool/MainInitJobMainWorkerTool.js");
var SendInitRenderDataWorkerTool$Wonderjs = require("../../../../integration/worker/job/tool/SendInitRenderDataWorkerTool.js");
var WorkerInstanceMainWorkerTool$Wonderjs = require("../../../../integration/worker/job/main_worker/tool/WorkerInstanceMainWorkerTool.js");
var GetIsDebugDataRenderWorkerJob$Wonderjs = require("../../../../../src/job/worker/render/init/GetIsDebugDataRenderWorkerJob.js");

Wonder_jest.describe("GetIsDebugDataRenderWorkerJob", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestMainWorkerTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("get isDebug data and set to main state data", (function (param) {
                return Wonder_jest.testPromise("test", undefined, (function (param) {
                              FakeGlWorkerTool$Wonderjs.setFakeGlToRenderWorkerState(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), RenderWorkerStateTool$Wonderjs.createStateAndSetToStateData(/* () */0));
                              return WorkerJobWorkerTool$Wonderjs.execRenderWorkerJob(GetIsDebugDataRenderWorkerJob$Wonderjs.execJob, (function (state) {
                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MainStateDataTool$Wonderjs.getIsDebug(MainStateTool$Wonderjs.getStateData(/* () */0))), true));
                                          }), Caml_option.some({
                                              data: {
                                                isDebug: true
                                              }
                                            }), undefined, /* () */0);
                            }));
              }));
        return Wonder_jest.describe("test sended init render data->isDebug", (function (param) {
                      beforeEach((function () {
                              return SettingWorkerTool$Wonderjs.buildFakeCanvasForNotPassCanvasId(sandbox);
                            }));
                      Wonder_jest.testPromise("test false", undefined, (function (param) {
                              MainStateDataTool$Wonderjs.setIsDebug(false);
                              return MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function (postMessageToRenderWorker) {
                                            return Sinon.toCalledWith(/* array */[SendInitRenderDataWorkerTool$Wonderjs.buildInitRenderData(false, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0)], Wonder_jest.Expect[/* expect */0](postMessageToRenderWorker));
                                          }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0));
                            }));
                      return Wonder_jest.testPromise("test true", undefined, (function (param) {
                                    MainStateDataTool$Wonderjs.setIsDebug(true);
                                    return MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function (postMessageToRenderWorker) {
                                                  return Sinon.toCalledWith(/* array */[SendInitRenderDataWorkerTool$Wonderjs.buildInitRenderData(true, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0)], Wonder_jest.Expect[/* expect */0](postMessageToRenderWorker));
                                                }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0));
                                  }));
                    }));
      }));

/*  Not a pure module */
