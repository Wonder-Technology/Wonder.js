'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var SceneAPI$Wonderjs = require("../../../../../../src/api/SceneAPI.js");
var TestTool$Wonderjs = require("../../../../../tool/TestTool.js");
var SinonTool$Wonderjs = require("../../../tool/sinon/SinonTool.js");
var CameraTool$Wonderjs = require("../../../../../tool/service/camera/CameraTool.js");
var FakeGlTool$Wonderjs = require("../../../../../tool/gl/FakeGlTool.js");
var GeometryAPI$Wonderjs = require("../../../../../../src/api/geometry/GeometryAPI.js");
var ArrayService$Wonderjs = require("../../../../../../src/service/atom/ArrayService.js");
var DirectorTool$Wonderjs = require("../../../../../tool/core/DirectorTool.js");
var GeometryTool$Wonderjs = require("../../../../../tool/service/geometry/GeometryTool.js");
var TransformAPI$Wonderjs = require("../../../../../../src/api/TransformAPI.js");
var GameObjectAPI$Wonderjs = require("../../../../../../src/api/GameObjectAPI.js");
var MainStateTool$Wonderjs = require("../../../../../tool/service/state/MainStateTool.js");
var PointLightAPI$Wonderjs = require("../../../../../../src/api/light/PointLightAPI.js");
var GLSLSenderTool$Wonderjs = require("../../../../../tool/service/sender/GLSLSenderTool.js");
var GameObjectTool$Wonderjs = require("../../../../../tool/service/gameObject/GameObjectTool.js");
var PointLightTool$Wonderjs = require("../../../../../tool/service/light/PointLightTool.js");
var RenderJobsTool$Wonderjs = require("../../../../../tool/job/no_worker/loop/RenderJobsTool.js");
var BoxGeometryTool$Wonderjs = require("../../../../../tool/service/geometry/BoxGeometryTool.js");
var MeshRendererAPI$Wonderjs = require("../../../../../../src/api/MeshRendererAPI.js");
var GLSLLocationTool$Wonderjs = require("../../../../../tool/service/location/GLSLLocationTool.js");
var LightMaterialAPI$Wonderjs = require("../../../../../../src/api/material/LightMaterialAPI.js");
var MeshRendererTool$Wonderjs = require("../../../../../tool/service/meshRenderer/MeshRendererTool.js");
var DirectionLightAPI$Wonderjs = require("../../../../../../src/api/light/DirectionLightAPI.js");
var LightMaterialTool$Wonderjs = require("../../../../../tool/service/material/LightMaterialTool.js");
var DirectionLightTool$Wonderjs = require("../../../../../tool/service/light/DirectionLightTool.js");
var RenderBasicJobTool$Wonderjs = require("../../../../../tool/job/render_basic/RenderBasicJobTool.js");
var BasicSourceTextureAPI$Wonderjs = require("../../../../../../src/api/texture/BasicSourceTextureAPI.js");
var BasicSourceTextureTool$Wonderjs = require("../../../../../tool/service/texture/BasicSourceTextureTool.js");
var FrontRenderLightJobTool$Wonderjs = require("../../../../../tool/job/no_worker/loop/FrontRenderLightJobTool.js");
var CreateRenderStateMainService$Wonderjs = require("../../../../../../src/service/state/main/render/CreateRenderStateMainService.js");
var PerspectiveCameraProjectionTool$Wonderjs = require("../../../../../tool/service/camera/PerspectiveCameraProjectionTool.js");
var FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs = require("../../../../tool/job/FrontRenderLightForNoWorkerAndWorkerJobTool.js");

