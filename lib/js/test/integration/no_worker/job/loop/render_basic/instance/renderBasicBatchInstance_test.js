'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var CameraTool$Wonderjs = require("../../../../../../tool/service/camera/CameraTool.js");
var FakeGlTool$Wonderjs = require("../../../../../../tool/gl/FakeGlTool.js");
var DirectorTool$Wonderjs = require("../../../../../../tool/core/DirectorTool.js");
var GeometryTool$Wonderjs = require("../../../../../../tool/service/geometry/GeometryTool.js");
var InstanceTool$Wonderjs = require("../../../../../../tool/service/instance/InstanceTool.js");
var TransformAPI$Wonderjs = require("../../../../../../../src/api/TransformAPI.js");
var GameObjectAPI$Wonderjs = require("../../../../../../../src/api/GameObjectAPI.js");
var MainStateTool$Wonderjs = require("../../../../../../tool/service/state/MainStateTool.js");
var VboBufferTool$Wonderjs = require("../../../../../../tool/service/vboBuffer/VboBufferTool.js");
var GLSLSenderTool$Wonderjs = require("../../../../../../tool/service/sender/GLSLSenderTool.js");
var GameObjectTool$Wonderjs = require("../../../../../../tool/service/gameObject/GameObjectTool.js");
var RenderJobsTool$Wonderjs = require("../../../../../../tool/job/no_worker/loop/RenderJobsTool.js");
var BasicMaterialAPI$Wonderjs = require("../../../../../../../src/api/material/BasicMaterialAPI.js");
var GLSLLocationTool$Wonderjs = require("../../../../../../tool/service/location/GLSLLocationTool.js");
var SparseMapService$Wonderjs = require("../../../../../../../src/service/atom/SparseMapService.js");
var LoopRenderJobTool$Wonderjs = require("../../../../../../tool/job/no_worker/loop/LoopRenderJobTool.js");
var SourceInstanceAPI$Wonderjs = require("../../../../../../../src/api/SourceInstanceAPI.js");
var TypeArrayPoolTool$Wonderjs = require("../../../../../../tool/structure/TypeArrayPoolTool.js");
var RenderBasicJobTool$Wonderjs = require("../../../../../../tool/job/render_basic/RenderBasicJobTool.js");
var BasicSourceTextureAPI$Wonderjs = require("../../../../../../../src/api/texture/BasicSourceTextureAPI.js");
var BasicSourceTextureTool$Wonderjs = require("../../../../../../tool/service/texture/BasicSourceTextureTool.js");
var RenderBatchInstanceTool$Wonderjs = require("../../../../../../tool/render/instance/RenderBatchInstanceTool.js");
var RenderBasicMaterialMapTool$Wonderjs = require("../../tool/RenderBasicMaterialMapTool.js");
var RenderBasicBatchInstanceTool$Wonderjs = require("../../../../../../tool/render/instance/RenderBasicBatchInstanceTool.js");

