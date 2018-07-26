

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as SettingTool$Wonderjs from "../../../../tool/service/setting/SettingTool.js";
import * as GameObjectAPI$Wonderjs from "../../../../../src/api/GameObjectAPI.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as VboBufferTool$Wonderjs from "../../../../tool/service/vboBuffer/VboBufferTool.js";
import * as TestWorkerTool$Wonderjs from "../../tool/TestWorkerTool.js";
import * as FakeGlWorkerTool$Wonderjs from "../../tool/FakeGlWorkerTool.js";
import * as MeshRendererTool$Wonderjs from "../../../../tool/service/meshRenderer/MeshRendererTool.js";
import * as SparseMapService$Wonderjs from "../../../../../src/service/atom/SparseMapService.js";
import * as TypeArrayPoolTool$Wonderjs from "../../../../tool/structure/TypeArrayPoolTool.js";
import * as SourceInstanceTool$Wonderjs from "../../../../tool/service/instance/SourceInstanceTool.js";
import * as TestMainWorkerTool$Wonderjs from "./tool/TestMainWorkerTool.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as InstanceRenderWorkerTool$Wonderjs from "../render_worker/tool/InstanceRenderWorkerTool.js";
import * as RenderJobsRenderWorkerTool$Wonderjs from "../render_worker/tool/RenderJobsRenderWorkerTool.js";
import * as RenderBasicHardwareInstanceTool$Wonderjs from "../../../../tool/render/instance/RenderBasicHardwareInstanceTool.js";
import * as DisposeForNoWorkerAndWorkerJobTool$Wonderjs from "../../../tool/job/DisposeForNoWorkerAndWorkerJobTool.js";
import * as FrontRenderLightHardwareInstanceTool$Wonderjs from "../../../../tool/render/instance/FrontRenderLightHardwareInstanceTool.js";

describe("test dispose and send dispose data main worker job", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestMainWorkerTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 2, undefined, /* () */0), /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return TestWorkerTool$Wonderjs.clear(sandbox);
              }));
        describe("not dispose the data of render worker state", (function () {
                describe("dispose components", (function () {
                        describe("test disposeGameObjectBoxGeometryComponent", (function () {
                                describe("dispose data in dispose job", (function () {
                                        describe("not dispose main worker state->vbo buffer data", (function () {
                                                return Wonder_jest.testPromise("not add buffer to pool", (function () {
                                                              var match = DisposeForNoWorkerAndWorkerJobTool$Wonderjs.prepareForDisposeBoxGeometryVboBuffer(state);
                                                              var geometry1 = match[2];
                                                              var state$1 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                              var state$2 = MainStateTool$Wonderjs.setState(state$1);
                                                              return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function () {
                                                                            var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
                                                                            var match = VboBufferTool$Wonderjs.getVboBufferRecord(state);
                                                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                SparseMapService$WonderCommonlib.has(geometry1, match[/* vertexArrayBufferPool */9]),
                                                                                                SparseMapService$WonderCommonlib.has(geometry1, match[/* elementArrayBufferPool */10])
                                                                                              ]), /* tuple */[
                                                                                            false,
                                                                                            false
                                                                                          ]));
                                                                          }), state$2, sandbox, undefined, /* () */0);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        describe("test disposeGameObjectSourceInstanceComponent", (function () {
                                describe("dispose data in dispose job", (function () {
                                        describe("not dispose main worker state->matrixFloat32ArrayMap data", (function () {
                                                return Wonder_jest.testPromise("not add typeArray to pool", (function () {
                                                              var match = SourceInstanceTool$Wonderjs.createSourceInstanceGameObject(state[0]);
                                                              var gameObject = match[1];
                                                              InstanceRenderWorkerTool$Wonderjs.setGPUDetectDataAllowHardwareInstance(sandbox);
                                                              var state$1 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                              var state$2 = MainStateTool$Wonderjs.setState(state$1);
                                                              return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function () {
                                                                            MainStateTool$Wonderjs.setState(GameObjectAPI$Wonderjs.disposeGameObject(gameObject, MainStateTool$Wonderjs.unsafeGetState(/* () */0)));
                                                                            return RenderJobsRenderWorkerTool$Wonderjs.mainLoopAndRender((function () {
                                                                                          var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
                                                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](SparseMapService$Wonderjs.length(TypeArrayPoolTool$Wonderjs.getFloat32ArrayPoolMap(state[/* typeArrayPoolRecord */36]))), 0));
                                                                                        }), state$2, sandbox, undefined, /* () */0);
                                                                          }), state$2, sandbox, undefined, /* () */0);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("dispose gameObjects", (function () {
                describe("test disposeGameObject", (function () {
                        return Wonder_jest.testPromise("dispose data", (function () {
                                      var match = DisposeForNoWorkerAndWorkerJobTool$Wonderjs.prepareForDisposeGameObjects(state);
                                      var state$1 = GameObjectAPI$Wonderjs.disposeGameObject(match[1], match[0]);
                                      var state$2 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                      var state$3 = MainStateTool$Wonderjs.setState(state$2);
                                      return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function () {
                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* == */0], Wonder_jest.Expect[/* expect */0](MeshRendererTool$Wonderjs.getBasicMaterialRenderArray(MainStateTool$Wonderjs.unsafeGetState(/* () */0)).length), 1));
                                                  }), state$3, sandbox, undefined, /* () */0);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("send data to render worker", (function () {
                return Wonder_jest.testPromise("send dispose data", (function () {
                              var match = DisposeForNoWorkerAndWorkerJobTool$Wonderjs.prepareBoxAndCustomGeometryGameObjects(state);
                              var match$1 = match[2];
                              var geometry3 = match$1[2];
                              var geometry2 = match$1[1];
                              var geometry1 = match$1[0];
                              var match$2 = match[1];
                              var match$3 = RenderBasicHardwareInstanceTool$Wonderjs.createSourceInstanceGameObject(sandbox, match[0]);
                              var match$4 = match$3[2];
                              var sourceInstance4 = match$4[3];
                              var geometry4 = match$4[0];
                              var match$5 = FrontRenderLightHardwareInstanceTool$Wonderjs.createSourceInstanceGameObject(sandbox, match$3[0]);
                              var match$6 = match$5[2];
                              var sourceInstance5 = match$6[3];
                              var geometry5 = match$6[0];
                              var state$1 = GameObjectAPI$Wonderjs.batchDisposeGameObject(/* array */[
                                    match$2[0],
                                    match$2[1],
                                    match$2[2],
                                    match$3[1],
                                    match$5[1]
                                  ], match$5[0]);
                              var state$2 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                              var state$3 = MainStateTool$Wonderjs.setState(state$2);
                              return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function (postMessageToRenderWorker) {
                                            return Promise.resolve(Sinon.toCalledWith(/* array */[{
                                                              operateType: "DISPOSE",
                                                              boxGeometryNeedDisposeVboBufferArr: /* array */[
                                                                geometry1,
                                                                geometry2,
                                                                geometry4,
                                                                geometry5
                                                              ],
                                                              customGeometryNeedDisposeVboBufferArr: /* array */[geometry3],
                                                              sourceInstanceNeedDisposeVboBufferArr: /* array */[
                                                                sourceInstance4,
                                                                sourceInstance5
                                                              ]
                                                            }], Wonder_jest.Expect[/* expect */0](postMessageToRenderWorker)));
                                          }), state$3, sandbox, undefined, /* () */0);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
