'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var FakeGlTool$Wonderjs = require("../../../../../../tool/gl/FakeGlTool.js");
var SettingTool$Wonderjs = require("../../../../../../tool/service/setting/SettingTool.js");
var DirectorTool$Wonderjs = require("../../../../../../tool/core/DirectorTool.js");
var InstanceTool$Wonderjs = require("../../../../../../tool/service/instance/InstanceTool.js");
var GameObjectAPI$Wonderjs = require("../../../../../../../src/api/GameObjectAPI.js");
var MainStateTool$Wonderjs = require("../../../../../../tool/service/state/MainStateTool.js");
var GLSLSenderTool$Wonderjs = require("../../../../../../tool/service/sender/GLSLSenderTool.js");
var RenderJobsTool$Wonderjs = require("../../../../../../tool/job/no_worker/loop/RenderJobsTool.js");
var BoxGeometryTool$Wonderjs = require("../../../../../../tool/service/geometry/BoxGeometryTool.js");
var FakeGlWorkerTool$Wonderjs = require("../../../../../worker/tool/FakeGlWorkerTool.js");
var GLSLLocationTool$Wonderjs = require("../../../../../../tool/service/location/GLSLLocationTool.js");
var LightMaterialAPI$Wonderjs = require("../../../../../../../src/api/material/LightMaterialAPI.js");
var LightMaterialTool$Wonderjs = require("../../../../../../tool/service/material/LightMaterialTool.js");
var LoopRenderJobTool$Wonderjs = require("../../../../../../tool/job/no_worker/loop/LoopRenderJobTool.js");
var SourceInstanceAPI$Wonderjs = require("../../../../../../../src/api/SourceInstanceAPI.js");
var InstanceBufferTool$Wonderjs = require("../../../../../../tool/service/vboBuffer/InstanceBufferTool.js");
var RenderMaterialMapTool$Wonderjs = require("../../tool/RenderMaterialMapTool.js");
var FrontRenderLightJobTool$Wonderjs = require("../../../../../../tool/job/no_worker/loop/FrontRenderLightJobTool.js");
var RenderHardwareInstanceTool$Wonderjs = require("../../../../../../tool/render/instance/RenderHardwareInstanceTool.js");
var RenderLightMaterialMapTool$Wonderjs = require("../../tool/RenderLightMaterialMapTool.js");
var FrontRenderLightHardwareInstanceTool$Wonderjs = require("../../../../../../tool/render/instance/FrontRenderLightHardwareInstanceTool.js");
var FrontRenderLightHardwareInstanceForNoWorkerAndWorkerJobTool$Wonderjs = require("../../../../../tool/job/FrontRenderLightHardwareInstanceForNoWorkerAndWorkerJobTool.js");

