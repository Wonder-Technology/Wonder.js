

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as SettingTool$Wonderjs from "../../../../tool/service/setting/SettingTool.js";
import * as GameObjectAPI$Wonderjs from "../../../../../src/api/GameObjectAPI.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as FakeGlWorkerTool$Wonderjs from "../../tool/FakeGlWorkerTool.js";
import * as TypeArrayPoolTool$Wonderjs from "../../../../tool/structure/TypeArrayPoolTool.js";
import * as TestMainWorkerTool$Wonderjs from "../main_worker/tool/TestMainWorkerTool.js";
import * as RenderWorkerStateTool$Wonderjs from "../../../../tool/service/state/RenderWorkerStateTool.js";
import * as RenderJobsRenderWorkerTool$Wonderjs from "./tool/RenderJobsRenderWorkerTool.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as RenderBasicHardwareInstanceRenderWorkerTool$Wonderjs from "./tool/RenderBasicHardwareInstanceRenderWorkerTool.js";

Wonder_jest.describe("DisposeSourceInstanceRenderWorkerJob", (function (param) {
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
        return Wonder_jest.describe("dispose sourceInstance data", (function (param) {
                      var _test = function (judgeFunc, state) {
                        var match = RenderBasicHardwareInstanceRenderWorkerTool$Wonderjs.prepare(sandbox, state[0]);
                        var sourceInstance = match[2][3];
                        var gameObject = match[1];
                        var createBuffer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        Sinon.returns(1, createBuffer);
                        var state$1 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createBuffer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                        var state$2 = MainStateTool$Wonderjs.setState(state$1);
                        return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function (param) {
                                      var state = GameObjectAPI$Wonderjs.disposeGameObject(gameObject, MainStateTool$Wonderjs.unsafeGetState(/* () */0));
                                      return RenderJobsRenderWorkerTool$Wonderjs.mainLoopAndDispose((function (param) {
                                                    var renderWorkerState = RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0);
                                                    return Promise.resolve(Curry._2(judgeFunc, sourceInstance, renderWorkerState));
                                                  }), state, sandbox, undefined, /* () */0);
                                    }), state$2, sandbox, undefined, /* () */0);
                      };
                      Wonder_jest.testPromise("add matrixFloat32ArrayMap->typeArray to pool", undefined, (function (param) {
                              return _test((function (sourceInstance, renderWorkerState) {
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MutableSparseMapService$WonderCommonlib.unsafeGet(1024, TypeArrayPoolTool$Wonderjs.getFloat32ArrayPoolMap(renderWorkerState[/* typeArrayPoolRecord */24])).length), 1);
                                          }), state);
                            }));
                      return Wonder_jest.testPromise("remove from matrixFloat32ArrayMap, matrixInstanceBufferCapacityMap, isSendTransformMatrixDataMap", undefined, (function (param) {
                                    return _test((function (sourceInstance, renderWorkerState) {
                                                  var match = renderWorkerState[/* sourceInstanceRecord */11];
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                  MutableSparseMapService$WonderCommonlib.unsafeGet(sourceInstance, match[/* matrixFloat32ArrayMap */4]),
                                                                  MutableSparseMapService$WonderCommonlib.unsafeGet(sourceInstance, match[/* matrixInstanceBufferCapacityMap */3]),
                                                                  MutableSparseMapService$WonderCommonlib.unsafeGet(sourceInstance, match[/* isSendTransformMatrixDataMap */5])
                                                                ]), /* tuple */[
                                                              undefined,
                                                              undefined,
                                                              undefined
                                                            ]);
                                                }), state);
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
