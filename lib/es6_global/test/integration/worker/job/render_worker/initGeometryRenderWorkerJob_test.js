

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "./../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as GeometryTool$Wonderjs from "../../../../tool/service/geometry/GeometryTool.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as WorkerJobTool$Wonderjs from "../../../../tool/service/workerJob/WorkerJobTool.js";
import * as TestWorkerTool$Wonderjs from "../../tool/TestWorkerTool.js";
import * as FakeGlWorkerTool$Wonderjs from "../../tool/FakeGlWorkerTool.js";
import * as SettingWorkerTool$Wonderjs from "../../tool/SettingWorkerTool.js";
import * as TestMainWorkerTool$Wonderjs from "../main_worker/tool/TestMainWorkerTool.js";
import * as IMGUIRenderWorkerTool$Wonderjs from "./tool/IMGUIRenderWorkerTool.js";
import * as RenderWorkerStateTool$Wonderjs from "../../../../tool/service/state/RenderWorkerStateTool.js";
import * as MainInitJobMainWorkerTool$Wonderjs from "../main_worker/tool/MainInitJobMainWorkerTool.js";
import * as RenderJobsRenderWorkerTool$Wonderjs from "./tool/RenderJobsRenderWorkerTool.js";
import * as SendInitRenderDataWorkerTool$Wonderjs from "../tool/SendInitRenderDataWorkerTool.js";
import * as WorkerInstanceMainWorkerTool$Wonderjs from "../main_worker/tool/WorkerInstanceMainWorkerTool.js";
import * as RecordGeometryRenderWorkerService$Wonderjs from "../../../../../src/service/state/render_worker/geometry/RecordGeometryRenderWorkerService.js";

Wonder_jest.describe("test init geometry render worker job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                SettingWorkerTool$Wonderjs.buildFakeCanvasForNotPassCanvasId(sandbox);
                state[0] = TestMainWorkerTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, WorkerJobTool$Wonderjs.buildWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return TestWorkerTool$Wonderjs.clear(sandbox);
              }));
        Wonder_jest.describe("test send init data to render worker", (function (param) {
                return Wonder_jest.testPromise("send indicesTypeMap", undefined, (function (param) {
                              var match = GeometryTool$Wonderjs.createThreeGameObjectsAndSetFullPointData(state[0]);
                              var state$1 = match[0];
                              MainStateTool$Wonderjs.setState(state$1);
                              return MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function (postMessageToRenderWorker) {
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(SendInitRenderDataWorkerTool$Wonderjs.buildInitRenderData(undefined, undefined, undefined, undefined, undefined, undefined, undefined, {
                                                                        buffer: Sinon$1.match.any,
                                                                        indicesTypeMap: GeometryTool$Wonderjs.getRecord(state$1)[/* indicesTypeMap */17]
                                                                      }, /* () */0), postMessageToRenderWorker))), 1);
                                          }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0));
                            }));
              }));
        return Wonder_jest.describe("test render worker job", (function (param) {
                      return Wonder_jest.testPromise("get indicesTypeMap", undefined, (function (param) {
                                    var state$1 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                                    var match = GeometryTool$Wonderjs.createThreeGameObjectsAndSetFullPointData(state$1);
                                    var state$2 = match[0];
                                    var indicesTypeMapInMainState = GeometryTool$Wonderjs.getRecord(state$2)[/* indicesTypeMap */17];
                                    MainStateTool$Wonderjs.setState(state$2);
                                    return RenderJobsRenderWorkerTool$Wonderjs.init((function (state) {
                                                  var renderWorkerState = RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0);
                                                  var match = RecordGeometryRenderWorkerService$Wonderjs.getRecord(renderWorkerState);
                                                  return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match[/* indicesTypeMap */9]), indicesTypeMapInMainState));
                                                }), state$2);
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
