'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var GLSLTool$Wonderjs = require("../../../../../tool/render/core/GLSLTool.js");
var TestTool$Wonderjs = require("../../../../../tool/TestTool.js");
var CameraTool$Wonderjs = require("../../../../../tool/service/camera/CameraTool.js");
var FakeGlTool$Wonderjs = require("../../../../../tool/gl/FakeGlTool.js");
var ShaderTool$Wonderjs = require("../../../../../tool/service/shader/ShaderTool.js");
var SettingTool$Wonderjs = require("../../../../../tool/service/setting/SettingTool.js");
var DirectorTool$Wonderjs = require("../../../../../tool/core/DirectorTool.js");
var GameObjectAPI$Wonderjs = require("../../../../../../src/api/GameObjectAPI.js");
var GameObjectTool$Wonderjs = require("../../../../../tool/service/gameObject/GameObjectTool.js");
var RenderJobsTool$Wonderjs = require("../../../../../tool/job/no_worker/loop/RenderJobsTool.js");
var AllMaterialTool$Wonderjs = require("../../../../../tool/service/material/AllMaterialTool.js");
var GLSLLocationTool$Wonderjs = require("../../../../../tool/service/location/GLSLLocationTool.js");
var LightMaterialAPI$Wonderjs = require("../../../../../../src/api/material/LightMaterialAPI.js");
var LightMaterialTool$Wonderjs = require("../../../../../tool/service/material/LightMaterialTool.js");
var DirectionLightTool$Wonderjs = require("../../../../../tool/service/light/DirectionLightTool.js");
var RenderBasicJobTool$Wonderjs = require("../../../../../tool/job/render_basic/RenderBasicJobTool.js");
var NoWorkerJobConfigTool$Wonderjs = require("../../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js");
var CreateStateMainService$Wonderjs = require("../../../../../../src/service/state/main/state/CreateStateMainService.js");
var FrontRenderLightJobTool$Wonderjs = require("../../../../../tool/job/no_worker/loop/FrontRenderLightJobTool.js");
var WorkerDetectMainWorkerTool$Wonderjs = require("../../../../../unit/job/worker/main_worker/tool/WorkerDetectMainWorkerTool.js");
var FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs = require("../../../../tool/job/FrontRenderLightForNoWorkerAndWorkerJobTool.js");

