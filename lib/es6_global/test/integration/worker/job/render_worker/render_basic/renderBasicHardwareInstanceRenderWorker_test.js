

import * as Curry from "./../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_option from "./../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "./../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as CameraTool$Wonderjs from "../../../../../tool/service/camera/CameraTool.js";
import * as SettingTool$Wonderjs from "../../../../../tool/service/setting/SettingTool.js";
import * as GameObjectAPI$Wonderjs from "../../../../../../src/api/GameObjectAPI.js";
import * as MainStateTool$Wonderjs from "../../../../../tool/service/state/MainStateTool.js";
import * as TestWorkerTool$Wonderjs from "../../../tool/TestWorkerTool.js";
import * as FakeGlWorkerTool$Wonderjs from "../../../tool/FakeGlWorkerTool.js";
import * as TestMainWorkerTool$Wonderjs from "../../main_worker/tool/TestMainWorkerTool.js";
import * as RenderWorkerStateTool$Wonderjs from "../../../../../tool/service/state/RenderWorkerStateTool.js";
import * as InstanceRenderWorkerTool$Wonderjs from "../tool/InstanceRenderWorkerTool.js";
import * as RenderJobsRenderWorkerTool$Wonderjs from "../tool/RenderJobsRenderWorkerTool.js";
import * as RenderBasicHardwareInstanceTool$Wonderjs from "../../../../../tool/render/instance/RenderBasicHardwareInstanceTool.js";
import * as RenderBasicHardwareInstanceRenderWorkerTool$Wonderjs from "../tool/RenderBasicHardwareInstanceRenderWorkerTool.js";
import * as RenderBasicHardwareInstanceForNoWorkerAndWorkerJobTool$Wonderjs from "../../../../tool/job/RenderBasicHardwareInstanceForNoWorkerAndWorkerJobTool.js";

