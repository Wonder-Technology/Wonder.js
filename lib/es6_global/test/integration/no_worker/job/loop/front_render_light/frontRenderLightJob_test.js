

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_int32 from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as Wonder_jest from "../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as Js_primitive from "../../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as SceneAPI$Wonderjs from "../../../../../../src/api/SceneAPI.js";
import * as SinonTool$Wonderjs from "../../../tool/sinon/SinonTool.js";
import * as CameraTool$Wonderjs from "../../../../../tool/service/camera/CameraTool.js";
import * as FakeGlTool$Wonderjs from "../../../../../tool/gl/FakeGlTool.js";
import * as GeometryAPI$Wonderjs from "../../../../../../src/api/geometry/GeometryAPI.js";
import * as ArrayService$Wonderjs from "../../../../../../src/service/atom/ArrayService.js";
import * as DirectorTool$Wonderjs from "../../../../../tool/core/DirectorTool.js";
import * as GeometryTool$Wonderjs from "../../../../../tool/service/geometry/GeometryTool.js";
import * as TransformAPI$Wonderjs from "../../../../../../src/api/TransformAPI.js";
import * as GameObjectAPI$Wonderjs from "../../../../../../src/api/GameObjectAPI.js";
import * as MainStateTool$Wonderjs from "../../../../../tool/service/state/MainStateTool.js";
import * as PointLightAPI$Wonderjs from "../../../../../../src/api/light/PointLightAPI.js";
import * as GLSLSenderTool$Wonderjs from "../../../../../tool/service/sender/GLSLSenderTool.js";
import * as GameObjectTool$Wonderjs from "../../../../../tool/service/gameObject/GameObjectTool.js";
import * as PointLightTool$Wonderjs from "../../../../../tool/service/light/PointLightTool.js";
import * as RenderJobsTool$Wonderjs from "../../../../../tool/job/no_worker/loop/RenderJobsTool.js";
import * as BoxGeometryTool$Wonderjs from "../../../../../tool/service/geometry/BoxGeometryTool.js";
import * as MeshRendererAPI$Wonderjs from "../../../../../../src/api/MeshRendererAPI.js";
import * as GLSLLocationTool$Wonderjs from "../../../../../tool/service/location/GLSLLocationTool.js";
import * as LightMaterialAPI$Wonderjs from "../../../../../../src/api/material/LightMaterialAPI.js";
import * as MeshRendererTool$Wonderjs from "../../../../../tool/service/meshRenderer/MeshRendererTool.js";
import * as DirectionLightAPI$Wonderjs from "../../../../../../src/api/light/DirectionLightAPI.js";
import * as LightMaterialTool$Wonderjs from "../../../../../tool/service/material/LightMaterialTool.js";
import * as LoopRenderJobTool$Wonderjs from "../../../../../tool/job/no_worker/loop/LoopRenderJobTool.js";
import * as DirectionLightTool$Wonderjs from "../../../../../tool/service/light/DirectionLightTool.js";
import * as RenderBasicJobTool$Wonderjs from "../../../../../tool/job/render_basic/RenderBasicJobTool.js";
import * as BasicSourceTextureAPI$Wonderjs from "../../../../../../src/api/texture/BasicSourceTextureAPI.js";
import * as BasicSourceTextureTool$Wonderjs from "../../../../../tool/service/texture/BasicSourceTextureTool.js";
import * as FrontRenderLightJobTool$Wonderjs from "../../../../../tool/job/no_worker/loop/FrontRenderLightJobTool.js";
import * as CreateRenderStateMainService$Wonderjs from "../../../../../../src/service/state/main/render/CreateRenderStateMainService.js";
import * as PerspectiveCameraProjectionTool$Wonderjs from "../../../../../tool/service/camera/PerspectiveCameraProjectionTool.js";
import * as FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs from "../../../../tool/job/FrontRenderLightForNoWorkerAndWorkerJobTool.js";