describe("test re-init lightMaterial", (function () {
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
        describe("test with light", (function () {
                describe("test with direction light", (function () {
                        beforeEach((function () {
                                state[0] = TestTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                return /* () */0;
                              }));
                        describe("test glsl", (function () {
                                Wonder_jest.test("test one light material:\n   1.has no lights;\n   2.init material;\n   3.add one light;\n   4.re-init material;\n\n   glsl->DIRECTION_LIGHTS_COUNT should == 1", (function () {
                                        var match = LightMaterialTool$Wonderjs.createGameObject(state[0]);
                                        var material = match[2];
                                        var shaderSource = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                        var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(shaderSource), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                        var state$2 = _initMaterial(material, state$1);
                                        var shaderSourceCallCount = Sinon.getCallCount(shaderSource);
                                        var match$1 = DirectionLightTool$Wonderjs.createGameObject(state$2);
                                        LightMaterialAPI$Wonderjs.reInitMaterials(/* array */[material], match$1[0]);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.contain(GLSLTool$Wonderjs.getVsSourceByCount(shaderSource, shaderSourceCallCount), "#define DIRECTION_LIGHTS_COUNT 1")), true);
                                      }));
                                return Wonder_jest.test("test one light material:\n   1.has one light;\n   2.init material;\n   3.dispose the light;\n   4.re-init material;\n\n   glsl->DIRECTION_LIGHTS_COUNT should == 0", (function () {
                                              var match = LightMaterialTool$Wonderjs.createGameObject(state[0]);
                                              var material = match[2];
                                              var match$1 = DirectionLightTool$Wonderjs.createGameObject(match[0]);
                                              var shaderSource = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(shaderSource), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                                              var state$2 = _initMaterial(material, state$1);
                                              var shaderSourceCallCount = Sinon.getCallCount(shaderSource);
                                              var state$3 = GameObjectTool$Wonderjs.disposeGameObject(match$1[1], state$2);
                                              LightMaterialAPI$Wonderjs.reInitMaterials(/* array */[material], state$3);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.contain(GLSLTool$Wonderjs.getVsSourceByCount(shaderSource, shaderSourceCallCount), "#define DIRECTION_LIGHTS_COUNT 0")), true);
                                            }));
                              }));
                        Wonder_jest.test("if use worker, fatal", (function () {
                                var state$1 = SettingTool$Wonderjs.setUseWorker(true, WorkerDetectMainWorkerTool$Wonderjs.markIsSupportRenderWorkerAndSharedArrayBuffer(true, state[0]));
                                var match = LightMaterialTool$Wonderjs.createGameObject(state$1);
                                var material = match[2];
                                var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                return Wonder_jest.Expect[/* toThrowMessage */20]("not support worker", Wonder_jest.Expect[/* expect */0]((function () {
                                                  LightMaterialAPI$Wonderjs.reInitMaterials(/* array */[material], state$2);
                                                  return /* () */0;
                                                })));
                              }));
                        describe("test front render light", (function () {
                                describe("test one light material:\n   1.has no lights;\n   2.init material;\n   3.add one light;\n   4.re-init material;\n   5.front render light", (function () {
                                        var _exec = function (material, state) {
                                          var match = CameraTool$Wonderjs.createCameraGameObject(state);
                                          var match$1 = DirectionLightTool$Wonderjs.createGameObject(match[0]);
                                          return DirectorTool$Wonderjs.runWithDefaultTime(LightMaterialAPI$Wonderjs.reInitMaterials(/* array */[material], match$1[0]));
                                        };
                                        Wonder_jest.test("should use new program", (function () {
                                                var match = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, state[0]);
                                                var material = match[3];
                                                var createProgram = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                Sinon.returns(1, Sinon.onCall(0, createProgram));
                                                Sinon.returns(2, Sinon.onCall(1, createProgram));
                                                var useProgram = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(createProgram), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(useProgram), undefined, /* () */0), match[0]);
                                                var state$2 = _initMaterial(material, state$1);
                                                _exec(material, state$2);
                                                return Sinon.toCalledWith(/* array */[2], Wonder_jest.Expect[/* expect */0](useProgram));
                                              }));
                                        Wonder_jest.test("should only send light data once", (function () {
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
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(Caml_array.caml_array_get(match$1[1], 0), match$1[2][1]))), 1);
                                              }));
                                        return Wonder_jest.test("should send u_diffuse", (function () {
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
                                                      var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(uniform3f), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                                      var state$3 = _initMaterial(material, state$2);
                                                      _exec(material, state$3);
                                                      return Sinon.toCalledWith(/* array */[1].concat(color), Wonder_jest.Expect[/* expect */0](uniform3f));
                                                    }));
                                      }));
                                describe("test one light material:\n   1.has one light;\n   2.init material;\n   3.dispose the light;\n   4.re-init material;\n   5.front render light", (function () {
                                        var _exec = function (material, lightGameObject, state) {
                                          var match = CameraTool$Wonderjs.createCameraGameObject(state);
                                          var state$1 = GameObjectTool$Wonderjs.disposeGameObject(lightGameObject, match[0]);
                                          return DirectorTool$Wonderjs.runWithDefaultTime(LightMaterialAPI$Wonderjs.reInitMaterials(/* array */[material], state$1));
                                        };
                                        Wonder_jest.test("should use new program", (function () {
                                                var match = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.prepareOneForDirectionLight(sandbox, state[0]);
                                                var material = match[2];
                                                var createProgram = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                Sinon.returns(2, Sinon.onCall(1, createProgram));
                                                var useProgram = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(createProgram), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(useProgram), undefined, /* () */0), match[0]);
                                                var state$2 = _initMaterial(material, state$1);
                                                _exec(material, match[1], state$2);
                                                return Sinon.toCalledWith(/* array */[2], Wonder_jest.Expect[/* expect */0](useProgram));
                                              }));
                                        Wonder_jest.test("should not send light data", (function () {
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
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(Caml_array.caml_array_get(match$1[1], 0), match$1[2][1]))), 0);
                                              }));
                                        return Wonder_jest.test("should send u_diffuse", (function () {
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
                                                      var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(uniform3f), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                                      var state$3 = _initMaterial(material, state$2);
                                                      _exec(material, match[1], state$3);
                                                      return Sinon.toCalledWith(/* array */[1].concat(color), Wonder_jest.Expect[/* expect */0](uniform3f));
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("fix bug", (function () {
                describe("test share material", (function () {
                        beforeEach((function () {
                                state[0] = TestTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                return /* () */0;
                              }));
                        return Wonder_jest.test("should use share material's shaderIndex", (function () {
                                      var match = LightMaterialTool$Wonderjs.createGameObject(state[0]);
                                      var material1 = match[2];
                                      var match$1 = LightMaterialTool$Wonderjs.createGameObjectWithMap(match[0]);
                                      var match$2 = LightMaterialTool$Wonderjs.createGameObjectWithMaterial(match$1[2][0], match$1[0]);
                                      var material2 = match$2[2];
                                      var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$2[0]);
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
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      shaderIndex1,
                                                      shaderIndex2,
                                                      ShaderTool$Wonderjs.getAllShaderIndexArray(state$5)
                                                    ]), /* tuple */[
                                                  2,
                                                  3,
                                                  /* array */[
                                                    2,
                                                    3
                                                  ]
                                                ]);
                                    }));
                      }));
                describe("1.create two materials use the same shader(shader1);\n          2.init both;\n          2.reinit one material(create new shader2);\n          3.loopBody;\n\n          should send shader1's and shader2's camera data(u_vMatrix)\n          ", (function () {
                        var _test = function (param, param$1, state) {
                          var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_vMatrix");
                          var uniformMatrix4fv = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                          Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                          var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(uniformMatrix4fv), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
                          var state$2 = AllMaterialTool$Wonderjs.prepareForInit(state$1);
                          var state$3 = GameObjectAPI$Wonderjs.initGameObject(param[1], GameObjectAPI$Wonderjs.initGameObject(param[0], state$2));
                          var state$4 = LightMaterialAPI$Wonderjs.reInitMaterials(/* array */[param$1[0]], state$3);
                          DirectorTool$Wonderjs.runWithDefaultTime(state$4);
                          return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(0, uniformMatrix4fv))), 2);
                        };
                        beforeEach((function () {
                                state[0] = RenderJobsTool$Wonderjs.initWithJobConfig(sandbox, NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, undefined, "\n[\n    {\n        \"name\": \"default\",\n        \"jobs\": [\n            {\n                \"name\": \"get_camera_data\"\n            },\n            {\n                \"name\": \"send_uniform_shader_data\"\n            }\n        ]\n    }\n]\n        ", undefined, undefined, /* () */0));
                                return /* () */0;
                              }));
                        Wonder_jest.test("test two lightMaterials", (function () {
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
                        return Wonder_jest.test("test one basicMaterial and one lightMaterial(their materialIndexs are equal)", (function () {
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
                return /* () */0;
              }));
        return /* () */0;
      }));

/*  Not a pure module */
