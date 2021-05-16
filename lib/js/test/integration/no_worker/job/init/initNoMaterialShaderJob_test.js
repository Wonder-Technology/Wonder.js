'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var GLSLTool$Wonderjs = require("../../../../tool/render/core/GLSLTool.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var FakeGlTool$Wonderjs = require("../../../../tool/gl/FakeGlTool.js");
var DirectorTool$Wonderjs = require("../../../../tool/core/DirectorTool.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var GLSLLocationTool$Wonderjs = require("../../../../tool/service/location/GLSLLocationTool.js");
var NoWorkerJobConfigTool$Wonderjs = require("../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js");

Wonder_jest.describe("test init no material shader job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        var _buildNoWorkerJobConfig = function (param) {
          return NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"preget_glslData\"\n        },\n        {\n          \"name\": \"init_no_material_shader\"\n        }\n      ]\n    }\n  ]\n        ", undefined, "\n[\n        {\n          \"name\": \"preget_glslData\"\n        },\n        {\n          \"name\": \"init_no_material_shader\"\n        }\n]\n        ", undefined, /* () */0);
        };
        var _buildRenderConfig = function ($staropt$star, $staropt$star$1, param) {
          var shaders = $staropt$star !== undefined ? $staropt$star : "\n{\n  \"static_branchs\": [\n  ],\n  \"dynamic_branchs\": [\n  ],\n  \"groups\": [\n    {\n      \"name\": \"top\",\n      \"value\": [\n        \"common\",\n        \"vertex\"\n      ]\n    },\n    {\n      \"name\": \"end\",\n      \"value\": [\n        \"end\"\n      ]\n    }\n  ],\n  \"material_shaders\": [\n  ],\n  \"no_material_shaders\": [\n    {\n      \"name\": \"outline_draw_expand_gameObjects\",\n      \"shader_libs\": [\n        {\n          \"type\": \"group\",\n          \"name\": \"top\"\n        },\n        {\n          \"name\": \"normal\"\n        },\n        {\n          \"name\": \"modelMatrix_noInstance\"\n        },\n        {\n          \"name\": \"outline_expand\"\n        },\n        {\n          \"type\": \"group\",\n          \"name\": \"end\"\n        }\n      ]\n    }\n  ]\n}\n        ";
          var shaderLibs = $staropt$star$1 !== undefined ? $staropt$star$1 : "\n[\n  {\n    \"name\": \"common\",\n    \"glsls\": [\n      {\n        \"type\": \"vs\",\n        \"name\": \"common_vertex\"\n      },\n      {\n        \"type\": \"fs\",\n        \"name\": \"common_fragment\"\n      }\n    ],\n    \"variables\": {\n      \"uniforms\": [\n        {\n          \"name\": \"u_vMatrix\",\n          \"field\": \"vMatrix\",\n          \"type\": \"mat4\",\n          \"from\": \"camera\"\n        },\n        {\n          \"name\": \"u_pMatrix\",\n          \"field\": \"pMatrix\",\n          \"type\": \"mat4\",\n          \"from\": \"camera\"\n        }\n      ]\n    }\n  },\n  {\n    \"name\": \"modelMatrix_noInstance\",\n    \"glsls\": [\n      {\n        \"type\": \"vs\",\n        \"name\": \"modelMatrix_noInstance_vertex\"\n      }\n    ],\n    \"variables\": {\n      \"uniforms\": [\n        {\n          \"name\": \"u_mMatrix\",\n          \"field\": \"mMatrix\",\n          \"type\": \"mat4\",\n          \"from\": \"model\"\n        }\n      ]\n    }\n  },\n  {\n    \"name\": \"vertex\",\n    \"variables\": {\n      \"attributes\": [\n        {\n          \"name\": \"a_position\",\n          \"buffer\": 0,\n          \"type\": \"vec3\"\n        }\n      ]\n    }\n  },\n  {\n    \"name\": \"normal\",\n    \"variables\": {\n      \"attributes\": [\n        {\n          \"name\": \"a_normal\",\n          \"buffer\": 1,\n          \"type\": \"vec3\"\n        }\n      ]\n    }\n  },\n  {\n    \"name\": \"outline_expand\",\n    \"glsls\": [\n      {\n        \"type\": \"vs\",\n        \"name\": \"webgl1_outline_expand_vertex\"\n      },\n      {\n        \"type\": \"fs\",\n        \"name\": \"webgl1_outline_expand_fragment\"\n      }\n    ],\n    \"variables\": {\n      \"uniforms\": [\n        {\n          \"name\": \"u_outlineColor\",\n          \"from\": \"no_material_shader\",\n          \"field\": \"outlineExpand\",\n          \"type\": \"float3\"\n        }\n      ]\n    }\n  },\n  {\n    \"name\": \"end\",\n    \"variables\": {\n      \"attributes\": [\n        {\n          \"buffer\": 3\n        }\n      ]\n    }\n  }\n]\n        ";
          return /* tuple */[
                  shaders,
                  shaderLibs
                ];
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, undefined, _buildNoWorkerJobConfig(/* () */0), _buildRenderConfig(undefined, undefined, /* () */0), /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test get attribute location", (function (param) {
                Wonder_jest.describe("test get a_position location", (function (param) {
                        return Wonder_jest.test("test get location", (function (param) {
                                      var state$1 = state[0];
                                      var getAttribLocation = GLSLLocationTool$Wonderjs.getAttribLocation(undefined, sandbox, "a_position");
                                      var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getAttribLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                      DirectorTool$Wonderjs.init(state$2);
                                      return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withTwoArgs(Sinon$1.match.any, "a_position", getAttribLocation)));
                                    }));
                      }));
                return Wonder_jest.describe("test get a_normal location", (function (param) {
                              return Wonder_jest.test("test get location", (function (param) {
                                            var state$1 = state[0];
                                            var getAttribLocation = GLSLLocationTool$Wonderjs.getAttribLocation(undefined, sandbox, "a_normal");
                                            var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getAttribLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                            DirectorTool$Wonderjs.init(state$2);
                                            return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withTwoArgs(Sinon$1.match.any, "a_normal", getAttribLocation)));
                                          }));
                            }));
              }));
        Wonder_jest.describe("test get uniform location", (function (param) {
                var testGetLocation = function (sandbox, name, execFunc, state) {
                  var state$1 = state[0];
                  var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(undefined, sandbox, name);
                  var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                  Curry._1(execFunc, state$2);
                  return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withTwoArgs(Sinon$1.match.any, name, getUniformLocation)));
                };
                Wonder_jest.describe("test get no_material_shader uniform location", (function (param) {
                        return Wonder_jest.test("test get u_outlineColor location", (function (param) {
                                      return testGetLocation(sandbox, "u_outlineColor", DirectorTool$Wonderjs.init, state);
                                    }));
                      }));
                Wonder_jest.describe("test get camera uniform location", (function (param) {
                        return Wonder_jest.test("test get u_vMatrix location", (function (param) {
                                      return testGetLocation(sandbox, "u_vMatrix", DirectorTool$Wonderjs.init, state);
                                    }));
                      }));
                return Wonder_jest.describe("test get model uniform location", (function (param) {
                              return Wonder_jest.test("test get u_mMatrix location", (function (param) {
                                            return testGetLocation(sandbox, "u_mMatrix", DirectorTool$Wonderjs.init, state);
                                          }));
                            }));
              }));
        return Wonder_jest.describe("test glsl", (function (param) {
                      var _prepareForJudgeGLSLNotExec = function (sandbox, state) {
                        var shaderSource = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        var createProgram = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(shaderSource), undefined, undefined, undefined, Caml_option.some(createProgram), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
                        return /* tuple */[
                                state$1,
                                shaderSource
                              ];
                      };
                      Wonder_jest.test("test vs", (function (param) {
                              var match = _prepareForJudgeGLSLNotExec(sandbox, state[0]);
                              DirectorTool$Wonderjs.init(match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getVsSource(match[1]), /* :: */[
                                                  "attribute vec3 a_position;",
                                                  /* :: */[
                                                    "attribute vec3 a_normal;",
                                                    /* :: */[
                                                      "uniform mat4 u_vMatrix;",
                                                      /* :: */[
                                                        "uniform mat4 u_pMatrix;",
                                                        /* :: */[
                                                          "uniform mat4 u_mMatrix;",
                                                          /* :: */[
                                                            "mat4 mMatrix = u_mMatrix;",
                                                            /* :: */[
                                                              "gl_Position = u_pMatrix * u_vMatrix * mMatrix * vec4(position, 1.0);",
                                                              /* [] */0
                                                            ]
                                                          ]
                                                        ]
                                                      ]
                                                    ]
                                                  ]
                                                ])), true);
                            }));
                      return Wonder_jest.test("test fs", (function (param) {
                                    var match = _prepareForJudgeGLSLNotExec(sandbox, state[0]);
                                    DirectorTool$Wonderjs.init(match[0]);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getFsSource(match[1]), /* :: */[
                                                        "uniform vec3 u_outlineColor;",
                                                        /* :: */[
                                                          "gl_FragColor = vec4(u_outlineColor, 1.0);",
                                                          /* [] */0
                                                        ]
                                                      ])), true);
                                  }));
                    }));
      }));

/*  Not a pure module */
