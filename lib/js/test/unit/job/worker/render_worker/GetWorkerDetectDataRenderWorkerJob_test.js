'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var SettingTool$Wonderjs = require("../../../../tool/service/setting/SettingTool.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var SettingWorkerTool$Wonderjs = require("../../../../integration/worker/tool/SettingWorkerTool.js");
var TestMainWorkerTool$Wonderjs = require("../../../../integration/worker/job/main_worker/tool/TestMainWorkerTool.js");
var WorkerJobWorkerTool$Wonderjs = require("../../../../integration/worker/tool/WorkerJobWorkerTool.js");
var RenderWorkerStateTool$Wonderjs = require("../../../../tool/service/state/RenderWorkerStateTool.js");
var MainInitJobMainWorkerTool$Wonderjs = require("../../../../integration/worker/job/main_worker/tool/MainInitJobMainWorkerTool.js");
var WorkerDetectMainWorkerTool$Wonderjs = require("../main_worker/tool/WorkerDetectMainWorkerTool.js");
var SendInitRenderDataWorkerTool$Wonderjs = require("../../../../integration/worker/job/tool/SendInitRenderDataWorkerTool.js");
var WorkerDetectRenderWorkerTool$Wonderjs = require("./tool/WorkerDetectRenderWorkerTool.js");
var WorkerInstanceMainWorkerTool$Wonderjs = require("../../../../integration/worker/job/main_worker/tool/WorkerInstanceMainWorkerTool.js");
var GetWorkerDetectDataRenderWorkerJob$Wonderjs = require("../../../../../src/job/worker/render/init/GetWorkerDetectDataRenderWorkerJob.js");

Wonder_jest.describe("GetWorkerDetectDataRenderWorkerJob", (function (param) {
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
        Wonder_jest.describe("get worker detect data and set to main state data", (function (param) {
                return Wonder_jest.testPromise("test", undefined, (function (param) {
                              RenderWorkerStateTool$Wonderjs.createStateAndSetToStateData(/* () */0);
                              return WorkerJobWorkerTool$Wonderjs.execRenderWorkerJob(GetWorkerDetectDataRenderWorkerJob$Wonderjs.execJob, (function (state) {
                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](WorkerDetectRenderWorkerTool$Wonderjs.getRecord(state)[/* isUseWorker */0]), true));
                                          }), Caml_option.some({
                                              data: {
                                                workerDetectData: {
                                                  isUseWorker: true
                                                }
                                              }
                                            }), undefined, /* () */0);
                            }));
              }));
        return Wonder_jest.describe("test sended init render data->workerDetectData", (function (param) {
                      beforeEach((function () {
                              return SettingWorkerTool$Wonderjs.buildFakeCanvasForNotPassCanvasId(sandbox);
                            }));
                      return Wonder_jest.testPromise("test", undefined, (function (param) {
                                    var state$1 = SettingTool$Wonderjs.setUseWorker(false, WorkerDetectMainWorkerTool$Wonderjs.markIsSupportRenderWorkerAndSharedArrayBuffer(false, state[0]));
                                    MainStateTool$Wonderjs.setState(state$1);
                                    return MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function (postMessageToRenderWorker) {
                                                  return Sinon.toCalledWith(/* array */[SendInitRenderDataWorkerTool$Wonderjs.buildInitRenderData(undefined, undefined, {
                                                                    isUseWorker: false
                                                                  }, undefined, undefined, undefined, undefined, undefined, /* () */0)], Wonder_jest.Expect[/* expect */0](postMessageToRenderWorker));
                                                }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0));
                                  }));
                    }));
      }));

/*  Not a pure module */
