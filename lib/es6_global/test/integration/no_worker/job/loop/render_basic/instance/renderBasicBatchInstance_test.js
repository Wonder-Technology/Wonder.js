

import * as Curry from "./../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_option from "./../../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "./../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as CameraTool$Wonderjs from "../../../../../../tool/service/camera/CameraTool.js";
import * as FakeGlTool$Wonderjs from "../../../../../../tool/gl/FakeGlTool.js";
import * as DirectorTool$Wonderjs from "../../../../../../tool/core/DirectorTool.js";
import * as GeometryTool$Wonderjs from "../../../../../../tool/service/geometry/GeometryTool.js";
import * as InstanceTool$Wonderjs from "../../../../../../tool/service/instance/InstanceTool.js";
import * as TransformAPI$Wonderjs from "../../../../../../../src/api/TransformAPI.js";
import * as GameObjectAPI$Wonderjs from "../../../../../../../src/api/GameObjectAPI.js";
import * as MainStateTool$Wonderjs from "../../../../../../tool/service/state/MainStateTool.js";
import * as VboBufferTool$Wonderjs from "../../../../../../tool/service/vboBuffer/VboBufferTool.js";
import * as GLSLSenderTool$Wonderjs from "../../../../../../tool/service/sender/GLSLSenderTool.js";
import * as GameObjectTool$Wonderjs from "../../../../../../tool/service/gameObject/GameObjectTool.js";
import * as RenderJobsTool$Wonderjs from "../../../../../../tool/job/no_worker/loop/RenderJobsTool.js";
import * as BasicMaterialAPI$Wonderjs from "../../../../../../../src/api/material/BasicMaterialAPI.js";
import * as GLSLLocationTool$Wonderjs from "../../../../../../tool/service/location/GLSLLocationTool.js";
import * as SourceInstanceAPI$Wonderjs from "../../../../../../../src/api/SourceInstanceAPI.js";
import * as TypeArrayPoolTool$Wonderjs from "../../../../../../tool/structure/TypeArrayPoolTool.js";
import * as RenderBasicJobTool$Wonderjs from "../../../../../../tool/job/render_basic/RenderBasicJobTool.js";
import * as RenderBatchInstanceTool$Wonderjs from "../../../../../../tool/render/instance/RenderBatchInstanceTool.js";
import * as RenderBasicBatchInstanceTool$Wonderjs from "../../../../../../tool/render/instance/RenderBasicBatchInstanceTool.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

Wonder_jest.describe("test render basic batch instance", (function (param) {
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
        Wonder_jest.describe("use program", (function (param) {
                return RenderBatchInstanceTool$Wonderjs.testProgram(sandbox, RenderBasicBatchInstanceTool$Wonderjs.prepare, state);
              }));
        Wonder_jest.describe("send attribute data", (function (param) {
                return Wonder_jest.describe("send sourceInstance gameObject's a_position", (function (param) {
                              return RenderBatchInstanceTool$Wonderjs.testAttachBufferToAttribute(sandbox, /* tuple */[
                                          "a_position",
                                          0,
                                          3
                                        ], RenderBasicBatchInstanceTool$Wonderjs.prepare, state);
                            }));
              }));
        Wonder_jest.describe("send uniform data", (function (param) {
                RenderBatchInstanceTool$Wonderjs.testSendShaderUniformData(sandbox, /* tuple */[
                      RenderBasicBatchInstanceTool$Wonderjs.prepare,
                      RenderBasicBatchInstanceTool$Wonderjs.createSourceInstanceGameObject
                    ], state);
                GLSLSenderTool$Wonderjs.JudgeSendUniformData[/* testSendVector3 */4](sandbox, "u_color", (function (param, param$1, param$2, state) {
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
                    ], undefined, undefined, /* () */0);
                return Wonder_jest.describe("send object instance gameObject's data", (function (param) {
                              return Wonder_jest.test("send u_mMatrix data", (function (param) {
                                            var match = RenderBasicBatchInstanceTool$Wonderjs.prepare(sandbox, 2, state[0]);
                                            var match$1 = RenderBasicBatchInstanceTool$Wonderjs.createSourceInstanceGameObject(sandbox, 3, match[0]);
                                            var uniformMatrix4fv = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                            var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(1, sandbox, "u_mMatrix");
                                            var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(uniformMatrix4fv), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                                            DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(1, uniformMatrix4fv))), 7);
                                          }));
                            }));
              }));
        Wonder_jest.describe("draw", (function (param) {
                Wonder_jest.describe("test source gameObject has box geometry component", (function (param) {
                        return RenderBatchInstanceTool$Wonderjs.testDrawElements(sandbox, RenderBasicBatchInstanceTool$Wonderjs.prepare, GeometryTool$Wonderjs.getIndicesCount, state);
                      }));
                return Wonder_jest.describe("test source gameObject has custom geometry component", (function (param) {
                              return RenderBatchInstanceTool$Wonderjs.testDrawElements(sandbox, RenderBasicBatchInstanceTool$Wonderjs.prepareWithGeometry, GeometryTool$Wonderjs.getIndicesCount, state);
                            }));
              }));
        return Wonder_jest.describe("fix bug", (function (param) {
                      Wonder_jest.describe("if sourceInstance gameObject not has  objectInstanceGameObjects,", (function (param) {
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
                              Wonder_jest.test("should send sourceInstance gameObject u_mMatrix", (function (param) {
                                      var match = _prepare(state[0]);
                                      var state$1 = match[0];
                                      var state$2 = TransformAPI$Wonderjs.setTransformLocalPosition(GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(match[1], state$1), /* tuple */[
                                            1,
                                            2,
                                            5
                                          ], state$1);
                                      var uniformMatrix4fv = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                      var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(1, sandbox, "u_mMatrix");
                                      var state$3 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(uniformMatrix4fv), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$2);
                                      DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$3));
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withThreeArgs(1, false, new Float32Array(/* array */[
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
                              return Wonder_jest.test("should still draw sourceInstance gameObject", (function (param) {
                                            var match = _prepare(state[0]);
                                            var drawElements = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                            var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(drawElements), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                            var state$2 = RenderJobsTool$Wonderjs.init(state$1);
                                            DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                            return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](drawElements));
                                          }));
                            }));
                      return Wonder_jest.describe("dispose", (function (param) {
                                    Wonder_jest.test("not add buffer to pool", (function (param) {
                                            var match = RenderBasicBatchInstanceTool$Wonderjs.prepare(sandbox, 2, state[0]);
                                            var createBuffer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                            var createBuffer$1 = Sinon.returns(1, createBuffer);
                                            var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createBuffer$1), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                            var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                            var state$3 = GameObjectTool$Wonderjs.disposeGameObject(match[1], state$2);
                                            var match$1 = VboBufferTool$Wonderjs.getVboBufferRecord(state$3);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MutableSparseMapService$WonderCommonlib.length(match$1[/* matrixInstanceBufferPool */7])), 0);
                                          }));
                                    return Wonder_jest.test("not add matrixFloat32ArrayMap->typeArray to pool", (function (param) {
                                                  var match = RenderBasicBatchInstanceTool$Wonderjs.prepare(sandbox, 2, state[0]);
                                                  var createBuffer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                  var createBuffer$1 = Sinon.returns(1, createBuffer);
                                                  var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createBuffer$1), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                  var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                                  var state$3 = GameObjectTool$Wonderjs.disposeGameObject(match[1], state$2);
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MutableSparseMapService$WonderCommonlib.length(TypeArrayPoolTool$Wonderjs.getFloat32ArrayPoolMap(state$3[/* typeArrayPoolRecord */38]))), 0);
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
