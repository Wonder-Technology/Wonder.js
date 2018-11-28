'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var FakeGlTool$Wonderjs = require("../../../../../../tool/gl/FakeGlTool.js");
var DirectorTool$Wonderjs = require("../../../../../../tool/core/DirectorTool.js");
var GeometryTool$Wonderjs = require("../../../../../../tool/service/geometry/GeometryTool.js");
var TransformAPI$Wonderjs = require("../../../../../../../src/api/TransformAPI.js");
var GameObjectAPI$Wonderjs = require("../../../../../../../src/api/GameObjectAPI.js");
var MainStateTool$Wonderjs = require("../../../../../../tool/service/state/MainStateTool.js");
var GLSLSenderTool$Wonderjs = require("../../../../../../tool/service/sender/GLSLSenderTool.js");
var RenderJobsTool$Wonderjs = require("../../../../../../tool/job/no_worker/loop/RenderJobsTool.js");
var GLSLLocationTool$Wonderjs = require("../../../../../../tool/service/location/GLSLLocationTool.js");
var LightMaterialAPI$Wonderjs = require("../../../../../../../src/api/material/LightMaterialAPI.js");
var LightMaterialTool$Wonderjs = require("../../../../../../tool/service/material/LightMaterialTool.js");
var LoopRenderJobTool$Wonderjs = require("../../../../../../tool/job/no_worker/loop/LoopRenderJobTool.js");
var RenderMaterialMapTool$Wonderjs = require("../../tool/RenderMaterialMapTool.js");
var FrontRenderLightJobTool$Wonderjs = require("../../../../../../tool/job/no_worker/loop/FrontRenderLightJobTool.js");
var RenderBatchInstanceTool$Wonderjs = require("../../../../../../tool/render/instance/RenderBatchInstanceTool.js");
var RenderLightMaterialMapTool$Wonderjs = require("../../tool/RenderLightMaterialMapTool.js");
var FrontRenderLightBatchInstanceTool$Wonderjs = require("../../../../../../tool/render/instance/FrontRenderLightBatchInstanceTool.js");

describe("test front render light batch instance", (function () {
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
                return RenderBatchInstanceTool$Wonderjs.testProgram(sandbox, FrontRenderLightBatchInstanceTool$Wonderjs.prepare, state);
              }));
        describe("send attribute data", (function () {
                describe("send sourceInstance gameObject's a_position", (function () {
                        return RenderBatchInstanceTool$Wonderjs.testAttachBufferToAttribute(sandbox, /* tuple */[
                                    "a_position",
                                    0,
                                    3
                                  ], FrontRenderLightBatchInstanceTool$Wonderjs.prepare, state);
                      }));
                describe("send sourceInstance gameObject's a_normal", (function () {
                        return RenderBatchInstanceTool$Wonderjs.testAttachBufferToAttribute(sandbox, /* tuple */[
                                    "a_normal",
                                    1,
                                    3
                                  ], FrontRenderLightBatchInstanceTool$Wonderjs.prepare, state);
                      }));
                return /* () */0;
              }));
        describe("send uniform data", (function () {
                RenderBatchInstanceTool$Wonderjs.testSendShaderUniformData(sandbox, /* tuple */[
                      FrontRenderLightBatchInstanceTool$Wonderjs.prepare,
                      FrontRenderLightBatchInstanceTool$Wonderjs.createSourceInstanceGameObject
                    ], state);
                GLSLSenderTool$Wonderjs.JudgeSendUniformData[/* testSendVector3 */4](sandbox, "u_diffuse", (function (_, param, _$1, state) {
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
                        ]), FrontRenderLightJobTool$Wonderjs.prepareGameObject, undefined, /* () */0);
                describe("send object instance gameObject's data", (function () {
                        Wonder_jest.test("send u_mMatrix data", (function () {
                                var match = FrontRenderLightBatchInstanceTool$Wonderjs.prepare(sandbox, 2, state[0]);
                                var match$1 = FrontRenderLightBatchInstanceTool$Wonderjs.createSourceInstanceGameObject(sandbox, 3, match[0]);
                                var uniformMatrix4fv = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(1, sandbox, "u_mMatrix");
                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(uniformMatrix4fv), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                                DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(1, uniformMatrix4fv))), 7);
                              }));
                        return Wonder_jest.test("send u_normalMatrix data", (function () {
                                      var match = FrontRenderLightBatchInstanceTool$Wonderjs.prepare(sandbox, 2, state[0]);
                                      var match$1 = FrontRenderLightBatchInstanceTool$Wonderjs.createSourceInstanceGameObject(sandbox, 3, match[0]);
                                      var uniformMatrix3fv = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                      var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(1, sandbox, "u_normalMatrix");
                                      var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(uniformMatrix3fv), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                                      DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withThreeArgs(1, false, new Float32Array(/* array */[
                                                                  1,
                                                                  0,
                                                                  0,
                                                                  0,
                                                                  1,
                                                                  0,
                                                                  0,
                                                                  0,
                                                                  1
                                                                ]), uniformMatrix3fv))), 7);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("bind and update sourceInstance's gameObject's map", (function () {
                Wonder_jest.test("bind map", (function () {
                        var match = FrontRenderLightBatchInstanceTool$Wonderjs.prepare(sandbox, 2, state[0]);
                        var state$1 = match[0];
                        var material = GameObjectAPI$Wonderjs.unsafeGetGameObjectLightMaterialComponent(match[1], state$1);
                        var match$1 = LightMaterialTool$Wonderjs.createAndSetMaps(material, state$1);
                        return RenderLightMaterialMapTool$Wonderjs.testBindMap(sandbox, match$1[0]);
                      }));
                return Wonder_jest.test("update map", (function () {
                              var match = FrontRenderLightBatchInstanceTool$Wonderjs.prepare(sandbox, 2, state[0]);
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
        describe("draw", (function () {
                return RenderBatchInstanceTool$Wonderjs.testDrawElements(sandbox, FrontRenderLightBatchInstanceTool$Wonderjs.prepare, GeometryTool$Wonderjs.getIndicesCount, state);
              }));
        return /* () */0;
      }));

/*  Not a pure module */
