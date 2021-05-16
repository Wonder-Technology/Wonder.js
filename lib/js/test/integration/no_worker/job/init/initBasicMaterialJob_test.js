'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var GLSLTool$Wonderjs = require("../../../../tool/render/core/GLSLTool.js");
var FakeGlTool$Wonderjs = require("../../../../tool/gl/FakeGlTool.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var GLSLLocationTool$Wonderjs = require("../../../../tool/service/location/GLSLLocationTool.js");
var InitMaterialTool$Wonderjs = require("../../../../tool/job/no_worker/init/InitMaterialTool.js");
var InitMaterialJobTool$Wonderjs = require("../../../../tool/job/no_worker/init/InitMaterialJobTool.js");
var NoWorkerJobConfigTool$Wonderjs = require("../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js");
var InitBasicMaterialJobTool$Wonderjs = require("../../../../tool/job/no_worker/init/InitBasicMaterialJobTool.js");

Wonder_jest.describe("test init basic material job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        var _buildNoWorkerJobConfig = function (param) {
          return NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"preget_glslData\"\n        },\n        {\n          \"name\": \"init_basic_material\"\n        }\n      ]\n    }\n  ]\n        ", undefined, "\n[\n        {\n          \"name\": \"preget_glslData\"\n        },\n        {\n          \"name\": \"init_basic_material\"\n        }\n]\n        ", undefined, /* () */0);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = InitBasicMaterialJobTool$Wonderjs.initWithJobConfig(sandbox, _buildNoWorkerJobConfig(/* () */0));
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test get attribute location", (function (param) {
                return Wonder_jest.describe("test get a_position location", (function (param) {
                              Wonder_jest.test("test get location", (function (param) {
                                      var match = InitBasicMaterialJobTool$Wonderjs.prepareGameObject(sandbox, state[0]);
                                      var getAttribLocation = GLSLLocationTool$Wonderjs.getAttribLocation(undefined, sandbox, "a_position");
                                      var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getAttribLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                      InitBasicMaterialJobTool$Wonderjs.exec(state$1);
                                      return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withTwoArgs(Sinon$1.match.any, "a_position", getAttribLocation)));
                                    }));
                              return Wonder_jest.describe("test cache", (function (param) {
                                            return Wonder_jest.test("if cached, not query gl location", (function (param) {
                                                          var match = InitBasicMaterialJobTool$Wonderjs.prepareGameObject(sandbox, state[0]);
                                                          var match$1 = InitBasicMaterialJobTool$Wonderjs.prepareGameObject(sandbox, match[0]);
                                                          var getAttribLocation = GLSLLocationTool$Wonderjs.getAttribLocation(undefined, sandbox, "a_position");
                                                          var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getAttribLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                                                          InitBasicMaterialJobTool$Wonderjs.exec(state$1);
                                                          return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withTwoArgs(Sinon$1.match.any, "a_position", getAttribLocation)));
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("test get uniform location", (function (param) {
                var _testGetLocation = function (name) {
                  return InitMaterialTool$Wonderjs.testGetLocation(sandbox, name, /* tuple */[
                              InitBasicMaterialJobTool$Wonderjs.prepareGameObject,
                              InitBasicMaterialJobTool$Wonderjs.exec
                            ], state);
                };
                Wonder_jest.describe("test get u_mMatrix location", (function (param) {
                        Wonder_jest.test("test get location", (function (param) {
                                return _testGetLocation("u_mMatrix");
                              }));
                        return Wonder_jest.describe("test cache", (function (param) {
                                      return Wonder_jest.test("if cached, not query gl location", (function (param) {
                                                    return InitMaterialTool$Wonderjs.testLocationCache(sandbox, "u_mMatrix", /* tuple */[
                                                                InitBasicMaterialJobTool$Wonderjs.prepareGameObject,
                                                                InitBasicMaterialJobTool$Wonderjs.exec
                                                              ], state);
                                                  }));
                                    }));
                      }));
                return Wonder_jest.test("test get u_color location", (function (param) {
                              return _testGetLocation("u_color");
                            }));
              }));
        return Wonder_jest.describe("test glsl", (function (param) {
                      Wonder_jest.test("glsl only set glPosition,glFragColor once", (function (param) {
                              return InitMaterialTool$Wonderjs.testOnlySeGlPositionGlFragColorOnce(sandbox, InitBasicMaterialJobTool$Wonderjs.prepareForJudgeGLSL, state);
                            }));
                      return Wonder_jest.describe("test shader lib's glsl", (function (param) {
                                    Wonder_jest.test("test common shader lib's glsl", (function (param) {
                                            return InitMaterialTool$Wonderjs.testCommonShaderLibGlsl(sandbox, InitBasicMaterialJobTool$Wonderjs.prepareForJudgeGLSL, state);
                                          }));
                                    Wonder_jest.test("test vertex shader lib's glsl", (function (param) {
                                            return InitMaterialTool$Wonderjs.testVertexShaderLibGlsl(sandbox, InitBasicMaterialJobTool$Wonderjs.prepareForJudgeGLSL, state);
                                          }));
                                    Wonder_jest.describe("test modelMatrix instance shader libs", (function (param) {
                                            return InitMaterialJobTool$Wonderjs.testModelMatrixInstanceShaderLibs(sandbox, /* tuple */[
                                                        InitBasicMaterialJobTool$Wonderjs.prepareForJudgeGLSL,
                                                        InitBasicMaterialJobTool$Wonderjs.prepareForJudgeGLSLNotExec,
                                                        InitBasicMaterialJobTool$Wonderjs.exec
                                                      ], state);
                                          }));
                                    Wonder_jest.describe("test basic shader lib's glsl", (function (param) {
                                            return Wonder_jest.test("test vs glsl", (function (param) {
                                                          var match = InitBasicMaterialJobTool$Wonderjs.prepareForJudgeGLSL(sandbox, state[0]);
                                                          return Wonder_jest.Expect[/* toContainString */11]("gl_Position = u_pMatrix * u_vMatrix * mMatrix * vec4(a_position, 1.0);", Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.getVsSource(match[1])));
                                                        }));
                                          }));
                                    Wonder_jest.describe("test map shader lib's glsl", (function (param) {
                                            return Wonder_jest.describe("add basic_no_map shader lib", (function (param) {
                                                          Wonder_jest.test("test vs glsl", (function (param) {
                                                                  var match = InitBasicMaterialJobTool$Wonderjs.prepareForJudgeGLSL(sandbox, state[0]);
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getVsSource(match[1]), /* :: */[
                                                                                      "varying vec2 v_mapCoord0;",
                                                                                      /* [] */0
                                                                                    ])), false);
                                                                }));
                                                          return Wonder_jest.test("test fs glsl", (function (param) {
                                                                        var match = InitBasicMaterialJobTool$Wonderjs.prepareForJudgeGLSL(sandbox, state[0]);
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getFsSource(match[1]), /* :: */[
                                                                                            "uniform vec3 u_color;",
                                                                                            /* :: */[
                                                                                              "uniform float u_alpha;",
                                                                                              /* :: */[
                                                                                                "vec4 totalColor = vec4(u_color, u_alpha);",
                                                                                                /* [] */0
                                                                                              ]
                                                                                            ]
                                                                                          ])), true);
                                                                      }));
                                                        }));
                                          }));
                                    return Wonder_jest.test("test basic_end shader lib's glsl", (function (param) {
                                                  var match = InitBasicMaterialJobTool$Wonderjs.prepareForJudgeGLSL(sandbox, state[0]);
                                                  return Wonder_jest.Expect[/* toContainString */11]("gl_FragColor = vec4(totalColor.rgb, totalColor.a);", Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.getFsSource(match[1])));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
