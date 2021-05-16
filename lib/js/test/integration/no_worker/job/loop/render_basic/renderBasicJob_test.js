'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var CameraTool$Wonderjs = require("../../../../../tool/service/camera/CameraTool.js");
var FakeGlTool$Wonderjs = require("../../../../../tool/gl/FakeGlTool.js");
var GeometryAPI$Wonderjs = require("../../../../../../src/api/geometry/GeometryAPI.js");
var DirectorTool$Wonderjs = require("../../../../../tool/core/DirectorTool.js");
var GeometryTool$Wonderjs = require("../../../../../tool/service/geometry/GeometryTool.js");
var TransformAPI$Wonderjs = require("../../../../../../src/api/TransformAPI.js");
var GameObjectAPI$Wonderjs = require("../../../../../../src/api/GameObjectAPI.js");
var MainStateTool$Wonderjs = require("../../../../../tool/service/state/MainStateTool.js");
var TransformTool$Wonderjs = require("../../../../../tool/service/transform/TransformTool.js");
var GLSLSenderTool$Wonderjs = require("../../../../../tool/service/sender/GLSLSenderTool.js");
var RenderGroupAPI$Wonderjs = require("../../../../../../src/api/group/render/RenderGroupAPI.js");
var RenderJobsTool$Wonderjs = require("../../../../../tool/job/no_worker/loop/RenderJobsTool.js");
var BoxGeometryTool$Wonderjs = require("../../../../../tool/service/geometry/BoxGeometryTool.js");
var MeshRendererAPI$Wonderjs = require("../../../../../../src/api/MeshRendererAPI.js");
var BasicMaterialAPI$Wonderjs = require("../../../../../../src/api/material/BasicMaterialAPI.js");
var GLSLLocationTool$Wonderjs = require("../../../../../tool/service/location/GLSLLocationTool.js");
var MeshRendererTool$Wonderjs = require("../../../../../tool/service/meshRenderer/MeshRendererTool.js");
var RenderBasicJobTool$Wonderjs = require("../../../../../tool/job/render_basic/RenderBasicJobTool.js");
var CreateRenderStateMainService$Wonderjs = require("../../../../../../src/service/state/main/render/CreateRenderStateMainService.js");
var PerspectiveCameraProjectionTool$Wonderjs = require("../../../../../tool/service/camera/PerspectiveCameraProjectionTool.js");
var RenderBasicForNoWorkerAndWorkerJobTool$Wonderjs = require("../../../../tool/job/RenderBasicForNoWorkerAndWorkerJobTool.js");

