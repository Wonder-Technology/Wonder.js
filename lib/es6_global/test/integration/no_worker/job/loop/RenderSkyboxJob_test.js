

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_option from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "./../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as GLSLTool$Wonderjs from "../../../../tool/render/core/GLSLTool.js";
import * as SceneAPI$Wonderjs from "../../../../../src/api/SceneAPI.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as SinonTool$Wonderjs from "../../tool/sinon/SinonTool.js";
import * as FakeGlTool$Wonderjs from "../../../../tool/gl/FakeGlTool.js";
import * as SkyboxTool$Wonderjs from "../tool/SkyboxTool.js";
import * as ProgramTool$Wonderjs from "../../../../tool/service/program/ProgramTool.js";
import * as TextureTool$Wonderjs from "../../../../tool/service/texture/TextureTool.js";
import * as DirectorTool$Wonderjs from "../../../../tool/core/DirectorTool.js";
import * as TransformAPI$Wonderjs from "../../../../../src/api/TransformAPI.js";
import * as RenderJobsTool$Wonderjs from "../../../../tool/job/no_worker/loop/RenderJobsTool.js";
import * as BoxGeometryTool$Wonderjs from "../../../../tool/service/geometry/BoxGeometryTool.js";
import * as RenderInJobTool$Wonderjs from "../tool/RenderInJobTool.js";
import * as GLSLLocationTool$Wonderjs from "../../../../tool/service/location/GLSLLocationTool.js";
import * as CubemapTextureAPI$Wonderjs from "../../../../../src/api/texture/CubemapTextureAPI.js";
import * as CubemapTextureTool$Wonderjs from "../../../../tool/service/texture/CubemapTextureTool.js";
import * as CreateStateMainService$Wonderjs from "../../../../../src/service/state/main/state/CreateStateMainService.js";
import * as PerspectiveCameraProjectionTool$Wonderjs from "../../../../tool/service/camera/PerspectiveCameraProjectionTool.js";

