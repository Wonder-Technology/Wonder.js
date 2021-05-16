'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var GLSLTool$Wonderjs = require("../../../../tool/render/core/GLSLTool.js");
var GPUDetectTool$Wonderjs = require("../../../../tool/service/gpu/GPUDetectTool.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var NoWorkerJobConfigTool$Wonderjs = require("../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js");
var InitBasicMaterialJobTool$Wonderjs = require("../../../../tool/job/no_worker/init/InitBasicMaterialJobTool.js");

Wonder_jest.describe("test preget glsl record job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        var _buildNoWorkerJobConfig = function (param) {
          return NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"preget_glslData\"\n        },\n        {\n          \"name\": \"init_basic_material\"\n        }\n      ]\n    }\n  ]\n        ", undefined, "\n\n[\n        {\n          \"name\": \"preget_glslData\"\n        },\n        {\n          \"name\": \"init_basic_material\"\n        }\n]\n        ", undefined, /* () */0);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = InitBasicMaterialJobTool$Wonderjs.initWithJobConfig(sandbox, _buildNoWorkerJobConfig(/* () */0));
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("get gpu detect precision", (function (param) {
                      Wonder_jest.test("test vs top", (function (param) {
                              var state$1 = GPUDetectTool$Wonderjs.setPrecision(/* HIGHP */0, state[0]);
                              var match = InitBasicMaterialJobTool$Wonderjs.prepareForJudgeGLSL(sandbox, state$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containSpecifyCount(GLSLTool$Wonderjs.getVsSource(match[1]), "precision highp float;\nprecision highp int;\n", 1, /* () */0)), true);
                            }));
                      return Wonder_jest.describe("test fs top", (function (param) {
                                    var judge = function (shaderSource) {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containSpecifyCount(GLSLTool$Wonderjs.getFsSource(shaderSource), "precision highp float;\nprecision highp int;\n", 1, /* () */0)), true);
                                    };
                                    Wonder_jest.test("test highp precision", (function (param) {
                                            var state$1 = GPUDetectTool$Wonderjs.setPrecision(/* HIGHP */0, state[0]);
                                            var match = InitBasicMaterialJobTool$Wonderjs.prepareForJudgeGLSL(sandbox, state$1);
                                            return judge(match[1]);
                                          }));
                                    Wonder_jest.test("test mediump precision", (function (param) {
                                            var state$1 = GPUDetectTool$Wonderjs.setPrecision(/* MEDIUMP */1, state[0]);
                                            var match = InitBasicMaterialJobTool$Wonderjs.prepareForJudgeGLSL(sandbox, state$1);
                                            return judge(match[1]);
                                          }));
                                    return Wonder_jest.test("test lowp precision", (function (param) {
                                                  var state$1 = GPUDetectTool$Wonderjs.setPrecision(/* LOWP */2, state[0]);
                                                  var match = InitBasicMaterialJobTool$Wonderjs.prepareForJudgeGLSL(sandbox, state$1);
                                                  return judge(match[1]);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
