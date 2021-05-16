

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_option from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as GLSLTool$Wonderjs from "../../../../../tool/render/core/GLSLTool.js";
import * as TestTool$Wonderjs from "../../../../../tool/TestTool.js";
import * as CameraTool$Wonderjs from "../../../../../tool/service/camera/CameraTool.js";
import * as FakeGlTool$Wonderjs from "../../../../../tool/gl/FakeGlTool.js";
import * as ShaderTool$Wonderjs from "../../../../../tool/service/shader/ShaderTool.js";
import * as SettingTool$Wonderjs from "../../../../../tool/service/setting/SettingTool.js";
import * as DirectorTool$Wonderjs from "../../../../../tool/core/DirectorTool.js";
import * as GameObjectAPI$Wonderjs from "../../../../../../src/api/GameObjectAPI.js";
import * as GLSLSenderTool$Wonderjs from "../../../../../tool/service/sender/GLSLSenderTool.js";
import * as GameObjectTool$Wonderjs from "../../../../../tool/service/gameObject/GameObjectTool.js";
import * as RenderJobsTool$Wonderjs from "../../../../../tool/job/no_worker/loop/RenderJobsTool.js";
import * as AllMaterialTool$Wonderjs from "../../../../../tool/service/material/AllMaterialTool.js";
import * as GLSLLocationTool$Wonderjs from "../../../../../tool/service/location/GLSLLocationTool.js";
import * as LightMaterialAPI$Wonderjs from "../../../../../../src/api/material/LightMaterialAPI.js";
import * as LightMaterialTool$Wonderjs from "../../../../../tool/service/material/LightMaterialTool.js";
import * as DirectionLightTool$Wonderjs from "../../../../../tool/service/light/DirectionLightTool.js";
import * as RenderBasicJobTool$Wonderjs from "../../../../../tool/job/render_basic/RenderBasicJobTool.js";
import * as NoWorkerJobConfigTool$Wonderjs from "../../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js";
import * as CreateStateMainService$Wonderjs from "../../../../../../src/service/state/main/state/CreateStateMainService.js";
import * as FrontRenderLightJobTool$Wonderjs from "../../../../../tool/job/no_worker/loop/FrontRenderLightJobTool.js";
import * as WorkerDetectMainWorkerTool$Wonderjs from "../../../../../unit/job/worker/main_worker/tool/WorkerDetectMainWorkerTool.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs from "../../../../tool/job/FrontRenderLightForNoWorkerAndWorkerJobTool.js";