Wonder_jest.describe("test render basic hardware instance in render worker", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestMainWorkerTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, SettingTool$Wonderjs.buildBufferConfigStr(300, undefined, 500, 48, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return TestWorkerTool$Wonderjs.clear(sandbox);
              }));
        Wonder_jest.describe("use program", (function (param) {
                var _prepareForUseProgram = function (sandbox, state) {
                  var match = RenderBasicHardwareInstanceRenderWorkerTool$Wonderjs.prepare(sandbox, state);
                  var createProgram = Sinon.returns(1, Sinon.onCall(0, Sinon.createEmptyStubWithJsObjSandbox(sandbox)));
                  var useProgram = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                  var state$1 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createProgram), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(useProgram), undefined, undefined, undefined, undefined, /* () */0), match[0]);
                  return /* tuple */[
                          state$1,
                          1,
                          createProgram,
                          useProgram
                        ];
                };
                Wonder_jest.testPromise("create program and use program only once", undefined, (function (param) {
                        var match = _prepareForUseProgram(sandbox, state[0]);
                        var createProgram = match[2];
                        return RenderJobsRenderWorkerTool$Wonderjs.initWithJobAndMainLoopAndRender((function (param) {
                                      return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(createProgram)), 1));
                                    }), match[0], sandbox, RenderJobsRenderWorkerTool$Wonderjs.getJobFuncArrExceptInitNoMaterialShader(/* () */0), undefined, /* () */0);
                      }));
                return Wonder_jest.testPromise("only use sourceInstance's gameObject's program", undefined, (function (param) {
                              var match = _prepareForUseProgram(sandbox, state[0]);
                              var useProgram = match[3];
                              var program = match[1];
                              return RenderJobsRenderWorkerTool$Wonderjs.initWithJobAndMainLoopAndRender((function (param) {
                                            return Promise.resolve(Sinon.toCalledWith(/* array */[program], Wonder_jest.Expect[/* expect */0](useProgram)));
                                          }), match[0], sandbox, RenderJobsRenderWorkerTool$Wonderjs.getJobFuncArrExceptInitNoMaterialShader(/* () */0), undefined, /* () */0);
                            }));
              }));
        return Wonder_jest.describe("send instance data", (function (param) {
                      return Wonder_jest.describe("send sourceInstance gameObject's and objectInstanceGameObject gameObjects' model matrices", (function (param) {
                                    var _prepare = function (sandbox, state) {
                                      var match = RenderBasicHardwareInstanceRenderWorkerTool$Wonderjs.prepare(sandbox, state);
                                      var match$1 = match[2];
                                      return /* tuple */[
                                              match[0],
                                              match[1],
                                              match$1[3],
                                              match$1[4]
                                            ];
                                    };
                                    Wonder_jest.testPromise("buffer sub data", undefined, (function (param) {
                                            var match = RenderBasicHardwareInstanceForNoWorkerAndWorkerJobTool$Wonderjs.prepareForBufferSubDataCase(sandbox, _prepare, state);
                                            var bufferSubData = match[3];
                                            var array_buffer = match[2];
                                            var match$1 = match[1];
                                            var objectTransform = match$1[1];
                                            var sourceTransform = match$1[0];
                                            var state$1 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, array_buffer, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(bufferSubData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                            return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function (param) {
                                                          return Promise.resolve(RenderBasicHardwareInstanceForNoWorkerAndWorkerJobTool$Wonderjs.testForBufferSubDataCase(sandbox, /* tuple */[
                                                                          sourceTransform,
                                                                          objectTransform
                                                                        ], array_buffer, bufferSubData, MainStateTool$Wonderjs.unsafeGetState(/* () */0)));
                                                        }), state$1, sandbox, undefined, /* () */0);
                                          }));
                                    return Wonder_jest.describe("fix bug", (function (param) {
                                                  return Wonder_jest.describe("test create new sourceInstance gameObject after first loop", (function (param) {
                                                                return Wonder_jest.describe("handle instance data position", (function (param) {
                                                                              return Wonder_jest.testPromise("vertexAttribDivisorANGLE 1", undefined, (function (param) {
                                                                                            InstanceRenderWorkerTool$Wonderjs.setGPUDetectDataAllowHardwareInstance(sandbox);
                                                                                            var renderWorkerState = RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0);
                                                                                            var vertexAttribDivisorANGLE = InstanceRenderWorkerTool$Wonderjs.getExtensionInstancedArrays(renderWorkerState).vertexAttribDivisorANGLE;
                                                                                            var match = CameraTool$Wonderjs.createCameraGameObject(state[0]);
                                                                                            var match$1 = RenderBasicHardwareInstanceForNoWorkerAndWorkerJobTool$Wonderjs.prepareGetAttribLocationForHandleInstanceData(sandbox, match[0]);
                                                                                            var pos4 = match$1[4];
                                                                                            var pos3 = match$1[3];
                                                                                            var pos2 = match$1[2];
                                                                                            var pos1 = match$1[1];
                                                                                            var state$1 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(match$1[5]), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                                                                                            MainStateTool$Wonderjs.setState(state$1);
                                                                                            return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function (param) {
                                                                                                          var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
                                                                                                          var match = RenderBasicHardwareInstanceTool$Wonderjs.createSourceInstanceGameObject(sandbox, state);
                                                                                                          var state$1 = GameObjectAPI$Wonderjs.initGameObject(match[1], match[0]);
                                                                                                          return RenderJobsRenderWorkerTool$Wonderjs.mainLoopAndRender((function (param) {
                                                                                                                        return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                                                            Sinon.getCallCount(Sinon.withTwoArgs(pos1, 1, vertexAttribDivisorANGLE)),
                                                                                                                                            Sinon.getCallCount(Sinon.withTwoArgs(pos2, 1, vertexAttribDivisorANGLE)),
                                                                                                                                            Sinon.getCallCount(Sinon.withTwoArgs(pos3, 1, vertexAttribDivisorANGLE)),
                                                                                                                                            Sinon.getCallCount(Sinon.withTwoArgs(pos4, 1, vertexAttribDivisorANGLE))
                                                                                                                                          ]), /* tuple */[
                                                                                                                                        1,
                                                                                                                                        1,
                                                                                                                                        1,
                                                                                                                                        1
                                                                                                                                      ]));
                                                                                                                      }), state$1, sandbox, undefined, /* () */0);
                                                                                                        }), state$1, sandbox, undefined, /* () */0);
                                                                                          }));
                                                                            }));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
