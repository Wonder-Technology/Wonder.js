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
var GameObjectAPI$Wonderjs = require("../../../../../../../src/api/GameObjectAPI.js");
var MainStateTool$Wonderjs = require("../../../../../../tool/service/state/MainStateTool.js");
var GLSLSenderTool$Wonderjs = require("../../../../../../tool/service/sender/GLSLSenderTool.js");
var RenderJobsTool$Wonderjs = require("../../../../../../tool/job/no_worker/loop/RenderJobsTool.js");
var FakeGlWorkerTool$Wonderjs = require("../../../../../worker/tool/FakeGlWorkerTool.js");
var GLSLLocationTool$Wonderjs = require("../../../../../../tool/service/location/GLSLLocationTool.js");
var LightMaterialAPI$Wonderjs = require("../../../../../../../src/api/material/LightMaterialAPI.js");
var LightMaterialTool$Wonderjs = require("../../../../../../tool/service/material/LightMaterialTool.js");
var SourceInstanceAPI$Wonderjs = require("../../../../../../../src/api/SourceInstanceAPI.js");
var InstanceBufferTool$Wonderjs = require("../../../../../../tool/service/vboBuffer/InstanceBufferTool.js");
var RenderMaterialMapTool$Wonderjs = require("../../tool/RenderMaterialMapTool.js");
var FrontRenderLightJobTool$Wonderjs = require("../../../../../../tool/job/no_worker/loop/FrontRenderLightJobTool.js");
var RenderHardwareInstanceTool$Wonderjs = require("../../../../../../tool/render/instance/RenderHardwareInstanceTool.js");
var RenderLightMaterialMapTool$Wonderjs = require("../../tool/RenderLightMaterialMapTool.js");
var FrontRenderLightHardwareInstanceTool$Wonderjs = require("../../../../../../tool/render/instance/FrontRenderLightHardwareInstanceTool.js");
var FrontRenderLightHardwareInstanceForNoWorkerAndWorkerJobTool$Wonderjs = require("../../../../../tool/job/FrontRenderLightHardwareInstanceForNoWorkerAndWorkerJobTool.js");

