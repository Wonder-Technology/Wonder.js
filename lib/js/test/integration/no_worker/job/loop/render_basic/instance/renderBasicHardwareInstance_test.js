'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var FakeGlTool$Wonderjs = require("../../../../../../tool/gl/FakeGlTool.js");
var SettingTool$Wonderjs = require("../../../../../../tool/service/setting/SettingTool.js");
var DirectorTool$Wonderjs = require("../../../../../../tool/core/DirectorTool.js");
var GeometryTool$Wonderjs = require("../../../../../../tool/service/geometry/GeometryTool.js");
var InstanceTool$Wonderjs = require("../../../../../../tool/service/instance/InstanceTool.js");
var MainStateTool$Wonderjs = require("../../../../../../tool/service/state/MainStateTool.js");
var GLSLSenderTool$Wonderjs = require("../../../../../../tool/service/sender/GLSLSenderTool.js");
var RenderJobsTool$Wonderjs = require("../../../../../../tool/job/no_worker/loop/RenderJobsTool.js");
var BasicMaterialAPI$Wonderjs = require("../../../../../../../src/api/material/BasicMaterialAPI.js");
var FakeGlWorkerTool$Wonderjs = require("../../../../../worker/tool/FakeGlWorkerTool.js");
var SourceInstanceAPI$Wonderjs = require("../../../../../../../src/api/SourceInstanceAPI.js");
var InstanceBufferTool$Wonderjs = require("../../../../../../tool/service/vboBuffer/InstanceBufferTool.js");
var RenderBasicJobTool$Wonderjs = require("../../../../../../tool/job/render_basic/RenderBasicJobTool.js");
var RenderHardwareInstanceTool$Wonderjs = require("../../../../../../tool/render/instance/RenderHardwareInstanceTool.js");
var RenderBasicHardwareInstanceTool$Wonderjs = require("../../../../../../tool/render/instance/RenderBasicHardwareInstanceTool.js");
var RenderBasicHardwareInstanceForNoWorkerAndWorkerJobTool$Wonderjs = require("../../../../../tool/job/RenderBasicHardwareInstanceForNoWorkerAndWorkerJobTool.js");

