

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_option from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as FakeGlTool$Wonderjs from "../../../../../../tool/gl/FakeGlTool.js";
import * as DirectorTool$Wonderjs from "../../../../../../tool/core/DirectorTool.js";
import * as GeometryTool$Wonderjs from "../../../../../../tool/service/geometry/GeometryTool.js";
import * as TransformAPI$Wonderjs from "../../../../../../../src/api/TransformAPI.js";
import * as GameObjectAPI$Wonderjs from "../../../../../../../src/api/GameObjectAPI.js";
import * as MainStateTool$Wonderjs from "../../../../../../tool/service/state/MainStateTool.js";
import * as GLSLSenderTool$Wonderjs from "../../../../../../tool/service/sender/GLSLSenderTool.js";
import * as RenderJobsTool$Wonderjs from "../../../../../../tool/job/no_worker/loop/RenderJobsTool.js";
import * as GLSLLocationTool$Wonderjs from "../../../../../../tool/service/location/GLSLLocationTool.js";
import * as LightMaterialAPI$Wonderjs from "../../../../../../../src/api/material/LightMaterialAPI.js";
import * as LightMaterialTool$Wonderjs from "../../../../../../tool/service/material/LightMaterialTool.js";
import * as RenderMaterialMapTool$Wonderjs from "../../tool/RenderMaterialMapTool.js";
import * as FrontRenderLightJobTool$Wonderjs from "../../../../../../tool/job/no_worker/loop/FrontRenderLightJobTool.js";
import * as RenderBatchInstanceTool$Wonderjs from "../../../../../../tool/render/instance/RenderBatchInstanceTool.js";
import * as RenderLightMaterialMapTool$Wonderjs from "../../tool/RenderLightMaterialMapTool.js";
import * as FrontRenderLightBatchInstanceTool$Wonderjs from "../../../../../../tool/render/instance/FrontRenderLightBatchInstanceTool.js";

Wonder_jest.describe("test front render light batch instance", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = RenderJobsTool$Wonderjs.initWithJobConfig(sandbox, FrontRenderLightJobTool$Wonderjs.buildNoWorkerJobConfig(/* () */0));
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("use program", (function (param) {
                return RenderBatchInstanceTool$Wonderjs.testProgram(sandbox, FrontRenderLightBatchInstanceTool$Wonderjs.prepare, state);
              }));
        Wonder_jest.describe("send attribute data", (function (param) {
                Wonder_jest.describe("send sourceInstance gameObject's a_position", (function (param) {
                        return RenderBatchInstanceTool$Wonderjs.testAttachBufferToAttribute(sandbox, /* tuple */[
                                    "a_position",
                                    0,
                                    3
                                  ], FrontRenderLightBatchInstanceTool$Wonderjs.prepare, state);
                      }));
                return Wonder_jest.describe("send sourceInstance gameObject's a_normal", (function (param) {
                              return RenderBatchInstanceTool$Wonderjs.testAttachBufferToAttribute(sandbox, /* tuple */[
                                          "a_normal",
                                          1,
                                          3
                                        ], FrontRenderLightBatchInstanceTool$Wonderjs.prepare, state);
                            }));
              }));
        Wonder_jest.describe("send uniform data", (function (param) {
                RenderBatchInstanceTool$Wonderjs.testSendShaderUniformData(sandbox, /* tuple */[
                      FrontRenderLightBatchInstanceTool$Wonderjs.prepare,
                      FrontRenderLightBatchInstanceTool$Wonderjs.createSourceInstanceGameObject
                    ], state);
                GLSLSenderTool$Wonderjs.JudgeSendUniformData[/* testSendVector3 */4](sandbox, "u_diffuse", (function (param, param$1, param$2, state) {
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
                        ]), FrontRenderLightJobTool$Wonderjs.prepareGameObject, undefined, /* () */0);
                return Wonder_jest.describe("send object instance gameObject's data", (function (param) {
                              Wonder_jest.test("send u_mMatrix data", (function (param) {
                                      var match = FrontRenderLightBatchInstanceTool$Wonderjs.prepare(sandbox, 2, state[0]);
                                      var match$1 = FrontRenderLightBatchInstanceTool$Wonderjs.createSourceInstanceGameObject(sandbox, 3, match[0]);
                                      var uniformMatrix4fv = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                      var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(1, sandbox, "u_mMatrix");
                                      var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(uniformMatrix4fv), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                                      DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(1, uniformMatrix4fv))), 7);
                                    }));
                              return Wonder_jest.test("send u_normalMatrix data", (function (param) {
                                            var match = FrontRenderLightBatchInstanceTool$Wonderjs.prepare(sandbox, 2, state[0]);
                                            var match$1 = FrontRenderLightBatchInstanceTool$Wonderjs.createSourceInstanceGameObject(sandbox, 3, match[0]);
                                            var uniformMatrix3fv = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                            var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(1, sandbox, "u_normalMatrix");
                                            var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(uniformMatrix3fv), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                                            DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withThreeArgs(1, false, new Float32Array(/* array */[
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
              }));
        Wonder_jest.describe("bind and update sourceInstance's gameObject's map", (function (param) {
                Wonder_jest.test("bind map", (function (param) {
                        var match = FrontRenderLightBatchInstanceTool$Wonderjs.prepare(sandbox, 2, state[0]);
                        var state$1 = match[0];
                        var material = GameObjectAPI$Wonderjs.unsafeGetGameObjectLightMaterialComponent(match[1], state$1);
                        var match$1 = LightMaterialTool$Wonderjs.createAndSetMaps(material, state$1);
                        return RenderLightMaterialMapTool$Wonderjs.testBindMap(sandbox, match$1[0]);
                      }));
                return Wonder_jest.test("update map", (function (param) {
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
        return Wonder_jest.describe("draw", (function (param) {
                      return RenderBatchInstanceTool$Wonderjs.testDrawElements(sandbox, FrontRenderLightBatchInstanceTool$Wonderjs.prepare, GeometryTool$Wonderjs.getIndicesCount, state);
                    }));
      }));

export {
  
}
/*  Not a pure module */