Wonder_jest.describe("test re-init lightMaterial", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */CreateStateMainService$Wonderjs.createState(/* () */0)];
        var _initMaterial = function (material, state) {
          var state$1 = AllMaterialTool$Wonderjs.prepareForInit(state);
          return LightMaterialTool$Wonderjs.initMaterial(material, state$1);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test with light", (function (param) {
                return Wonder_jest.describe("test with direction light", (function (param) {
                              beforeEach((function () {
                                      state[0] = TestTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                      return /* () */0;
                                    }));
                              Wonder_jest.describe("test glsl", (function (param) {
                                      Wonder_jest.test("test one light material:\n   1.has no lights;\n   2.init material;\n   3.add one light;\n   4.re-init material;\n\n   glsl->DIRECTION_LIGHTS_COUNT should == 1", (function (param) {
                                              var match = LightMaterialTool$Wonderjs.createGameObject(state[0]);
                                              var material = match[2];
                                              var shaderSource = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(shaderSource), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                              var state$2 = _initMaterial(material, state$1);
                                              var shaderSourceCallCount = Sinon.getCallCount(shaderSource);
                                              var match$1 = DirectionLightTool$Wonderjs.createGameObject(state$2);
                                              LightMaterialAPI$Wonderjs.reInitMaterials(/* array */[material], match$1[0]);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.contain(GLSLTool$Wonderjs.getVsSourceByCount(shaderSource, shaderSourceCallCount), "#define DIRECTION_LIGHTS_COUNT 1")), true);
                                            }));
                                      return Wonder_jest.test("test one light material:\n   1.has one light;\n   2.init material;\n   3.dispose the light;\n   4.re-init material;\n\n   glsl->DIRECTION_LIGHTS_COUNT should == 0", (function (param) {
                                                    var match = LightMaterialTool$Wonderjs.createGameObject(state[0]);
                                                    var material = match[2];
                                                    var match$1 = DirectionLightTool$Wonderjs.createGameObject(match[0]);
                                                    var shaderSource = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                    var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(shaderSource), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                                                    var state$2 = _initMaterial(material, state$1);
                                                    var shaderSourceCallCount = Sinon.getCallCount(shaderSource);
                                                    var state$3 = GameObjectTool$Wonderjs.disposeGameObject(match$1[1], state$2);
                                                    LightMaterialAPI$Wonderjs.reInitMaterials(/* array */[material], state$3);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.contain(GLSLTool$Wonderjs.getVsSourceByCount(shaderSource, shaderSourceCallCount), "#define DIRECTION_LIGHTS_COUNT 0")), true);
                                                  }));
                                    }));
                              Wonder_jest.test("if use worker, fatal", (function (param) {
                                      var state$1 = SettingTool$Wonderjs.setUseWorker(true, WorkerDetectMainWorkerTool$Wonderjs.markIsSupportRenderWorkerAndSharedArrayBuffer(true, state[0]));
                                      var match = LightMaterialTool$Wonderjs.createGameObject(state$1);
                                      var material = match[2];
                                      var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                      return Wonder_jest.Expect[/* toThrowMessage */21]("not support worker", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                        LightMaterialAPI$Wonderjs.reInitMaterials(/* array */[material], state$2);
                                                        return /* () */0;
                                                      })));
                                    }));
                              return Wonder_jest.describe("test front render light", (function (param) {
                                            Wonder_jest.describe("test one light material:\n   1.has no lights;\n   2.init material;\n   3.add one light;\n   4.re-init material;\n   5.front render light", (function (param) {
                                                    var _exec = function (material, state) {
                                                      var match = CameraTool$Wonderjs.createCameraGameObject(state);
                                                      var match$1 = DirectionLightTool$Wonderjs.createGameObject(match[0]);
                                                      return DirectorTool$Wonderjs.runWithDefaultTime(LightMaterialAPI$Wonderjs.reInitMaterials(/* array */[material], match$1[0]));
                                                    };
                                                    Wonder_jest.test("should use new program", (function (param) {
                                                            var match = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, state[0]);
                                                            var material = match[3];
                                                            var createProgram = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                            Sinon.returns(1, Sinon.onCall(0, createProgram));
                                                            Sinon.returns(2, Sinon.onCall(1, createProgram));
                                                            var useProgram = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                            var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createProgram), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(useProgram), undefined, /* () */0), match[0]);
                                                            var state$2 = _initMaterial(material, state$1);
                                                            _exec(material, state$2);
                                                            return Sinon.toCalledWith(/* array */[2], Wonder_jest.Expect[/* expect */0](useProgram));
                                                          }));
                                                    Wonder_jest.test("should only send light data once", (function (param) {
                                                            var match = LightMaterialTool$Wonderjs.createGameObject(state[0]);
                                                            var material = match[2];
                                                            var color = /* array */[
                                                              1,
                                                              0,
                                                              0
                                                            ];
                                                            var state$1 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseColor(material, color, match[0]);
                                                            var match$1 = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.setFakeGlForLight(sandbox, /* array */["u_directionLights[0].color"], state$1);
                                                            var state$2 = _initMaterial(material, match$1[0]);
                                                            _exec(material, state$2);
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(Caml_array.caml_array_get(match$1[1], 0), match$1[2][1]))), 1);
                                                          }));
                                                    return Wonder_jest.test("should send u_diffuse", (function (param) {
                                                                  var match = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, state[0]);
                                                                  var material = match[3];
                                                                  var color = /* array */[
                                                                    1,
                                                                    0,
                                                                    0
                                                                  ];
                                                                  var state$1 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseColor(material, color, match[0]);
                                                                  var uniform3f = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                  var name = "u_diffuse";
                                                                  var getUniformLocation = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                  Sinon.returns(0, Sinon.onCall(0, Sinon.withTwoArgs(Sinon$1.match.any, name, getUniformLocation)));
                                                                  Sinon.returns(1, Sinon.onCall(1, Sinon.withTwoArgs(Sinon$1.match.any, name, getUniformLocation)));
                                                                  var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(uniform3f), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                                                  var state$3 = _initMaterial(material, state$2);
                                                                  _exec(material, state$3);
                                                                  return Sinon.toCalledWith(/* array */[1].concat(color), Wonder_jest.Expect[/* expect */0](uniform3f));
                                                                }));
                                                  }));
                                            return Wonder_jest.describe("test one light material:\n   1.has one light;\n   2.init material;\n   3.dispose the light;\n   4.re-init material;\n   5.front render light", (function (param) {
                                                          var _exec = function (material, lightGameObject, state) {
                                                            var match = CameraTool$Wonderjs.createCameraGameObject(state);
                                                            var state$1 = GameObjectTool$Wonderjs.disposeGameObject(lightGameObject, match[0]);
                                                            return DirectorTool$Wonderjs.runWithDefaultTime(LightMaterialAPI$Wonderjs.reInitMaterials(/* array */[material], state$1));
                                                          };
                                                          Wonder_jest.test("should use new program", (function (param) {
                                                                  var match = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.prepareOneForDirectionLight(sandbox, state[0]);
                                                                  var material = match[2];
                                                                  var createProgram = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                  Sinon.returns(2, Sinon.onCall(1, createProgram));
                                                                  var useProgram = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                  var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createProgram), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(useProgram), undefined, /* () */0), match[0]);
                                                                  var state$2 = _initMaterial(material, state$1);
                                                                  _exec(material, match[1], state$2);
                                                                  return Sinon.toCalledWith(/* array */[2], Wonder_jest.Expect[/* expect */0](useProgram));
                                                                }));
                                                          Wonder_jest.test("should not send light data", (function (param) {
                                                                  var match = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.prepareOneForDirectionLight(sandbox, state[0]);
                                                                  var material = match[2];
                                                                  var color = /* array */[
                                                                    1,
                                                                    0,
                                                                    0
                                                                  ];
                                                                  var state$1 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseColor(material, color, match[0]);
                                                                  var match$1 = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.setFakeGlForLight(sandbox, /* array */["u_directionLights[0].color"], state$1);
                                                                  var state$2 = _initMaterial(material, match$1[0]);
                                                                  _exec(material, match[1], state$2);
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(Caml_array.caml_array_get(match$1[1], 0), match$1[2][1]))), 0);
                                                                }));
                                                          return Wonder_jest.test("should send u_diffuse", (function (param) {
                                                                        var match = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.prepareOneForDirectionLight(sandbox, state[0]);
                                                                        var material = match[2];
                                                                        var color = /* array */[
                                                                          1,
                                                                          0,
                                                                          0
                                                                        ];
                                                                        var state$1 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseColor(material, color, match[0]);
                                                                        var uniform3f = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                        var name = "u_diffuse";
                                                                        var getUniformLocation = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                        Sinon.returns(0, Sinon.onCall(0, Sinon.withTwoArgs(Sinon$1.match.any, name, getUniformLocation)));
                                                                        Sinon.returns(1, Sinon.onCall(1, Sinon.withTwoArgs(Sinon$1.match.any, name, getUniformLocation)));
                                                                        var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(uniform3f), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                                                        var state$3 = _initMaterial(material, state$2);
                                                                        _exec(material, match[1], state$3);
                                                                        return Sinon.toCalledWith(/* array */[1].concat(color), Wonder_jest.Expect[/* expect */0](uniform3f));
                                                                      }));
                                                        }));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("fix bug", (function (param) {
                      Wonder_jest.describe("test share material", (function (param) {
                              beforeEach((function () {
                                      state[0] = TestTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                      return /* () */0;
                                    }));
                              return Wonder_jest.test("should use share material's shaderIndex", (function (param) {
                                            var match = LightMaterialTool$Wonderjs.createGameObject(state[0]);
                                            var material1 = match[2];
                                            var match$1 = LightMaterialTool$Wonderjs.createGameObjectWithMap(match[0]);
                                            var match$2 = LightMaterialTool$Wonderjs.createGameObjectWithMaterial(match$1[2][0], match$1[0]);
                                            var material2 = match$2[2];
                                            var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$2[0]);
                                            var state$2 = _initMaterial(material1, state$1);
                                            var state$3 = _initMaterial(material2, state$2);
                                            var state$4 = _initMaterial(material2, state$3);
                                            var match$3 = DirectionLightTool$Wonderjs.createGameObject(state$4);
                                            var state$5 = LightMaterialAPI$Wonderjs.reInitMaterials(/* array */[
                                                  material1,
                                                  material2,
                                                  material2
                                                ], match$3[0]);
                                            var shaderIndex1 = ShaderTool$Wonderjs.getShaderIndex(material1, state$5);
                                            var shaderIndex2 = ShaderTool$Wonderjs.getShaderIndex(material2, state$5);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            shaderIndex1,
                                                            shaderIndex2
                                                          ]), /* tuple */[
                                                        2,
                                                        3
                                                      ]);
                                          }));
                            }));
                      Wonder_jest.describe("1.create two materials use the same shader(shader1);\n          2.init both;\n          2.reinit one material(create new shader2);\n          3.loopBody;\n\n          should send shader1's and shader2's camera data(u_vMatrix)\n          ", (function (param) {
                              var _test = function (param, param$1, state) {
                                var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_vMatrix");
                                var uniformMatrix4fv = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(uniformMatrix4fv), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
                                var state$2 = AllMaterialTool$Wonderjs.prepareForInit(state$1);
                                var state$3 = GameObjectAPI$Wonderjs.initGameObject(param[1], GameObjectAPI$Wonderjs.initGameObject(param[0], state$2));
                                var state$4 = LightMaterialAPI$Wonderjs.reInitMaterials(/* array */[param$1[0]], state$3);
                                DirectorTool$Wonderjs.runWithDefaultTime(state$4);
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(0, uniformMatrix4fv))), 2);
                              };
                              beforeEach((function () {
                                      state[0] = RenderJobsTool$Wonderjs.initWithJobConfig(sandbox, NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, undefined, "\n[\n    {\n        \"name\": \"default\",\n        \"jobs\": [\n            {\n                \"name\": \"get_camera_data\"\n            },\n            {\n                \"name\": \"send_uniform_shader_data\"\n            }\n        ]\n    }\n]\n        ", undefined, undefined, /* () */0));
                                      return /* () */0;
                                    }));
                              Wonder_jest.test("test two lightMaterials", (function (param) {
                                      var match = CameraTool$Wonderjs.createCameraGameObject(state[0]);
                                      var match$1 = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, match[0]);
                                      var match$2 = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, match$1[0]);
                                      return _test(/* tuple */[
                                                  match$1[1],
                                                  match$2[1]
                                                ], /* tuple */[
                                                  match$1[3],
                                                  match$2[3]
                                                ], match$2[0]);
                                    }));
                              return Wonder_jest.test("test one basicMaterial and one lightMaterial(their materialIndexs are equal)", (function (param) {
                                            var match = CameraTool$Wonderjs.createCameraGameObject(state[0]);
                                            var match$1 = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, match[0]);
                                            var match$2 = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, match$1[0]);
                                            return _test(/* tuple */[
                                                        match$1[1],
                                                        match$2[1]
                                                      ], /* tuple */[
                                                        match$1[3],
                                                        match$2[3]
                                                      ], match$2[0]);
                                          }));
                            }));
                      return Wonder_jest.describe("fix \"reInit material->removeShaderIndexFromMaterial\" bug", (function (param) {
                                    beforeEach((function () {
                                            state[0] = TestTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                            return /* () */0;
                                          }));
                                    return Wonder_jest.test("reInit material which isn't inited before shouldn't affect shader data map;", (function (param) {
                                                  var match = LightMaterialAPI$Wonderjs.createLightMaterial(state[0]);
                                                  var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                                                  var state$1 = AllMaterialTool$Wonderjs.prepareForInit(match$1[0]);
                                                  var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                                  var state$3 = LightMaterialAPI$Wonderjs.reInitMaterials(/* array */[match[1]], state$2);
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MutableSparseMapService$WonderCommonlib.length(GLSLSenderTool$Wonderjs.getUniformShaderSendNoCachableDataMap(state$3))), 1);
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