Wonder_jest.describe("test render skybox job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */CreateStateMainService$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = SkyboxTool$Wonderjs.initWithJobConfig(sandbox);
                return TestTool$Wonderjs.closeContractCheck(/* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test skybox shader", (function (param) {
                Wonder_jest.describe("test get attribute location", (function (param) {
                        return Wonder_jest.describe("test get a_position location", (function (param) {
                                      return Wonder_jest.test("test get location once", (function (param) {
                                                    var state$1 = state[0];
                                                    var getAttribLocation = GLSLLocationTool$Wonderjs.getAttribLocation(undefined, sandbox, "a_position");
                                                    var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getAttribLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                                    DirectorTool$Wonderjs.init(state$2);
                                                    return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withTwoArgs(Sinon$1.match.any, "a_position", getAttribLocation)));
                                                  }));
                                    }));
                      }));
                Wonder_jest.describe("test get uniform location", (function (param) {
                        Wonder_jest.describe("test get no_material_shader uniform location", (function (param) {
                                Wonder_jest.test("test get u_skyboxVMatrix location once", (function (param) {
                                        return RenderInJobTool$Wonderjs.testGetLocation(sandbox, "u_skyboxVMatrix", 1, DirectorTool$Wonderjs.init, state);
                                      }));
                                return Wonder_jest.test("test u_skyboxCubeMapSampler u_skyboxVMatrix location once", (function (param) {
                                              return RenderInJobTool$Wonderjs.testGetLocation(sandbox, "u_skyboxCubeMapSampler", 1, DirectorTool$Wonderjs.init, state);
                                            }));
                              }));
                        return Wonder_jest.describe("test not get model uniform location", (function (param) {
                                      return Wonder_jest.test("test not get u_mMatrix location", (function (param) {
                                                    return RenderInJobTool$Wonderjs.testGetLocation(sandbox, "u_mMatrix", 0, DirectorTool$Wonderjs.init, state);
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("test glsl", (function (param) {
                              Wonder_jest.test("test vs", (function (param) {
                                      var match = RenderInJobTool$Wonderjs.prepareForJudgeGLSLNotExec(sandbox, state[0]);
                                      DirectorTool$Wonderjs.init(match[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getVsSourceByCount(match[1], 0), /* :: */[
                                                          "attribute vec3 a_position;",
                                                          /* :: */[
                                                            "uniform mat4 u_skyboxVMatrix;",
                                                            /* :: */[
                                                              "uniform mat4 u_pMatrix;",
                                                              /* :: */[
                                                                "v_texCoord = a_position;",
                                                                /* :: */[
                                                                  "vec4 pos = u_pMatrix * u_skyboxVMatrix * vec4(a_position, 1.0);",
                                                                  /* :: */[
                                                                    "gl_Position = pos.xyww;",
                                                                    /* [] */0
                                                                  ]
                                                                ]
                                                              ]
                                                            ]
                                                          ]
                                                        ])), true);
                                    }));
                              return Wonder_jest.test("test fs", (function (param) {
                                            var match = RenderInJobTool$Wonderjs.prepareForJudgeGLSLNotExec(sandbox, state[0]);
                                            DirectorTool$Wonderjs.init(match[0]);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getFsSourceByCount(match[1], 0), /* :: */[
                                                                "gl_FragColor = textureCube(u_skyboxCubeMapSampler, vec3(-v_texCoord.x, v_texCoord.y, v_texCoord.z));",
                                                                /* [] */0
                                                              ])), true);
                                          }));
                            }));
              }));
        Wonder_jest.describe("if skybox has no cubemap texture", (function (param) {
                return Wonder_jest.test("not draw", (function (param) {
                              var drawElements = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(drawElements), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                              DirectorTool$Wonderjs.runWithDefaultTime(DirectorTool$Wonderjs.init(state$1));
                              return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](drawElements)));
                            }));
              }));
        return Wonder_jest.describe("else", (function (param) {
                      var cubemapTextureRef = /* record */[/* contents */-1];
                      var cameraTransformRef = /* record */[/* contents */-1];
                      beforeEach((function () {
                              var match = SkyboxTool$Wonderjs.prepareCubemapTexture(state[0]);
                              var match$1 = SkyboxTool$Wonderjs.prepareGameObject(match[0]);
                              state[0] = match$1[0];
                              cubemapTextureRef[0] = match[1];
                              cameraTransformRef[0] = match$1[1];
                              return /* () */0;
                            }));
                      Wonder_jest.describe("bind cubemap", (function (param) {
                              Wonder_jest.test("if not has map, not bind", (function (param) {
                                      var state$1 = SceneAPI$Wonderjs.removeCubemapTexture(state[0]);
                                      var bindTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                      var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(bindTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                      DirectorTool$Wonderjs.runWithDefaultTime(DirectorTool$Wonderjs.init(state$2));
                                      return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](bindTexture)));
                                    }));
                              return Wonder_jest.describe("else", (function (param) {
                                            var _prepare = function (state) {
                                              TestTool$Wonderjs.closeContractCheck(/* () */0);
                                              var createTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              Sinon.returns(11, Sinon.onCall(0, createTexture));
                                              var activeTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var bindTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 8, undefined, undefined, undefined, undefined, undefined, undefined, 10, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createTexture), Caml_option.some(activeTexture), Caml_option.some(bindTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
                                              return /* tuple */[
                                                      state$1,
                                                      /* tuple */[
                                                        8,
                                                        11,
                                                        10
                                                      ],
                                                      /* tuple */[
                                                        activeTexture,
                                                        bindTexture
                                                      ]
                                                    ];
                                            };
                                            Wonder_jest.test("active texture unit", (function (param) {
                                                    var match = _prepare(state[0]);
                                                    DirectorTool$Wonderjs.runWithDefaultTime(DirectorTool$Wonderjs.init(match[0]));
                                                    return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withOneArg(match[1][2], match[2][0])));
                                                  }));
                                            return Wonder_jest.test("bind gl texture to TEXTURE_CUBE_MAP target", (function (param) {
                                                          var match = _prepare(state[0]);
                                                          var match$1 = match[1];
                                                          DirectorTool$Wonderjs.runWithDefaultTime(DirectorTool$Wonderjs.init(match[0]));
                                                          return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withTwoArgs(match$1[0], match$1[1], match[2][1])));
                                                        }));
                                          }));
                            }));
                      Wonder_jest.describe("update cubemap", (function (param) {
                              var _prepare = function (state, $staropt$star, $staropt$star$1, param) {
                                var width = $staropt$star !== undefined ? $staropt$star : 2;
                                var height = $staropt$star$1 !== undefined ? $staropt$star$1 : 4;
                                var state$1 = CubemapTextureTool$Wonderjs.setAllSources(state, cubemapTextureRef[0], width, height, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                return /* tuple */[
                                        state$1,
                                        cubemapTextureRef[0]
                                      ];
                              };
                              Wonder_jest.test("if is updated before, not update", (function (param) {
                                      var match = _prepare(state[0], undefined, undefined, /* () */0);
                                      var pixelStorei = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                      var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(pixelStorei), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                      var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(DirectorTool$Wonderjs.init(state$1));
                                      var pixelStoreiCallCount = Sinon.getCallCount(Sinon.withOneArg(2, pixelStorei));
                                      var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                      DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(2, pixelStorei))), pixelStoreiCallCount);
                                    }));
                              Wonder_jest.describe("contract check", (function (param) {
                                      return Wonder_jest.test("should has all sources", (function (param) {
                                                    TestTool$Wonderjs.openContractCheck(/* () */0);
                                                    var pixelStorei = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                    var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(pixelStorei), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                                                    return Wonder_jest.Expect[/* toThrowMessage */21]("expect has all sources", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                                      return DirectorTool$Wonderjs.runWithDefaultTime(DirectorTool$Wonderjs.init(state$1));
                                                                    })));
                                                  }));
                                    }));
                              return Wonder_jest.describe("else", (function (param) {
                                            Wonder_jest.describe("contract check", (function (param) {
                                                    Wonder_jest.test("all sources' size should equal", (function (param) {
                                                            TestTool$Wonderjs.openContractCheck(/* () */0);
                                                            var match = _prepare(state[0], undefined, undefined, /* () */0);
                                                            var state$1 = CubemapTextureAPI$Wonderjs.setCubemapTextureNYSource(match[1], CubemapTextureTool$Wonderjs.buildSource(100, 50, undefined, undefined, /* () */0), match[0]);
                                                            var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                                            return Wonder_jest.Expect[/* toThrowMessage */21]("expect all sources' size equal", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                                              return DirectorTool$Wonderjs.runWithDefaultTime(DirectorTool$Wonderjs.init(state$2));
                                                                            })));
                                                          }));
                                                    return Wonder_jest.test("source' width and height should equal", (function (param) {
                                                                  TestTool$Wonderjs.openContractCheck(/* () */0);
                                                                  var match = _prepare(state[0], undefined, undefined, /* () */0);
                                                                  var state$1 = CubemapTextureTool$Wonderjs.setAllSources(match[0], match[1], 2, 4, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                                  var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                                                  return Wonder_jest.Expect[/* toThrowMessage */21]("expect source' width and height equal", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                                                    return DirectorTool$Wonderjs.runWithDefaultTime(DirectorTool$Wonderjs.init(state$2));
                                                                                  })));
                                                                }));
                                                  }));
                                            Wonder_jest.test("set flipY", (function (param) {
                                                    var match = _prepare(state[0], undefined, undefined, /* () */0);
                                                    var state$1 = CubemapTextureAPI$Wonderjs.setCubemapTextureFlipY(match[1], true, match[0]);
                                                    var pixelStorei = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                    var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(pixelStorei), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                                    DirectorTool$Wonderjs.runWithDefaultTime(DirectorTool$Wonderjs.init(state$2));
                                                    return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withTwoArgs(2, true, pixelStorei)));
                                                  }));
                                            Wonder_jest.describe("set texture parameters", (function (param) {
                                                    return Wonder_jest.test("set it only once", (function (param) {
                                                                  var match = _prepare(state[0], undefined, undefined, /* () */0);
                                                                  var texParameteri = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                  var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, 2, undefined, undefined, undefined, undefined, undefined, 4, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(texParameteri), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                                  DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withThreeArgs(1, 2, 4, texParameteri))), 1);
                                                                }));
                                                  }));
                                            Wonder_jest.describe("allocate source to texture", (function (param) {
                                                    return Wonder_jest.describe("draw no mipmap twoD texture", (function (param) {
                                                                  Wonder_jest.test("should draw 6 times", (function (param) {
                                                                          var match = _prepare(state[0], undefined, undefined, /* () */0);
                                                                          var texImage2D = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                          var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(texImage2D), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                                          DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(texImage2D)), 6);
                                                                        }));
                                                                  return Wonder_jest.test("test draw with source, format, type", (function (param) {
                                                                                var match = _prepare(state[0], undefined, undefined, /* () */0);
                                                                                var map = match[1];
                                                                                var state$1 = match[0];
                                                                                var pxSource = CubemapTextureAPI$Wonderjs.unsafeGetCubemapTexturePXSource(map, state$1);
                                                                                var nxSource = CubemapTextureAPI$Wonderjs.unsafeGetCubemapTextureNXSource(map, state$1);
                                                                                var pySource = CubemapTextureAPI$Wonderjs.unsafeGetCubemapTexturePYSource(map, state$1);
                                                                                var nySource = CubemapTextureAPI$Wonderjs.unsafeGetCubemapTextureNYSource(map, state$1);
                                                                                var pzSource = CubemapTextureAPI$Wonderjs.unsafeGetCubemapTexturePZSource(map, state$1);
                                                                                var nzSource = CubemapTextureAPI$Wonderjs.unsafeGetCubemapTextureNZSource(map, state$1);
                                                                                var state$2 = CubemapTextureAPI$Wonderjs.setCubemapTexturePZFormat(map, /* Rgba */1, CubemapTextureAPI$Wonderjs.setCubemapTextureNXFormat(map, /* Rgbs3tcdxt1 */5, CubemapTextureAPI$Wonderjs.setCubemapTexturePXFormat(map, /* Rgbas3tcdxt1 */6, state$1)));
                                                                                var state$3 = CubemapTextureAPI$Wonderjs.setCubemapTexturePZType(map, 2, CubemapTextureAPI$Wonderjs.setCubemapTextureNXType(map, 2, CubemapTextureAPI$Wonderjs.setCubemapTexturePXType(map, 1, state$2)));
                                                                                var texImage2D = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                                var state$4 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 2, 3, undefined, undefined, undefined, 4, 5, undefined, undefined, 3, 4, 5, undefined, undefined, undefined, undefined, 1, 1, 2, 3, 4, 5, 6, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(texImage2D), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$3);
                                                                                DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$4));
                                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                SinonTool$Wonderjs.calledWithArg6(texImage2D, 1, 0, 5, 5, 4, pxSource),
                                                                                                SinonTool$Wonderjs.calledWithArg6(texImage2D, 2, 0, 4, 4, 5, nxSource),
                                                                                                SinonTool$Wonderjs.calledWithArg6(texImage2D, 3, 0, 2, 2, 3, pySource),
                                                                                                SinonTool$Wonderjs.calledWithArg6(texImage2D, 4, 0, 2, 2, 3, nySource),
                                                                                                SinonTool$Wonderjs.calledWithArg6(texImage2D, 5, 0, 3, 3, 5, pzSource),
                                                                                                SinonTool$Wonderjs.calledWithArg6(texImage2D, 6, 0, 2, 2, 3, nzSource)
                                                                                              ]), /* tuple */[
                                                                                            true,
                                                                                            true,
                                                                                            true,
                                                                                            true,
                                                                                            true,
                                                                                            true
                                                                                          ]);
                                                                              }));
                                                                }));
                                                  }));
                                            return Wonder_jest.describe("generate mipmap", (function (param) {
                                                          var _exec = function (state) {
                                                            var generateMipmap = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                            var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(generateMipmap), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
                                                            var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                                            return /* tuple */[
                                                                    state$2,
                                                                    1,
                                                                    generateMipmap
                                                                  ];
                                                          };
                                                          Wonder_jest.test("if filter is mipmap and is source power of two, generate", (function (param) {
                                                                  var match = _prepare(state[0], 2, 4, /* () */0);
                                                                  var state$1 = CubemapTextureAPI$Wonderjs.setCubemapTextureMagFilter(match[1], TextureTool$Wonderjs.getNearestMipmapNearest(/* () */0), match[0]);
                                                                  var match$1 = _exec(state$1);
                                                                  return Sinon.toCalledWith(/* array */[match$1[1]], Wonder_jest.Expect[/* expect */0](match$1[2]));
                                                                }));
                                                          return Wonder_jest.describe("else, not generate", (function (param) {
                                                                        Wonder_jest.test("test filter isn't mipmap", (function (param) {
                                                                                var match = _prepare(state[0], 2, 4, /* () */0);
                                                                                var map = match[1];
                                                                                var state$1 = CubemapTextureAPI$Wonderjs.setCubemapTextureMinFilter(map, TextureTool$Wonderjs.getNearest(/* () */0), CubemapTextureAPI$Wonderjs.setCubemapTextureMagFilter(map, TextureTool$Wonderjs.getNearest(/* () */0), match[0]));
                                                                                var match$1 = _exec(state$1);
                                                                                return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](match$1[2])));
                                                                              }));
                                                                        return Wonder_jest.test("test source isn't power of two", (function (param) {
                                                                                      var match = _prepare(state[0], 1, 4, /* () */0);
                                                                                      var map = match[1];
                                                                                      var state$1 = CubemapTextureAPI$Wonderjs.setCubemapTextureMinFilter(map, TextureTool$Wonderjs.getNearest(/* () */0), CubemapTextureAPI$Wonderjs.setCubemapTextureMagFilter(map, TextureTool$Wonderjs.getLinearMipmapLinear(/* () */0), match[0]));
                                                                                      var match$1 = _exec(state$1);
                                                                                      return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](match$1[2])));
                                                                                    }));
                                                                      }));
                                                        }));
                                          }));
                            }));
                      Wonder_jest.describe("prepare gl state", (function (param) {
                              Wonder_jest.test("set depth func to LEqual", (function (param) {
                                      var depthFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                      var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(depthFunc), undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                                      DirectorTool$Wonderjs.runWithDefaultTime(DirectorTool$Wonderjs.init(state$1));
                                      return Sinon.toCalledWith(/* array */[1], Wonder_jest.Expect[/* expect */0](depthFunc));
                                    }));
                              return Wonder_jest.test("set side to back", (function (param) {
                                            var cullFace = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                            var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(cullFace), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                                            DirectorTool$Wonderjs.runWithDefaultTime(DirectorTool$Wonderjs.init(state$1));
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](SinonTool$Wonderjs.calledWith(cullFace, 1)), true);
                                          }));
                            }));
                      Wonder_jest.describe("use skybox program", (function (param) {
                              return Wonder_jest.test("test", (function (param) {
                                            var match = RenderInJobTool$Wonderjs.TestUseProgram[/* prepareAndExec */0](sandbox, state, "skybox");
                                            var __x = Sinon.getCall(0, match[1]);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](SinonTool$Wonderjs.calledWith(__x, ProgramTool$Wonderjs.unsafeGetProgram(match[2], match[0]))), true);
                                          }));
                            }));
                      return Wonder_jest.describe("draw skybox gameObject", (function (param) {
                                    Wonder_jest.describe("send box geometry's attribute data", (function (param) {
                                            Wonder_jest.describe("init vertex buffer", (function (param) {
                                                    return Wonder_jest.test("bufferData", (function (param) {
                                                                  var bufferData = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                  var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(bufferData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                                                                  var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(DirectorTool$Wonderjs.init(state$1));
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withThreeArgs(1, BoxGeometryTool$Wonderjs.getBoxGeometryVertices(state$2), 2, bufferData))), 1);
                                                                }));
                                                  }));
                                            return Wonder_jest.describe("init index buffer", (function (param) {
                                                          return Wonder_jest.test("bufferData", (function (param) {
                                                                        var bufferData = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                        var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(bufferData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                                                                        var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(DirectorTool$Wonderjs.init(state$1));
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withThreeArgs(1, BoxGeometryTool$Wonderjs.getBoxGeometryIndices(state$2), 2, bufferData))), 1);
                                                                      }));
                                                        }));
                                          }));
                                    Wonder_jest.describe("send uniform data", (function (param) {
                                            Wonder_jest.describe("test send data per shader", (function (param) {
                                                    return Wonder_jest.test("send u_pMatrix", (function (param) {
                                                                  var uniformMatrix4fv = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                  var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_pMatrix");
                                                                  var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(uniformMatrix4fv), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                                                                  DirectorTool$Wonderjs.runWithDefaultTime(DirectorTool$Wonderjs.init(state$1));
                                                                  return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withThreeArgs(0, false, PerspectiveCameraProjectionTool$Wonderjs.getPMatrixOfCreateBasicCameraViewPerspectiveCamera(/* () */0), uniformMatrix4fv)));
                                                                }));
                                                  }));
                                            Wonder_jest.describe("send u_skyboxVMatrix", (function (param) {
                                                    return Wonder_jest.test("send camera's vMatrix which not translate", (function (param) {
                                                                  var state$1 = TransformAPI$Wonderjs.setTransformLocalEulerAngles(cameraTransformRef[0], /* tuple */[
                                                                        1,
                                                                        3,
                                                                        3.5
                                                                      ], TransformAPI$Wonderjs.setTransformLocalPosition(cameraTransformRef[0], /* tuple */[
                                                                            10,
                                                                            2,
                                                                            3
                                                                          ], state[0]));
                                                                  var uniformMatrix4fv = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                  var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_skyboxVMatrix");
                                                                  var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(uniformMatrix4fv), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                                                  DirectorTool$Wonderjs.runWithDefaultTime(DirectorTool$Wonderjs.init(state$2));
                                                                  return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withThreeArgs(0, false, new Float32Array(/* array */[
                                                                                          0.9967669248580933,
                                                                                          -0.060127560049295425,
                                                                                          0.05329582467675209,
                                                                                          0,
                                                                                          0.06096487492322922,
                                                                                          0.9980385303497314,
                                                                                          -0.014225305989384651,
                                                                                          0,
                                                                                          -0.0523359552025795,
                                                                                          0.017428487539291382,
                                                                                          0.9984773993492126,
                                                                                          -0,
                                                                                          0,
                                                                                          0,
                                                                                          0,
                                                                                          1
                                                                                        ]), uniformMatrix4fv)));
                                                                }));
                                                  }));
                                            return Wonder_jest.describe("send u_skyboxCubeMapSampler", (function (param) {
                                                          return Wonder_jest.test("send skybox cubemap unit which should be 0", (function (param) {
                                                                        var uniform1i = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                        var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_skyboxCubeMapSampler");
                                                                        var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(uniform1i), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                                                                        DirectorTool$Wonderjs.runWithDefaultTime(DirectorTool$Wonderjs.init(state$1));
                                                                        return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withTwoArgs(0, 0, uniform1i)));
                                                                      }));
                                                        }));
                                          }));
                                    Wonder_jest.describe("draw", (function (param) {
                                            return Wonder_jest.test("test drawElements", (function (param) {
                                                          var drawElements = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                          var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(drawElements), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                                                          var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(DirectorTool$Wonderjs.init(state$1));
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withFourArgs(1, BoxGeometryTool$Wonderjs.getBoxGeometryIndices(state$2).length, 2, 0, drawElements))), 1);
                                                        }));
                                          }));
                                    return Wonder_jest.describe("restore gl state", (function (param) {
                                                  Wonder_jest.test("set depth func to LESS", (function (param) {
                                                          var depthFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                          var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(depthFunc), undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                                                          DirectorTool$Wonderjs.runWithDefaultTime(DirectorTool$Wonderjs.init(state$1));
                                                          return Sinon.toCalledWith(/* array */[1], Wonder_jest.Expect[/* expect */0](depthFunc));
                                                        }));
                                                  return Wonder_jest.test("set side to front", (function (param) {
                                                                var cullFace = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(cullFace), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                                                                DirectorTool$Wonderjs.runWithDefaultTime(DirectorTool$Wonderjs.init(state$1));
                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](SinonTool$Wonderjs.calledWith(cullFace, 1)), true);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