Wonder_jest.describe("test render basic hardware instance", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = RenderJobsTool$Wonderjs.initWithJobConfigAndBufferConfig(sandbox, RenderBasicJobTool$Wonderjs.buildNoWorkerJobConfig(/* () */0), SettingTool$Wonderjs.buildBufferConfigStr(300, undefined, 500, 48, 48, undefined, undefined, undefined, undefined, undefined, undefined, 3, 100, /* () */0));
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("use program", (function (param) {
                return RenderHardwareInstanceTool$Wonderjs.testProgram(sandbox, RenderBasicHardwareInstanceTool$Wonderjs.prepare, state);
              }));
        Wonder_jest.describe("send attribute data", (function (param) {
                return Wonder_jest.describe("send sourceInstance gameObject's a_position", (function (param) {
                              return RenderHardwareInstanceTool$Wonderjs.testAttachBufferToAttribute(sandbox, /* tuple */[
                                          "a_position",
                                          0,
                                          3
                                        ], RenderBasicHardwareInstanceTool$Wonderjs.prepare, state);
                            }));
              }));
        Wonder_jest.describe("send uniform data", (function (param) {
                RenderHardwareInstanceTool$Wonderjs.testSendShaderUniformData(sandbox, /* tuple */[
                      RenderBasicHardwareInstanceTool$Wonderjs.prepare,
                      RenderBasicHardwareInstanceTool$Wonderjs.createSourceInstanceGameObject
                    ], state);
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
                          ], undefined, undefined, /* () */0);
              }));
        Wonder_jest.describe("send instance data", (function (param) {
                Wonder_jest.describe("create instance buffer when first send", (function (param) {
                        Wonder_jest.test("test create buffer", (function (param) {
                                var match = RenderBasicHardwareInstanceTool$Wonderjs.prepare(sandbox, state[0]);
                                var createBuffer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createBuffer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(createBuffer)), 3);
                              }));
                        return Wonder_jest.test("test not create buffer when second call", (function (param) {
                                      var match = RenderBasicHardwareInstanceTool$Wonderjs.prepare(sandbox, state[0]);
                                      var createBuffer = Sinon.returns(1, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                      var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createBuffer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                      var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                      DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(createBuffer)), 3);
                                    }));
                      }));
                Wonder_jest.describe("set instance buffer's capacity", (function (param) {
                        Wonder_jest.describe("contract check", (function (param) {
                                return Wonder_jest.test("capacity should be a multiplier of 4", (function (param) {
                                              return Wonder_jest.Expect[/* toThrowMessage */21]("capacity should be a multiplier of 4", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                                return InstanceBufferTool$Wonderjs.createMatrixFloat32Array(3);
                                                              })));
                                            }));
                              }));
                        return Wonder_jest.describe("if current capacity < target capacity", (function (param) {
                                      var _prepare = function (sandbox, state) {
                                        var match = RenderBasicHardwareInstanceTool$Wonderjs.prepare(sandbox, state);
                                        var match$1 = match[2];
                                        var sourceInstance = match$1[3];
                                        var state$1 = match[0];
                                        for(var _for = 0; _for <= 62; ++_for){
                                          SourceInstanceAPI$Wonderjs.createObjectInstanceGameObject(sourceInstance, state$1);
                                        }
                                        return /* tuple */[
                                                state$1,
                                                match[1],
                                                sourceInstance,
                                                match$1[4]
                                              ];
                                      };
                                      Wonder_jest.describe("delete old instance buffer", (function (param) {
                                              var _prepare$1 = function (sandbox, state) {
                                                var match = _prepare(sandbox, state[0]);
                                                var createBuffer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                Sinon.returns(1, Sinon.onCall(2, createBuffer));
                                                Sinon.returns(2, Sinon.onCall(3, createBuffer));
                                                var deleteBuffer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                return /* tuple */[
                                                        match[0],
                                                        1,
                                                        2,
                                                        createBuffer,
                                                        deleteBuffer
                                                      ];
                                              };
                                              Wonder_jest.test("test delete", (function (param) {
                                                      var match = _prepare$1(sandbox, state);
                                                      var deleteBuffer = match[4];
                                                      var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(deleteBuffer), undefined, undefined, undefined, undefined, Caml_option.some(match[3]), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                      DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                                      return Sinon.toCalledWith(/* array */[match[1]], Wonder_jest.Expect[/* expect */0](deleteBuffer));
                                                    }));
                                              return Wonder_jest.test("not bind deleted buffer", (function (param) {
                                                            var match = _prepare$1(sandbox, state);
                                                            var bindBuffer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                            var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(match[4]), undefined, undefined, Caml_option.some(bindBuffer), undefined, Caml_option.some(match[3]), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                            DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withTwoArgs(Sinon$1.match.any, match[1], bindBuffer))), 1);
                                                          }));
                                            }));
                                      Wonder_jest.test("create new one", (function (param) {
                                              var match = _prepare(sandbox, state[0]);
                                              var createBuffer = Sinon.returns(1, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createBuffer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                              DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(createBuffer)), 4);
                                            }));
                                      Wonder_jest.test("bufferData with increased capacity and dynamic draw", (function (param) {
                                              var match = _prepare(sandbox, state[0]);
                                              var bufferData = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(bufferData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                              DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                              return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withThreeArgs(1, 8192, 2, bufferData)));
                                            }));
                                      return Wonder_jest.describe("fix bug", (function (param) {
                                                    return Wonder_jest.describe("test in the next render(if current capacity >= target capacity)", (function (param) {
                                                                  Wonder_jest.test("should use the instance buffer created in the previous render", (function (param) {
                                                                          var match = _prepare(sandbox, state[0]);
                                                                          var createBuffer = Sinon.returns(1, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                                                          var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createBuffer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                                          var state$2 = RenderJobsTool$Wonderjs.init(state$1);
                                                                          var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](InstanceBufferTool$Wonderjs.getOrCreateBuffer(match[2], InstanceBufferTool$Wonderjs.getDefaultCapacity(/* () */0), state$3)), 1);
                                                                        }));
                                                                  return Wonder_jest.test("shouldn't create instance buffer", (function (param) {
                                                                                var match = _prepare(sandbox, state[0]);
                                                                                var createBuffer = Sinon.returns(1, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                                                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createBuffer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                                                var state$2 = RenderJobsTool$Wonderjs.init(state$1);
                                                                                var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                                                                var callCount = Sinon.getCallCount(createBuffer);
                                                                                DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(createBuffer)), callCount);
                                                                              }));
                                                                }));
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("send modelMatrix data", (function (param) {
                              Wonder_jest.describe("send sourceInstance gameObject's and objectInstanceGameObject gameObjects' model matrices", (function (param) {
                                      var _prepare = function (sandbox, state) {
                                        var match = RenderBasicHardwareInstanceTool$Wonderjs.prepare(sandbox, state);
                                        var match$1 = match[2];
                                        return /* tuple */[
                                                match[0],
                                                match[1],
                                                match$1[3],
                                                match$1[4]
                                              ];
                                      };
                                      return Wonder_jest.test("buffer sub data", (function (param) {
                                                    var match = RenderBasicHardwareInstanceForNoWorkerAndWorkerJobTool$Wonderjs.prepareForBufferSubDataCase(sandbox, _prepare, state);
                                                    var bufferSubData = match[3];
                                                    var array_buffer = match[2];
                                                    var match$1 = match[1];
                                                    var state$1 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, array_buffer, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(bufferSubData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                    DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                                    return RenderBasicHardwareInstanceForNoWorkerAndWorkerJobTool$Wonderjs.testForBufferSubDataCase(sandbox, /* tuple */[
                                                                match$1[0],
                                                                match$1[1]
                                                              ], array_buffer, bufferSubData, MainStateTool$Wonderjs.unsafeGetState(/* () */0));
                                                  }));
                                    }));
                              return Wonder_jest.describe("handle instance data position", (function (param) {
                                            var _prepareForHandleInstanceData = function (sandbox, state) {
                                              var match = RenderBasicHardwareInstanceTool$Wonderjs.prepare(sandbox, state[0]);
                                              return RenderBasicHardwareInstanceForNoWorkerAndWorkerJobTool$Wonderjs.prepareGetAttribLocationForHandleInstanceData(sandbox, match[0]);
                                            };
                                            Wonder_jest.describe("vertexAttribPointer instance data", (function (param) {
                                                    Wonder_jest.test("test first data", (function (param) {
                                                            var match = RenderBasicHardwareInstanceTool$Wonderjs.prepareForTestVertexAttribPointer(sandbox, _prepareForHandleInstanceData, state);
                                                            return Sinon.toCalledWith(/* array */[
                                                                        match[2][0],
                                                                        4,
                                                                        match[1],
                                                                        false,
                                                                        64,
                                                                        0
                                                                      ], Wonder_jest.Expect[/* expect */0](match[3]));
                                                          }));
                                                    Wonder_jest.test("test second data", (function (param) {
                                                            var match = RenderBasicHardwareInstanceTool$Wonderjs.prepareForTestVertexAttribPointer(sandbox, _prepareForHandleInstanceData, state);
                                                            return Sinon.toCalledWith(/* array */[
                                                                        match[2][1],
                                                                        4,
                                                                        match[1],
                                                                        false,
                                                                        64,
                                                                        16
                                                                      ], Wonder_jest.Expect[/* expect */0](match[3]));
                                                          }));
                                                    Wonder_jest.test("test third data", (function (param) {
                                                            var match = RenderBasicHardwareInstanceTool$Wonderjs.prepareForTestVertexAttribPointer(sandbox, _prepareForHandleInstanceData, state);
                                                            return Sinon.toCalledWith(/* array */[
                                                                        match[2][2],
                                                                        4,
                                                                        match[1],
                                                                        false,
                                                                        64,
                                                                        32
                                                                      ], Wonder_jest.Expect[/* expect */0](match[3]));
                                                          }));
                                                    return Wonder_jest.test("test fourth data", (function (param) {
                                                                  var match = RenderBasicHardwareInstanceTool$Wonderjs.prepareForTestVertexAttribPointer(sandbox, _prepareForHandleInstanceData, state);
                                                                  return Sinon.toCalledWith(/* array */[
                                                                              match[2][3],
                                                                              4,
                                                                              match[1],
                                                                              false,
                                                                              64,
                                                                              48
                                                                            ], Wonder_jest.Expect[/* expect */0](match[3]));
                                                                }));
                                                  }));
                                            Wonder_jest.test("vertexAttribDivisorANGLE 1", (function (param) {
                                                    var match = _prepareForHandleInstanceData(sandbox, state);
                                                    var state$1 = match[0];
                                                    var vertexAttribDivisorANGLE = InstanceTool$Wonderjs.getExtensionInstancedArrays(state$1).vertexAttribDivisorANGLE;
                                                    var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(match[5]), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                                    var state$3 = RenderJobsTool$Wonderjs.init(state$2);
                                                    DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                    Sinon.getCallCount(Sinon.withTwoArgs(match[1], 1, vertexAttribDivisorANGLE)),
                                                                    Sinon.getCallCount(Sinon.withTwoArgs(match[2], 1, vertexAttribDivisorANGLE)),
                                                                    Sinon.getCallCount(Sinon.withTwoArgs(match[3], 1, vertexAttribDivisorANGLE)),
                                                                    Sinon.getCallCount(Sinon.withTwoArgs(match[4], 1, vertexAttribDivisorANGLE))
                                                                  ]), /* tuple */[
                                                                1,
                                                                1,
                                                                1,
                                                                1
                                                              ]);
                                                  }));
                                            Wonder_jest.test("enableVertexAttribArray instance data", (function (param) {
                                                    var match = _prepareForHandleInstanceData(sandbox, state);
                                                    var enableVertexAttribArray = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                    var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(match[5]), undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(enableVertexAttribArray), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                    var state$2 = RenderJobsTool$Wonderjs.init(state$1);
                                                    DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                    Sinon.getCallCount(Sinon.withOneArg(match[1], enableVertexAttribArray)),
                                                                    Sinon.getCallCount(Sinon.withOneArg(match[2], enableVertexAttribArray)),
                                                                    Sinon.getCallCount(Sinon.withOneArg(match[3], enableVertexAttribArray)),
                                                                    Sinon.getCallCount(Sinon.withOneArg(match[4], enableVertexAttribArray))
                                                                  ]), /* tuple */[
                                                                1,
                                                                1,
                                                                1,
                                                                1
                                                              ]);
                                                  }));
                                            return Wonder_jest.describe("optimize", (function (param) {
                                                          return Wonder_jest.describe("add isTransformStatic logic", (function (param) {
                                                                        var _prepareForBufferSubData = function (sandbox, isStatic, state) {
                                                                          var match = RenderBasicHardwareInstanceTool$Wonderjs.prepare(sandbox, state[0]);
                                                                          var sourceInstance = match[2][3];
                                                                          var state$1 = SourceInstanceAPI$Wonderjs.markSourceInstanceModelMatrixIsStatic(sourceInstance, isStatic, match[0]);
                                                                          var bufferSubData = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                          var bindBuffer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                          var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(bindBuffer), undefined, undefined, undefined, Caml_option.some(bufferSubData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                                                          var state$3 = RenderJobsTool$Wonderjs.init(state$2);
                                                                          return /* tuple */[
                                                                                  state$3,
                                                                                  sourceInstance,
                                                                                  /* tuple */[
                                                                                    bufferSubData,
                                                                                    bindBuffer
                                                                                  ]
                                                                                ];
                                                                        };
                                                                        Wonder_jest.describe("if isTransformStatic is true", (function (param) {
                                                                                Wonder_jest.test("if not send data before, send data", (function (param) {
                                                                                        var match = _prepareForBufferSubData(sandbox, true, state);
                                                                                        DirectorTool$Wonderjs.runWithDefaultTime(match[0]);
                                                                                        return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](match[2][0]));
                                                                                      }));
                                                                                return Wonder_jest.describe("else", (function (param) {
                                                                                              Wonder_jest.test("not buffer data", (function (param) {
                                                                                                      var match = _prepareForBufferSubData(sandbox, true, state);
                                                                                                      var state$1 = DirectorTool$Wonderjs.runWithDefaultTime(match[0]);
                                                                                                      DirectorTool$Wonderjs.runWithDefaultTime(state$1);
                                                                                                      return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](match[2][0]));
                                                                                                    }));
                                                                                              Wonder_jest.test("bind instance buffer", (function (param) {
                                                                                                      var match = _prepareForBufferSubData(sandbox, true, state);
                                                                                                      var bindBuffer = match[2][1];
                                                                                                      var state$1 = DirectorTool$Wonderjs.runWithDefaultTime(match[0]);
                                                                                                      var callCount = Sinon.getCallCount(bindBuffer);
                                                                                                      DirectorTool$Wonderjs.runWithDefaultTime(state$1);
                                                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(bindBuffer)), callCount + 3 | 0);
                                                                                                    }));
                                                                                              Wonder_jest.describe("vertexAttribPointer instance data", (function (param) {
                                                                                                      return Wonder_jest.test("test first data", (function (param) {
                                                                                                                    var match = RenderBasicHardwareInstanceTool$Wonderjs.prepareForTestVertexAttribPointer(sandbox, _prepareForHandleInstanceData, state);
                                                                                                                    var vertexAttribPointer = match[3];
                                                                                                                    var callCount = Sinon.getCallCount(vertexAttribPointer);
                                                                                                                    DirectorTool$Wonderjs.runWithDefaultTime(match[0]);
                                                                                                                    return Sinon.toCalledWith(/* array */[
                                                                                                                                match[2][0],
                                                                                                                                4,
                                                                                                                                match[1],
                                                                                                                                false,
                                                                                                                                64,
                                                                                                                                0
                                                                                                                              ], Wonder_jest.Expect[/* expect */0](Sinon.getCall(callCount + 1 | 0, vertexAttribPointer)));
                                                                                                                  }));
                                                                                                    }));
                                                                                              Wonder_jest.test("vertexAttribDivisorANGLE 1", (function (param) {
                                                                                                      var match = _prepareForHandleInstanceData(sandbox, state);
                                                                                                      var state$1 = match[0];
                                                                                                      var vertexAttribDivisorANGLE = InstanceTool$Wonderjs.getExtensionInstancedArrays(state$1).vertexAttribDivisorANGLE;
                                                                                                      var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(match[5]), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                                                                                      var state$3 = RenderJobsTool$Wonderjs.init(state$2);
                                                                                                      var state$4 = DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                                                                                                      DirectorTool$Wonderjs.runWithDefaultTime(state$4);
                                                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                                      Sinon.getCallCount(Sinon.withTwoArgs(match[1], 1, vertexAttribDivisorANGLE)),
                                                                                                                      Sinon.getCallCount(Sinon.withTwoArgs(match[2], 1, vertexAttribDivisorANGLE)),
                                                                                                                      Sinon.getCallCount(Sinon.withTwoArgs(match[3], 1, vertexAttribDivisorANGLE)),
                                                                                                                      Sinon.getCallCount(Sinon.withTwoArgs(match[4], 1, vertexAttribDivisorANGLE))
                                                                                                                    ]), /* tuple */[
                                                                                                                  2,
                                                                                                                  2,
                                                                                                                  2,
                                                                                                                  2
                                                                                                                ]);
                                                                                                    }));
                                                                                              return Wonder_jest.test("not enableVertexAttribArray instance data(because alreay enable before)", (function (param) {
                                                                                                            var match = _prepareForHandleInstanceData(sandbox, state);
                                                                                                            var enableVertexAttribArray = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                                                            var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(match[5]), undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(enableVertexAttribArray), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                                                                            var state$2 = RenderJobsTool$Wonderjs.init(state$1);
                                                                                                            var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                                                                                            DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                                                                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                                            Sinon.getCallCount(Sinon.withOneArg(match[1], enableVertexAttribArray)),
                                                                                                                            Sinon.getCallCount(Sinon.withOneArg(match[2], enableVertexAttribArray)),
                                                                                                                            Sinon.getCallCount(Sinon.withOneArg(match[3], enableVertexAttribArray)),
                                                                                                                            Sinon.getCallCount(Sinon.withOneArg(match[4], enableVertexAttribArray))
                                                                                                                          ]), /* tuple */[
                                                                                                                        1,
                                                                                                                        1,
                                                                                                                        1,
                                                                                                                        1
                                                                                                                      ]);
                                                                                                          }));
                                                                                            }));
                                                                              }));
                                                                        Wonder_jest.describe("else", (function (param) {
                                                                                return Wonder_jest.test("send data", (function (param) {
                                                                                              var match = _prepareForBufferSubData(sandbox, false, state);
                                                                                              DirectorTool$Wonderjs.runWithDefaultTime(match[0]);
                                                                                              return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](match[2][0]));
                                                                                            }));
                                                                              }));
                                                                        Wonder_jest.describe("support switch static to dynamic", (function (param) {
                                                                                return Wonder_jest.describe("test after switch", (function (param) {
                                                                                              return Wonder_jest.test("send data", (function (param) {
                                                                                                            var match = _prepareForBufferSubData(sandbox, false, state);
                                                                                                            var state$1 = DirectorTool$Wonderjs.runWithDefaultTime(match[0]);
                                                                                                            var state$2 = SourceInstanceAPI$Wonderjs.markSourceInstanceModelMatrixIsStatic(match[1], false, state$1);
                                                                                                            var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                                                                                            DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                                                                                                            return Sinon.toCalledThrice(Wonder_jest.Expect[/* expect */0](match[2][0]));
                                                                                                          }));
                                                                                            }));
                                                                              }));
                                                                        Wonder_jest.describe("support switch dynamic to static", (function (param) {
                                                                                return Wonder_jest.describe("test after switch", (function (param) {
                                                                                              return Wonder_jest.test("send data in the next render, and not send data in the next next render", (function (param) {
                                                                                                            var match = _prepareForBufferSubData(sandbox, false, state);
                                                                                                            var state$1 = DirectorTool$Wonderjs.runWithDefaultTime(match[0]);
                                                                                                            var state$2 = SourceInstanceAPI$Wonderjs.markSourceInstanceModelMatrixIsStatic(match[1], true, state$1);
                                                                                                            var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                                                                                            var state$4 = DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                                                                                                            DirectorTool$Wonderjs.runWithDefaultTime(state$4);
                                                                                                            return Sinon.toCalledTwice(Wonder_jest.Expect[/* expect */0](match[2][0]));
                                                                                                          }));
                                                                                            }));
                                                                              }));
                                                                        return Wonder_jest.describe("support switch static to dynamic to static", (function (param) {
                                                                                      return Wonder_jest.describe("test after switch", (function (param) {
                                                                                                    return Wonder_jest.test("send data in the next render, and not send data in the next next render", (function (param) {
                                                                                                                  var match = _prepareForBufferSubData(sandbox, false, state);
                                                                                                                  var sourceInstance = match[1];
                                                                                                                  var state$1 = DirectorTool$Wonderjs.runWithDefaultTime(match[0]);
                                                                                                                  var state$2 = SourceInstanceAPI$Wonderjs.markSourceInstanceModelMatrixIsStatic(sourceInstance, false, state$1);
                                                                                                                  var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                                                                                                  var state$4 = SourceInstanceAPI$Wonderjs.markSourceInstanceModelMatrixIsStatic(sourceInstance, true, state$3);
                                                                                                                  var state$5 = DirectorTool$Wonderjs.runWithDefaultTime(state$4);
                                                                                                                  var state$6 = DirectorTool$Wonderjs.runWithDefaultTime(state$5);
                                                                                                                  var state$7 = DirectorTool$Wonderjs.runWithDefaultTime(state$6);
                                                                                                                  DirectorTool$Wonderjs.runWithDefaultTime(state$7);
                                                                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(match[2][0])), 3);
                                                                                                                }));
                                                                                                  }));
                                                                                    }));
                                                                      }));
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("draw instance", (function (param) {
                Wonder_jest.describe("test source gameObject has box geometry component", (function (param) {
                        return RenderHardwareInstanceTool$Wonderjs.testDrawElementsInstancedANGLE(sandbox, RenderBasicHardwareInstanceTool$Wonderjs.prepare, GeometryTool$Wonderjs.getIndicesCount, state);
                      }));
                return Wonder_jest.describe("test source gameObject has custom geometry component", (function (param) {
                              return RenderHardwareInstanceTool$Wonderjs.testDrawElementsInstancedANGLE(sandbox, RenderBasicHardwareInstanceTool$Wonderjs.prepareWithGeometry, GeometryTool$Wonderjs.getIndicesCount, state);
                            }));
              }));
        return Wonder_jest.describe("unbind", (function (param) {
                      var _prepareForHandleInstanceData = function (sandbox, state) {
                        var match = RenderBasicHardwareInstanceTool$Wonderjs.prepare(sandbox, state[0]);
                        return RenderBasicHardwareInstanceForNoWorkerAndWorkerJobTool$Wonderjs.prepareGetAttribLocationForHandleInstanceData(sandbox, match[0]);
                      };
                      return Wonder_jest.test("reset instance data position divisor to 0", (function (param) {
                                    var match = _prepareForHandleInstanceData(sandbox, state);
                                    var pos1 = match[1];
                                    var state$1 = match[0];
                                    var vertexAttribDivisorANGLE = InstanceTool$Wonderjs.getExtensionInstancedArrays(state$1).vertexAttribDivisorANGLE;
                                    var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(match[5]), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                    var state$3 = RenderJobsTool$Wonderjs.init(state$2);
                                    var state$4 = DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                    Sinon.getCallCount(Sinon.withTwoArgs(pos1, 0, vertexAttribDivisorANGLE)),
                                                    Sinon.getCallCount(Sinon.withTwoArgs(match[2], 0, vertexAttribDivisorANGLE)),
                                                    Sinon.getCallCount(Sinon.withTwoArgs(match[3], 0, vertexAttribDivisorANGLE)),
                                                    Sinon.getCallCount(Sinon.withTwoArgs(match[4], 0, vertexAttribDivisorANGLE)),
                                                    Sinon.calledAfter(Sinon.withTwoArgs(pos1, 0, vertexAttribDivisorANGLE), InstanceTool$Wonderjs.getExtensionInstancedArrays(state$4).drawElementsInstancedANGLE)
                                                  ]), /* tuple */[
                                                1,
                                                1,
                                                1,
                                                1,
                                                true
                                              ]);
                                  }));
                    }));
      }));

/*  Not a pure module */
