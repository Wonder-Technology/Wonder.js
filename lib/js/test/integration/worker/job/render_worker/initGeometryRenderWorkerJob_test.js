'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var GeometryTool$Wonderjs = require("../../../../tool/service/geometry/GeometryTool.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var WorkerJobTool$Wonderjs = require("../../../../tool/service/workerJob/WorkerJobTool.js");
var TestWorkerTool$Wonderjs = require("../../tool/TestWorkerTool.js");
var FakeGlWorkerTool$Wonderjs = require("../../tool/FakeGlWorkerTool.js");
var SettingWorkerTool$Wonderjs = require("../../tool/SettingWorkerTool.js");
var TestMainWorkerTool$Wonderjs = require("../main_worker/tool/TestMainWorkerTool.js");
var IMGUIRenderWorkerTool$Wonderjs = require("./tool/IMGUIRenderWorkerTool.js");
var RenderWorkerStateTool$Wonderjs = require("../../../../tool/service/state/RenderWorkerStateTool.js");
var MainInitJobMainWorkerTool$Wonderjs = require("../main_worker/tool/MainInitJobMainWorkerTool.js");
var RenderJobsRenderWorkerTool$Wonderjs = require("./tool/RenderJobsRenderWorkerTool.js");
var SendInitRenderDataWorkerTool$Wonderjs = require("../tool/SendInitRenderDataWorkerTool.js");
var WorkerInstanceMainWorkerTool$Wonderjs = require("../main_worker/tool/WorkerInstanceMainWorkerTool.js");
var RecordGeometryRenderWorkerService$Wonderjs = require("../../../../../src/service/state/render_worker/geometry/RecordGeometryRenderWorkerService.js");

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

/*  Not a pure module */