describe("test front render light hardware instance", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = RenderJobsTool$Wonderjs.initWithJobConfigAndBufferConfig(sandbox, LoopRenderJobTool$Wonderjs.buildNoWorkerJobConfig(/* () */0), SettingTool$Wonderjs.buildBufferConfigStr(300, undefined, 500, 50, 50, undefined, undefined, undefined, 3, 100, /* () */0));
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("use program", (function () {
                return RenderHardwareInstanceTool$Wonderjs.testProgram(sandbox, FrontRenderLightHardwareInstanceTool$Wonderjs.prepare, state);
              }));
        describe("send attribute data", (function () {
                describe("send sourceInstance gameObject's a_position", (function () {
                        return RenderHardwareInstanceTool$Wonderjs.testAttachBufferToAttribute(sandbox, /* tuple */[
                                    "a_position",
                                    0,
                                    3
                                  ], FrontRenderLightHardwareInstanceTool$Wonderjs.prepare, state);
                      }));
                describe("send sourceInstance gameObject's a_normal", (function () {
                        return RenderHardwareInstanceTool$Wonderjs.testAttachBufferToAttribute(sandbox, /* tuple */[
                                    "a_normal",
                                    1,
                                    3
                                  ], FrontRenderLightHardwareInstanceTool$Wonderjs.prepare, state);
                      }));
                return /* () */0;
              }));
        describe("send uniform data", (function () {
                RenderHardwareInstanceTool$Wonderjs.testSendShaderUniformData(sandbox, /* tuple */[
                      FrontRenderLightHardwareInstanceTool$Wonderjs.prepare,
                      FrontRenderLightHardwareInstanceTool$Wonderjs.createSourceInstanceGameObject
                    ], state);
                return GLSLSenderTool$Wonderjs.JudgeSendUniformData[/* testSendVector3 */4](sandbox, "u_diffuse", (function (_, param, _$1, state) {
                              return LightMaterialAPI$Wonderjs.setLightMaterialDiffuseColor(param[1], /* array */[
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
                          ], FrontRenderLightJobTool$Wonderjs.prepareGameObject, undefined, /* () */0);
              }));
        describe("bind and update sourceInstance's gameObject's map", (function () {
                Wonder_jest.test("bind map", (function () {
                        var match = FrontRenderLightHardwareInstanceTool$Wonderjs.prepare(sandbox, state[0]);
                        var state$1 = match[0];
                        var material = GameObjectAPI$Wonderjs.unsafeGetGameObjectLightMaterialComponent(match[1], state$1);
                        var match$1 = LightMaterialTool$Wonderjs.createAndSetMaps(material, state$1);
                        return RenderLightMaterialMapTool$Wonderjs.testBindMap(sandbox, match$1[0]);
                      }));
                return Wonder_jest.test("update map", (function () {
                              var match = FrontRenderLightHardwareInstanceTool$Wonderjs.prepare(sandbox, state[0]);
                              var state$1 = match[0];
                              var material = GameObjectAPI$Wonderjs.unsafeGetGameObjectLightMaterialComponent(match[1], state$1);
                              var match$1 = LightMaterialTool$Wonderjs.createAndSetMaps(material, state$1);
                              var match$2 = match$1[1];
                              var state$2 = RenderMaterialMapTool$Wonderjs.setSource(/* :: */[
                                    match$2[0],
                                    /* :: */[
                                      match$2[1],
                                      /* [] */0
                                    ]
                                  ], match$1[0]);
                              return RenderLightMaterialMapTool$Wonderjs.testUpdateMap(sandbox, state$2);
                            }));
              }));
        describe("send instance data", (function () {
                describe("create instance buffer when first send", (function () {
                        Wonder_jest.test("test create buffer", (function () {
                                var match = FrontRenderLightHardwareInstanceTool$Wonderjs.prepare(sandbox, state[0]);
                                var createBuffer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(createBuffer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(createBuffer)), 4);
                              }));
                        return Wonder_jest.test("test not create buffer when second call", (function () {
                                      var match = FrontRenderLightHardwareInstanceTool$Wonderjs.prepare(sandbox, state[0]);
                                      var createBuffer = Sinon.returns(1, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                      var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(createBuffer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                      var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                      DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(createBuffer)), 4);
                                    }));
                      }));
                describe("set instance buffer's capacity", (function () {
                        describe("contract check", (function () {
                                return Wonder_jest.test("capacity should be a multiplier of 4", (function () {
                                              return Wonder_jest.Expect[/* toThrowMessage */20]("capacity should be a multiplier of 4", Wonder_jest.Expect[/* expect */0]((function () {
                                                                return InstanceBufferTool$Wonderjs.createMatrixFloat32Array(3);
                                                              })));
                                            }));
                              }));
                        describe("if current capacity < target capacity", (function () {
                                var _prepare = function (sandbox, state) {
                                  var match = FrontRenderLightHardwareInstanceTool$Wonderjs.prepare(sandbox, state);
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
                                describe("delete old instance buffer", (function () {
                                        var _prepare$1 = function (sandbox, state) {
                                          var match = _prepare(sandbox, state[0]);
                                          var createBuffer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                          Sinon.returns(1, Sinon.onCall(3, createBuffer));
                                          Sinon.returns(2, Sinon.onCall(4, createBuffer));
                                          var deleteBuffer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                          return /* tuple */[
                                                  match[0],
                                                  1,
                                                  2,
                                                  createBuffer,
                                                  deleteBuffer
                                                ];
                                        };
                                        Wonder_jest.test("test delete", (function () {
                                                var match = _prepare$1(sandbox, state);
                                                var deleteBuffer = match[4];
                                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(deleteBuffer), undefined, undefined, undefined, undefined, Js_primitive.some(match[3]), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                                return Sinon.toCalledWith(/* array */[match[1]], Wonder_jest.Expect[/* expect */0](deleteBuffer));
                                              }));
                                        return Wonder_jest.test("not bind deleted buffer", (function () {
                                                      var match = _prepare$1(sandbox, state);
                                                      var bindBuffer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                      var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(match[4]), undefined, undefined, Js_primitive.some(bindBuffer), undefined, Js_primitive.some(match[3]), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                      DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withTwoArgs(Sinon$1.match.any, match[1], bindBuffer))), 1);
                                                    }));
                                      }));
                                Wonder_jest.test("create new one", (function () {
                                        var match = _prepare(sandbox, state[0]);
                                        var createBuffer = Sinon.returns(1, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                        var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(createBuffer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                        DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(createBuffer)), 5);
                                      }));
                                return Wonder_jest.test("bufferData with increased capacity and dynamic draw", (function () {
                                              var match = _prepare(sandbox, state[0]);
                                              var bufferData = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(bufferData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                              DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                              return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withThreeArgs(1, 12800, 2, bufferData)));
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("send modelMatrix and normalMatrix data", (function () {
                        describe("send sourceInstance gameObject's and objectInstanceGameObject gameObjects' model matrices and normal matrices", (function () {
                                var _prepare = function (sandbox, state) {
                                  var match = FrontRenderLightHardwareInstanceTool$Wonderjs.prepare(sandbox, state);
                                  var match$1 = match[2];
                                  return /* tuple */[
                                          match[0],
                                          match[1],
                                          match$1[3],
                                          match$1[4]
                                        ];
                                };
                                return Wonder_jest.test("buffer sub data", (function () {
                                              var match = FrontRenderLightHardwareInstanceForNoWorkerAndWorkerJobTool$Wonderjs.prepareForBufferSubDataCase(sandbox, _prepare, state);
                                              var bufferSubData = match[3];
                                              var array_buffer = match[2];
                                              var match$1 = match[1];
                                              var state$1 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, array_buffer, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(bufferSubData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                              DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                              return FrontRenderLightHardwareInstanceForNoWorkerAndWorkerJobTool$Wonderjs.testForBufferSubDataCase(sandbox, /* tuple */[
                                                          match$1[0],
                                                          match$1[1]
                                                        ], array_buffer, bufferSubData, MainStateTool$Wonderjs.unsafeGetState(/* () */0));
                                            }));
                              }));
                        describe("handle instance data position", (function () {
                                var _prepare = function (sandbox, state) {
                                  var match = FrontRenderLightHardwareInstanceTool$Wonderjs.prepare(sandbox, state[0]);
                                  var getAttribLocation = GLSLLocationTool$Wonderjs.getAttribLocation(1, sandbox, "a_mVec4_0");
                                  Sinon.returns(7, Sinon.withTwoArgs(Sinon$1.match.any, "a_normalVec3_2", Sinon.returns(6, Sinon.withTwoArgs(Sinon$1.match.any, "a_normalVec3_1", Sinon.returns(5, Sinon.withTwoArgs(Sinon$1.match.any, "a_normalVec3_0", Sinon.returns(4, Sinon.withTwoArgs(Sinon$1.match.any, "a_mVec4_3", Sinon.returns(3, Sinon.withTwoArgs(Sinon$1.match.any, "a_mVec4_2", Sinon.returns(2, Sinon.withTwoArgs(Sinon$1.match.any, "a_mVec4_1", getAttribLocation))))))))))));
                                  return /* tuple */[
                                          match[0],
                                          /* tuple */[
                                            1,
                                            2,
                                            3,
                                            4,
                                            5,
                                            6,
                                            7
                                          ],
                                          getAttribLocation
                                        ];
                                };
                                Wonder_jest.test("enableVertexAttribArray instance data", (function () {
                                        var match = _prepare(sandbox, state);
                                        var match$1 = match[1];
                                        var enableVertexAttribArray = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                        var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(match[2]), undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(enableVertexAttribArray), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                        var state$2 = RenderJobsTool$Wonderjs.init(state$1);
                                        DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                        Sinon.getCallCount(Sinon.withOneArg(match$1[0], enableVertexAttribArray)),
                                                        Sinon.getCallCount(Sinon.withOneArg(match$1[1], enableVertexAttribArray)),
                                                        Sinon.getCallCount(Sinon.withOneArg(match$1[2], enableVertexAttribArray)),
                                                        Sinon.getCallCount(Sinon.withOneArg(match$1[3], enableVertexAttribArray)),
                                                        Sinon.getCallCount(Sinon.withOneArg(match$1[4], enableVertexAttribArray)),
                                                        Sinon.getCallCount(Sinon.withOneArg(match$1[5], enableVertexAttribArray)),
                                                        Sinon.getCallCount(Sinon.withOneArg(match$1[6], enableVertexAttribArray))
                                                      ]), /* tuple */[
                                                    1,
                                                    1,
                                                    1,
                                                    1,
                                                    1,
                                                    1,
                                                    1
                                                  ]);
                                      }));
                                describe("vertexAttribPointer instance data", (function () {
                                        var _prepare$1 = function (sandbox, state) {
                                          var match = _prepare(sandbox, state);
                                          var vertexAttribPointer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                          var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(match[2]), undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(vertexAttribPointer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                          var state$2 = RenderJobsTool$Wonderjs.init(state$1);
                                          DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                          return /* tuple */[
                                                  1,
                                                  match[1],
                                                  vertexAttribPointer
                                                ];
                                        };
                                        describe("test model matrix data ", (function () {
                                                Wonder_jest.test("test first data", (function () {
                                                        var match = _prepare$1(sandbox, state);
                                                        return Sinon.toCalledWith(/* array */[
                                                                    match[1][0],
                                                                    4,
                                                                    match[0],
                                                                    false,
                                                                    100,
                                                                    0
                                                                  ], Wonder_jest.Expect[/* expect */0](match[2]));
                                                      }));
                                                Wonder_jest.test("test second data", (function () {
                                                        var match = _prepare$1(sandbox, state);
                                                        return Sinon.toCalledWith(/* array */[
                                                                    match[1][1],
                                                                    4,
                                                                    match[0],
                                                                    false,
                                                                    100,
                                                                    16
                                                                  ], Wonder_jest.Expect[/* expect */0](match[2]));
                                                      }));
                                                Wonder_jest.test("test third data", (function () {
                                                        var match = _prepare$1(sandbox, state);
                                                        return Sinon.toCalledWith(/* array */[
                                                                    match[1][2],
                                                                    4,
                                                                    match[0],
                                                                    false,
                                                                    100,
                                                                    32
                                                                  ], Wonder_jest.Expect[/* expect */0](match[2]));
                                                      }));
                                                return Wonder_jest.test("test fourth data", (function () {
                                                              var match = _prepare$1(sandbox, state);
                                                              return Sinon.toCalledWith(/* array */[
                                                                          match[1][3],
                                                                          4,
                                                                          match[0],
                                                                          false,
                                                                          100,
                                                                          48
                                                                        ], Wonder_jest.Expect[/* expect */0](match[2]));
                                                            }));
                                              }));
                                        describe("test normal matrix data ", (function () {
                                                Wonder_jest.test("test 5th data", (function () {
                                                        var match = _prepare$1(sandbox, state);
                                                        return Sinon.toCalledWith(/* array */[
                                                                    match[1][4],
                                                                    3,
                                                                    match[0],
                                                                    false,
                                                                    100,
                                                                    64
                                                                  ], Wonder_jest.Expect[/* expect */0](match[2]));
                                                      }));
                                                Wonder_jest.test("test 6th data", (function () {
                                                        var match = _prepare$1(sandbox, state);
                                                        return Sinon.toCalledWith(/* array */[
                                                                    match[1][5],
                                                                    3,
                                                                    match[0],
                                                                    false,
                                                                    100,
                                                                    76
                                                                  ], Wonder_jest.Expect[/* expect */0](match[2]));
                                                      }));
                                                return Wonder_jest.test("test 7th data", (function () {
                                                              var match = _prepare$1(sandbox, state);
                                                              return Sinon.toCalledWith(/* array */[
                                                                          match[1][6],
                                                                          3,
                                                                          match[0],
                                                                          false,
                                                                          100,
                                                                          88
                                                                        ], Wonder_jest.Expect[/* expect */0](match[2]));
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                return Wonder_jest.test("vertexAttribDivisorANGLE 1", (function () {
                                              var match = _prepare(sandbox, state);
                                              var match$1 = match[1];
                                              var state$1 = match[0];
                                              var vertexAttribDivisorANGLE = InstanceTool$Wonderjs.getExtensionInstancedArrays(state$1).vertexAttribDivisorANGLE;
                                              var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(match[2]), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                              var state$3 = RenderJobsTool$Wonderjs.init(state$2);
                                              DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              Sinon.getCallCount(Sinon.withTwoArgs(match$1[0], 1, vertexAttribDivisorANGLE)),
                                                              Sinon.getCallCount(Sinon.withTwoArgs(match$1[1], 1, vertexAttribDivisorANGLE)),
                                                              Sinon.getCallCount(Sinon.withTwoArgs(match$1[2], 1, vertexAttribDivisorANGLE)),
                                                              Sinon.getCallCount(Sinon.withTwoArgs(match$1[3], 1, vertexAttribDivisorANGLE)),
                                                              Sinon.getCallCount(Sinon.withTwoArgs(match$1[4], 1, vertexAttribDivisorANGLE)),
                                                              Sinon.getCallCount(Sinon.withTwoArgs(match$1[5], 1, vertexAttribDivisorANGLE)),
                                                              Sinon.getCallCount(Sinon.withTwoArgs(match$1[6], 1, vertexAttribDivisorANGLE))
                                                            ]), /* tuple */[
                                                          1,
                                                          1,
                                                          1,
                                                          1,
                                                          1,
                                                          1,
                                                          1
                                                        ]);
                                            }));
                              }));
                        describe("optimize", (function () {
                                describe("add isTransformStatic logic", (function () {
                                        var _prepare = function (sandbox, isStatic, state) {
                                          var match = FrontRenderLightHardwareInstanceTool$Wonderjs.prepare(sandbox, state[0]);
                                          var sourceInstance = match[2][3];
                                          var state$1 = SourceInstanceAPI$Wonderjs.markSourceInstanceModelMatrixIsStatic(sourceInstance, isStatic, match[0]);
                                          var bufferSubData = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                          var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(bufferSubData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                          var state$3 = RenderJobsTool$Wonderjs.init(state$2);
                                          return /* tuple */[
                                                  state$3,
                                                  sourceInstance,
                                                  bufferSubData
                                                ];
                                        };
                                        describe("if isTransformStatic is true", (function () {
                                                Wonder_jest.test("if not send data before, send data", (function () {
                                                        var match = _prepare(sandbox, true, state);
                                                        DirectorTool$Wonderjs.runWithDefaultTime(match[0]);
                                                        return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](match[2]));
                                                      }));
                                                return Wonder_jest.test("else, not send data", (function () {
                                                              var match = _prepare(sandbox, true, state);
                                                              var state$1 = DirectorTool$Wonderjs.runWithDefaultTime(match[0]);
                                                              DirectorTool$Wonderjs.runWithDefaultTime(state$1);
                                                              return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](match[2]));
                                                            }));
                                              }));
                                        describe("else", (function () {
                                                return Wonder_jest.test("send data", (function () {
                                                              var match = _prepare(sandbox, false, state);
                                                              DirectorTool$Wonderjs.runWithDefaultTime(match[0]);
                                                              return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](match[2]));
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
        describe("draw instance", (function () {
                return RenderHardwareInstanceTool$Wonderjs.testDrawElementsInstancedANGLE(sandbox, FrontRenderLightHardwareInstanceTool$Wonderjs.prepare, BoxGeometryTool$Wonderjs.getIndicesCount, state);
              }));
        return /* () */0;
      }));

/*  Not a pure module */
