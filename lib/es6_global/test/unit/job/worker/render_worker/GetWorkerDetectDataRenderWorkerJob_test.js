

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as SettingTool$Wonderjs from "../../../../tool/service/setting/SettingTool.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as SettingWorkerTool$Wonderjs from "../../../../integration/worker/tool/SettingWorkerTool.js";
import * as TestMainWorkerTool$Wonderjs from "../../../../integration/worker/job/main_worker/tool/TestMainWorkerTool.js";
import * as WorkerJobWorkerTool$Wonderjs from "../../../../integration/worker/tool/WorkerJobWorkerTool.js";
import * as RenderWorkerStateTool$Wonderjs from "../../../../tool/service/state/RenderWorkerStateTool.js";
import * as MainInitJobMainWorkerTool$Wonderjs from "../../../../integration/worker/job/main_worker/tool/MainInitJobMainWorkerTool.js";
import * as WorkerDetectMainWorkerTool$Wonderjs from "../main_worker/tool/WorkerDetectMainWorkerTool.js";
import * as SendInitRenderDataWorkerTool$Wonderjs from "../../../../integration/worker/job/tool/SendInitRenderDataWorkerTool.js";
import * as WorkerDetectRenderWorkerTool$Wonderjs from "./tool/WorkerDetectRenderWorkerTool.js";
import * as WorkerInstanceMainWorkerTool$Wonderjs from "../../../../integration/worker/job/main_worker/tool/WorkerInstanceMainWorkerTool.js";
import * as GetWorkerDetectDataRenderWorkerJob$Wonderjs from "../../../../../src/job/worker/render/init/GetWorkerDetectDataRenderWorkerJob.js";

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

export {
  
}
/*  Not a pure module */