Wonder_jest.describe("test front render light hardware instance", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = RenderJobsTool$Wonderjs.initWithJobConfigAndBufferConfig(sandbox, FrontRenderLightJobTool$Wonderjs.buildNoWorkerJobConfig(/* () */0), SettingTool$Wonderjs.buildBufferConfigStr(300, undefined, 500, 48, 48, undefined, undefined, undefined, undefined, undefined, undefined, 3, 100, /* () */0));
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("use program", (function (param) {
                return RenderHardwareInstanceTool$Wonderjs.testProgram(sandbox, FrontRenderLightHardwareInstanceTool$Wonderjs.prepare, state);
              }));
        Wonder_jest.describe("send attribute data", (function (param) {
                Wonder_jest.describe("send sourceInstance gameObject's a_position", (function (param) {
                        return RenderHardwareInstanceTool$Wonderjs.testAttachBufferToAttribute(sandbox, /* tuple */[
                                    "a_position",
                                    0,
                                    3
                                  ], FrontRenderLightHardwareInstanceTool$Wonderjs.prepare, state);
                      }));
                return Wonder_jest.describe("send sourceInstance gameObject's a_normal", (function (param) {
                              return RenderHardwareInstanceTool$Wonderjs.testAttachBufferToAttribute(sandbox, /* tuple */[
                                          "a_normal",
                                          1,
                                          3
                                        ], FrontRenderLightHardwareInstanceTool$Wonderjs.prepare, state);
                            }));
              }));
        Wonder_jest.describe("send uniform data", (function (param) {
                RenderHardwareInstanceTool$Wonderjs.testSendShaderUniformData(sandbox, /* tuple */[
                      FrontRenderLightHardwareInstanceTool$Wonderjs.prepare,
                      FrontRenderLightHardwareInstanceTool$Wonderjs.createSourceInstanceGameObject
                    ], state);
                return GLSLSenderTool$Wonderjs.JudgeSendUniformData[/* testSendVector3 */4](sandbox, "u_diffuse", (function (param, param$1, param$2, state) {
                              return LightMaterialAPI$Wonderjs.setLightMaterialDiffuseColor(param$1[1], /* array */[
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
        Wonder_jest.describe("bind and update sourceInstance's gameObject's map", (function (param) {
                Wonder_jest.test("bind map", (function (param) {
                        var match = FrontRenderLightHardwareInstanceTool$Wonderjs.prepare(sandbox, state[0]);
                        var state$1 = match[0];
                        var material = GameObjectAPI$Wonderjs.unsafeGetGameObjectLightMaterialComponent(match[1], state$1);
                        var match$1 = LightMaterialTool$Wonderjs.createAndSetMaps(material, state$1);
                        return RenderLightMaterialMapTool$Wonderjs.testBindMap(sandbox, match$1[0]);
                      }));
                return Wonder_jest.test("update map", (function (param) {
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
        Wonder_jest.describe("send instance data", (function (param) {
                Wonder_jest.describe("create instance buffer when first send", (function (param) {
                        Wonder_jest.test("test create buffer", (function (param) {
                                var match = FrontRenderLightHardwareInstanceTool$Wonderjs.prepare(sandbox, state[0]);
                                var createBuffer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createBuffer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(createBuffer)), 4);
                              }));
                        return Wonder_jest.test("test not create buffer when second call", (function (param) {
                                      var match = FrontRenderLightHardwareInstanceTool$Wonderjs.prepare(sandbox, state[0]);
                                      var createBuffer = Sinon.returns(1, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                      var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createBuffer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                      var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                      DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(createBuffer)), 4);
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
                                      Wonder_jest.describe("delete old instance buffer", (function (param) {
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
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(createBuffer)), 5);
                                            }));
                                      return Wonder_jest.test("bufferData with increased capacity and dynamic draw", (function (param) {
                                                    var match = _prepare(sandbox, state[0]);
                                                    var bufferData = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                    var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(bufferData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                    DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                                    return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withThreeArgs(1, 12800, 2, bufferData)));
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("send modelMatrix and normalMatrix data", (function (param) {
                              Wonder_jest.describe("send sourceInstance gameObject's and objectInstanceGameObject gameObjects' model matrices and normal matrices", (function (param) {
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
                                      return Wonder_jest.test("buffer sub data", (function (param) {
                                                    var match = FrontRenderLightHardwareInstanceForNoWorkerAndWorkerJobTool$Wonderjs.prepareForBufferSubDataCase(sandbox, _prepare, state);
                                                    var bufferSubData = match[3];
                                                    var array_buffer = match[2];
                                                    var match$1 = match[1];
                                                    var state$1 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, array_buffer, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(bufferSubData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                    DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                                    return FrontRenderLightHardwareInstanceForNoWorkerAndWorkerJobTool$Wonderjs.testForBufferSubDataCase(sandbox, /* tuple */[
                                                                match$1[0],
                                                                match$1[1]
                                                              ], array_buffer, bufferSubData, MainStateTool$Wonderjs.unsafeGetState(/* () */0));
                                                  }));
                                    }));
                              Wonder_jest.describe("handle instance data position", (function (param) {
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
                                      Wonder_jest.test("enableVertexAttribArray instance data", (function (param) {
                                              var match = _prepare(sandbox, state);
                                              var match$1 = match[1];
                                              var enableVertexAttribArray = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(match[2]), undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(enableVertexAttribArray), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                              var state$2 = RenderJobsTool$Wonderjs.init(state$1);
                                              DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
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
                                      Wonder_jest.describe("vertexAttribPointer instance data", (function (param) {
                                              var _prepare$1 = function (sandbox, state) {
                                                var match = _prepare(sandbox, state);
                                                var vertexAttribPointer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(match[2]), undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(vertexAttribPointer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                var state$2 = RenderJobsTool$Wonderjs.init(state$1);
                                                DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                                return /* tuple */[
                                                        1,
                                                        match[1],
                                                        vertexAttribPointer
                                                      ];
                                              };
                                              Wonder_jest.describe("test model matrix data ", (function (param) {
                                                      Wonder_jest.test("test first data", (function (param) {
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
                                                      Wonder_jest.test("test second data", (function (param) {
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
                                                      Wonder_jest.test("test third data", (function (param) {
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
                                                      return Wonder_jest.test("test fourth data", (function (param) {
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
                                              return Wonder_jest.describe("test normal matrix data ", (function (param) {
                                                            Wonder_jest.test("test 5th data", (function (param) {
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
                                                            Wonder_jest.test("test 6th data", (function (param) {
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
                                                            return Wonder_jest.test("test 7th data", (function (param) {
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
                                            }));
                                      return Wonder_jest.test("vertexAttribDivisorANGLE 1", (function (param) {
                                                    var match = _prepare(sandbox, state);
                                                    var match$1 = match[1];
                                                    var state$1 = match[0];
                                                    var vertexAttribDivisorANGLE = InstanceTool$Wonderjs.getExtensionInstancedArrays(state$1).vertexAttribDivisorANGLE;
                                                    var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(match[2]), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                                    var state$3 = RenderJobsTool$Wonderjs.init(state$2);
                                                    DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
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
                              return Wonder_jest.describe("optimize", (function (param) {
                                            return Wonder_jest.describe("add isTransformStatic logic", (function (param) {
                                                          var _prepare = function (sandbox, isStatic, state) {
                                                            var match = FrontRenderLightHardwareInstanceTool$Wonderjs.prepare(sandbox, state[0]);
                                                            var sourceInstance = match[2][3];
                                                            var state$1 = SourceInstanceAPI$Wonderjs.markSourceInstanceModelMatrixIsStatic(sourceInstance, isStatic, match[0]);
                                                            var bufferSubData = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                            var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(bufferSubData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                                            var state$3 = RenderJobsTool$Wonderjs.init(state$2);
                                                            return /* tuple */[
                                                                    state$3,
                                                                    sourceInstance,
                                                                    bufferSubData
                                                                  ];
                                                          };
                                                          Wonder_jest.describe("if isTransformStatic is true", (function (param) {
                                                                  Wonder_jest.test("if not send data before, send data", (function (param) {
                                                                          var match = _prepare(sandbox, true, state);
                                                                          DirectorTool$Wonderjs.runWithDefaultTime(match[0]);
                                                                          return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](match[2]));
                                                                        }));
                                                                  return Wonder_jest.test("else, not send data", (function (param) {
                                                                                var match = _prepare(sandbox, true, state);
                                                                                var state$1 = DirectorTool$Wonderjs.runWithDefaultTime(match[0]);
                                                                                DirectorTool$Wonderjs.runWithDefaultTime(state$1);
                                                                                return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](match[2]));
                                                                              }));
                                                                }));
                                                          return Wonder_jest.describe("else", (function (param) {
                                                                        return Wonder_jest.test("send data", (function (param) {
                                                                                      var match = _prepare(sandbox, false, state);
                                                                                      DirectorTool$Wonderjs.runWithDefaultTime(match[0]);
                                                                                      return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](match[2]));
                                                                                    }));
                                                                      }));
                                                        }));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("draw instance", (function (param) {
                      return RenderHardwareInstanceTool$Wonderjs.testDrawElementsInstancedANGLE(sandbox, FrontRenderLightHardwareInstanceTool$Wonderjs.prepare, GeometryTool$Wonderjs.getIndicesCount, state);
                    }));
      }));

/*  Not a pure module */
