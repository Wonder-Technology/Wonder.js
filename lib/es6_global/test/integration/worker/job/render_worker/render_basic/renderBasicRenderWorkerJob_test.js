

import * as Sinon from "./../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_option from "./../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "./../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as CameraTool$Wonderjs from "../../../../../tool/service/camera/CameraTool.js";
import * as GeometryAPI$Wonderjs from "../../../../../../src/api/geometry/GeometryAPI.js";
import * as SettingTool$Wonderjs from "../../../../../tool/service/setting/SettingTool.js";
import * as TransformAPI$Wonderjs from "../../../../../../src/api/TransformAPI.js";
import * as MainStateTool$Wonderjs from "../../../../../tool/service/state/MainStateTool.js";
import * as TransformTool$Wonderjs from "../../../../../tool/service/transform/TransformTool.js";
import * as GLSLSenderTool$Wonderjs from "../../../../../tool/service/sender/GLSLSenderTool.js";
import * as TestWorkerTool$Wonderjs from "../../../tool/TestWorkerTool.js";
import * as FakeGlWorkerTool$Wonderjs from "../../../tool/FakeGlWorkerTool.js";
import * as GLSLLocationTool$Wonderjs from "../../../../../tool/service/location/GLSLLocationTool.js";
import * as RenderBasicJobTool$Wonderjs from "../../../../../tool/job/render_basic/RenderBasicJobTool.js";
import * as TestMainWorkerTool$Wonderjs from "../../main_worker/tool/TestMainWorkerTool.js";
import * as RenderJobsRenderWorkerTool$Wonderjs from "../tool/RenderJobsRenderWorkerTool.js";
import * as RenderBasicForNoWorkerAndWorkerJobTool$Wonderjs from "../../../../tool/job/RenderBasicForNoWorkerAndWorkerJobTool.js";

Wonder_jest.describe("test render basic render worker job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestMainWorkerTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, 5, 12, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return TestWorkerTool$Wonderjs.clear(sandbox);
              }));
        Wonder_jest.describe("use program", (function (param) {
                var _prepare = RenderBasicForNoWorkerAndWorkerJobTool$Wonderjs.prepareForUseProgramCase;
                return Wonder_jest.testPromise("test use", undefined, (function (param) {
                              var match = RenderJobsRenderWorkerTool$Wonderjs.prepareForUseProgramCase(sandbox, _prepare, state[0]);
                              var useProgram = match[2];
                              var program = match[1];
                              return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function (param) {
                                            return Promise.resolve(Sinon.toCalledWith(/* array */[program], Wonder_jest.Expect[/* expect */0](useProgram)));
                                          }), match[0], sandbox, undefined, /* () */0);
                            }));
              }));
        Wonder_jest.describe("send attribute data", (function (param) {
                return Wonder_jest.describe("init vbo buffers when first send", (function (param) {
                              var _prepare = function (sandbox, state) {
                                var match = RenderBasicJobTool$Wonderjs.prepareGameObjectWithGeometry(sandbox, state);
                                var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                                return /* tuple */[
                                        match$1[0],
                                        match[2]
                                      ];
                              };
                              Wonder_jest.describe("init vertex buffer", (function (param) {
                                      return Wonder_jest.testPromise("bufferData", undefined, (function (param) {
                                                    var match = _prepare(sandbox, state[0]);
                                                    var geometry = match[1];
                                                    var bufferData = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                    var state$1 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(bufferData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                    return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function (param) {
                                                                  var vertices = GeometryAPI$Wonderjs.getGeometryVertices(geometry, state$1);
                                                                  return Promise.resolve(Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withThreeArgs(1, vertices, 2, bufferData))));
                                                                }), state$1, sandbox, undefined, /* () */0);
                                                  }));
                                    }));
                              return Wonder_jest.describe("init index buffer", (function (param) {
                                            return Wonder_jest.testPromise("bufferData", undefined, (function (param) {
                                                          var match = _prepare(sandbox, state[0]);
                                                          var geometry = match[1];
                                                          var bufferData = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                          var state$1 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(bufferData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                          return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function (param) {
                                                                        var indices = GeometryAPI$Wonderjs.getGeometryIndices16(geometry, state$1);
                                                                        return Promise.resolve(Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withThreeArgs(1, indices, 2, bufferData))));
                                                                      }), state$1, sandbox, undefined, /* () */0);
                                                        }));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("send uniform data", (function (param) {
                      return Wonder_jest.describe("test send u_mMatrix", (function (param) {
                                    Wonder_jest.testPromise("test send", undefined, (function (param) {
                                            var match = GLSLSenderTool$Wonderjs.JudgeSendUniformData[/* prepareSendUniformData */0](sandbox, RenderBasicJobTool$Wonderjs.prepareGameObject, state[0]);
                                            var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(match[2][0], /* tuple */[
                                                  1,
                                                  2,
                                                  3
                                                ], match[0]);
                                            var uniformMatrix4fv = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                            var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_mMatrix");
                                            var state$2 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(uniformMatrix4fv), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                            return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function (param) {
                                                          return Promise.resolve(Sinon.toCalledWith(/* array */[
                                                                          0,
                                                                          false,
                                                                          new Float32Array(/* array */[
                                                                                1,
                                                                                0,
                                                                                0,
                                                                                0,
                                                                                0,
                                                                                1,
                                                                                0,
                                                                                0,
                                                                                0,
                                                                                0,
                                                                                1,
                                                                                0,
                                                                                1,
                                                                                2,
                                                                                3,
                                                                                1
                                                                              ])
                                                                        ], Wonder_jest.Expect[/* expect */0](Sinon.withOneArg(0, uniformMatrix4fv))));
                                                        }), state$2, sandbox, undefined, /* () */0);
                                          }));
                                    return Wonder_jest.describe("test two gameObjects", (function (param) {
                                                  return Wonder_jest.testPromise("if only set first one's transform, second one's sended u_mMatrix data shouldn't be affect", undefined, (function (param) {
                                                                var match = GLSLSenderTool$Wonderjs.JudgeSendUniformData[/* prepareSendUniformData */0](sandbox, RenderBasicJobTool$Wonderjs.prepareGameObject, state[0]);
                                                                var match$1 = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, match[0]);
                                                                var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(match[2][0], /* tuple */[
                                                                      1,
                                                                      2,
                                                                      3
                                                                    ], match$1[0]);
                                                                var uniformMatrix4fv = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_mMatrix");
                                                                var state$2 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(uniformMatrix4fv), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                                                return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function (param) {
                                                                              return Promise.resolve(Sinon.toCalledWith(/* array */[
                                                                                              0,
                                                                                              false,
                                                                                              TransformTool$Wonderjs.getDefaultLocalToWorldMatrixTypeArray(state$2)
                                                                                            ], Wonder_jest.Expect[/* expect */0](Sinon.getCall(1, Sinon.withOneArg(0, uniformMatrix4fv)))));
                                                                            }), state$2, sandbox, undefined, /* () */0);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