Wonder_jest.describe("test render basic job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = RenderJobsTool$Wonderjs.initWithJobConfig(sandbox, RenderBasicJobTool$Wonderjs.buildNoWorkerJobConfig(/* () */0));
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test meshRenderer->isRender", (function (param) {
                Wonder_jest.describe("if is false, not render", (function (param) {
                        return Wonder_jest.test("test not draw", (function (param) {
                                      var match = RenderBasicJobTool$Wonderjs.prepareForDrawElements(sandbox, state[0]);
                                      var state$1 = MeshRendererAPI$Wonderjs.setMeshRendererIsRender(match[2], false, match[0]);
                                      var drawElements = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                      var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(drawElements), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                      var state$3 = RenderJobsTool$Wonderjs.init(state$2);
                                      DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                                      return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](drawElements)));
                                    }));
                      }));
                return Wonder_jest.describe("else, render", (function (param) {
                              return Wonder_jest.test("test draw", (function (param) {
                                            var match = RenderBasicJobTool$Wonderjs.prepareForDrawElements(sandbox, state[0]);
                                            var meshRenderer = match[2];
                                            var state$1 = MeshRendererAPI$Wonderjs.setMeshRendererIsRender(meshRenderer, false, match[0]);
                                            var drawElements = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                            var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(drawElements), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                            var state$3 = RenderJobsTool$Wonderjs.init(state$2);
                                            var state$4 = DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                                            var state$5 = MeshRendererAPI$Wonderjs.setMeshRendererIsRender(meshRenderer, true, state$4);
                                            DirectorTool$Wonderjs.runWithDefaultTime(state$5);
                                            return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](drawElements));
                                          }));
                            }));
              }));
        Wonder_jest.describe("set render object gl state", (function (param) {
                var _prepare = function (sandbox, state) {
                  var match = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, state);
                  var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                  return /* tuple */[
                          match$1[0],
                          match[3]
                        ];
                };
                return Wonder_jest.describe("set isDepthTest", (function (param) {
                              Wonder_jest.test("if is depth test, enable depth test", (function (param) {
                                      var match = _prepare(sandbox, state[0]);
                                      var state$1 = BasicMaterialAPI$Wonderjs.setBasicMaterialIsDepthTest(match[1], true, match[0]);
                                      var enable = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                      var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(enable), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                      DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$2));
                                      return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withOneArg(1, enable)));
                                    }));
                              return Wonder_jest.test("else, disable depth test", (function (param) {
                                            var match = _prepare(sandbox, state[0]);
                                            var state$1 = BasicMaterialAPI$Wonderjs.setBasicMaterialIsDepthTest(match[1], false, match[0]);
                                            var disable = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                            var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(disable), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                            DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$2));
                                            return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withOneArg(1, disable)));
                                          }));
                            }));
              }));
        Wonder_jest.describe("use program", (function (param) {
                var _prepare = RenderBasicForNoWorkerAndWorkerJobTool$Wonderjs.prepareForUseProgramCase;
                Wonder_jest.test("test use", (function (param) {
                        var match = RenderJobsTool$Wonderjs.prepareForUseProgramCase(sandbox, _prepare, state[0]);
                        DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match[0]));
                        return Sinon.toCalledWith(/* array */[match[1]], Wonder_jest.Expect[/* expect */0](match[2]));
                      }));
                return Wonder_jest.test("if the program is already used, not use again", (function (param) {
                              var match = RenderJobsTool$Wonderjs.prepareForUseProgramCase(sandbox, _prepare, state[0]);
                              var state$1 = RenderJobsTool$Wonderjs.init(match[0]);
                              var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(state$1);
                              DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(match[2])), 1);
                            }));
              }));
        Wonder_jest.describe("send attribute data", (function (param) {
                var _prepare = function (sandbox, state) {
                  var match = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, state);
                  return CameraTool$Wonderjs.createCameraGameObject(match[0])[0];
                };
                Wonder_jest.describe("init vbo buffers when first send", (function (param) {
                        var _prepare = function (sandbox, state) {
                          var match = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, state);
                          var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                          return /* tuple */[
                                  match$1[0],
                                  match[2]
                                ];
                        };
                        Wonder_jest.test("create buffer", (function (param) {
                                var match = _prepare(sandbox, state[0]);
                                var createBuffer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createBuffer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(createBuffer)), 2);
                              }));
                        Wonder_jest.describe("init vertex buffer", (function (param) {
                                Wonder_jest.test("bufferData", (function (param) {
                                        var state$1 = state;
                                        var getBoxGeometryPointsFunc = BoxGeometryTool$Wonderjs.getBoxGeometryVertices;
                                        var match = _prepare(sandbox, state$1[0]);
                                        var bufferData = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                        var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(bufferData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                        var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$2));
                                        var points = Curry._1(getBoxGeometryPointsFunc, state$3);
                                        return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withThreeArgs(1, points, 2, bufferData)));
                                      }));
                                return Wonder_jest.test("bind buffer and unbind buffer", (function (param) {
                                              var match = _prepare(sandbox, state[0]);
                                              var createBuffer = Sinon.returns(10, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                              var bindBuffer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var bufferData = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(bindBuffer), undefined, Caml_option.some(createBuffer), Caml_option.some(bufferData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                              DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              Sinon.calledBefore(Sinon.withTwoArgs(1, 10, bindBuffer), bufferData),
                                                              Sinon.calledAfter(Sinon.withTwoArgs(1, null, bindBuffer), bufferData)
                                                            ]), /* tuple */[
                                                          true,
                                                          true
                                                        ]);
                                            }));
                              }));
                        return Wonder_jest.describe("init index buffer", (function (param) {
                                      Wonder_jest.describe("buffer data", (function (param) {
                                              Wonder_jest.test("test indices16", (function (param) {
                                                      var match = _prepare(sandbox, state[0]);
                                                      var bufferData = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                      var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(bufferData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                      var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                                      var indices = BoxGeometryTool$Wonderjs.getBoxGeometryIndices(state$2);
                                                      return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withThreeArgs(1, indices, 2, bufferData)));
                                                    }));
                                              return Wonder_jest.test("test indices32", (function (param) {
                                                            var match = _prepare(sandbox, state[0]);
                                                            var indices32 = new Uint32Array(/* array */[
                                                                  1,
                                                                  2,
                                                                  3
                                                                ]);
                                                            var state$1 = GeometryAPI$Wonderjs.setGeometryIndices32(match[1], indices32, match[0]);
                                                            var bufferData = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                            var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(bufferData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                                            DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$2));
                                                            return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withThreeArgs(1, indices32, 2, bufferData)));
                                                          }));
                                            }));
                                      return Wonder_jest.test("bind buffer and unbind buffer", (function (param) {
                                                    var match = _prepare(sandbox, state[0]);
                                                    var createBuffer = Sinon.returns(10, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                                    var bindBuffer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                    var bufferData = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                    var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 5, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(bindBuffer), undefined, Caml_option.some(createBuffer), Caml_option.some(bufferData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                    DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                    Sinon.calledBefore(Sinon.withTwoArgs(5, 10, bindBuffer), bufferData),
                                                                    Sinon.calledAfter(Sinon.withTwoArgs(5, null, bindBuffer), Sinon.withOneArg(5, bufferData))
                                                                  ]), /* tuple */[
                                                                true,
                                                                true
                                                              ]);
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("send buffer", (function (param) {
                              return Wonder_jest.describe("send a_position", (function (param) {
                                            Wonder_jest.test("bind array buffer", (function (param) {
                                                    var state$1 = _prepare(sandbox, state[0]);
                                                    var createBuffer = Sinon.returns(10, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                                    var bindBuffer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                    var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(bindBuffer), undefined, Caml_option.some(createBuffer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                                    DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$2));
                                                    return Sinon.toCalledWith(/* array */[
                                                                1,
                                                                10
                                                              ], Wonder_jest.Expect[/* expect */0](bindBuffer));
                                                  }));
                                            Wonder_jest.test("attach buffer to attribute", (function (param) {
                                                    var state$1 = _prepare(sandbox, state[0]);
                                                    var vertexAttribPointer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                    var getAttribLocation = GLSLLocationTool$Wonderjs.getAttribLocation(0, sandbox, "a_position");
                                                    var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getAttribLocation), undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(vertexAttribPointer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                                    DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$2));
                                                    return Sinon.toCalledWith(/* array */[
                                                                0,
                                                                3,
                                                                1,
                                                                false,
                                                                0,
                                                                0
                                                              ], Wonder_jest.Expect[/* expect */0](vertexAttribPointer));
                                                  }));
                                            return Wonder_jest.describe("enable attribute", (function (param) {
                                                          Wonder_jest.test("if already enabled since use this program, not enable", (function (param) {
                                                                  var state$1 = _prepare(sandbox, state[0]);
                                                                  var enableVertexAttribArray = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                  var getAttribLocation = GLSLLocationTool$Wonderjs.getAttribLocation(0, sandbox, "a_position");
                                                                  var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getAttribLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(enableVertexAttribArray), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                                                  var state$3 = RenderJobsTool$Wonderjs.init(state$2);
                                                                  var state$4 = DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                                                                  DirectorTool$Wonderjs.runWithDefaultTime(state$4);
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(0, enableVertexAttribArray))), 1);
                                                                }));
                                                          return Wonder_jest.test("else, enable", (function (param) {
                                                                        var state$1 = _prepare(sandbox, state[0]);
                                                                        var enableVertexAttribArray = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                        var getAttribLocation = GLSLLocationTool$Wonderjs.getAttribLocation(0, sandbox, "a_position");
                                                                        var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getAttribLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(enableVertexAttribArray), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                                                        var state$3 = RenderJobsTool$Wonderjs.init(state$2);
                                                                        var state$4 = DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                                                                        var state$5 = GLSLSenderTool$Wonderjs.disableVertexAttribArray(state$4);
                                                                        DirectorTool$Wonderjs.runWithDefaultTime(state$5);
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(0, enableVertexAttribArray))), 2);
                                                                      }));
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("send uniform data", (function (param) {
                var testSendShaderUniformMatrix4DataOnlyOnce = function (name, prepareSendUinformDataFunc) {
                  return RenderJobsTool$Wonderjs.testSendShaderUniformMatrix4DataOnlyOnce(sandbox, name, /* tuple */[
                              prepareSendUinformDataFunc,
                              RenderBasicJobTool$Wonderjs.prepareGameObject
                            ], state);
                };
                GLSLSenderTool$Wonderjs.JudgeSendUniformData[/* testSendMatrix4 */1](sandbox, "u_mMatrix", (function (gameObjectTransform, cameraTransform, param, state) {
                        return TransformAPI$Wonderjs.setTransformLocalPosition(gameObjectTransform, /* tuple */[
                                    1,
                                    2,
                                    3
                                  ], state);
                      }), new Float32Array(/* array */[
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
                        ]), RenderBasicJobTool$Wonderjs.prepareGameObject, (function (prepareSendUniformData) {
                        Wonder_jest.test("if not do any transform operation, should still send identity matrix value on the first send", (function (param) {
                                var match = Curry._3(prepareSendUniformData, sandbox, RenderBasicJobTool$Wonderjs.prepareGameObject, state[0]);
                                var uniformMatrix4fv = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_mMatrix");
                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(uniformMatrix4fv), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                return Sinon.toCalledWith(/* array */[
                                            0,
                                            false,
                                            TransformTool$Wonderjs.getDefaultLocalToWorldMatrixTypeArray(state$2)
                                          ], Wonder_jest.Expect[/* expect */0](uniformMatrix4fv));
                              }));
                        return Wonder_jest.describe("test two gameObjects", (function (param) {
                                      return Wonder_jest.test("if only set first one's transform, second one's sended u_mMatrix data shouldn't be affect", (function (param) {
                                                    var match = Curry._3(prepareSendUniformData, sandbox, RenderBasicJobTool$Wonderjs.prepareGameObject, state[0]);
                                                    var match$1 = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, match[0]);
                                                    var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(match[2][0], /* tuple */[
                                                          1,
                                                          2,
                                                          3
                                                        ], match$1[0]);
                                                    var uniformMatrix4fv = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                    var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_mMatrix");
                                                    var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(uniformMatrix4fv), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                                    var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$2));
                                                    return Sinon.toCalledWith(/* array */[
                                                                0,
                                                                false,
                                                                TransformTool$Wonderjs.getDefaultLocalToWorldMatrixTypeArray(state$3)
                                                              ], Wonder_jest.Expect[/* expect */0](Sinon.getCall(1, Sinon.withOneArg(0, uniformMatrix4fv))));
                                                  }));
                                    }));
                      }), /* () */0);
                GLSLSenderTool$Wonderjs.JudgeSendUniformData[/* testSendMatrix4 */1](sandbox, "u_vMatrix", (function (gameObjectTransform, cameraTransform, param, state) {
                        return TransformAPI$Wonderjs.setTransformLocalPosition(cameraTransform, /* tuple */[
                                    10,
                                    2,
                                    3
                                  ], state);
                      }), new Float32Array(/* array */[
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
                          -10,
                          -2,
                          -3,
                          1
                        ]), RenderBasicJobTool$Wonderjs.prepareGameObject, (function (prepareSendUniformData) {
                        return testSendShaderUniformMatrix4DataOnlyOnce("u_vMatrix", prepareSendUniformData);
                      }), /* () */0);
                GLSLSenderTool$Wonderjs.JudgeSendUniformData[/* testSendMatrix4 */1](sandbox, "u_pMatrix", (function (gameObjectTransform, cameraTransform, basicCameraView, state) {
                        return state;
                      }), PerspectiveCameraProjectionTool$Wonderjs.getPMatrixOfCreateBasicCameraViewPerspectiveCamera(/* () */0), RenderBasicJobTool$Wonderjs.prepareGameObject, (function (prepareSendUniformData) {
                        return testSendShaderUniformMatrix4DataOnlyOnce("u_pMatrix", prepareSendUniformData);
                      }), /* () */0);
                return GLSLSenderTool$Wonderjs.JudgeSendUniformData[/* testSendVector3 */4](sandbox, "u_color", (function (param, param$1, param$2, state) {
                              return BasicMaterialAPI$Wonderjs.setBasicMaterialColor(param$1[1], /* array */[
                                          0,
                                          1,
                                          0.2
                                        ], state);
                            }), /* :: */[
                            0,
                            /* :: */[
                              1,
                              /* :: */[
                                0.20000000298023224,
                                /* [] */0
                              ]
                            ]
                          ], RenderBasicJobTool$Wonderjs.prepareGameObject, (function (prepareSendUniformData) {
                              return Wonder_jest.describe("test two gameObjects", (function (param) {
                                            return Wonder_jest.test("if only set first one's color, second one's sended u_color record shouldn't be affect", (function (param) {
                                                          var match = Curry._3(prepareSendUniformData, sandbox, RenderBasicJobTool$Wonderjs.prepareGameObject, state[0]);
                                                          var match$1 = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, match[0]);
                                                          var state$1 = BasicMaterialAPI$Wonderjs.setBasicMaterialColor(match[2][1], /* array */[
                                                                0,
                                                                1,
                                                                0.2
                                                              ], match$1[0]);
                                                          var uniform3f = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                          var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_color");
                                                          var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(uniform3f), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                                          DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$2));
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getArgs(Sinon.getCall(1, Sinon.withOneArg(0, uniform3f)))), /* :: */[
                                                                      0,
                                                                      /* :: */[
                                                                        1,
                                                                        /* :: */[
                                                                          1,
                                                                          /* :: */[
                                                                            1,
                                                                            /* [] */0
                                                                          ]
                                                                        ]
                                                                      ]
                                                                    ]);
                                                        }));
                                          }));
                            }), /* () */0);
              }));
        Wonder_jest.describe("draw", (function (param) {
                return Wonder_jest.describe("if geometry has index buffer, bind index buffer and drawElements", (function (param) {
                              Wonder_jest.describe("bind index buffer", (function (param) {
                                      return /* () */0;
                                    }));
                              return Wonder_jest.describe("drawElements", (function (param) {
                                            Wonder_jest.test("test drawMode", (function (param) {
                                                    var match = RenderBasicJobTool$Wonderjs.prepareForDrawElements(sandbox, state[0]);
                                                    var state$1 = MeshRendererAPI$Wonderjs.setMeshRendererDrawMode(match[2], MeshRendererTool$Wonderjs.getLines(/* () */0), match[0]);
                                                    var drawElements = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                    var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(drawElements), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                                    var state$3 = RenderJobsTool$Wonderjs.init(state$2);
                                                    DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                                                    return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withOneArg(1, drawElements)));
                                                  }));
                                            return Wonder_jest.describe("test draw indices", (function (param) {
                                                          Wonder_jest.test("test indices16", (function (param) {
                                                                  var match = RenderBasicJobTool$Wonderjs.prepareForDrawElements(sandbox, state[0]);
                                                                  var drawElements = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                  var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(drawElements), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                                  var state$2 = RenderJobsTool$Wonderjs.init(state$1);
                                                                  var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                                                  return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withFourArgs(1, GeometryTool$Wonderjs.getIndicesCount(match[1], CreateRenderStateMainService$Wonderjs.createRenderState(state$3)), 2, Caml_int32.imul(GeometryTool$Wonderjs.getIndexTypeSize(CreateRenderStateMainService$Wonderjs.createRenderState(state$3)), 0), drawElements)));
                                                                }));
                                                          return Wonder_jest.test("test indices32", (function (param) {
                                                                        var match = RenderBasicJobTool$Wonderjs.prepareForDrawElements(sandbox, state[0]);
                                                                        var geometry = match[1];
                                                                        var state$1 = GeometryAPI$Wonderjs.setGeometryIndices32(geometry, new Uint32Array(/* array */[
                                                                                  1,
                                                                                  2,
                                                                                  3
                                                                                ]), match[0]);
                                                                        var drawElements = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                        var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(drawElements), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                                                        var state$3 = RenderJobsTool$Wonderjs.init(state$2);
                                                                        var state$4 = DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                                                                        return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withFourArgs(1, GeometryTool$Wonderjs.getIndicesCount(geometry, CreateRenderStateMainService$Wonderjs.createRenderState(state$4)), 2, 0, drawElements)));
                                                                      }));
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("if has no camera gameObject, not render", (function (param) {
                var _prepareGl = function (state) {
                  var drawElements = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                  var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(drawElements), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
                  return /* tuple */[
                          state$1,
                          drawElements
                        ];
                };
                return Wonder_jest.test("test", (function (param) {
                              var match = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, state[0]);
                              var match$1 = _prepareGl(match[0]);
                              DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match$1[0]));
                              return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](match$1[1])));
                            }));
              }));
        return Wonder_jest.describe("fix bug", (function (param) {
                      var _createGameObjectHasNoGeometry = function (sandbox, state) {
                        var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state);
                        var match$1 = MeshRendererAPI$Wonderjs.createMeshRenderer(match[0]);
                        var match$2 = GameObjectAPI$Wonderjs.createGameObject(match$1[0]);
                        var gameObject = match$2[1];
                        var state$1 = GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent(gameObject, match$1[1], GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject, match[1], match$2[0]));
                        return /* tuple */[
                                state$1,
                                gameObject
                              ];
                      };
                      var _prepareGameObjectHasNoGeometry = function (sandbox, state) {
                        var match = _createGameObjectHasNoGeometry(sandbox, state);
                        return CameraTool$Wonderjs.createCameraGameObject(match[0])[0];
                      };
                      var _prepareGl = function (state) {
                        var uniform3f = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_color");
                        var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(uniform3f), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
                        return /* tuple */[
                                state$1,
                                0,
                                uniform3f
                              ];
                      };
                      Wonder_jest.describe("if gameObject has no geometry component, not render", (function (param) {
                              Wonder_jest.test("test one gameObject", (function (param) {
                                      var state$1 = _prepareGameObjectHasNoGeometry(sandbox, state[0]);
                                      var match = _prepareGl(state$1);
                                      DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match[0]));
                                      return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](Sinon.withOneArg(match[1], match[2]))));
                                    }));
                              return Wonder_jest.test("should still render other gameObjects has geometry component", (function (param) {
                                            var state$1 = _prepareGameObjectHasNoGeometry(sandbox, state[0]);
                                            var match = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, state$1);
                                            var state$2 = BasicMaterialAPI$Wonderjs.setBasicMaterialColor(match[3], /* array */[
                                                  1,
                                                  0,
                                                  0
                                                ], match[0]);
                                            var match$1 = _prepareGl(state$2);
                                            var uniform3f = match$1[2];
                                            var pos = match$1[1];
                                            DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match$1[0]));
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            Sinon.getCallCount(Sinon.withOneArg(pos, uniform3f)),
                                                            Sinon.getCallCount(Sinon.withFourArgs(pos, 1, 0, 0, uniform3f))
                                                          ]), /* tuple */[
                                                        1,
                                                        1
                                                      ]);
                                          }));
                            }));
                      return Wonder_jest.describe("remove old renderGroup;\n          add new renderGroup;\n\n          test send u_color\n      ", (function (param) {
                                    return Wonder_jest.test("test if cached, only send once", (function (param) {
                                                  var match = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, state[0]);
                                                  var gameObject1 = match[1];
                                                  var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                                                  var match$2 = _prepareGl(match$1[0]);
                                                  var state$1 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match$2[0]));
                                                  var state$2 = RenderGroupAPI$Wonderjs.disposeGameObjectRenderGroupComponents(gameObject1, /* record */[
                                                        /* meshRenderer */match[4],
                                                        /* material */match[3]
                                                      ], /* tuple */[
                                                        GameObjectAPI$Wonderjs.disposeGameObjectMeshRendererComponent,
                                                        GameObjectAPI$Wonderjs.disposeGameObjectBasicMaterialComponent
                                                      ], state$1);
                                                  var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                                  var match$3 = RenderGroupAPI$Wonderjs.createRenderGroup(/* tuple */[
                                                        MeshRendererAPI$Wonderjs.createMeshRenderer,
                                                        BasicMaterialAPI$Wonderjs.createBasicMaterial
                                                      ], state$3);
                                                  var state$4 = RenderGroupAPI$Wonderjs.addGameObjectRenderGroupComponents(gameObject1, match$3[1], /* tuple */[
                                                        GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent,
                                                        GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent
                                                      ], match$3[0]);
                                                  var state$5 = GameObjectAPI$Wonderjs.initGameObject(gameObject1, state$4);
                                                  DirectorTool$Wonderjs.runWithDefaultTime(state$5);
                                                  return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withOneArg(match$2[1], match$2[2])));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
