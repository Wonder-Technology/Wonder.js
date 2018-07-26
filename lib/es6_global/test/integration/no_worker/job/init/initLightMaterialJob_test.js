

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as GLSLTool$Wonderjs from "../../../../tool/render/core/GLSLTool.js";
import * as FakeGlTool$Wonderjs from "../../../../tool/gl/FakeGlTool.js";
import * as SettingTool$Wonderjs from "../../../../tool/service/setting/SettingTool.js";
import * as InstanceTool$Wonderjs from "../../../../tool/service/instance/InstanceTool.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as PointLightTool$Wonderjs from "../../../../tool/service/light/PointLightTool.js";
import * as GLSLLocationTool$Wonderjs from "../../../../tool/service/location/GLSLLocationTool.js";
import * as InitMaterialTool$Wonderjs from "../../../../tool/job/no_worker/init/InitMaterialTool.js";
import * as DirectionLightTool$Wonderjs from "../../../../tool/service/light/DirectionLightTool.js";
import * as InitMaterialJobTool$Wonderjs from "../../../../tool/job/no_worker/init/InitMaterialJobTool.js";
import * as NoWorkerJobConfigTool$Wonderjs from "../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js";
import * as InitLightMaterialJobTool$Wonderjs from "../../../../tool/job/no_worker/init/InitLightMaterialJobTool.js";