describe("test render basic batch instance", (function () {
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
                return RenderBatchInstanceTool$Wonderjs.testProgram(sandbox, RenderBasicBatchInstanceTool$Wonderjs.prepare, state);
              }));
        describe("send attribute data", (function () {
                describe("send sourceInstance gameObject's a_position", (function () {
                        return RenderBatchInstanceTool$Wonderjs.testAttachBufferToAttribute(sandbox, /* tuple */[
                                    "a_position",
                                    0,
                                    3
                                  ], RenderBasicBatchInstanceTool$Wonderjs.prepare, state);
                      }));
                return /* () */0;
              }));
        describe("send uniform data", (function () {
                RenderBatchInstanceTool$Wonderjs.testSendShaderUniformData(sandbox, /* tuple */[
                      RenderBasicBatchInstanceTool$Wonderjs.prepare,
                      RenderBasicBatchInstanceTool$Wonderjs.createSourceInstanceGameObject
                    ], state);
                GLSLSenderTool$Wonderjs.JudgeSendUniformData[/* testSendVector3 */4](sandbox, "u_color", (function (_, param, _$1, state) {
                        return BasicMaterialAPI$Wonderjs.setBasicMaterialColor(param[1], /* array */[
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
                    ], undefined, undefined, /* () */0);
                describe("send object instance gameObject's data", (function () {
                        return Wonder_jest.test("send u_mMatrix data", (function () {
                                      var match = RenderBasicBatchInstanceTool$Wonderjs.prepare(sandbox, 2, state[0]);
                                      var match$1 = RenderBasicBatchInstanceTool$Wonderjs.createSourceInstanceGameObject(sandbox, 3, match[0]);
                                      var uniformMatrix4fv = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                      var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(1, sandbox, "u_mMatrix");
                                      var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(uniformMatrix4fv), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                                      DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(1, uniformMatrix4fv))), 7);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("bind and update sourceInstance's gameObject's map", (function () {
                Wonder_jest.test("bind map", (function () {
                        var match = RenderBasicBatchInstanceTool$Wonderjs.prepare(sandbox, 2, state[0]);
                        var state$1 = match[0];
                        var material = GameObjectAPI$Wonderjs.unsafeGetGameObjectBasicMaterialComponent(match[1], state$1);
                        var match$1 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state$1);
                        var state$2 = BasicMaterialAPI$Wonderjs.setBasicMaterialMap(material, match$1[1], match$1[0]);
                        return RenderBasicMaterialMapTool$Wonderjs.testBindMap(sandbox, state$2);
                      }));
                return Wonder_jest.test("update map", (function () {
                              var match = RenderBasicBatchInstanceTool$Wonderjs.prepare(sandbox, 2, state[0]);
                              var state$1 = match[0];
                              var material = GameObjectAPI$Wonderjs.unsafeGetGameObjectBasicMaterialComponent(match[1], state$1);
                              var match$1 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state$1);
                              var map = match$1[1];
                              var source = BasicSourceTextureTool$Wonderjs.buildSource(2, 4);
                              var state$2 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureSource(map, source, match$1[0]);
                              var state$3 = BasicMaterialAPI$Wonderjs.setBasicMaterialMap(material, map, state$2);
                              return RenderBasicMaterialMapTool$Wonderjs.testUpdateMap(sandbox, state$3);
                            }));
              }));
        describe("draw", (function () {
                describe("test source gameObject has box geometry component", (function () {
                        return RenderBatchInstanceTool$Wonderjs.testDrawElements(sandbox, RenderBasicBatchInstanceTool$Wonderjs.prepare, GeometryTool$Wonderjs.getIndicesCount, state);
                      }));
                describe("test source gameObject has custom geometry component", (function () {
                        return RenderBatchInstanceTool$Wonderjs.testDrawElements(sandbox, RenderBasicBatchInstanceTool$Wonderjs.prepareWithGeometry, GeometryTool$Wonderjs.getIndicesCount, state);
                      }));
                return /* () */0;
              }));
        describe("fix bug", (function () {
                describe("if sourceInstance gameObject not has  objectInstanceGameObjects,", (function () {
                        var _prepare = function (state) {
                          var state$1 = InstanceTool$Wonderjs.setGPUDetectDataAllowBatchInstance(state);
                          var match = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, state$1);
                          var gameObject = match[1];
                          var match$1 = SourceInstanceAPI$Wonderjs.createSourceInstance(match[0]);
                          var sourceInstance = match$1[1];
                          var state$2 = GameObjectAPI$Wonderjs.addGameObjectSourceInstanceComponent(gameObject, sourceInstance, match$1[0]);
                          var match$2 = CameraTool$Wonderjs.createCameraGameObject(state$2);
                          return /* tuple */[
                                  match$2[0],
                                  gameObject,
                                  match[2],
                                  match[3],
                                  match[4],
                                  sourceInstance
                                ];
                        };
                        Wonder_jest.test("should send sourceInstance gameObject u_mMatrix", (function () {
                                var match = _prepare(state[0]);
                                var state$1 = match[0];
                                var state$2 = TransformAPI$Wonderjs.setTransformLocalPosition(GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(match[1], state$1), /* tuple */[
                                      1,
                                      2,
                                      5
                                    ], state$1);
                                var uniformMatrix4fv = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(1, sandbox, "u_mMatrix");
                                var state$3 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(uniformMatrix4fv), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$2);
                                DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$3));
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withThreeArgs(1, false, new Float32Array(/* array */[
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
                                                            5,
                                                            1
                                                          ]), uniformMatrix4fv))), 1);
                              }));
                        return Wonder_jest.test("should still draw sourceInstance gameObject", (function () {
                                      var match = _prepare(state[0]);
                                      var drawElements = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                      var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(drawElements), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                      var state$2 = RenderJobsTool$Wonderjs.init(state$1);
                                      DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                      return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](drawElements));
                                    }));
                      }));
                describe("dispose", (function () {
                        Wonder_jest.test("not add buffer to pool", (function () {
                                var match = RenderBasicBatchInstanceTool$Wonderjs.prepare(sandbox, 2, state[0]);
                                var createBuffer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                var createBuffer$1 = Sinon.returns(1, createBuffer);
                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(createBuffer$1), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                var state$3 = GameObjectTool$Wonderjs.disposeGameObject(match[1], state$2);
                                var match$1 = VboBufferTool$Wonderjs.getVboBufferRecord(state$3);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](SparseMapService$Wonderjs.length(match$1[/* matrixInstanceBufferPool */7])), 0);
                              }));
                        return Wonder_jest.test("not add matrixFloat32ArrayMap->typeArray to pool", (function () {
                                      var match = RenderBasicBatchInstanceTool$Wonderjs.prepare(sandbox, 2, state[0]);
                                      var createBuffer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                      var createBuffer$1 = Sinon.returns(1, createBuffer);
                                      var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(createBuffer$1), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                      var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                      var state$3 = GameObjectTool$Wonderjs.disposeGameObject(match[1], state$2);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](SparseMapService$Wonderjs.length(TypeArrayPoolTool$Wonderjs.getFloat32ArrayPoolMap(state$3[/* typeArrayPoolRecord */35]))), 0);
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

/*  Not a pure module */
