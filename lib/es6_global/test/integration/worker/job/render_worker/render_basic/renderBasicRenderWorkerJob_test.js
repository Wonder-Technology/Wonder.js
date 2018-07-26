

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as Js_primitive from "../../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as CameraTool$Wonderjs from "../../../../../tool/service/camera/CameraTool.js";
import * as SettingTool$Wonderjs from "../../../../../tool/service/setting/SettingTool.js";
import * as TransformAPI$Wonderjs from "../../../../../../src/api/TransformAPI.js";
import * as MainStateTool$Wonderjs from "../../../../../tool/service/state/MainStateTool.js";
import * as TransformTool$Wonderjs from "../../../../../tool/service/transform/TransformTool.js";
import * as GLSLSenderTool$Wonderjs from "../../../../../tool/service/sender/GLSLSenderTool.js";
import * as TestWorkerTool$Wonderjs from "../../../tool/TestWorkerTool.js";
import * as FakeGlWorkerTool$Wonderjs from "../../../tool/FakeGlWorkerTool.js";
import * as GLSLLocationTool$Wonderjs from "../../../../../tool/service/location/GLSLLocationTool.js";
import * as WorkerWorkerTool$Wonderjs from "../../../tool/WorkerWorkerTool.js";
import * as BrowserDetectTool$Wonderjs from "../../../../../tool/service/browserDetect/BrowserDetectTool.js";
import * as CustomGeometryAPI$Wonderjs from "../../../../../../src/api/geometry/CustomGeometryAPI.js";
import * as RenderBasicJobTool$Wonderjs from "../../../../../tool/job/render_basic/RenderBasicJobTool.js";
import * as TestMainWorkerTool$Wonderjs from "../../main_worker/tool/TestMainWorkerTool.js";
import * as BasicSourceTextureAPI$Wonderjs from "../../../../../../src/api/texture/BasicSourceTextureAPI.js";
import * as BasicSourceTextureTool$Wonderjs from "../../../../../tool/service/texture/BasicSourceTextureTool.js";
import * as RenderJobsRenderWorkerTool$Wonderjs from "../tool/RenderJobsRenderWorkerTool.js";
import * as BasicSourceTextureRenderWorkerTool$Wonderjs from "../../../tool/BasicSourceTextureRenderWorkerTool.js";
import * as InitBasicSourceTextureRenderWorkerTool$Wonderjs from "../../../tool/InitBasicSourceTextureRenderWorkerTool.js";
import * as RenderBasicForNoWorkerAndWorkerJobTool$Wonderjs from "../../../../tool/job/RenderBasicForNoWorkerAndWorkerJobTool.js";