Wonder_jest.describe("test front render light job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                TestTool$Wonderjs.openContractCheck(/* () */0);
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = RenderJobsTool$Wonderjs.initWithJobConfig(sandbox, FrontRenderLightJobTool$Wonderjs.buildNoWorkerJobConfig(/* () */0));
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("use program", (function (param) {
                var _prepare = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.prepareForUseProgramCase;
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
                  var match = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, state);
                  return CameraTool$Wonderjs.createCameraGameObject(match[0])[0];
                };
                var _prepareWithMap = function (sandbox, state) {
                  var match = FrontRenderLightJobTool$Wonderjs.prepareGameObjectWithCreatedMap(sandbox, state);
                  return CameraTool$Wonderjs.createCameraGameObject(match[0])[0];
                };
                Wonder_jest.describe("init vbo buffers when first send", (function (param) {
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
                          var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(bufferData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                          var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                          var points = Curry._1(param[0], state$2);
                          return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withThreeArgs(1, points, 2, bufferData)));
                        };
                        Wonder_jest.test("create buffers", (function (param) {
                                var match = _prepare(sandbox, state[0]);
                                var createBuffer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createBuffer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(createBuffer)), 3);
                              }));
                        Wonder_jest.describe("init vertex buffer", (function (param) {
                                Wonder_jest.test("bufferData", (function (param) {
                                        return _prepareForBufferData(state, /* tuple */[
                                                    BoxGeometryTool$Wonderjs.getBoxGeometryVertices,
                                                    _prepare
                                                  ]);
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
                        Wonder_jest.describe("init texCoord buffer", (function (param) {
                                return Wonder_jest.test("bufferData", (function (param) {
                                              return _prepareForBufferData(state, /* tuple */[
                                                          BoxGeometryTool$Wonderjs.getBoxGeometryTexCoords,
                                                          _prepareWithMap
                                                        ]);
                                            }));
                              }));
                        Wonder_jest.describe("init normal buffer", (function (param) {
                                return Wonder_jest.describe("bufferData", (function (param) {
                                              Wonder_jest.test("boxGeometry", (function (param) {
                                                      return _prepareForBufferData(state, /* tuple */[
                                                                  BoxGeometryTool$Wonderjs.getBoxGeometryNormals,
                                                                  _prepareWithMap
                                                                ]);
                                                    }));
                                              return Wonder_jest.describe("test geometry", (function (param) {
                                                            Wonder_jest.describe("if not has normals", (function (param) {
                                                                    var _prepare = function (sandbox, state) {
                                                                      var match = GeometryAPI$Wonderjs.createGeometry(state);
                                                                      var geometry = match[1];
                                                                      var state$1 = GeometryAPI$Wonderjs.setGeometryIndices16(geometry, new Uint16Array(/* array */[
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
                                                                    var _getComputedNormals = function (param) {
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
                                                                    Wonder_jest.describe("compute vertex normals", (function (param) {
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
                                                                            Wonder_jest.test("test indices16", (function (param) {
                                                                                    return _prepareForBufferData(state, /* tuple */[
                                                                                                (function (param) {
                                                                                                    return _getComputedNormals(/* () */0);
                                                                                                  }),
                                                                                                _prepare
                                                                                              ]);
                                                                                  }));
                                                                            return Wonder_jest.test("test indices32", (function (param) {
                                                                                          return _prepareForBufferData(state, /* tuple */[
                                                                                                      (function (param) {
                                                                                                          return _getComputedNormals(/* () */0);
                                                                                                        }),
                                                                                                      _prepareIndices32
                                                                                                    ]);
                                                                                        }));
                                                                          }));
                                                                    return Wonder_jest.test("only buffer data once", (function (param) {
                                                                                  var match = _prepare(sandbox, state[0]);
                                                                                  var bufferData = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                                  var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(bufferData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                                                  var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                                                                  DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                                                                  var points = _getComputedNormals(/* () */0);
                                                                                  return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withThreeArgs(1, points, 2, bufferData)));
                                                                                }));
                                                                  }));
                                                            return Wonder_jest.describe("else", (function (param) {
                                                                          return Wonder_jest.test("test", (function (param) {
                                                                                        return _prepareForBufferData(state, /* tuple */[
                                                                                                    BoxGeometryTool$Wonderjs.getBoxGeometryVertices,
                                                                                                    _prepare
                                                                                                  ]);
                                                                                      }));
                                                                        }));
                                                          }));
                                            }));
                              }));
                        return Wonder_jest.describe("init index buffer", (function (param) {
                                      Wonder_jest.test("bufferData", (function (param) {
                                              var match = _prepare(sandbox, state[0]);
                                              var bufferData = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(bufferData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                              var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                              var indices = BoxGeometryTool$Wonderjs.getBoxGeometryIndices(state$2);
                                              return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withThreeArgs(1, indices, 2, bufferData)));
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
                              Wonder_jest.describe("fix bug", (function (param) {
                                      var _prepare = function (sandbox, state) {
                                        var match = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, state);
                                        var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                                        return /* tuple */[
                                                match$1[0],
                                                match[2]
                                              ];
                                      };
                                      return Wonder_jest.test("\n        create gameObject gameObject1 with geometry geometry1;\n        create gameObject gameObject2 which share geometry geometry1 and set map to its material;\n        loopBody;\n\n        should send gameObject1 and gameObject2 attribute data;\n        ", (function (param) {
                                                    var match = _prepare(sandbox, state[0]);
                                                    var match$1 = FrontRenderLightJobTool$Wonderjs.prepareGameObjectWithSharedGeometry(sandbox, match[1], GameObjectAPI$Wonderjs.addGameObjectGeometryComponent, match[0]);
                                                    var match$2 = LightMaterialTool$Wonderjs.createAndSetMaps(match$1[3], match$1[0]);
                                                    var vertexAttribPointer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                    var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(vertexAttribPointer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$2[0]);
                                                    var state$2 = RenderJobsTool$Wonderjs.init(state$1);
                                                    DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(vertexAttribPointer)), 5);
                                                  }));
                                    }));
                              Wonder_jest.describe("send a_position", (function (param) {
                                      return Wonder_jest.test("attach buffer to attribute", (function (param) {
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
                                    }));
                              Wonder_jest.describe("send a_texCoord", (function (param) {
                                      return Wonder_jest.test("attach buffer to attribute", (function (param) {
                                                    var state$1 = _prepareWithMap(sandbox, state[0]);
                                                    var vertexAttribPointer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                    var getAttribLocation = GLSLLocationTool$Wonderjs.getAttribLocation(0, sandbox, "a_texCoord");
                                                    var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getAttribLocation), undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(vertexAttribPointer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
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
                              return Wonder_jest.describe("send a_normal", (function (param) {
                                            return Wonder_jest.test("attach buffer to attribute", (function (param) {
                                                          var state$1 = _prepare(sandbox, state[0]);
                                                          var vertexAttribPointer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                          var createBuffer = SinonTool$Wonderjs.returnDifferentOnEachCall(Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                                          var getAttribLocation = GLSLLocationTool$Wonderjs.getAttribLocation(0, sandbox, "a_normal");
                                                          var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getAttribLocation), undefined, undefined, undefined, Caml_option.some(createBuffer), undefined, undefined, Caml_option.some(vertexAttribPointer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
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
                            }));
              }));
        Wonder_jest.describe("send uniform data", (function (param) {
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
                Wonder_jest.describe("test send data per shader", (function (param) {
                        var testSendShaderUniformMatrix4DataOnlyOnce = function (name, prepareSendUinformDataFunc) {
                          return RenderJobsTool$Wonderjs.testSendShaderUniformMatrix4DataOnlyOnce(sandbox, name, /* tuple */[
                                      prepareSendUinformDataFunc,
                                      FrontRenderLightJobTool$Wonderjs.prepareGameObject
                                    ], state);
                        };
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
                                ]), FrontRenderLightJobTool$Wonderjs.prepareGameObject, (function (prepareSendUniformData) {
                                return testSendShaderUniformMatrix4DataOnlyOnce("u_vMatrix", prepareSendUniformData);
                              }), /* () */0);
                        GLSLSenderTool$Wonderjs.JudgeSendUniformData[/* testSendMatrix4 */1](sandbox, "u_pMatrix", (function (gameObjectTransform, cameraTransform, basicCameraView, state) {
                                return state;
                              }), PerspectiveCameraProjectionTool$Wonderjs.getPMatrixOfCreateBasicCameraViewPerspectiveCamera(/* () */0), FrontRenderLightJobTool$Wonderjs.prepareGameObject, (function (prepareSendUniformData) {
                                return testSendShaderUniformMatrix4DataOnlyOnce("u_pMatrix", prepareSendUniformData);
                              }), /* () */0);
                        GLSLSenderTool$Wonderjs.JudgeSendUniformData[/* testSendVector3 */4](sandbox, "u_cameraPos", (function (param, param$1, param$2, state) {
                                return TransformAPI$Wonderjs.setTransformLocalPosition(param$2[0], /* tuple */[
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
                        return Wonder_jest.describe("test send light data", (function (param) {
                                      Wonder_jest.describe("test send ambient light data", (function (param) {
                                              var _setFakeGl = function (sandbox, state) {
                                                var uniform3f = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_ambient");
                                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(uniform3f), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
                                                return /* tuple */[
                                                        state$1,
                                                        0,
                                                        uniform3f
                                                      ];
                                              };
                                              Wonder_jest.test("send u_ambient", (function (param) {
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
                                              return Wonder_jest.test("send shader record only once", (function (param) {
                                                            var match = _prepare(sandbox, state[0]);
                                                            var match$1 = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, match[0]);
                                                            var state$1 = SceneAPI$Wonderjs.setAmbientLightColor(/* array */[
                                                                  1,
                                                                  0,
                                                                  0.5
                                                                ], match$1[0]);
                                                            var match$2 = _setFakeGl(sandbox, state$1);
                                                            DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match$2[0]));
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(match$2[1], match$2[2]))), 1);
                                                          }));
                                            }));
                                      Wonder_jest.describe("test send direction light data", (function (param) {
                                              var _prepareOne = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.prepareOneForDirectionLight;
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
                                              return Wonder_jest.describe("send structure data", (function (param) {
                                                            Wonder_jest.test("if light's isRender === false, not send its data", (function (param) {
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
                                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                    Sinon.getCallCount(Sinon.withOneArg(Caml_array.caml_array_get(posArr, 0), uniform3f)),
                                                                                    Sinon.getCallCount(Sinon.withOneArg(Caml_array.caml_array_get(posArr, 1), uniform3f))
                                                                                  ]), /* tuple */[
                                                                                1,
                                                                                0
                                                                              ]);
                                                                  }));
                                                            Wonder_jest.describe("send direction", (function (param) {
                                                                    Wonder_jest.describe("fix bug", (function (param) {
                                                                            return Wonder_jest.test("test dispose first light gameObject", (function (param) {
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
                                                                                                      0.07056365770709318,
                                                                                                      -0.01377827170237498,
                                                                                                      0.9974121161485315
                                                                                                    ], Wonder_jest.Expect[/* expect */0](match$2[2][1]));
                                                                                        }));
                                                                          }));
                                                                    return Wonder_jest.describe("convert rotation to direction vector3", (function (param) {
                                                                                  Wonder_jest.test("test one light", (function (param) {
                                                                                          return FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.TestSendDirection[/* testOneLight */0](sandbox, state, _prepareOne, (function (sandbox, callArgArr, uniform3f, state) {
                                                                                                        var state$1 = RenderJobsTool$Wonderjs.init(state);
                                                                                                        DirectorTool$Wonderjs.runWithDefaultTime(state$1);
                                                                                                        return Sinon.toCalledWith(callArgArr, Wonder_jest.Expect[/* expect */0](uniform3f));
                                                                                                      }));
                                                                                        }));
                                                                                  return Wonder_jest.test("test four lights", (function (param) {
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
                                                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                                Sinon.getArgs(Sinon.getCall(0, Sinon.withOneArg(Caml_array.caml_array_get(posArr, 0), uniform3f))),
                                                                                                                Sinon.getArgs(Sinon.getCall(0, Sinon.withOneArg(Caml_array.caml_array_get(posArr, 1), uniform3f))),
                                                                                                                Sinon.getArgs(Sinon.getCall(0, Sinon.withOneArg(Caml_array.caml_array_get(posArr, 2), uniform3f))),
                                                                                                                Sinon.getArgs(Sinon.getCall(0, Sinon.withOneArg(Caml_array.caml_array_get(posArr, 3), uniform3f)))
                                                                                                              ]), /* tuple */[
                                                                                                            /* :: */[
                                                                                                              Caml_array.caml_array_get(posArr, 0),
                                                                                                              /* :: */[
                                                                                                                0.0809289658069698,
                                                                                                                /* :: */[
                                                                                                                  0.7083167921793907,
                                                                                                                  /* :: */[
                                                                                                                    -0.7012402045020751,
                                                                                                                    /* [] */0
                                                                                                                  ]
                                                                                                                ]
                                                                                                              ]
                                                                                                            ],
                                                                                                            /* :: */[
                                                                                                              Caml_array.caml_array_get(posArr, 1),
                                                                                                              /* :: */[
                                                                                                                0.13442483321879434,
                                                                                                                /* :: */[
                                                                                                                  0.6415023904668499,
                                                                                                                  /* :: */[
                                                                                                                    -0.7552513801638607,
                                                                                                                    /* [] */0
                                                                                                                  ]
                                                                                                                ]
                                                                                                              ]
                                                                                                            ],
                                                                                                            /* :: */[
                                                                                                              Caml_array.caml_array_get(posArr, 2),
                                                                                                              /* :: */[
                                                                                                                0.16459718450045202,
                                                                                                                /* :: */[
                                                                                                                  0.5214977228899428,
                                                                                                                  /* :: */[
                                                                                                                    -0.8372263086377114,
                                                                                                                    /* [] */0
                                                                                                                  ]
                                                                                                                ]
                                                                                                              ]
                                                                                                            ],
                                                                                                            /* :: */[
                                                                                                              Caml_array.caml_array_get(posArr, 3),
                                                                                                              /* :: */[
                                                                                                                0.17317784447167245,
                                                                                                                /* :: */[
                                                                                                                  0.41627749786719925,
                                                                                                                  /* :: */[
                                                                                                                    -0.8925931206062305,
                                                                                                                    /* [] */0
                                                                                                                  ]
                                                                                                                ]
                                                                                                              ]
                                                                                                            ]
                                                                                                          ]);
                                                                                              }));
                                                                                }));
                                                                  }));
                                                            Wonder_jest.describe("send color", (function (param) {
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
                                                                    Wonder_jest.test("test one light", (function (param) {
                                                                            var match = _prepare(state);
                                                                            return Sinon.toCalledWith(/* array */[Caml_array.caml_array_get(match[3], 0)].concat(match[2]), Wonder_jest.Expect[/* expect */0](match[4]));
                                                                          }));
                                                                    return Wonder_jest.test("test glsl cache", (function (param) {
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
                                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withFourArgs(Caml_array.caml_array_get(match[3], 0), Caml_array.caml_array_get(color, 0), Caml_array.caml_array_get(color, 1), Caml_array.caml_array_get(color, 2), match[4]))), 2);
                                                                                }));
                                                                  }));
                                                            return Wonder_jest.describe("send intensity", (function (param) {
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
                                                                          Wonder_jest.test("test one light", (function (param) {
                                                                                  var match = _prepare(state);
                                                                                  return Sinon.toCalledWith(ArrayService$Wonderjs.push(match[2], /* array */[Caml_array.caml_array_get(match[3], 0)]), Wonder_jest.Expect[/* expect */0](match[4]));
                                                                                }));
                                                                          return Wonder_jest.test("test glsl cache", (function (param) {
                                                                                        var match = _prepare(state);
                                                                                        var intensity = match[2];
                                                                                        var light = match[1];
                                                                                        var state$1 = DirectionLightAPI$Wonderjs.setDirectionLightIntensity(light, 1.3, match[0]);
                                                                                        var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(state$1);
                                                                                        var state$3 = DirectionLightAPI$Wonderjs.setDirectionLightIntensity(light, intensity, state$2);
                                                                                        DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withTwoArgs(Caml_array.caml_array_get(match[3], 0), intensity, match[4]))), 2);
                                                                                      }));
                                                                        }));
                                                          }));
                                            }));
                                      return Wonder_jest.describe("test send point light data", (function (param) {
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
                                                    return Wonder_jest.describe("send structure data", (function (param) {
                                                                  Wonder_jest.describe("send position", (function (param) {
                                                                          return Wonder_jest.test("test four lights", (function (param) {
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
                                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
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
                                                                  Wonder_jest.describe("send color", (function (param) {
                                                                          return Wonder_jest.test("test one light", (function (param) {
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
                                                                  Wonder_jest.describe("send intensity", (function (param) {
                                                                          return Wonder_jest.test("test one light", (function (param) {
                                                                                        var match = _prepareOne(sandbox, state[0]);
                                                                                        var state$1 = PointLightAPI$Wonderjs.setPointLightIntensity(match[3], 2, match[0]);
                                                                                        var match$1 = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.setFakeGlForLight(sandbox, /* array */["u_pointLights[0].intensity"], state$1);
                                                                                        DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match$1[0]));
                                                                                        return Sinon.toCalledWith(ArrayService$Wonderjs.push(2, /* array */[Caml_array.caml_array_get(match$1[1], 0)]), Wonder_jest.Expect[/* expect */0](match$1[2][0]));
                                                                                      }));
                                                                        }));
                                                                  Wonder_jest.describe("send constant", (function (param) {
                                                                          return Wonder_jest.test("test one light", (function (param) {
                                                                                        var match = _prepareOne(sandbox, state[0]);
                                                                                        var state$1 = PointLightAPI$Wonderjs.setPointLightConstant(match[3], 2, match[0]);
                                                                                        var match$1 = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.setFakeGlForLight(sandbox, /* array */["u_pointLights[0].constant"], state$1);
                                                                                        DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match$1[0]));
                                                                                        return Sinon.toCalledWith(ArrayService$Wonderjs.push(2, /* array */[Caml_array.caml_array_get(match$1[1], 0)]), Wonder_jest.Expect[/* expect */0](match$1[2][0]));
                                                                                      }));
                                                                        }));
                                                                  Wonder_jest.describe("send linear", (function (param) {
                                                                          return Wonder_jest.test("test one light", (function (param) {
                                                                                        var match = _prepareOne(sandbox, state[0]);
                                                                                        var state$1 = PointLightAPI$Wonderjs.setPointLightLinear(match[3], 2, match[0]);
                                                                                        var match$1 = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.setFakeGlForLight(sandbox, /* array */["u_pointLights[0].linear"], state$1);
                                                                                        DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match$1[0]));
                                                                                        return Sinon.toCalledWith(ArrayService$Wonderjs.push(2, /* array */[Caml_array.caml_array_get(match$1[1], 0)]), Wonder_jest.Expect[/* expect */0](match$1[2][0]));
                                                                                      }));
                                                                        }));
                                                                  Wonder_jest.describe("send quadratic", (function (param) {
                                                                          return Wonder_jest.test("test one light", (function (param) {
                                                                                        var match = _prepareOne(sandbox, state[0]);
                                                                                        var state$1 = PointLightAPI$Wonderjs.setPointLightQuadratic(match[3], 2.5, match[0]);
                                                                                        var match$1 = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.setFakeGlForLight(sandbox, /* array */["u_pointLights[0].quadratic"], state$1);
                                                                                        DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match$1[0]));
                                                                                        return Sinon.toCalledWith(ArrayService$Wonderjs.push(2.5, /* array */[Caml_array.caml_array_get(match$1[1], 0)]), Wonder_jest.Expect[/* expect */0](match$1[2][0]));
                                                                                      }));
                                                                        }));
                                                                  return Wonder_jest.describe("send range", (function (param) {
                                                                                return Wonder_jest.test("test one light", (function (param) {
                                                                                              var match = _prepareOne(sandbox, state[0]);
                                                                                              var state$1 = PointLightAPI$Wonderjs.setPointLightRange(match[3], 2, match[0]);
                                                                                              var match$1 = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.setFakeGlForLight(sandbox, /* array */["u_pointLights[0].range"], state$1);
                                                                                              DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match$1[0]));
                                                                                              return Sinon.toCalledWith(ArrayService$Wonderjs.push(2, /* array */[Caml_array.caml_array_get(match$1[1], 0)]), Wonder_jest.Expect[/* expect */0](match$1[2][0]));
                                                                                            }));
                                                                              }));
                                                                }));
                                                  }));
                                    }));
                      }));
                Wonder_jest.describe("test send light material data", (function (param) {
                        GLSLSenderTool$Wonderjs.JudgeSendUniformData[/* testSendFloat */5](sandbox, "u_shininess", (function (param, param$1, param$2, state) {
                                return LightMaterialAPI$Wonderjs.setLightMaterialShininess(param$1[1], 30, state);
                              }), 30, FrontRenderLightJobTool$Wonderjs.prepareGameObject, undefined, /* () */0);
                        GLSLSenderTool$Wonderjs.JudgeSendUniformData[/* testSendVector3 */4](sandbox, "u_diffuse", (function (param, param$1, param$2, state) {
                                return LightMaterialAPI$Wonderjs.setLightMaterialDiffuseColor(param$1[1], /* array */[
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
                        GLSLSenderTool$Wonderjs.JudgeSendUniformData[/* testSendVector3 */4](sandbox, "u_specular", (function (param, param$1, param$2, state) {
                                return LightMaterialAPI$Wonderjs.setLightMaterialSpecularColor(param$1[1], /* array */[
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
                        return Wonder_jest.describe("test with map", (function (param) {
                                      return Wonder_jest.describe("send u_diffuseMapSampler, u_specularMapSampler", (function (param) {
                                                    var _prepare = function (state) {
                                                      var match = FrontRenderLightJobTool$Wonderjs.prepareGameObjectWithCreatedMap(sandbox, state);
                                                      var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                                                      var uniform1i = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                      var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_diffuseMapSampler");
                                                      var getUniformLocation$1 = GLSLLocationTool$Wonderjs.stubLocation(getUniformLocation, 1, sandbox, "u_specularMapSampler");
                                                      var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation$1), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(uniform1i), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                                                      return /* tuple */[
                                                              state$1,
                                                              /* tuple */[
                                                                0,
                                                                1
                                                              ],
                                                              uniform1i
                                                            ];
                                                    };
                                                    return Wonder_jest.test("test send", (function (param) {
                                                                  var match = _prepare(state[0]);
                                                                  var uniform1i = match[2];
                                                                  var match$1 = match[1];
                                                                  DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match[0]));
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                  SinonTool$Wonderjs.calledWithArg2(uniform1i, match$1[0], 0),
                                                                                  SinonTool$Wonderjs.calledWithArg2(uniform1i, match$1[1], 1)
                                                                                ]), /* tuple */[
                                                                              true,
                                                                              true
                                                                            ]);
                                                                }));
                                                  }));
                                    }));
                      }));
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
                        ]), FrontRenderLightJobTool$Wonderjs.prepareGameObject, undefined, /* () */0);
                GLSLSenderTool$Wonderjs.JudgeSendUniformData[/* testSendMatrix3 */2](sandbox, "u_normalMatrix", (function (gameObjectTransform, cameraTransform, param, state) {
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
                        Wonder_jest.test("send per each gameObject", (function (param) {
                                var match = Curry._3(prepareSendUniformData, sandbox, FrontRenderLightJobTool$Wonderjs.prepareGameObject, state[0]);
                                var match$1 = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, match[0]);
                                var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(match[2][0], /* tuple */[
                                      1,
                                      2,
                                      3
                                    ], match$1[0]);
                                var uniformMatrix3fv = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_normalMatrix");
                                var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(uniformMatrix3fv), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$2));
                                return Sinon.toCalledTwice(Wonder_jest.Expect[/* expect */0](uniformMatrix3fv));
                              }));
                        return Wonder_jest.describe("test cache", (function (param) {
                                      return Wonder_jest.test("test in different loops", (function (param) {
                                                    var match = Curry._3(prepareSendUniformData, sandbox, FrontRenderLightJobTool$Wonderjs.prepareGameObject, state[0]);
                                                    var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(match[2][0], /* tuple */[
                                                          1,
                                                          2,
                                                          3
                                                        ], match[0]);
                                                    var uniformMatrix3fv = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                    var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_normalMatrix");
                                                    var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(uniformMatrix3fv), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                                    var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$2));
                                                    DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                                                    return Sinon.toCalledTwice(Wonder_jest.Expect[/* expect */0](uniformMatrix3fv));
                                                  }));
                                    }));
                      }), /* () */0);
                return Wonder_jest.describe("fix bug", (function (param) {
                              var _prepare = function (state) {
                                var match = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, state);
                                var match$1 = FrontRenderLightJobTool$Wonderjs.prepareGameObjectWithCreatedMap(sandbox, match[0]);
                                var match$2 = CameraTool$Wonderjs.createCameraGameObject(match$1[0]);
                                var uniform3f = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_color");
                                var getUniformLocation$1 = GLSLLocationTool$Wonderjs.stubLocation(getUniformLocation, 1, sandbox, "u_diffuse");
                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation$1), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(uniform3f), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$2[0]);
                                return /* tuple */[
                                        state$1,
                                        /* tuple */[
                                          0,
                                          1
                                        ],
                                        uniform3f
                                      ];
                              };
                              return Wonder_jest.test("should send uniform data which has different shaders but the same materials", (function (param) {
                                            var match = _prepare(state[0]);
                                            var uniform3f = match[2];
                                            var match$1 = match[1];
                                            DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match[0]));
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            SinonTool$Wonderjs.calledWith(uniform3f, match$1[0]),
                                                            SinonTool$Wonderjs.calledWith(uniform3f, match$1[1])
                                                          ]), /* tuple */[
                                                        true,
                                                        true
                                                      ]);
                                          }));
                            }));
              }));
        Wonder_jest.describe("bind map", (function (param) {
                Wonder_jest.test("if not has map, not bind", (function (param) {
                        var match = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, state[0]);
                        var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                        var bindTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(bindTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                        DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                        return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](bindTexture)));
                      }));
                return Wonder_jest.describe("else", (function (param) {
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
                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 8, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 0, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createTexture), Caml_option.some(activeTexture), Caml_option.some(bindTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$2[0]);
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
                              Wonder_jest.test("test not cache texture", (function (param) {
                                      var match = _prepare(state[0]);
                                      var state$1 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match[0]));
                                      DirectorTool$Wonderjs.runWithDefaultTime(state$1);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(match[4][0])), 4);
                                    }));
                              Wonder_jest.test("active texture unit", (function (param) {
                                      var match = _prepare(state[0]);
                                      var activeTexture = match[4][0];
                                      DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match[0]));
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      SinonTool$Wonderjs.calledWith(activeTexture, 0),
                                                      SinonTool$Wonderjs.calledWith(activeTexture, 1)
                                                    ]), /* tuple */[
                                                  true,
                                                  true
                                                ]);
                                    }));
                              Wonder_jest.test("bind gl texture to TEXTURE_2D target", (function (param) {
                                      var match = _prepare(state[0]);
                                      var bindTexture = match[4][1];
                                      var match$1 = match[1];
                                      var texture2D = match$1[0];
                                      DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match[0]));
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      SinonTool$Wonderjs.calledWithArg2(bindTexture, texture2D, match$1[1]),
                                                      SinonTool$Wonderjs.calledWithArg2(bindTexture, texture2D, match$1[2])
                                                    ]), /* tuple */[
                                                  true,
                                                  true
                                                ]);
                                    }));
                              return Wonder_jest.describe("test remove map", (function (param) {
                                            return Wonder_jest.test("new map's unit should be removed one", (function (param) {
                                                          var match = _prepare(state[0]);
                                                          var activeTexture = match[4][0];
                                                          var material = match[2];
                                                          var state$1 = LightMaterialAPI$Wonderjs.removeLightMaterialSpecularMap(material, match[0]);
                                                          var match$1 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state$1);
                                                          var state$2 = LightMaterialAPI$Wonderjs.setLightMaterialSpecularMap(material, match$1[1], match$1[0]);
                                                          DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$2));
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                          SinonTool$Wonderjs.calledWith(activeTexture, 0),
                                                                          SinonTool$Wonderjs.calledWith(activeTexture, 1)
                                                                        ]), /* tuple */[
                                                                      true,
                                                                      true
                                                                    ]);
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("update map", (function (param) {
                var _prepare = function (state, $staropt$star, $staropt$star$1, param) {
                  var width = $staropt$star !== undefined ? $staropt$star : 2;
                  var height = $staropt$star$1 !== undefined ? $staropt$star$1 : 4;
                  var match = FrontRenderLightJobTool$Wonderjs.prepareGameObjectWithCreatedDiffuseMap(sandbox, state);
                  var diffuseMap = match[5];
                  var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                  var source1 = BasicSourceTextureTool$Wonderjs.buildSource(width, height);
                  var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureSource(diffuseMap, source1, match$1[0]);
                  return /* tuple */[
                          state$1,
                          diffuseMap
                        ];
                };
                Wonder_jest.test("if is updated before, not update", (function (param) {
                        var match = _prepare(state[0], undefined, undefined, /* () */0);
                        var pixelStorei = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(pixelStorei), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                        var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                        var pixelStoreiCallCount = Sinon.getCallCount(Sinon.withOneArg(2, pixelStorei));
                        var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                        DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(2, pixelStorei))), pixelStoreiCallCount);
                      }));
                Wonder_jest.test("if source not exist, not update", (function (param) {
                        var match = FrontRenderLightJobTool$Wonderjs.prepareGameObjectWithCreatedMap(sandbox, state[0]);
                        var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                        var pixelStorei = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(pixelStorei), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                        DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                        return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](Sinon.withOneArg(2, pixelStorei))));
                      }));
                Wonder_jest.test("set flipY", (function (param) {
                        var match = _prepare(state[0], undefined, undefined, /* () */0);
                        var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureFlipY(match[1], true, match[0]);
                        var pixelStorei = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(pixelStorei), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                        DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$2));
                        return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withTwoArgs(2, true, pixelStorei)));
                      }));
                Wonder_jest.test("set unpack_colorspace_conversion_webgl to be none", (function (param) {
                        var match = _prepare(state[0], undefined, undefined, /* () */0);
                        var pixelStorei = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 3, Caml_option.some(pixelStorei), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                        DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                        return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withTwoArgs(3, 2, pixelStorei)));
                      }));
                Wonder_jest.describe("set texture parameters", (function (param) {
                        Wonder_jest.describe("if source is power of two", (function (param) {
                                var _prepare$1 = function (state) {
                                  var match = _prepare(state, 2, 4, /* () */0);
                                  return /* tuple */[
                                          match[0],
                                          match[1]
                                        ];
                                };
                                Wonder_jest.test("set wrap", (function (param) {
                                        var match = _prepare$1(state[0]);
                                        var texParameteri = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                        var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, 2, 3, undefined, undefined, undefined, undefined, 4, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(texParameteri), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                        DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                        Sinon.getCallCount(Sinon.withThreeArgs(1, 2, 4, texParameteri)),
                                                        Sinon.getCallCount(Sinon.withThreeArgs(1, 3, 4, texParameteri))
                                                      ]), /* tuple */[
                                                    1,
                                                    1
                                                  ]);
                                      }));
                                return Wonder_jest.test("set filter", (function (param) {
                                              var match = _prepare$1(state[0]);
                                              var texParameteri = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, 4, 5, undefined, undefined, undefined, 2, undefined, undefined, 3, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(texParameteri), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                              DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              Sinon.getCallCount(Sinon.withThreeArgs(1, 4, 3, texParameteri)),
                                                              Sinon.getCallCount(Sinon.withThreeArgs(1, 5, 2, texParameteri))
                                                            ]), /* tuple */[
                                                          1,
                                                          1
                                                        ]);
                                            }));
                              }));
                        return Wonder_jest.describe("else", (function (param) {
                                      var _prepare$1 = function (state) {
                                        var match = _prepare(state, 3, 4, /* () */0);
                                        return /* tuple */[
                                                match[0],
                                                match[1]
                                              ];
                                      };
                                      Wonder_jest.test("set wrap to Clamp_to_edge", (function (param) {
                                              var match = _prepare$1(state[0]);
                                              var texParameteri = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, 2, 3, undefined, undefined, undefined, undefined, 4, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(texParameteri), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                              DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              Sinon.getCallCount(Sinon.withThreeArgs(1, 2, 4, texParameteri)),
                                                              Sinon.getCallCount(Sinon.withThreeArgs(1, 3, 4, texParameteri))
                                                            ]), /* tuple */[
                                                          1,
                                                          1
                                                        ]);
                                            }));
                                      return Wonder_jest.describe("set filter with fallback", (function (param) {
                                                    var _setFakeGl = function (sandbox, state) {
                                                      var texParameteri = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                      var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, 4, 5, undefined, undefined, undefined, 2, undefined, undefined, 3, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(texParameteri), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
                                                      return /* tuple */[
                                                              state$1,
                                                              1,
                                                              2,
                                                              3,
                                                              4,
                                                              5,
                                                              texParameteri
                                                            ];
                                                    };
                                                    Wonder_jest.test("if filter === Nearest or NEAREST_MIPMAP_MEAREST or Nearest_mipmap_linear, set Nearest", (function (param) {
                                                            var match = _prepare$1(state[0]);
                                                            var map = match[1];
                                                            var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureMinFilter(map, BasicSourceTextureTool$Wonderjs.getNearest(/* () */0), BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureMagFilter(map, BasicSourceTextureTool$Wonderjs.getNearestMipmapLinear(/* () */0), match[0]));
                                                            var match$1 = _setFakeGl(sandbox, state$1);
                                                            var texParameteri = match$1[6];
                                                            var nearest = match$1[2];
                                                            var texture2D = match$1[1];
                                                            DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match$1[0]));
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                            Sinon.getCallCount(Sinon.withThreeArgs(texture2D, match$1[4], nearest, texParameteri)),
                                                                            Sinon.getCallCount(Sinon.withThreeArgs(texture2D, match$1[5], nearest, texParameteri))
                                                                          ]), /* tuple */[
                                                                        1,
                                                                        1
                                                                      ]);
                                                          }));
                                                    return Wonder_jest.test("else, set Linear", (function (param) {
                                                                  var match = _prepare$1(state[0]);
                                                                  var map = match[1];
                                                                  var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureMinFilter(map, BasicSourceTextureTool$Wonderjs.getLinear(/* () */0), BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureMagFilter(map, BasicSourceTextureTool$Wonderjs.getLinearMipmapNearest(/* () */0), match[0]));
                                                                  var match$1 = _setFakeGl(sandbox, state$1);
                                                                  var texParameteri = match$1[6];
                                                                  var linear = match$1[3];
                                                                  var texture2D = match$1[1];
                                                                  DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match$1[0]));
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                  Sinon.getCallCount(Sinon.withThreeArgs(texture2D, match$1[4], linear, texParameteri)),
                                                                                  Sinon.getCallCount(Sinon.withThreeArgs(texture2D, match$1[5], linear, texParameteri))
                                                                                ]), /* tuple */[
                                                                              1,
                                                                              1
                                                                            ]);
                                                                }));
                                                  }));
                                    }));
                      }));
                Wonder_jest.describe("allocate source to texture", (function (param) {
                        return Wonder_jest.describe("draw no mipmap twoD texture", (function (param) {
                                      Wonder_jest.test("test draw", (function (param) {
                                              var match = _prepare(state[0], undefined, undefined, /* () */0);
                                              var state$1 = match[0];
                                              var source = BasicSourceTextureAPI$Wonderjs.unsafeGetBasicSourceTextureSource(match[1], state$1);
                                              var texImage2D = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 3, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(texImage2D), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                              DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$2));
                                              return Sinon.toCalledWith(/* array */[
                                                          1,
                                                          0,
                                                          2,
                                                          2,
                                                          3,
                                                          source
                                                        ], Wonder_jest.Expect[/* expect */0](texImage2D));
                                            }));
                                      return Wonder_jest.test("test different format,type", (function (param) {
                                                    var match = _prepare(state[0], undefined, undefined, /* () */0);
                                                    var map = match[1];
                                                    var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureFormat(map, BasicSourceTextureTool$Wonderjs.getAlpha(/* () */0), match[0]);
                                                    var state$2 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureType(map, BasicSourceTextureTool$Wonderjs.getUnsignedShort565(/* () */0), state$1);
                                                    var source = BasicSourceTextureAPI$Wonderjs.unsafeGetBasicSourceTextureSource(map, state$2);
                                                    var texImage2D = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                    var state$3 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 3, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(texImage2D), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$2);
                                                    DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$3));
                                                    return Sinon.toCalledWith(/* array */[
                                                                1,
                                                                0,
                                                                2,
                                                                2,
                                                                3,
                                                                source
                                                              ], Wonder_jest.Expect[/* expect */0](texImage2D));
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("generate mipmap", (function (param) {
                              var _exec = function (state) {
                                var generateMipmap = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(generateMipmap), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
                                var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                return /* tuple */[
                                        state$2,
                                        1,
                                        generateMipmap
                                      ];
                              };
                              Wonder_jest.test("if filter is mipmap and is source power of two, generate", (function (param) {
                                      var match = _prepare(state[0], 2, 4, /* () */0);
                                      var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureMagFilter(match[1], BasicSourceTextureTool$Wonderjs.getNearestMipmapNearest(/* () */0), match[0]);
                                      var match$1 = _exec(state$1);
                                      return Sinon.toCalledWith(/* array */[match$1[1]], Wonder_jest.Expect[/* expect */0](match$1[2]));
                                    }));
                              return Wonder_jest.describe("else, not generate", (function (param) {
                                            Wonder_jest.test("test filter isn't mipmap", (function (param) {
                                                    var match = _prepare(state[0], 2, 4, /* () */0);
                                                    var map = match[1];
                                                    var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureMinFilter(map, BasicSourceTextureTool$Wonderjs.getNearest(/* () */0), BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureMagFilter(map, BasicSourceTextureTool$Wonderjs.getNearest(/* () */0), match[0]));
                                                    var match$1 = _exec(state$1);
                                                    return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](match$1[2])));
                                                  }));
                                            return Wonder_jest.test("test source isn't power of two", (function (param) {
                                                          var match = _prepare(state[0], 1, 4, /* () */0);
                                                          var map = match[1];
                                                          var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureMinFilter(map, BasicSourceTextureTool$Wonderjs.getNearest(/* () */0), BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureMagFilter(map, BasicSourceTextureTool$Wonderjs.getLinearMipmapLinear(/* () */0), match[0]));
                                                          var match$1 = _exec(state$1);
                                                          return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](match$1[2])));
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("test set map at runtime which has no map before", (function (param) {
                return Wonder_jest.test("replace material component", (function (param) {
                              var match = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, state[0]);
                              var gameObject1 = match[1];
                              var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                              var uniform1i = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                              var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_diffuseMapSampler");
                              var getUniformLocation$1 = GLSLLocationTool$Wonderjs.stubLocation(getUniformLocation, 1, sandbox, "u_specularMapSampler");
                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation$1), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(uniform1i), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                              var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                              var state$3 = GameObjectAPI$Wonderjs.disposeGameObjectLightMaterialComponent(gameObject1, match[3], state$2);
                              var match$2 = LightMaterialTool$Wonderjs.createMaterialWithMap(state$3);
                              var state$4 = GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject1, match$2[1], match$2[0]);
                              var state$5 = GameObjectAPI$Wonderjs.initGameObject(gameObject1, state$4);
                              DirectorTool$Wonderjs.runWithDefaultTime(state$5);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              Sinon.getCallCount(Sinon.withOneArg(0, uniform1i)),
                                              Sinon.getCallCount(Sinon.withOneArg(1, uniform1i))
                                            ]), /* tuple */[
                                          1,
                                          1
                                        ]);
                            }));
              }));
        Wonder_jest.describe("test remove map at runtime which has map before", (function (param) {
                return Wonder_jest.test("replace material component", (function (param) {
                              var match = FrontRenderLightJobTool$Wonderjs.prepareGameObjectWithCreatedMap(sandbox, state[0]);
                              var gameObject1 = match[1];
                              var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                              var uniform1i = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                              var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_diffuseMapSampler");
                              var getUniformLocation$1 = GLSLLocationTool$Wonderjs.stubLocation(getUniformLocation, 1, sandbox, "u_specularMapSampler");
                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation$1), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(uniform1i), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                              var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                              var state$3 = GameObjectAPI$Wonderjs.disposeGameObjectLightMaterialComponent(gameObject1, match[3], state$2);
                              var match$2 = LightMaterialAPI$Wonderjs.createLightMaterial(state$3);
                              var state$4 = GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject1, match$2[1], match$2[0]);
                              var state$5 = GameObjectAPI$Wonderjs.initGameObject(gameObject1, state$4);
                              DirectorTool$Wonderjs.runWithDefaultTime(state$5);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              Sinon.getCallCount(Sinon.withOneArg(0, uniform1i)),
                                              Sinon.getCallCount(Sinon.withOneArg(1, uniform1i))
                                            ]), /* tuple */[
                                          1,
                                          1
                                        ]);
                            }));
              }));
        return Wonder_jest.describe("draw", (function (param) {
                      return Wonder_jest.describe("if geometry has index buffer, bind index buffer and drawElements", (function (param) {
                                    var _prepareForDrawElements = function (sandbox, state) {
                                      var match = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, state);
                                      var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                                      return /* tuple */[
                                              match$1[0],
                                              match[2],
                                              match[4]
                                            ];
                                    };
                                    return Wonder_jest.describe("drawElements", (function (param) {
                                                  Wonder_jest.test("test drawMode", (function (param) {
                                                          var match = _prepareForDrawElements(sandbox, state[0]);
                                                          var state$1 = MeshRendererAPI$Wonderjs.setMeshRendererDrawMode(match[2], MeshRendererTool$Wonderjs.getLines(/* () */0), match[0]);
                                                          var drawElements = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                          var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(drawElements), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                                          var state$3 = RenderJobsTool$Wonderjs.init(state$2);
                                                          DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                                                          return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withOneArg(1, drawElements)));
                                                        }));
                                                  return Wonder_jest.test("test drawElements", (function (param) {
                                                                var match = _prepareForDrawElements(sandbox, state[0]);
                                                                var drawElements = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(drawElements), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                                var state$2 = RenderJobsTool$Wonderjs.init(state$1);
                                                                var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                                                return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withFourArgs(1, GeometryTool$Wonderjs.getIndicesCount(match[1], CreateRenderStateMainService$Wonderjs.createRenderState(state$3)), GeometryTool$Wonderjs.getIndexType(CreateRenderStateMainService$Wonderjs.createRenderState(state$3)), Caml_int32.imul(GeometryTool$Wonderjs.getIndexTypeSize(CreateRenderStateMainService$Wonderjs.createRenderState(state$3)), 0), drawElements)));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