describe("test init light material job", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        var _buildNoWorkerJobConfig = function () {
          return NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"preget_glslData\"\n        },\n        {\n          \"name\": \"init_light_material\"\n        }\n      ]\n    }\n  ]\n        ", undefined, "\n[\n        {\n          \"name\": \"preget_glslData\"\n        },\n        {\n          \"name\": \"init_light_material\"\n        }\n]\n        ", undefined, /* () */0);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = InitLightMaterialJobTool$Wonderjs.initWithJobConfig(sandbox, _buildNoWorkerJobConfig(/* () */0));
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test get attribute location", (function () {
                describe("test get a_position location", (function () {
                        return Wonder_jest.test("test get location", (function () {
                                      var match = InitLightMaterialJobTool$Wonderjs.prepareGameObject(sandbox, state[0]);
                                      var getAttribLocation = GLSLLocationTool$Wonderjs.getAttribLocation(undefined, sandbox, "a_position");
                                      var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getAttribLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                      InitLightMaterialJobTool$Wonderjs.exec(state$1);
                                      return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withTwoArgs(Sinon$1.match.any, "a_position", getAttribLocation)));
                                    }));
                      }));
                describe("test get a_texCoord location", (function () {
                        return Wonder_jest.test("test get location", (function () {
                                      var match = InitLightMaterialJobTool$Wonderjs.prepareGameObjectWithCreatedMap(sandbox, state[0]);
                                      var getAttribLocation = GLSLLocationTool$Wonderjs.getAttribLocation(undefined, sandbox, "a_texCoord");
                                      var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getAttribLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                      InitLightMaterialJobTool$Wonderjs.exec(state$1);
                                      return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withTwoArgs(Sinon$1.match.any, "a_texCoord", getAttribLocation)));
                                    }));
                      }));
                describe("test get a_normal location", (function () {
                        Wonder_jest.test("test get location", (function () {
                                var match = InitLightMaterialJobTool$Wonderjs.prepareGameObject(sandbox, state[0]);
                                var getAttribLocation = GLSLLocationTool$Wonderjs.getAttribLocation(undefined, sandbox, "a_normal");
                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getAttribLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                InitLightMaterialJobTool$Wonderjs.exec(state$1);
                                return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withTwoArgs(Sinon$1.match.any, "a_normal", getAttribLocation)));
                              }));
                        describe("test cache", (function () {
                                return Wonder_jest.test("if cached, not query gl location", (function () {
                                              var match = InitLightMaterialJobTool$Wonderjs.prepareGameObject(sandbox, state[0]);
                                              var match$1 = InitLightMaterialJobTool$Wonderjs.prepareGameObject(sandbox, match[0]);
                                              var getAttribLocation = GLSLLocationTool$Wonderjs.getAttribLocation(undefined, sandbox, "a_normal");
                                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getAttribLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                                              InitLightMaterialJobTool$Wonderjs.exec(state$1);
                                              return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withTwoArgs(Sinon$1.match.any, "a_normal", getAttribLocation)));
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("test get uniform location", (function () {
                var _testGetLocationWithPrepareGameObjectFunc = function (name, prepareGameObjectFunc) {
                  return InitMaterialTool$Wonderjs.testGetLocation(sandbox, name, /* tuple */[
                              prepareGameObjectFunc,
                              InitLightMaterialJobTool$Wonderjs.exec
                            ], state);
                };
                describe("test get u_normalMatrix location", (function () {
                        Wonder_jest.test("test get location", (function () {
                                return _testGetLocationWithPrepareGameObjectFunc("u_normalMatrix", InitLightMaterialJobTool$Wonderjs.prepareGameObject);
                              }));
                        describe("test cache", (function () {
                                return Wonder_jest.test("if cached, not query gl location", (function () {
                                              return InitMaterialTool$Wonderjs.testLocationCache(sandbox, "u_normalMatrix", /* tuple */[
                                                          InitLightMaterialJobTool$Wonderjs.prepareGameObject,
                                                          InitLightMaterialJobTool$Wonderjs.exec
                                                        ], state);
                                            }));
                              }));
                        return /* () */0;
                      }));
                Wonder_jest.test("test get u_mMatrix location", (function () {
                        return _testGetLocationWithPrepareGameObjectFunc("u_mMatrix", InitLightMaterialJobTool$Wonderjs.prepareGameObject);
                      }));
                Wonder_jest.test("test get u_cameraPos location", (function () {
                        return _testGetLocationWithPrepareGameObjectFunc("u_cameraPos", InitLightMaterialJobTool$Wonderjs.prepareGameObject);
                      }));
                Wonder_jest.test("test get u_diffuse location", (function () {
                        return _testGetLocationWithPrepareGameObjectFunc("u_diffuse", InitLightMaterialJobTool$Wonderjs.prepareGameObject);
                      }));
                Wonder_jest.test("test get u_specular location", (function () {
                        return _testGetLocationWithPrepareGameObjectFunc("u_specular", InitLightMaterialJobTool$Wonderjs.prepareGameObject);
                      }));
                Wonder_jest.test("test get u_shininess location", (function () {
                        return _testGetLocationWithPrepareGameObjectFunc("u_shininess", InitLightMaterialJobTool$Wonderjs.prepareGameObject);
                      }));
                Wonder_jest.test("test get u_diffuseMapSampler location", (function () {
                        return _testGetLocationWithPrepareGameObjectFunc("u_diffuseMapSampler", InitLightMaterialJobTool$Wonderjs.prepareGameObjectWithCreatedMap);
                      }));
                return Wonder_jest.test("test get u_specularMapSampler location", (function () {
                              return _testGetLocationWithPrepareGameObjectFunc("u_specularMapSampler", InitLightMaterialJobTool$Wonderjs.prepareGameObjectWithCreatedMap);
                            }));
              }));
        describe("test glsl", (function () {
                Wonder_jest.test("glsl only set glPosition,glFragColor once", (function () {
                        return InitMaterialTool$Wonderjs.testOnlySeGlPositionGlFragColorOnce(sandbox, (function (param, param$1) {
                                      return InitLightMaterialJobTool$Wonderjs.prepareForJudgeGLSL(InitLightMaterialJobTool$Wonderjs.prepareGameObject, param, param$1);
                                    }), state);
                      }));
                describe("test shader lib's glsl", (function () {
                        Wonder_jest.test("test common shader lib's glsl", (function () {
                                return InitMaterialTool$Wonderjs.testCommonShaderLibGlsl(sandbox, (function (param, param$1) {
                                              return InitLightMaterialJobTool$Wonderjs.prepareForJudgeGLSL(InitLightMaterialJobTool$Wonderjs.prepareGameObject, param, param$1);
                                            }), state);
                              }));
                        Wonder_jest.test("test vertex shader lib's glsl", (function () {
                                return InitMaterialTool$Wonderjs.testVertexShaderLibGlsl(sandbox, (function (param, param$1) {
                                              return InitLightMaterialJobTool$Wonderjs.prepareForJudgeGLSL(InitLightMaterialJobTool$Wonderjs.prepareGameObject, param, param$1);
                                            }), state);
                              }));
                        Wonder_jest.test("test normal shader lib's glsl", (function () {
                                var shaderSource = InitLightMaterialJobTool$Wonderjs.prepareForJudgeGLSL(InitLightMaterialJobTool$Wonderjs.prepareGameObject, sandbox, state[0]);
                                return Wonder_jest.Expect[/* toContainString */11]("attribute vec3 a_normal;")(Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.getVsSource(shaderSource)));
                              }));
                        describe("test modelMatrix instance shader libs", (function () {
                                return InitMaterialJobTool$Wonderjs.testModelMatrixInstanceShaderLibs(sandbox, /* tuple */[
                                            (function (param, param$1) {
                                                return InitLightMaterialJobTool$Wonderjs.prepareForJudgeGLSL(InitLightMaterialJobTool$Wonderjs.prepareGameObject, param, param$1);
                                              }),
                                            (function (param, param$1) {
                                                return InitLightMaterialJobTool$Wonderjs.prepareForJudgeGLSLNotExec(InitLightMaterialJobTool$Wonderjs.prepareGameObject, param, param$1);
                                              }),
                                            InitLightMaterialJobTool$Wonderjs.exec
                                          ], state);
                              }));
                        describe("test normalMatrix instance shader libs", (function () {
                                Wonder_jest.test("if has no sourceInstance component, use normalMatrix_noInstance shader lib", (function () {
                                        var shaderSource = InitLightMaterialJobTool$Wonderjs.prepareForJudgeGLSL(InitLightMaterialJobTool$Wonderjs.prepareGameObject, sandbox, state[0]);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getVsSource(shaderSource), /* :: */[
                                                            "uniform mat3 u_normalMatrix;",
                                                            /* :: */[
                                                              "mat3 normalMatrix = u_normalMatrix;",
                                                              /* [] */0
                                                            ]
                                                          ])), true);
                                      }));
                                describe("else", (function () {
                                        Wonder_jest.test("if support hardware instance, use normalMatrix_hardware_instance shader lib", (function () {
                                                var match = InitLightMaterialJobTool$Wonderjs.prepareForJudgeGLSLNotExec(InitLightMaterialJobTool$Wonderjs.prepareGameObject, sandbox, state[0]);
                                                var match$1 = InstanceTool$Wonderjs.addSourceInstance(match[2], match[0]);
                                                var state$1 = InstanceTool$Wonderjs.setGPUDetectDataAllowHardwareInstance(sandbox, match$1[0]);
                                                InitLightMaterialJobTool$Wonderjs.exec(state$1);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getVsSource(match[1]), /* :: */[
                                                                    "attribute vec3 a_normalVec3_0;",
                                                                    /* :: */[
                                                                      "attribute vec3 a_normalVec3_1;",
                                                                      /* :: */[
                                                                        "attribute vec3 a_normalVec3_2;",
                                                                        /* :: */[
                                                                          "mat3 normalMatrix = mat3(a_normalVec3_0, a_normalVec3_1, a_normalVec3_2);",
                                                                          /* [] */0
                                                                        ]
                                                                      ]
                                                                    ]
                                                                  ])), true);
                                              }));
                                        describe("else, use normalMatrix_batch_instance shader lib", (function () {
                                                var _setGPUDetectDataAllowBatchInstance = function (state) {
                                                  var newrecord = Caml_array.caml_array_dup(state);
                                                  var init = state[/* gpuDetectRecord */5];
                                                  newrecord[/* gpuDetectRecord */5] = /* record */[
                                                    /* extensionInstancedArrays */undefined,
                                                    /* precision */init[/* precision */1],
                                                    /* maxTextureUnit */init[/* maxTextureUnit */2]
                                                  ];
                                                  return newrecord;
                                                };
                                                Wonder_jest.test("if state->gpuConfig->useHardwareInstance == false, use batch", (function () {
                                                        var match = InitLightMaterialJobTool$Wonderjs.prepareForJudgeGLSLNotExec(InitLightMaterialJobTool$Wonderjs.prepareGameObject, sandbox, state[0]);
                                                        var match$1 = InstanceTool$Wonderjs.addSourceInstance(match[2], match[0]);
                                                        var state$1 = SettingTool$Wonderjs.setGPU(/* record */[/* useHardwareInstance */false], match$1[0]);
                                                        InitLightMaterialJobTool$Wonderjs.exec(state$1);
                                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getVsSource(match[1]), /* :: */[
                                                                            "uniform mat3 u_normalMatrix;",
                                                                            /* :: */[
                                                                              "mat3 normalMatrix = u_normalMatrix;",
                                                                              /* [] */0
                                                                            ]
                                                                          ])), true);
                                                      }));
                                                return Wonder_jest.test("if gpu not support hardware instance, use batch", (function () {
                                                              var match = InitLightMaterialJobTool$Wonderjs.prepareForJudgeGLSLNotExec(InitLightMaterialJobTool$Wonderjs.prepareGameObject, sandbox, state[0]);
                                                              var match$1 = InstanceTool$Wonderjs.addSourceInstance(match[2], match[0]);
                                                              var state$1 = _setGPUDetectDataAllowBatchInstance(match$1[0]);
                                                              var state$2 = InstanceTool$Wonderjs.setGPUDetectDataAllowBatchInstance(state$1);
                                                              InitLightMaterialJobTool$Wonderjs.exec(state$2);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getVsSource(match[1]), /* :: */[
                                                                                  "uniform mat3 u_normalMatrix;",
                                                                                  /* :: */[
                                                                                    "mat3 normalMatrix = u_normalMatrix;",
                                                                                    /* [] */0
                                                                                  ]
                                                                                ])), true);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        describe("test light_common shader lib's glsl", (function () {
                                Wonder_jest.test("test vs glsl", (function () {
                                        var shaderSource = InitLightMaterialJobTool$Wonderjs.prepareForJudgeGLSL(InitLightMaterialJobTool$Wonderjs.prepareGameObject, sandbox, state[0]);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getVsSource(shaderSource), /* :: */[
                                                            "\nvarying vec3 v_worldPosition;\n\n#if POINT_LIGHTS_COUNT > 0\nstruct PointLight {\n    vec3 position;\n    vec3 color;\n    float intensity;\n\n    float range;\n    float constant;\n    float linear;\n    float quadratic;\n};\nuniform PointLight u_pointLights[POINT_LIGHTS_COUNT];\n\n#endif\n\n\n#if DIRECTION_LIGHTS_COUNT > 0\nstruct DirectionLight {\n    vec3 position;\n\n    float intensity;\n\n    vec3 color;\n};\nuniform DirectionLight u_directionLights[DIRECTION_LIGHTS_COUNT];\n#endif\n",
                                                            /* :: */[
                                                              "\n\nvec3 getDirectionLightDirByLightPos(vec3 lightPos);\nvec3 getPointLightDirByLightPos(vec3 lightPos);\nvec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition);\n                    ",
                                                              /* :: */[
                                                                "\nvec3 getDirectionLightDirByLightPos(vec3 lightPos){\n    return lightPos - vec3(0.0);\n}\nvec3 getPointLightDirByLightPos(vec3 lightPos){\n    return lightPos - v_worldPosition;\n}\nvec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition){\n    return lightPos - worldPosition;\n}\n                      ",
                                                                /* [] */0
                                                              ]
                                                            ]
                                                          ])), true);
                                      }));
                                return Wonder_jest.test("test fs glsl", (function () {
                                              var shaderSource = InitLightMaterialJobTool$Wonderjs.prepareForJudgeGLSL(InitLightMaterialJobTool$Wonderjs.prepareGameObject, sandbox, state[0]);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getFsSource(shaderSource), /* :: */[
                                                                  "\nvarying vec3 v_worldPosition;\n\n#if POINT_LIGHTS_COUNT > 0\nstruct PointLight {\n    vec3 position;\n    vec3 color;\n    float intensity;\n\n    float range;\n    float constant;\n    float linear;\n    float quadratic;\n};\nuniform PointLight u_pointLights[POINT_LIGHTS_COUNT];\n\n#endif\n\n\n#if DIRECTION_LIGHTS_COUNT > 0\nstruct DirectionLight {\n    vec3 position;\n\n    float intensity;\n\n    vec3 color;\n};\nuniform DirectionLight u_directionLights[DIRECTION_LIGHTS_COUNT];\n#endif\n",
                                                                  /* :: */[
                                                                    "\n\nvec3 getDirectionLightDirByLightPos(vec3 lightPos);\nvec3 getPointLightDirByLightPos(vec3 lightPos);\nvec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition);\n                    ",
                                                                    /* :: */[
                                                                      "\nvec3 getDirectionLightDirByLightPos(vec3 lightPos){\n    return lightPos - vec3(0.0);\n}\nvec3 getPointLightDirByLightPos(vec3 lightPos){\n    return lightPos - v_worldPosition;\n}\nvec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition){\n    return lightPos - worldPosition;\n}\n                      ",
                                                                      /* [] */0
                                                                    ]
                                                                  ]
                                                                ])), true);
                                            }));
                              }));
                        Wonder_jest.test("test light_setWorldPosition shader lib", (function () {
                                var shaderSource = InitLightMaterialJobTool$Wonderjs.prepareForJudgeGLSL(InitLightMaterialJobTool$Wonderjs.prepareGameObject, sandbox, state[0]);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getVsSource(shaderSource), /* :: */[
                                                    "v_worldPosition = vec3(mMatrix * vec4(a_position, 1.0));",
                                                    /* [] */0
                                                  ])), true);
                              }));
                        describe("test map shader lib", (function () {
                                describe("test diffuse map shader lib", (function () {
                                        describe("if has map", (function () {
                                                Wonder_jest.test("test vs glsl", (function () {
                                                        var shaderSource = InitLightMaterialJobTool$Wonderjs.prepareForJudgeGLSL(InitLightMaterialJobTool$Wonderjs.prepareGameObjectWithCreatedMap, sandbox, state[0]);
                                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getVsSource(shaderSource), /* :: */[
                                                                            "varying vec2 v_diffuseMapTexCoord;",
                                                                            /* :: */[
                                                                              "v_diffuseMapTexCoord = a_texCoord;",
                                                                              /* [] */0
                                                                            ]
                                                                          ])), true);
                                                      }));
                                                describe("test fs glsl", (function () {
                                                        Wonder_jest.test("test", (function () {
                                                                var shaderSource = InitLightMaterialJobTool$Wonderjs.prepareForJudgeGLSL(InitLightMaterialJobTool$Wonderjs.prepareGameObjectWithCreatedMap, sandbox, state[0]);
                                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getFsSource(shaderSource), /* :: */[
                                                                                    "uniform sampler2D u_diffuseMapSampler;",
                                                                                    /* :: */[
                                                                                      "uniform vec3 u_diffuse;",
                                                                                      /* :: */[
                                                                                        "varying vec2 v_diffuseMapTexCoord;",
                                                                                        /* :: */[
                                                                                          "vec3 getMaterialDiffuse() {\n        return texture2D(u_diffuseMapSampler, v_diffuseMapTexCoord).rgb * u_diffuse;\n    }",
                                                                                          /* [] */0
                                                                                        ]
                                                                                      ]
                                                                                    ]
                                                                                  ])), true);
                                                              }));
                                                        return Wonder_jest.test("should contain u_diffuse only once", (function () {
                                                                      var shaderSource = InitLightMaterialJobTool$Wonderjs.prepareForJudgeGLSL(InitLightMaterialJobTool$Wonderjs.prepareGameObjectWithCreatedMap, sandbox, state[0]);
                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containSpecifyCount(GLSLTool$Wonderjs.getFsSource(shaderSource), "uniform vec3 u_diffuse;", 1, /* () */0)), true);
                                                                    }));
                                                      }));
                                                return /* () */0;
                                              }));
                                        describe("else", (function () {
                                                return Wonder_jest.test("test fs glsl", (function () {
                                                              var shaderSource = InitLightMaterialJobTool$Wonderjs.prepareForJudgeGLSL(InitLightMaterialJobTool$Wonderjs.prepareGameObject, sandbox, state[0]);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getFsSource(shaderSource), /* :: */[
                                                                                  "uniform vec3 u_diffuse;",
                                                                                  /* :: */[
                                                                                    "\n    vec3 getMaterialDiffuse() {\n        return u_diffuse;\n    }\n                          ",
                                                                                    /* [] */0
                                                                                  ]
                                                                                ])), true);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                describe("test specular map shader lib", (function () {
                                        describe("if has map", (function () {
                                                Wonder_jest.test("test vs glsl", (function () {
                                                        var shaderSource = InitLightMaterialJobTool$Wonderjs.prepareForJudgeGLSL(InitLightMaterialJobTool$Wonderjs.prepareGameObjectWithCreatedMap, sandbox, state[0]);
                                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getVsSource(shaderSource), /* :: */[
                                                                            "varying vec2 v_specularMapTexCoord;",
                                                                            /* :: */[
                                                                              "v_specularMapTexCoord = a_texCoord;",
                                                                              /* [] */0
                                                                            ]
                                                                          ])), true);
                                                      }));
                                                return Wonder_jest.test("test fs glsl", (function () {
                                                              var shaderSource = InitLightMaterialJobTool$Wonderjs.prepareForJudgeGLSL(InitLightMaterialJobTool$Wonderjs.prepareGameObjectWithCreatedMap, sandbox, state[0]);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getFsSource(shaderSource), /* :: */[
                                                                                  "uniform sampler2D u_specularMapSampler;",
                                                                                  /* :: */[
                                                                                    "varying vec2 v_specularMapTexCoord;",
                                                                                    /* :: */[
                                                                                      "float getSpecularStrength() {\n        return texture2D(u_specularMapSampler, v_specularMapTexCoord).r;\n    }",
                                                                                      /* [] */0
                                                                                    ]
                                                                                  ]
                                                                                ])), true);
                                                            }));
                                              }));
                                        describe("else", (function () {
                                                return Wonder_jest.test("test fs glsl", (function () {
                                                              var shaderSource = InitLightMaterialJobTool$Wonderjs.prepareForJudgeGLSL(InitLightMaterialJobTool$Wonderjs.prepareGameObject, sandbox, state[0]);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getFsSource(shaderSource), /* :: */[
                                                                                  "float getSpecularStrength() {\n        return 1.0;\n    }",
                                                                                  /* [] */0
                                                                                ])), true);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                Wonder_jest.test("test no_light_map shader lib", (function () {
                                        var shaderSource = InitLightMaterialJobTool$Wonderjs.prepareForJudgeGLSL(InitLightMaterialJobTool$Wonderjs.prepareGameObject, sandbox, state[0]);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getFsSource(shaderSource), /* :: */[
                                                            "\n    vec3 getMaterialLight() {\n        return vec3(0.0);\n    }\n                          ",
                                                            /* [] */0
                                                          ])), true);
                                      }));
                                Wonder_jest.test("test no_emission_map shader lib", (function () {
                                        var shaderSource = InitLightMaterialJobTool$Wonderjs.prepareForJudgeGLSL(InitLightMaterialJobTool$Wonderjs.prepareGameObject, sandbox, state[0]);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getFsSource(shaderSource), /* :: */[
                                                            "\n    vec3 getMaterialEmission() {\n        return vec3(0.0);\n    }\n                          ",
                                                            /* [] */0
                                                          ])), true);
                                      }));
                                describe("test no_normal_map shader lib", (function () {
                                        Wonder_jest.test("test vs glsl", (function () {
                                                var shaderSource = InitLightMaterialJobTool$Wonderjs.prepareForJudgeGLSL(InitLightMaterialJobTool$Wonderjs.prepareGameObject, sandbox, state[0]);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getVsSource(shaderSource), /* :: */[
                                                                    "varying vec3 v_normal;",
                                                                    /* :: */[
                                                                      "v_normal = normalize(normalMatrix * a_normal);",
                                                                      /* [] */0
                                                                    ]
                                                                  ])), true);
                                              }));
                                        return Wonder_jest.test("test fs glsl", (function () {
                                                      var shaderSource = InitLightMaterialJobTool$Wonderjs.prepareForJudgeGLSL(InitLightMaterialJobTool$Wonderjs.prepareGameObject, sandbox, state[0]);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getFsSource(shaderSource), /* :: */[
                                                                          "varying vec3 v_normal;",
                                                                          /* :: */[
                                                                            "vec3 getNormal();",
                                                                            /* :: */[
                                                                              "\nvec3 getNormal(){\n    return v_normal;\n}\n",
                                                                              /* :: */[
                                                                                "\n\n#if DIRECTION_LIGHTS_COUNT > 0\nvec3 getDirectionLightDir(int index){\n    //workaround '[] : Index expression must be constant' error\n    for (int x = 0; x <= DIRECTION_LIGHTS_COUNT; x++) {\n        if(x == index){\n            return getDirectionLightDirByLightPos(u_directionLights[x].position);\n        }\n    }\n\n    /*!\n    solve error in window7 chrome/firefox:\n    not all control paths return a value.\n    failed to create d3d shaders\n    */\n    return vec3(0.0);\n}\n#endif\n\n\nvec3 getViewDir(){\n    return normalize(u_cameraPos - v_worldPosition);\n}\n",
                                                                                /* [] */0
                                                                              ]
                                                                            ]
                                                                          ]
                                                                        ])), true);
                                                    }));
                                      }));
                                return Wonder_jest.test("test no_shadow_map shader lib", (function () {
                                              var shaderSource = InitLightMaterialJobTool$Wonderjs.prepareForJudgeGLSL(InitLightMaterialJobTool$Wonderjs.prepareGameObject, sandbox, state[0]);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getFsSource(shaderSource), /* :: */[
                                                                  "\n    float getShadowVisibility() {\n        return 1.0;\n    }\n                          ",
                                                                  /* [] */0
                                                                ])), true);
                                            }));
                              }));
                        describe("test light shader lib", (function () {
                                var _prepareForJudgeGLSL = function (state) {
                                  return InitLightMaterialJobTool$Wonderjs.prepareForJudgeGLSL((function (sandbox, state) {
                                                var match = InitLightMaterialJobTool$Wonderjs.prepareGameObject(sandbox, state);
                                                var match$1 = DirectionLightTool$Wonderjs.createGameObject(match[0]);
                                                var match$2 = DirectionLightTool$Wonderjs.createGameObject(match$1[0]);
                                                var match$3 = PointLightTool$Wonderjs.createGameObject(match$2[0]);
                                                var match$4 = PointLightTool$Wonderjs.createGameObject(match$3[0]);
                                                return /* tuple */[
                                                        match$4[0],
                                                        match$4[1],
                                                        match[2],
                                                        match[3]
                                                      ];
                                              }), sandbox, state[0]);
                                };
                                describe("test vs glsl", (function () {
                                        Wonder_jest.test("define light count", (function () {
                                                var shaderSource = _prepareForJudgeGLSL(state);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getVsSource(shaderSource), /* :: */[
                                                                    "#define DIRECTION_LIGHTS_COUNT 2\n",
                                                                    /* :: */[
                                                                      "#define POINT_LIGHTS_COUNT 2\n",
                                                                      /* [] */0
                                                                    ]
                                                                  ])), true);
                                              }));
                                        return Wonder_jest.test("set gl_Position", (function () {
                                                      var shaderSource = InitLightMaterialJobTool$Wonderjs.prepareForJudgeGLSL(InitLightMaterialJobTool$Wonderjs.prepareGameObject, sandbox, state[0]);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getVsSource(shaderSource), /* :: */[
                                                                          "gl_Position = u_pMatrix * u_vMatrix * vec4(v_worldPosition, 1.0);",
                                                                          /* [] */0
                                                                        ])), true);
                                                    }));
                                      }));
                                describe("test fs glsl", (function () {
                                        Wonder_jest.test("define light count", (function () {
                                                var shaderSource = _prepareForJudgeGLSL(state);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getVsSource(shaderSource), /* :: */[
                                                                    "#define DIRECTION_LIGHTS_COUNT 2\n",
                                                                    /* :: */[
                                                                      "#define POINT_LIGHTS_COUNT 2\n",
                                                                      /* [] */0
                                                                    ]
                                                                  ])), true);
                                              }));
                                        Wonder_jest.test("calc total color", (function () {
                                                var shaderSource = InitLightMaterialJobTool$Wonderjs.prepareForJudgeGLSL(InitLightMaterialJobTool$Wonderjs.prepareGameObject, sandbox, state[0]);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getFsSource(shaderSource), /* :: */[
                                                                    "uniform vec3 u_cameraPos;",
                                                                    /* :: */[
                                                                      "\nfloat getBlinnShininess(float shininess, vec3 normal, vec3 lightDir, vec3 viewDir, float dotResultBetweenNormAndLight){\n        vec3 halfAngle = normalize(lightDir + viewDir);\n\n        float blinnTerm = dot(normal, halfAngle);\n\n        blinnTerm = clamp(blinnTerm, 0.0, 1.0);\n        blinnTerm = dotResultBetweenNormAndLight != 0.0 ? blinnTerm : 0.0;\n        blinnTerm = pow(blinnTerm, shininess);\n\n        return blinnTerm;\n}\n                            ",
                                                                      /* :: */[
                                                                        "\nvec3 calcAmbientColor(vec3 materialDiffuse){\n        vec3 materialLight = getMaterialLight();\n\n        return (u_ambient + materialLight) * materialDiffuse.rgb;\n}\n                              ",
                                                                        /* :: */[
                                                                          "\nvec3 calcLight(vec3 lightDir, vec3 color, float intensity, float attenuation, vec3 normal, vec3 viewDir)\n{\n        vec3 materialDiffuse = getMaterialDiffuse();\n        vec3 materialSpecular = u_specular;\n        vec3 materialEmission = getMaterialEmission();\n\n        float specularStrength = getSpecularStrength();\n\n        float dotResultBetweenNormAndLight = dot(normal, lightDir);\n        float diff = max(dotResultBetweenNormAndLight, 0.0);\n\n        vec3 emissionColor = materialEmission;\n\n        vec3 ambientColor = calcAmbientColor(materialDiffuse);\n\n\n        // if(u_lightModel == 3){\n        //     return emissionColor + ambientColor;\n        // }\n\n//        vec4 diffuseColor = vec4(color * materialDiffuse.rgb * diff * intensity, materialDiffuse.a);\n        vec3 diffuseColor = color * materialDiffuse.rgb * diff * intensity;\n\n        float spec = 0.0;\n\n        // if(u_lightModel == 2){\n        //         spec = getPhongShininess(u_shininess, normal, lightDir, viewDir, diff);\n        // }\n        // else if(u_lightModel == 1){\n        //         spec = getBlinnShininess(u_shininess, normal, lightDir, viewDir, diff);\n        // }\n\n        spec = getBlinnShininess(u_shininess, normal, lightDir, viewDir, diff);\n\n\n        vec3 specularColor = spec * materialSpecular * specularStrength * intensity;\n\n//        return vec4(emissionColor + ambientColor + attenuation * (diffuseColor.rgb + specularColor), diffuseColor.a);\n        return emissionColor + ambientColor + attenuation * (diffuseColor.rgb + specularColor);\n}\n                              ",
                                                                          /* :: */[
                                                                            "\n#if POINT_LIGHTS_COUNT > 0\n        vec3 calcPointLight(vec3 lightDir, PointLight light, vec3 normal, vec3 viewDir)\n{\n        //lightDir is not normalize computing distance\n        float distance = length(lightDir);\n\n        float attenuation = 0.0;\n\n        if(distance < light.range)\n        {\n            attenuation = 1.0 / (light.constant + light.linear * distance + light.quadratic * (distance * distance));\n        }\n\n        lightDir = normalize(lightDir);\n\n        return calcLight(lightDir, light.color, light.intensity, attenuation, normal, viewDir);\n}\n#endif\n    ",
                                                                            /* :: */[
                                                                              "\n#if DIRECTION_LIGHTS_COUNT > 0\n        vec3 calcDirectionLight(vec3 lightDir, DirectionLight light, vec3 normal, vec3 viewDir)\n{\n        float attenuation = 1.0;\n\n        lightDir = normalize(lightDir);\n\n        return calcLight(lightDir, light.color, light.intensity, attenuation, normal, viewDir);\n}\n#endif\n    ",
                                                                              /* :: */[
                                                                                "\nvec4 calcTotalLight(vec3 norm, vec3 viewDir){\n    vec4 totalLight = vec4(0.0, 0.0, 0.0, 1.0);\n\n\n    #if (DIRECTION_LIGHTS_COUNT == 0 && POINT_LIGHTS_COUNT == 0 )\n        return vec4(calcAmbientColor(getMaterialDiffuse()), 1.0);\n    #endif\n\n\n    #if POINT_LIGHTS_COUNT > 0\n                for(int i = 0; i < POINT_LIGHTS_COUNT; i++){\n                totalLight += vec4(calcPointLight(getPointLightDir(i), u_pointLights[i], norm, viewDir), 0.0);\n        }\n    #endif\n\n    #if DIRECTION_LIGHTS_COUNT > 0\n                for(int i = 0; i < DIRECTION_LIGHTS_COUNT; i++){\n                totalLight += vec4(calcDirectionLight(getDirectionLightDir(i), u_directionLights[i], norm, viewDir), 0.0);\n        }\n    #endif\n\n        return totalLight;\n}\n      ",
                                                                                /* :: */[
                                                                                  "\nvec3 normal = normalize(getNormal());\n\n// #ifdef BOTH_SIdE\n// normal = normal * (-1.0 + 2.0 * float(gl_FrontFacing));\n// #endif\n\nvec3 viewDir = normalize(getViewDir());\n\nvec4 totalColor = calcTotalLight(normal, viewDir);\n\n// totalColor.a *= u_opacity;\n\ntotalColor.rgb = totalColor.rgb * getShadowVisibility();\n",
                                                                                  /* [] */0
                                                                                ]
                                                                              ]
                                                                            ]
                                                                          ]
                                                                        ]
                                                                      ]
                                                                    ]
                                                                  ])), true);
                                              }));
                                        return Wonder_jest.test("if has no direction,point light, use ambient color", (function () {
                                                      var shaderSource = InitLightMaterialJobTool$Wonderjs.prepareForJudgeGLSL(InitLightMaterialJobTool$Wonderjs.prepareGameObject, sandbox, state[0]);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.contain(GLSLTool$Wonderjs.getFsSource(shaderSource), "\nvec4 calcTotalLight(vec3 norm, vec3 viewDir){\n    vec4 totalLight = vec4(0.0, 0.0, 0.0, 1.0);\n\n\n    #if (DIRECTION_LIGHTS_COUNT == 0 && POINT_LIGHTS_COUNT == 0 )\n        return vec4(calcAmbientColor(getMaterialDiffuse()), 1.0);\n    #endif\n      ")), true);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        Wonder_jest.test("test ambient_light shader lib", (function () {
                                var shaderSource = InitLightMaterialJobTool$Wonderjs.prepareForJudgeGLSL(InitLightMaterialJobTool$Wonderjs.prepareGameObject, sandbox, state[0]);
                                return Wonder_jest.Expect[/* toContainString */11]("uniform vec3 u_ambient;")(Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.getFsSource(shaderSource)));
                              }));
                        return Wonder_jest.test("test light_end shader lib", (function () {
                                      var shaderSource = InitLightMaterialJobTool$Wonderjs.prepareForJudgeGLSL(InitLightMaterialJobTool$Wonderjs.prepareGameObject, sandbox, state[0]);
                                      return Wonder_jest.Expect[/* toContainString */11]("gl_FragColor = totalColor;")(Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.getFsSource(shaderSource)));
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