describe("test render basic render worker job", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestMainWorkerTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, 5, 5, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return TestWorkerTool$Wonderjs.clear(sandbox);
              }));
        describe("use program", (function () {
                var _prepare = RenderBasicForNoWorkerAndWorkerJobTool$Wonderjs.prepareForUseProgramCase;
                return Wonder_jest.testPromise("test use", (function () {
                              var match = RenderJobsRenderWorkerTool$Wonderjs.prepareForUseProgramCase(sandbox, _prepare, state[0]);
                              var useProgram = match[2];
                              var program = match[1];
                              return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function () {
                                            return Promise.resolve(Sinon.toCalledWith(/* array */[program], Wonder_jest.Expect[/* expect */0](useProgram)));
                                          }), match[0], sandbox, undefined, /* () */0);
                            }));
              }));
        describe("send attribute data", (function () {
                describe("init vbo buffers when first send", (function () {
                        var _prepare = function (sandbox, state) {
                          var match = RenderBasicJobTool$Wonderjs.prepareGameObjectWithCustomGeometry(sandbox, state);
                          var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                          return /* tuple */[
                                  match$1[0],
                                  match[2]
                                ];
                        };
                        describe("init vertex buffer", (function () {
                                return Wonder_jest.testPromise("bufferData", (function () {
                                              var match = _prepare(sandbox, state[0]);
                                              var geometry = match[1];
                                              var bufferData = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var state$1 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(bufferData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                              return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function () {
                                                            var vertices = CustomGeometryAPI$Wonderjs.getCustomGeometryVertices(geometry, state$1);
                                                            return Promise.resolve(Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withThreeArgs(1, vertices, 2, bufferData))));
                                                          }), state$1, sandbox, undefined, /* () */0);
                                            }));
                              }));
                        describe("init index buffer", (function () {
                                return Wonder_jest.testPromise("bufferData", (function () {
                                              var match = _prepare(sandbox, state[0]);
                                              var geometry = match[1];
                                              var bufferData = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var state$1 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(bufferData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                              return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function () {
                                                            var indices = CustomGeometryAPI$Wonderjs.getCustomGeometryIndices(geometry, state$1);
                                                            return Promise.resolve(Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withThreeArgs(1, indices, 2, bufferData))));
                                                          }), state$1, sandbox, undefined, /* () */0);
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("send uniform data", (function () {
                describe("test send u_mMatrix", (function () {
                        Wonder_jest.testPromise("test send", (function () {
                                var match = GLSLSenderTool$Wonderjs.JudgeSendUniformData[/* prepareSendUniformData */0](sandbox, RenderBasicJobTool$Wonderjs.prepareGameObject, state[0]);
                                var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(match[2][0], /* tuple */[
                                      1,
                                      2,
                                      3
                                    ], match[0]);
                                var uniformMatrix4fv = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_mMatrix");
                                var state$2 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(uniformMatrix4fv), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function () {
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
                        describe("test two gameObjects", (function () {
                                return Wonder_jest.testPromise("if only set first one's transform, second one's sended u_mMatrix data shouldn't be affect", (function () {
                                              var match = GLSLSenderTool$Wonderjs.JudgeSendUniformData[/* prepareSendUniformData */0](sandbox, RenderBasicJobTool$Wonderjs.prepareGameObject, state[0]);
                                              var match$1 = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, match[0]);
                                              var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(match[2][0], /* tuple */[
                                                    1,
                                                    2,
                                                    3
                                                  ], match$1[0]);
                                              var uniformMatrix4fv = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_mMatrix");
                                              var state$2 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(uniformMatrix4fv), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                              return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function () {
                                                            return Promise.resolve(Sinon.toCalledWith(/* array */[
                                                                            0,
                                                                            false,
                                                                            TransformTool$Wonderjs.getDefaultLocalToWorldMatrixTypeArray(state$2)
                                                                          ], Wonder_jest.Expect[/* expect */0](Sinon.getCall(1, Sinon.withOneArg(0, uniformMatrix4fv)))));
                                                          }), state$2, sandbox, undefined, /* () */0);
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("update map", (function () {
                describe("set flipY", (function () {
                        var _prepare = function () {
                          var match = InitBasicSourceTextureRenderWorkerTool$Wonderjs.prepareState(sandbox, /* tuple */[
                                11,
                                12,
                                13,
                                14
                              ]);
                          var match$1 = RenderBasicJobTool$Wonderjs.prepareGameObjectWithCreatedMap(sandbox, match[0]);
                          var map1 = match$1[5];
                          var match$2 = RenderBasicJobTool$Wonderjs.prepareGameObjectWithCreatedMap(sandbox, match$1[0]);
                          var map2 = match$2[5];
                          var source1 = BasicSourceTextureTool$Wonderjs.buildSource(100, 200);
                          var source2 = BasicSourceTextureTool$Wonderjs.buildSource(110, 210);
                          var state = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureSource(map1, source1, match$2[0]);
                          var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureSource(map2, source2, state);
                          var state$2 = WorkerWorkerTool$Wonderjs.setFakeWorkersAndSetState(state$1);
                          var match$3 = CameraTool$Wonderjs.createCameraGameObject(state$2);
                          var pixelStorei = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                          var state$3 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(pixelStorei), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$3[0]);
                          return /* tuple */[
                                  state$3,
                                  match[1],
                                  /* tuple */[
                                    11,
                                    12,
                                    13,
                                    14
                                  ],
                                  /* tuple */[
                                    match$1[1],
                                    match$2[1]
                                  ],
                                  /* tuple */[
                                    map1,
                                    map2
                                  ],
                                  /* tuple */[
                                    source1,
                                    source2
                                  ],
                                  /* tuple */[
                                    2,
                                    pixelStorei
                                  ]
                                ];
                        };
                        beforeAll((function () {
                                return Curry._1(BasicSourceTextureRenderWorkerTool$Wonderjs.buildFakeCreateImageBitmapFunc, /* () */0);
                              }));
                        afterAll((function () {
                                return Curry._1(BasicSourceTextureRenderWorkerTool$Wonderjs.clearFakeCreateImageBitmapFunc, /* () */0);
                              }));
                        describe("test for chrome", (function () {
                                return Wonder_jest.testPromise("not flip", (function () {
                                              var match = _prepare(/* () */0);
                                              var match$1 = match[6];
                                              var pixelStorei = match$1[1];
                                              var unpackFlipYWebgl = match$1[0];
                                              var match$2 = match[4];
                                              var state = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureFlipY(match$2[1], true, BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureFlipY(match$2[0], true, match[0]));
                                              BrowserDetectTool$Wonderjs.setChrome(/* () */0);
                                              return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function () {
                                                            return Promise.resolve(Sinon.toCalled(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](Sinon.withTwoArgs(unpackFlipYWebgl, true, pixelStorei)))));
                                                          }), state, sandbox, undefined, /* () */0);
                                            }));
                              }));
                        describe("test for firefox", (function () {
                                describe("set flipY", (function () {
                                        return Wonder_jest.testPromise("test", (function () {
                                                      var match = _prepare(/* () */0);
                                                      var match$1 = match[6];
                                                      var pixelStorei = match$1[1];
                                                      var unpackFlipYWebgl = match$1[0];
                                                      var match$2 = match[4];
                                                      var state = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureFlipY(match$2[1], false, BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureFlipY(match$2[0], true, match[0]));
                                                      BrowserDetectTool$Wonderjs.setFirefox(/* () */0);
                                                      return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function () {
                                                                    return Promise.resolve(Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withTwoArgs(unpackFlipYWebgl, true, pixelStorei))));
                                                                  }), state, sandbox, undefined, /* () */0);
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

export {
  
}
/*  Not a pure module */