describe("test front render light job", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = RenderJobsTool$Wonderjs.initWithJobConfig(sandbox, LoopRenderJobTool$Wonderjs.buildNoWorkerJobConfig(/* () */0));
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("use program", (function () {
                var _prepare = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.prepareForUseProgramCase;
                Wonder_jest.test("test use", (function () {
                        var match = RenderJobsTool$Wonderjs.prepareForUseProgramCase(sandbox, _prepare, state[0]);
                        DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match[0]));
                        return Sinon.toCalledWith(/* array */[match[1]], Wonder_jest.Expect[/* expect */0](match[2]));
                      }));
                return Wonder_jest.test("if the program is already used, not use again", (function () {
                              var match = RenderJobsTool$Wonderjs.prepareForUseProgramCase(sandbox, _prepare, state[0]);
                              var state$1 = RenderJobsTool$Wonderjs.init(match[0]);
                              var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(state$1);
                              DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(match[2])), 1);
                            }));
              }));
        describe("send attribute data", (function () {
                var _prepare = function (sandbox, state) {
                  var match = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, state);
                  return CameraTool$Wonderjs.createCameraGameObject(match[0])[0];
                };
                var _prepareWithMap = function (sandbox, state) {
                  var match = FrontRenderLightJobTool$Wonderjs.prepareGameObjectWithCreatedMap(sandbox, state);
                  return CameraTool$Wonderjs.createCameraGameObject(match[0])[0];
                };
                describe("init vbo buffers when first send", (function () {
                        var _prepare = function (sandbox, state) {
                          var match = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, state);
                          var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                          return /* tuple */[
                                  match$1[0],
                                  match[2]
                                ];
                        };
                        var _prepareWithMap = function (sandbox, state) {
                          var match = FrontRenderLightJobTool$Wonderjs.prepareGameObjectWithCreatedMap(sandbox, state);
                          var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                          return /* tuple */[
                                  match$1[0],
                                  match[2]
                                ];
                        };
                        var _prepareForBufferData = function (state, param) {
                          var match = Curry._2(param[1], sandbox, state[0]);
                          var bufferData = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                          var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(bufferData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                          var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                          var points = Curry._1(param[0], state$2);
                          return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withThreeArgs(1, points, 2, bufferData)));
                        };
                        Wonder_jest.test("create buffers", (function () {
                                var match = _prepare(sandbox, state[0]);
                                var createBuffer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(createBuffer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(createBuffer)), 3);
                              }));
                        describe("init vertex buffer", (function () {
                                Wonder_jest.test("bufferData", (function () {
                                        return _prepareForBufferData(state, /* tuple */[
                                                    BoxGeometryTool$Wonderjs.getBoxGeometryVertices,
                                                    _prepare
                                                  ]);
                                      }));
                                return Wonder_jest.test("bind buffer and unbind buffer", (function () {
                                              var match = _prepare(sandbox, state[0]);
                                              var createBuffer = Sinon.returns(10, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                              var bindBuffer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var bufferData = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(bindBuffer), undefined, Js_primitive.some(createBuffer), Js_primitive.some(bufferData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                              DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              Sinon.calledBefore(Sinon.withTwoArgs(1, 10, bindBuffer), bufferData),
                                                              Sinon.calledAfter(Sinon.withTwoArgs(1, null, bindBuffer), bufferData)
                                                            ]), /* tuple */[
                                                          true,
                                                          true
                                                        ]);
                                            }));
                              }));
                        describe("init texCoord buffer", (function () {
                                return Wonder_jest.test("bufferData", (function () {
                                              return _prepareForBufferData(state, /* tuple */[
                                                          BoxGeometryTool$Wonderjs.getBoxGeometryTexCoords,
                                                          _prepareWithMap
                                                        ]);
                                            }));
                              }));
                        describe("init normal buffer", (function () {
                                describe("bufferData", (function () {
                                        Wonder_jest.test("boxGeometry", (function () {
                                                return _prepareForBufferData(state, /* tuple */[
                                                            BoxGeometryTool$Wonderjs.getBoxGeometryNormals,
                                                            _prepareWithMap
                                                          ]);
                                              }));
                                        describe("test geometry", (function () {
                                                describe("if not has normals", (function () {
                                                        var _prepare = function (sandbox, state) {
                                                          var match = GeometryAPI$Wonderjs.createGeometry(state);
                                                          var geometry = match[1];
                                                          var state$1 = GeometryAPI$Wonderjs.setGeometryIndices(geometry, new Uint16Array(/* array */[
                                                                    0,
                                                                    2,
                                                                    1,
                                                                    2,
                                                                    3,
                                                                    1
                                                                  ]), GeometryAPI$Wonderjs.setGeometryVertices(geometry, new Float32Array(/* array */[
                                                                        1,
                                                                        -1,
                                                                        0,
                                                                        0,
                                                                        1,
                                                                        0,
                                                                        0,
                                                                        0,
                                                                        1,
                                                                        2,
                                                                        3,
                                                                        -2
                                                                      ]), match[0]));
                                                          var match$1 = FrontRenderLightJobTool$Wonderjs.prepareGameObjectWithSharedGeometry(sandbox, geometry, GameObjectAPI$Wonderjs.addGameObjectGeometryComponent, state$1);
                                                          var match$2 = CameraTool$Wonderjs.createCameraGameObject(match$1[0]);
                                                          return /* tuple */[
                                                                  match$2[0],
                                                                  match$1[2]
                                                                ];
                                                        };
                                                        var _getComputedNormals = function () {
                                                          return new Float32Array(/* array */[
                                                                      -0.8164966106414795,
                                                                      -0.40824830532073975,
                                                                      -0.40824830532073975,
                                                                      -0.8164966106414795,
                                                                      0.40824830532073975,
                                                                      0.40824830532073975,
                                                                      -0.8164966106414795,
                                                                      0.40824830532073975,
                                                                      0.40824830532073975,
                                                                      0,
                                                                      0.7071067690849304,
                                                                      0.7071067690849304
                                                                    ]);
                                                        };
                                                        describe("compute vertex normals", (function () {
                                                                var _prepareIndices32 = function (sandbox, state) {
                                                                  var match = GeometryAPI$Wonderjs.createGeometry(state);
                                                                  var geometry = match[1];
                                                                  var state$1 = GeometryAPI$Wonderjs.setGeometryIndices32(geometry, new Uint32Array(/* array */[
                                                                            0,
                                                                            2,
                                                                            1,
                                                                            2,
                                                                            3,
                                                                            1
                                                                          ]), GeometryAPI$Wonderjs.setGeometryVertices(geometry, new Float32Array(/* array */[
                                                                                1,
                                                                                -1,
                                                                                0,
                                                                                0,
                                                                                1,
                                                                                0,
                                                                                0,
                                                                                0,
                                                                                1,
                                                                                2,
                                                                                3,
                                                                                -2
                                                                              ]), match[0]));
                                                                  var match$1 = FrontRenderLightJobTool$Wonderjs.prepareGameObjectWithSharedGeometry(sandbox, geometry, GameObjectAPI$Wonderjs.addGameObjectGeometryComponent, state$1);
                                                                  var match$2 = CameraTool$Wonderjs.createCameraGameObject(match$1[0]);
                                                                  return /* tuple */[
                                                                          match$2[0],
                                                                          match$1[2]
                                                                        ];
                                                                };
                                                                Wonder_jest.test("test indices16", (function () {
                                                                        return _prepareForBufferData(state, /* tuple */[
                                                                                    (function () {
                                                                                        return _getComputedNormals(/* () */0);
                                                                                      }),
                                                                                    _prepare
                                                                                  ]);
                                                                      }));
                                                                return Wonder_jest.test("test indices32", (function () {
                                                                              return _prepareForBufferData(state, /* tuple */[
                                                                                          (function () {
                                                                                              return _getComputedNormals(/* () */0);
                                                                                            }),
                                                                                          _prepareIndices32
                                                                                        ]);
                                                                            }));
                                                              }));
                                                        return Wonder_jest.test("only buffer data once", (function () {
                                                                      var match = _prepare(sandbox, state[0]);
                                                                      var bufferData = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                      var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(bufferData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                                      var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                                                      DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                                                      var points = _getComputedNormals(/* () */0);
                                                                      return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withThreeArgs(1, points, 2, bufferData)));
                                                                    }));
                                                      }));
                                                describe("else", (function () {
                                                        return Wonder_jest.test("test", (function () {
                                                                      return _prepareForBufferData(state, /* tuple */[
                                                                                  BoxGeometryTool$Wonderjs.getBoxGeometryVertices,
                                                                                  _prepare
                                                                                ]);
                                                                    }));
                                                      }));
                                                return /* () */0;
                                              }));
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        describe("init index buffer", (function () {
                                Wonder_jest.test("bufferData", (function () {
                                        var match = _prepare(sandbox, state[0]);
                                        var bufferData = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                        var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(bufferData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                        var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                        var indices = BoxGeometryTool$Wonderjs.getBoxGeometryIndices(state$2);
                                        return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withThreeArgs(1, indices, 2, bufferData)));
                                      }));
                                return Wonder_jest.test("bind buffer and unbind buffer", (function () {
                                              var match = _prepare(sandbox, state[0]);
                                              var createBuffer = Sinon.returns(10, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                              var bindBuffer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var bufferData = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 5, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(bindBuffer), undefined, Js_primitive.some(createBuffer), Js_primitive.some(bufferData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                              DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              Sinon.calledBefore(Sinon.withTwoArgs(5, 10, bindBuffer), bufferData),
                                                              Sinon.calledAfter(Sinon.withTwoArgs(5, null, bindBuffer), Sinon.withOneArg(5, bufferData))
                                                            ]), /* tuple */[
                                                          true,
                                                          true
                                                        ]);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("send buffer", (function () {
                        describe("send a_position", (function () {
                                return Wonder_jest.test("attach buffer to attribute", (function () {
                                              var state$1 = _prepare(sandbox, state[0]);
                                              var vertexAttribPointer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var getAttribLocation = GLSLLocationTool$Wonderjs.getAttribLocation(0, sandbox, "a_position");
                                              var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getAttribLocation), undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(vertexAttribPointer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
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
                              }));
                        describe("send a_texCoord", (function () {
                                return Wonder_jest.test("attach buffer to attribute", (function () {
                                              var state$1 = _prepareWithMap(sandbox, state[0]);
                                              var vertexAttribPointer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var getAttribLocation = GLSLLocationTool$Wonderjs.getAttribLocation(0, sandbox, "a_texCoord");
                                              var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getAttribLocation), undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(vertexAttribPointer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                              DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$2));
                                              return Sinon.toCalledWith(/* array */[
                                                          0,
                                                          2,
                                                          1,
                                                          false,
                                                          0,
                                                          0
                                                        ], Wonder_jest.Expect[/* expect */0](vertexAttribPointer));
                                            }));
                              }));
                        describe("send a_normal", (function () {
                                return Wonder_jest.test("attach buffer to attribute", (function () {
                                              var state$1 = _prepare(sandbox, state[0]);
                                              var vertexAttribPointer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var createBuffer = SinonTool$Wonderjs.returnDifferentOnEachCall(Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                              var getAttribLocation = GLSLLocationTool$Wonderjs.getAttribLocation(0, sandbox, "a_normal");
                                              var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getAttribLocation), undefined, undefined, undefined, Js_primitive.some(createBuffer), undefined, undefined, Js_primitive.some(vertexAttribPointer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
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
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("send uniform data", (function () {
                var _prepare = function (sandbox, state) {
                  var match = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, state);
                  var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                  return /* tuple */[
                          match$1[0],
                          match[1],
                          match[3],
                          match$1[2]
                        ];
                };
                describe("test sended data per shader", (function () {
                        var testSendShaderUniformMatrix4DataOnlyOnce = function (name, prepareSendUinformDataFunc) {
                          return RenderJobsTool$Wonderjs.testSendShaderUniformMatrix4DataOnlyOnce(sandbox, name, /* tuple */[
                                      prepareSendUinformDataFunc,
                                      FrontRenderLightJobTool$Wonderjs.prepareGameObject
                                    ], state);
                        };
                        GLSLSenderTool$Wonderjs.JudgeSendUniformData[/* testSendMatrix4 */1](sandbox, "u_vMatrix", (function (_, cameraTransform, _$1, state) {
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
                                ]), FrontRenderLightJobTool$Wonderjs.prepareGameObject, (function (prepareSendUniformData) {
                                return testSendShaderUniformMatrix4DataOnlyOnce("u_vMatrix", prepareSendUniformData);
                              }), /* () */0);
                        GLSLSenderTool$Wonderjs.JudgeSendUniformData[/* testSendMatrix4 */1](sandbox, "u_pMatrix", (function (_, _$1, _$2, state) {
                                return state;
                              }), PerspectiveCameraProjectionTool$Wonderjs.getPMatrixOfCreateBasicCameraViewPerspectiveCamera(/* () */0), FrontRenderLightJobTool$Wonderjs.prepareGameObject, (function (prepareSendUniformData) {
                                return testSendShaderUniformMatrix4DataOnlyOnce("u_pMatrix", prepareSendUniformData);
                              }), /* () */0);
                        GLSLSenderTool$Wonderjs.JudgeSendUniformData[/* testSendVector3 */4](sandbox, "u_cameraPos", (function (_, _$1, param, state) {
                                return TransformAPI$Wonderjs.setTransformLocalPosition(param[0], /* tuple */[
                                            10,
                                            2,
                                            3
                                          ], state);
                              }), /* :: */[
                              10,
                              /* :: */[
                                2,
                                /* :: */[
                                  3,
                                  /* [] */0
                                ]
                              ]
                            ], FrontRenderLightJobTool$Wonderjs.prepareGameObject, (function (prepareSendUniformData) {
                                var name = "u_cameraPos";
                                var prepareSendUinformDataFunc = prepareSendUniformData;
                                return RenderJobsTool$Wonderjs.testSendShaderUniformVec3DataOnlyOnce(sandbox, name, /* tuple */[
                                            prepareSendUinformDataFunc,
                                            FrontRenderLightJobTool$Wonderjs.prepareGameObject
                                          ], state);
                              }), /* () */0);
                        describe("test send light data", (function () {
                                describe("test send ambient light data", (function () {
                                        var _setFakeGl = function (sandbox, state) {
                                          var uniform3f = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                          var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_ambient");
                                          var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(uniform3f), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
                                          return /* tuple */[
                                                  state$1,
                                                  0,
                                                  uniform3f
                                                ];
                                        };
                                        Wonder_jest.test("send u_ambient", (function () {
                                                var match = _prepare(sandbox, state[0]);
                                                var state$1 = SceneAPI$Wonderjs.setAmbientLightColor(/* array */[
                                                      1,
                                                      0,
                                                      0.5
                                                    ], match[0]);
                                                var match$1 = _setFakeGl(sandbox, state$1);
                                                DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match$1[0]));
                                                return Sinon.toCalledWith(/* array */[
                                                            match$1[1],
                                                            1,
                                                            0,
                                                            0.5
                                                          ], Wonder_jest.Expect[/* expect */0](match$1[2]));
                                              }));
                                        return Wonder_jest.test("send shader record only once", (function () {
                                                      var match = _prepare(sandbox, state[0]);
                                                      var match$1 = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, match[0]);
                                                      var state$1 = SceneAPI$Wonderjs.setAmbientLightColor(/* array */[
                                                            1,
                                                            0,
                                                            0.5
                                                          ], match$1[0]);
                                                      var match$2 = _setFakeGl(sandbox, state$1);
                                                      DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match$2[0]));
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(match$2[1], match$2[2]))), 1);
                                                    }));
                                      }));
                                describe("test send direction light data", (function () {
                                        var _prepareFour = function (sandbox, state) {
                                          var match = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, state);
                                          var match$1 = DirectionLightTool$Wonderjs.createGameObject(match[0]);
                                          var match$2 = DirectionLightTool$Wonderjs.createGameObject(match$1[0]);
                                          var match$3 = DirectionLightTool$Wonderjs.createGameObject(match$2[0]);
                                          var match$4 = DirectionLightTool$Wonderjs.createGameObject(match$3[0]);
                                          var match$5 = CameraTool$Wonderjs.createCameraGameObject(match$4[0]);
                                          return /* tuple */[
                                                  match$5[0],
                                                  /* tuple */[
                                                    match$1[1],
                                                    match$2[1],
                                                    match$3[1],
                                                    match$4[1]
                                                  ],
                                                  match[3],
                                                  /* tuple */[
                                                    match$1[2],
                                                    match$2[2],
                                                    match$3[2],
                                                    match$4[2]
                                                  ],
                                                  match$5[2]
                                                ];
                                        };
                                        describe("send structure data", (function () {
                                                Wonder_jest.test("if light's isRender === false, not send its data", (function () {
                                                        var match = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.prepareOneForDirectionLight(sandbox, state[0]);
                                                        var match$1 = DirectionLightTool$Wonderjs.createGameObject(match[0]);
                                                        var state$1 = DirectionLightAPI$Wonderjs.setDirectionLightIsRender(match[3], false, match$1[0]);
                                                        var match$2 = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.setFakeGlForLight(sandbox, /* array */[
                                                              "u_directionLights[0].direction",
                                                              "u_directionLights[1].direction"
                                                            ], state$1);
                                                        var uniform3f = match$2[2][1];
                                                        var posArr = match$2[1];
                                                        var state$2 = RenderJobsTool$Wonderjs.init(match$2[0]);
                                                        DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                        Sinon.getCallCount(Sinon.withOneArg(Caml_array.caml_array_get(posArr, 0), uniform3f)),
                                                                        Sinon.getCallCount(Sinon.withOneArg(Caml_array.caml_array_get(posArr, 1), uniform3f))
                                                                      ]), /* tuple */[
                                                                    1,
                                                                    0
                                                                  ]);
                                                      }));
                                                describe("send direction", (function () {
                                                        describe("fix bug", (function () {
                                                                return Wonder_jest.test("test dispose first light gameObject", (function () {
                                                                              var match = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.prepareOneForDirectionLight(sandbox, state[0]);
                                                                              var lightGameObject1 = match[1];
                                                                              var match$1 = DirectionLightTool$Wonderjs.createGameObject(match[0]);
                                                                              var state$1 = match$1[0];
                                                                              var state$2 = TransformAPI$Wonderjs.setTransformLocalEulerAngles(GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(lightGameObject1, state$1), /* tuple */[
                                                                                    45,
                                                                                    1,
                                                                                    0
                                                                                  ], state$1);
                                                                              var state$3 = TransformAPI$Wonderjs.setTransformLocalEulerAngles(GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(match$1[1], state$2), /* tuple */[
                                                                                    1,
                                                                                    4,
                                                                                    3
                                                                                  ], state$2);
                                                                              var match$2 = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.setFakeGlForLight(sandbox, /* array */["u_directionLights[0].direction"], state$3);
                                                                              var state$4 = RenderJobsTool$Wonderjs.init(match$2[0]);
                                                                              var state$5 = GameObjectTool$Wonderjs.disposeGameObject(lightGameObject1, state$4);
                                                                              DirectorTool$Wonderjs.runWithDefaultTime(state$5);
                                                                              return Sinon.toCalledWith(/* array */[
                                                                                          Caml_array.caml_array_get(match$2[1], 0),
                                                                                          0.07056365849307426,
                                                                                          -0.01377827256865152,
                                                                                          0.997412116116255
                                                                                        ], Wonder_jest.Expect[/* expect */0](match$2[2][1]));
                                                                            }));
                                                              }));
                                                        describe("convert rotation to direction vector3", (function () {
                                                                Wonder_jest.test("test one light", (function () {
                                                                        var match = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.prepareOneForDirectionLight(sandbox, state[0]);
                                                                        var state$1 = match[0];
                                                                        var state$2 = TransformAPI$Wonderjs.setTransformLocalRotation(GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(match[1], state$1), /* tuple */[
                                                                              0.1,
                                                                              10.5,
                                                                              1.5,
                                                                              1
                                                                            ], state$1);
                                                                        var match$1 = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.setFakeGlForLight(sandbox, /* array */["u_directionLights[0].direction"], state$2);
                                                                        var state$3 = RenderJobsTool$Wonderjs.init(match$1[0]);
                                                                        DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                                                                        return Sinon.toCalledWith(/* array */[
                                                                                    Caml_array.caml_array_get(match$1[1], 0),
                                                                                    21.29999999197162,
                                                                                    31.300000005352253,
                                                                                    -219.5200021448914
                                                                                  ], Wonder_jest.Expect[/* expect */0](match$1[2][1]));
                                                                      }));
                                                                return Wonder_jest.test("test four lights", (function () {
                                                                              var match = _prepareFour(sandbox, state[0]);
                                                                              var match$1 = match[1];
                                                                              var state$1 = match[0];
                                                                              var state$2 = TransformAPI$Wonderjs.setTransformLocalRotation(GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(match$1[3], state$1), /* tuple */[
                                                                                    3.1,
                                                                                    10.5,
                                                                                    1.5,
                                                                                    1
                                                                                  ], TransformAPI$Wonderjs.setTransformLocalRotation(GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(match$1[2], state$1), /* tuple */[
                                                                                        2.1,
                                                                                        10.5,
                                                                                        1.5,
                                                                                        1
                                                                                      ], TransformAPI$Wonderjs.setTransformLocalRotation(GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(match$1[1], state$1), /* tuple */[
                                                                                            1.1,
                                                                                            10.5,
                                                                                            1.5,
                                                                                            1
                                                                                          ], TransformAPI$Wonderjs.setTransformLocalRotation(GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(match$1[0], state$1), /* tuple */[
                                                                                                0.1,
                                                                                                10.5,
                                                                                                1.5,
                                                                                                1
                                                                                              ], state$1))));
                                                                              var match$2 = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.setFakeGlForLight(sandbox, /* array */[
                                                                                    "u_directionLights[0].direction",
                                                                                    "u_directionLights[1].direction",
                                                                                    "u_directionLights[2].direction",
                                                                                    "u_directionLights[3].direction"
                                                                                  ], state$2);
                                                                              var uniform3f = match$2[2][1];
                                                                              var posArr = match$2[1];
                                                                              DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match$2[0]));
                                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                              Sinon.getArgs(Sinon.getCall(0, Sinon.withOneArg(Caml_array.caml_array_get(posArr, 0), uniform3f))),
                                                                                              Sinon.getArgs(Sinon.getCall(0, Sinon.withOneArg(Caml_array.caml_array_get(posArr, 1), uniform3f))),
                                                                                              Sinon.getArgs(Sinon.getCall(0, Sinon.withOneArg(Caml_array.caml_array_get(posArr, 2), uniform3f))),
                                                                                              Sinon.getArgs(Sinon.getCall(0, Sinon.withOneArg(Caml_array.caml_array_get(posArr, 3), uniform3f)))
                                                                                            ]), /* tuple */[
                                                                                          /* :: */[
                                                                                            Caml_array.caml_array_get(posArr, 0),
                                                                                            /* :: */[
                                                                                              21.29999999197162,
                                                                                              /* :: */[
                                                                                                31.300000005352253,
                                                                                                /* :: */[
                                                                                                  -219.5200021448914,
                                                                                                  /* [] */0
                                                                                                ]
                                                                                              ]
                                                                                            ]
                                                                                          ],
                                                                                          /* :: */[
                                                                                            Caml_array.caml_array_get(posArr, 1),
                                                                                            /* :: */[
                                                                                              24.30000006876835,
                                                                                              /* :: */[
                                                                                                29.299999954154437,
                                                                                                /* :: */[
                                                                                                  -221.91999913671927,
                                                                                                  /* [] */0
                                                                                                ]
                                                                                              ]
                                                                                            ]
                                                                                          ],
                                                                                          /* :: */[
                                                                                            Caml_array.caml_array_get(posArr, 2),
                                                                                            /* :: */[
                                                                                              27.29999987738473,
                                                                                              /* :: */[
                                                                                                27.300000081743512,
                                                                                                /* :: */[
                                                                                                  -228.31999618530273,
                                                                                                  /* [] */0
                                                                                                ]
                                                                                              ]
                                                                                            ]
                                                                                          ],
                                                                                          /* :: */[
                                                                                            Caml_array.caml_array_get(posArr, 3),
                                                                                            /* :: */[
                                                                                              30.299999741794302,
                                                                                              /* :: */[
                                                                                                25.30000017213713,
                                                                                                /* :: */[
                                                                                                  -238.71999996955168,
                                                                                                  /* [] */0
                                                                                                ]
                                                                                              ]
                                                                                            ]
                                                                                          ]
                                                                                        ]);
                                                                            }));
                                                              }));
                                                        return /* () */0;
                                                      }));
                                                describe("send color", (function () {
                                                        var _prepare = function (state) {
                                                          var match = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.prepareOneForDirectionLight(sandbox, state[0]);
                                                          var light = match[3];
                                                          var color = /* array */[
                                                            1,
                                                            0,
                                                            0
                                                          ];
                                                          var state$1 = DirectionLightAPI$Wonderjs.setDirectionLightColor(light, color, match[0]);
                                                          var match$1 = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.setFakeGlForLight(sandbox, /* array */["u_directionLights[0].color"], state$1);
                                                          var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match$1[0]));
                                                          return /* tuple */[
                                                                  state$2,
                                                                  light,
                                                                  color,
                                                                  match$1[1],
                                                                  match$1[2][1]
                                                                ];
                                                        };
                                                        Wonder_jest.test("test one light", (function () {
                                                                var match = _prepare(state);
                                                                return Sinon.toCalledWith(/* array */[Caml_array.caml_array_get(match[3], 0)].concat(match[2]), Wonder_jest.Expect[/* expect */0](match[4]));
                                                              }));
                                                        return Wonder_jest.test("test glsl cache", (function () {
                                                                      var match = _prepare(state);
                                                                      var color = match[2];
                                                                      var light = match[1];
                                                                      var state$1 = DirectionLightAPI$Wonderjs.setDirectionLightColor(light, /* array */[
                                                                            0.3,
                                                                            0,
                                                                            0
                                                                          ], match[0]);
                                                                      var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(state$1);
                                                                      var state$3 = DirectionLightAPI$Wonderjs.setDirectionLightColor(light, color, state$2);
                                                                      DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withFourArgs(Caml_array.caml_array_get(match[3], 0), Caml_array.caml_array_get(color, 0), Caml_array.caml_array_get(color, 1), Caml_array.caml_array_get(color, 2), match[4]))), 2);
                                                                    }));
                                                      }));
                                                describe("send intensity", (function () {
                                                        var _prepare = function (state) {
                                                          var match = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.prepareOneForDirectionLight(sandbox, state[0]);
                                                          var light = match[3];
                                                          var state$1 = DirectionLightAPI$Wonderjs.setDirectionLightIntensity(light, 2, match[0]);
                                                          var match$1 = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.setFakeGlForLight(sandbox, /* array */["u_directionLights[0].intensity"], state$1);
                                                          var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match$1[0]));
                                                          return /* tuple */[
                                                                  state$2,
                                                                  light,
                                                                  2,
                                                                  match$1[1],
                                                                  match$1[2][0]
                                                                ];
                                                        };
                                                        Wonder_jest.test("test one light", (function () {
                                                                var match = _prepare(state);
                                                                return Sinon.toCalledWith(ArrayService$Wonderjs.push(match[2], /* array */[Caml_array.caml_array_get(match[3], 0)]), Wonder_jest.Expect[/* expect */0](match[4]));
                                                              }));
                                                        return Wonder_jest.test("test glsl cache", (function () {
                                                                      var match = _prepare(state);
                                                                      var intensity = match[2];
                                                                      var light = match[1];
                                                                      var state$1 = DirectionLightAPI$Wonderjs.setDirectionLightIntensity(light, 1.3, match[0]);
                                                                      var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(state$1);
                                                                      var state$3 = DirectionLightAPI$Wonderjs.setDirectionLightIntensity(light, intensity, state$2);
                                                                      DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withTwoArgs(Caml_array.caml_array_get(match[3], 0), intensity, match[4]))), 2);
                                                                    }));
                                                      }));
                                                return /* () */0;
                                              }));
                                        return /* () */0;
                                      }));
                                describe("test send point light data", (function () {
                                        var _prepareOne = function (sandbox, state) {
                                          var match = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, state);
                                          var match$1 = PointLightTool$Wonderjs.createGameObject(match[0]);
                                          var match$2 = CameraTool$Wonderjs.createCameraGameObject(match$1[0]);
                                          return /* tuple */[
                                                  match$2[0],
                                                  match$1[1],
                                                  match[3],
                                                  match$1[2],
                                                  match$2[2]
                                                ];
                                        };
                                        describe("send structure data", (function () {
                                                describe("send position", (function () {
                                                        return Wonder_jest.test("test four lights", (function () {
                                                                      var match = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.prepareFourForPointLight(sandbox, state[0]);
                                                                      var match$1 = match[1];
                                                                      var state$1 = match[0];
                                                                      var state$2 = TransformAPI$Wonderjs.setTransformPosition(GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(match$1[3], state$1), /* tuple */[
                                                                            4,
                                                                            2,
                                                                            3
                                                                          ], TransformAPI$Wonderjs.setTransformPosition(GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(match$1[2], state$1), /* tuple */[
                                                                                3,
                                                                                2,
                                                                                3
                                                                              ], TransformAPI$Wonderjs.setTransformPosition(GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(match$1[1], state$1), /* tuple */[
                                                                                    2,
                                                                                    2,
                                                                                    3
                                                                                  ], TransformAPI$Wonderjs.setTransformPosition(GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(match$1[0], state$1), /* tuple */[
                                                                                        1,
                                                                                        2,
                                                                                        3
                                                                                      ], state$1))));
                                                                      var match$2 = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.setFakeGlForLight(sandbox, /* array */[
                                                                            "u_pointLights[0].position",
                                                                            "u_pointLights[1].position",
                                                                            "u_pointLights[2].position",
                                                                            "u_pointLights[3].position"
                                                                          ], state$2);
                                                                      var uniform3f = match$2[2][1];
                                                                      var posArr = match$2[1];
                                                                      DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match$2[0]));
                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                      Sinon.getArgs(Sinon.getCall(0, Sinon.withOneArg(Caml_array.caml_array_get(posArr, 0), uniform3f))),
                                                                                      Sinon.getArgs(Sinon.getCall(0, Sinon.withOneArg(Caml_array.caml_array_get(posArr, 1), uniform3f))),
                                                                                      Sinon.getArgs(Sinon.getCall(0, Sinon.withOneArg(Caml_array.caml_array_get(posArr, 2), uniform3f))),
                                                                                      Sinon.getArgs(Sinon.getCall(0, Sinon.withOneArg(Caml_array.caml_array_get(posArr, 3), uniform3f)))
                                                                                    ]), /* tuple */[
                                                                                  /* :: */[
                                                                                    Caml_array.caml_array_get(posArr, 0),
                                                                                    /* :: */[
                                                                                      1,
                                                                                      /* :: */[
                                                                                        2,
                                                                                        /* :: */[
                                                                                          3,
                                                                                          /* [] */0
                                                                                        ]
                                                                                      ]
                                                                                    ]
                                                                                  ],
                                                                                  /* :: */[
                                                                                    Caml_array.caml_array_get(posArr, 1),
                                                                                    /* :: */[
                                                                                      2,
                                                                                      /* :: */[
                                                                                        2,
                                                                                        /* :: */[
                                                                                          3,
                                                                                          /* [] */0
                                                                                        ]
                                                                                      ]
                                                                                    ]
                                                                                  ],
                                                                                  /* :: */[
                                                                                    Caml_array.caml_array_get(posArr, 2),
                                                                                    /* :: */[
                                                                                      3,
                                                                                      /* :: */[
                                                                                        2,
                                                                                        /* :: */[
                                                                                          3,
                                                                                          /* [] */0
                                                                                        ]
                                                                                      ]
                                                                                    ]
                                                                                  ],
                                                                                  /* :: */[
                                                                                    Caml_array.caml_array_get(posArr, 3),
                                                                                    /* :: */[
                                                                                      4,
                                                                                      /* :: */[
                                                                                        2,
                                                                                        /* :: */[
                                                                                          3,
                                                                                          /* [] */0
                                                                                        ]
                                                                                      ]
                                                                                    ]
                                                                                  ]
                                                                                ]);
                                                                    }));
                                                      }));
                                                describe("send color", (function () {
                                                        return Wonder_jest.test("test one light", (function () {
                                                                      var match = _prepareOne(sandbox, state[0]);
                                                                      var color = /* array */[
                                                                        1,
                                                                        0,
                                                                        0
                                                                      ];
                                                                      var state$1 = PointLightAPI$Wonderjs.setPointLightColor(match[3], color, match[0]);
                                                                      var match$1 = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.setFakeGlForLight(sandbox, /* array */["u_pointLights[0].color"], state$1);
                                                                      DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match$1[0]));
                                                                      return Sinon.toCalledWith(/* array */[Caml_array.caml_array_get(match$1[1], 0)].concat(color), Wonder_jest.Expect[/* expect */0](match$1[2][1]));
                                                                    }));
                                                      }));
                                                describe("send intensity", (function () {
                                                        return Wonder_jest.test("test one light", (function () {
                                                                      var match = _prepareOne(sandbox, state[0]);
                                                                      var state$1 = PointLightAPI$Wonderjs.setPointLightIntensity(match[3], 2, match[0]);
                                                                      var match$1 = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.setFakeGlForLight(sandbox, /* array */["u_pointLights[0].intensity"], state$1);
                                                                      DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match$1[0]));
                                                                      return Sinon.toCalledWith(ArrayService$Wonderjs.push(2, /* array */[Caml_array.caml_array_get(match$1[1], 0)]), Wonder_jest.Expect[/* expect */0](match$1[2][0]));
                                                                    }));
                                                      }));
                                                describe("send constant", (function () {
                                                        return Wonder_jest.test("test one light", (function () {
                                                                      var match = _prepareOne(sandbox, state[0]);
                                                                      var state$1 = PointLightAPI$Wonderjs.setPointLightConstant(match[3], 2, match[0]);
                                                                      var match$1 = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.setFakeGlForLight(sandbox, /* array */["u_pointLights[0].constant"], state$1);
                                                                      DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match$1[0]));
                                                                      return Sinon.toCalledWith(ArrayService$Wonderjs.push(2, /* array */[Caml_array.caml_array_get(match$1[1], 0)]), Wonder_jest.Expect[/* expect */0](match$1[2][0]));
                                                                    }));
                                                      }));
                                                describe("send linear", (function () {
                                                        return Wonder_jest.test("test one light", (function () {
                                                                      var match = _prepareOne(sandbox, state[0]);
                                                                      var state$1 = PointLightAPI$Wonderjs.setPointLightLinear(match[3], 2, match[0]);
                                                                      var match$1 = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.setFakeGlForLight(sandbox, /* array */["u_pointLights[0].linear"], state$1);
                                                                      DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match$1[0]));
                                                                      return Sinon.toCalledWith(ArrayService$Wonderjs.push(2, /* array */[Caml_array.caml_array_get(match$1[1], 0)]), Wonder_jest.Expect[/* expect */0](match$1[2][0]));
                                                                    }));
                                                      }));
                                                describe("send quadratic", (function () {
                                                        return Wonder_jest.test("test one light", (function () {
                                                                      var match = _prepareOne(sandbox, state[0]);
                                                                      var state$1 = PointLightAPI$Wonderjs.setPointLightQuadratic(match[3], 2.5, match[0]);
                                                                      var match$1 = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.setFakeGlForLight(sandbox, /* array */["u_pointLights[0].quadratic"], state$1);
                                                                      DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match$1[0]));
                                                                      return Sinon.toCalledWith(ArrayService$Wonderjs.push(2.5, /* array */[Caml_array.caml_array_get(match$1[1], 0)]), Wonder_jest.Expect[/* expect */0](match$1[2][0]));
                                                                    }));
                                                      }));
                                                describe("send range", (function () {
                                                        return Wonder_jest.test("test one light", (function () {
                                                                      var match = _prepareOne(sandbox, state[0]);
                                                                      var state$1 = PointLightAPI$Wonderjs.setPointLightRange(match[3], 2, match[0]);
                                                                      var match$1 = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.setFakeGlForLight(sandbox, /* array */["u_pointLights[0].range"], state$1);
                                                                      DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match$1[0]));
                                                                      return Sinon.toCalledWith(ArrayService$Wonderjs.push(2, /* array */[Caml_array.caml_array_get(match$1[1], 0)]), Wonder_jest.Expect[/* expect */0](match$1[2][0]));
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
                describe("test send light material data", (function () {
                        GLSLSenderTool$Wonderjs.JudgeSendUniformData[/* testSendFloat */5](sandbox, "u_shininess", (function (_, param, _$1, state) {
                                return LightMaterialAPI$Wonderjs.setLightMaterialShininess(param[1], 30, state);
                              }), 30, FrontRenderLightJobTool$Wonderjs.prepareGameObject, undefined, /* () */0);
                        GLSLSenderTool$Wonderjs.JudgeSendUniformData[/* testSendVector3 */4](sandbox, "u_diffuse", (function (_, param, _$1, state) {
                                return LightMaterialAPI$Wonderjs.setLightMaterialDiffuseColor(param[1], /* array */[
                                            1,
                                            0,
                                            0.5
                                          ], state);
                              }), /* :: */[
                              1,
                              /* :: */[
                                0,
                                /* :: */[
                                  0.5,
                                  /* [] */0
                                ]
                              ]
                            ], FrontRenderLightJobTool$Wonderjs.prepareGameObject, undefined, /* () */0);
                        GLSLSenderTool$Wonderjs.JudgeSendUniformData[/* testSendVector3 */4](sandbox, "u_specular", (function (_, param, _$1, state) {
                                return LightMaterialAPI$Wonderjs.setLightMaterialSpecularColor(param[1], /* array */[
                                            1,
                                            0,
                                            0.5
                                          ], state);
                              }), /* :: */[
                              1,
                              /* :: */[
                                0,
                                /* :: */[
                                  0.5,
                                  /* [] */0
                                ]
                              ]
                            ], FrontRenderLightJobTool$Wonderjs.prepareGameObject, undefined, /* () */0);
                        describe("test with map", (function () {
                                describe("send u_diffuseMapSampler, u_diffuse, u_specularMapSampler", (function () {
                                        var _prepare = function (state) {
                                          var match = FrontRenderLightJobTool$Wonderjs.prepareGameObjectWithCreatedMap(sandbox, state);
                                          var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                                          var uniform1i = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                          var uniform3f = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                          var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_diffuseMapSampler");
                                          var getUniformLocation$1 = GLSLLocationTool$Wonderjs.stubLocation(getUniformLocation, 1, sandbox, "u_specularMapSampler");
                                          var getUniformLocation$2 = GLSLLocationTool$Wonderjs.stubLocation(getUniformLocation$1, 2, sandbox, "u_diffuse");
                                          var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getUniformLocation$2), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(uniform1i), undefined, Js_primitive.some(uniform3f), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                                          return /* tuple */[
                                                  state$1,
                                                  /* tuple */[
                                                    0,
                                                    1,
                                                    2
                                                  ],
                                                  /* tuple */[
                                                    uniform1i,
                                                    uniform3f
                                                  ]
                                                ];
                                        };
                                        return Wonder_jest.test("test send", (function () {
                                                      var match = _prepare(state[0]);
                                                      var match$1 = match[2];
                                                      var uniform1i = match$1[0];
                                                      var match$2 = match[1];
                                                      DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match[0]));
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      SinonTool$Wonderjs.calledWithArg2(uniform1i, match$2[0], 0),
                                                                      SinonTool$Wonderjs.calledWithArg2(uniform1i, match$2[1], 1),
                                                                      SinonTool$Wonderjs.calledWith(match$1[1], match$2[2])
                                                                    ]), /* tuple */[
                                                                  true,
                                                                  true,
                                                                  true
                                                                ]);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                GLSLSenderTool$Wonderjs.JudgeSendUniformData[/* testSendMatrix4 */1](sandbox, "u_mMatrix", (function (gameObjectTransform, _, _$1, state) {
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
                        ]), FrontRenderLightJobTool$Wonderjs.prepareGameObject, undefined, /* () */0);
                GLSLSenderTool$Wonderjs.JudgeSendUniformData[/* testSendMatrix3 */2](sandbox, "u_normalMatrix", (function (gameObjectTransform, _, _$1, state) {
                        return TransformAPI$Wonderjs.setTransformLocalPosition(gameObjectTransform, /* tuple */[
                                    10,
                                    2,
                                    3
                                  ], state);
                      }), new Float32Array(/* array */[
                          1,
                          0,
                          0,
                          0,
                          1,
                          0,
                          0,
                          0,
                          1
                        ]), FrontRenderLightJobTool$Wonderjs.prepareGameObject, (function (prepareSendUniformData) {
                        Wonder_jest.test("send per each gameObject", (function () {
                                var match = Curry._3(prepareSendUniformData, sandbox, FrontRenderLightJobTool$Wonderjs.prepareGameObject, state[0]);
                                var match$1 = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, match[0]);
                                var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(match[2][0], /* tuple */[
                                      1,
                                      2,
                                      3
                                    ], match$1[0]);
                                var uniformMatrix3fv = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_normalMatrix");
                                var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(uniformMatrix3fv), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$2));
                                return Sinon.toCalledTwice(Wonder_jest.Expect[/* expect */0](uniformMatrix3fv));
                              }));
                        describe("test cache", (function () {
                                return Wonder_jest.test("test in different loops", (function () {
                                              var match = Curry._3(prepareSendUniformData, sandbox, FrontRenderLightJobTool$Wonderjs.prepareGameObject, state[0]);
                                              var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(match[2][0], /* tuple */[
                                                    1,
                                                    2,
                                                    3
                                                  ], match[0]);
                                              var uniformMatrix3fv = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_normalMatrix");
                                              var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(uniformMatrix3fv), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                              var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$2));
                                              DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                                              return Sinon.toCalledTwice(Wonder_jest.Expect[/* expect */0](uniformMatrix3fv));
                                            }));
                              }));
                        return /* () */0;
                      }), /* () */0);
                describe("fix bug", (function () {
                        var _prepare = function (state) {
                          var match = RenderBasicJobTool$Wonderjs.prepareGameObjectWithCreatedMap(sandbox, state);
                          var match$1 = FrontRenderLightJobTool$Wonderjs.prepareGameObjectWithCreatedMap(sandbox, match[0]);
                          var match$2 = CameraTool$Wonderjs.createCameraGameObject(match$1[0]);
                          var uniform3f = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                          var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_color");
                          var getUniformLocation$1 = GLSLLocationTool$Wonderjs.stubLocation(getUniformLocation, 1, sandbox, "u_diffuse");
                          var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getUniformLocation$1), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(uniform3f), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$2[0]);
                          return /* tuple */[
                                  state$1,
                                  /* tuple */[
                                    0,
                                    1
                                  ],
                                  uniform3f
                                ];
                        };
                        return Wonder_jest.test("should send uniform data which has different shaders but the same materials", (function () {
                                      var match = _prepare(state[0]);
                                      var uniform3f = match[2];
                                      var match$1 = match[1];
                                      DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match[0]));
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      SinonTool$Wonderjs.calledWith(uniform3f, match$1[0]),
                                                      SinonTool$Wonderjs.calledWith(uniform3f, match$1[1])
                                                    ]), /* tuple */[
                                                  true,
                                                  true
                                                ]);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("bind map", (function () {
                Wonder_jest.test("if not has map, not bind", (function () {
                        var match = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, state[0]);
                        var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                        var bindTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(bindTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                        DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                        return Sinon.toCalled(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](bindTexture)));
                      }));
                describe("else", (function () {
                        var _prepare = function (state) {
                          var match = FrontRenderLightJobTool$Wonderjs.prepareGameObjectWithCreatedMap(sandbox, state);
                          var match$1 = match[5];
                          var match$2 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                          var createTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                          Sinon.returns(11, Sinon.onCall(0, createTexture));
                          Sinon.returns(12, Sinon.onCall(1, createTexture));
                          Sinon.returns(13, Sinon.onCall(2, createTexture));
                          var activeTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                          var bindTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                          var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 8, 0, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(createTexture), Js_primitive.some(activeTexture), Js_primitive.some(bindTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$2[0]);
                          return /* tuple */[
                                  state$1,
                                  /* tuple */[
                                    8,
                                    11,
                                    12,
                                    13
                                  ],
                                  match[3],
                                  /* tuple */[
                                    match$1[0],
                                    match$1[1]
                                  ],
                                  /* tuple */[
                                    activeTexture,
                                    bindTexture
                                  ]
                                ];
                        };
                        Wonder_jest.test("if texture of the specific unit is cached, not bind and active it again", (function () {
                                var match = _prepare(state[0]);
                                var state$1 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match[0]));
                                DirectorTool$Wonderjs.runWithDefaultTime(state$1);
                                return Sinon.toCalledTwice(Wonder_jest.Expect[/* expect */0](match[4][0]));
                              }));
                        describe("else", (function () {
                                Wonder_jest.test("active texture unit", (function () {
                                        var match = _prepare(state[0]);
                                        var activeTexture = match[4][0];
                                        DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match[0]));
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                        SinonTool$Wonderjs.calledWith(activeTexture, 0),
                                                        SinonTool$Wonderjs.calledWith(activeTexture, 1)
                                                      ]), /* tuple */[
                                                    true,
                                                    true
                                                  ]);
                                      }));
                                return Wonder_jest.test("bind gl texture to TEXTURE_2D target", (function () {
                                              var match = _prepare(state[0]);
                                              var bindTexture = match[4][1];
                                              var match$1 = match[1];
                                              var texture2D = match$1[0];
                                              DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match[0]));
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              SinonTool$Wonderjs.calledWithArg2(bindTexture, texture2D, match$1[1]),
                                                              SinonTool$Wonderjs.calledWithArg2(bindTexture, texture2D, match$1[2])
                                                            ]), /* tuple */[
                                                          true,
                                                          true
                                                        ]);
                                            }));
                              }));
                        describe("test remove map", (function () {
                                return Wonder_jest.test("new map's unit should be removed one", (function () {
                                              var match = _prepare(state[0]);
                                              var activeTexture = match[4][0];
                                              var material = match[2];
                                              var state$1 = LightMaterialAPI$Wonderjs.removeLightMaterialSpecularMap(material, match[0]);
                                              var match$1 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state$1);
                                              var state$2 = LightMaterialAPI$Wonderjs.setLightMaterialSpecularMap(material, match$1[1], match$1[0]);
                                              DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$2));
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              SinonTool$Wonderjs.calledWith(activeTexture, 0),
                                                              SinonTool$Wonderjs.calledWith(activeTexture, 1)
                                                            ]), /* tuple */[
                                                          true,
                                                          true
                                                        ]);
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("update map", (function () {
                var _prepare = function (state, $staropt$star, $staropt$star$1, _) {
                  var width = $staropt$star !== undefined ? $staropt$star : 2;
                  var height = $staropt$star$1 !== undefined ? $staropt$star$1 : 4;
                  var match = FrontRenderLightJobTool$Wonderjs.prepareGameObjectWithCreatedMap(sandbox, state);
                  var match$1 = match[5];
                  var specularMap = match$1[1];
                  var diffuseMap = match$1[0];
                  var match$2 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                  var source1 = BasicSourceTextureTool$Wonderjs.buildSource(width, height);
                  var source2 = BasicSourceTextureTool$Wonderjs.buildSource(width, height);
                  var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureSource(diffuseMap, source1, match$2[0]);
                  var state$2 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureSource(specularMap, source2, state$1);
                  return /* tuple */[
                          state$2,
                          /* tuple */[
                            diffuseMap,
                            specularMap
                          ]
                        ];
                };
                Wonder_jest.test("if is updated before, not update", (function () {
                        var match = _prepare(state[0], undefined, undefined, /* () */0);
                        var pixelStorei = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(pixelStorei), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                        var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                        var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                        DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                        return Sinon.toCalledTwice(Wonder_jest.Expect[/* expect */0](Sinon.withOneArg(2, pixelStorei)));
                      }));
                Wonder_jest.test("if source not exist, not update", (function () {
                        var match = FrontRenderLightJobTool$Wonderjs.prepareGameObjectWithCreatedMap(sandbox, state[0]);
                        var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                        var pixelStorei = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(pixelStorei), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                        DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                        return Sinon.toCalled(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](Sinon.withOneArg(2, pixelStorei))));
                      }));
                return Wonder_jest.test("set flipY", (function () {
                              var match = _prepare(state[0], undefined, undefined, /* () */0);
                              var match$1 = match[1];
                              var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureFlipY(match$1[1], true, BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureFlipY(match$1[0], false, match[0]));
                              var pixelStorei = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                              var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(pixelStorei), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                              DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$2));
                              return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withTwoArgs(2, true, pixelStorei)));
                            }));
              }));
        describe("test set map at runtime which has no map before", (function () {
                return Wonder_jest.test("replace material component", (function () {
                              var match = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, state[0]);
                              var gameObject1 = match[1];
                              var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                              var uniform1i = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                              var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_diffuseMapSampler");
                              var getUniformLocation$1 = GLSLLocationTool$Wonderjs.stubLocation(getUniformLocation, 1, sandbox, "u_specularMapSampler");
                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getUniformLocation$1), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(uniform1i), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                              var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                              var state$3 = GameObjectAPI$Wonderjs.disposeGameObjectLightMaterialComponent(gameObject1, match[3], state$2);
                              var match$2 = LightMaterialTool$Wonderjs.createMaterialWithMap(state$3);
                              var state$4 = GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject1, match$2[1], match$2[0]);
                              var state$5 = GameObjectAPI$Wonderjs.initGameObject(gameObject1, state$4);
                              DirectorTool$Wonderjs.runWithDefaultTime(state$5);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              Sinon.getCallCount(Sinon.withOneArg(0, uniform1i)),
                                              Sinon.getCallCount(Sinon.withOneArg(1, uniform1i))
                                            ]), /* tuple */[
                                          1,
                                          1
                                        ]);
                            }));
              }));
        describe("test remove map at runtime which has map before", (function () {
                return Wonder_jest.test("replace material component", (function () {
                              var match = FrontRenderLightJobTool$Wonderjs.prepareGameObjectWithCreatedMap(sandbox, state[0]);
                              var gameObject1 = match[1];
                              var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                              var uniform1i = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                              var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_diffuseMapSampler");
                              var getUniformLocation$1 = GLSLLocationTool$Wonderjs.stubLocation(getUniformLocation, 1, sandbox, "u_specularMapSampler");
                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getUniformLocation$1), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(uniform1i), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                              var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                              var state$3 = GameObjectAPI$Wonderjs.disposeGameObjectLightMaterialComponent(gameObject1, match[3], state$2);
                              var match$2 = LightMaterialAPI$Wonderjs.createLightMaterial(state$3);
                              var state$4 = GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject1, match$2[1], match$2[0]);
                              var state$5 = GameObjectAPI$Wonderjs.initGameObject(gameObject1, state$4);
                              DirectorTool$Wonderjs.runWithDefaultTime(state$5);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              Sinon.getCallCount(Sinon.withOneArg(0, uniform1i)),
                                              Sinon.getCallCount(Sinon.withOneArg(1, uniform1i))
                                            ]), /* tuple */[
                                          1,
                                          1
                                        ]);
                            }));
              }));
        describe("draw", (function () {
                describe("if geometry has index buffer, bind index buffer and drawElements", (function () {
                        var _prepareForDrawElements = function (sandbox, state) {
                          var match = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, state);
                          var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                          return /* tuple */[
                                  match$1[0],
                                  match[2],
                                  match[4]
                                ];
                        };
                        describe("drawElements", (function () {
                                Wonder_jest.test("test drawMode", (function () {
                                        var match = _prepareForDrawElements(sandbox, state[0]);
                                        var state$1 = MeshRendererAPI$Wonderjs.setMeshRendererDrawMode(match[2], MeshRendererTool$Wonderjs.getLines(/* () */0), match[0]);
                                        var drawElements = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                        var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(drawElements), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                        var state$3 = RenderJobsTool$Wonderjs.init(state$2);
                                        DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                                        return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withOneArg(1, drawElements)));
                                      }));
                                return Wonder_jest.test("test drawElements", (function () {
                                              var match = _prepareForDrawElements(sandbox, state[0]);
                                              var drawElements = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(drawElements), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                              var state$2 = RenderJobsTool$Wonderjs.init(state$1);
                                              var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                              return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withFourArgs(1, GeometryTool$Wonderjs.getIndicesCount(match[1], CreateRenderStateMainService$Wonderjs.createRenderState(state$3)), GeometryTool$Wonderjs.getIndexType(CreateRenderStateMainService$Wonderjs.createRenderState(state$3)), Caml_int32.imul(GeometryTool$Wonderjs.getIndexTypeSize(CreateRenderStateMainService$Wonderjs.createRenderState(state$3)), 0), drawElements)));
                                            }));
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
