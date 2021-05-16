

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as GLSLTool$Wonderjs from "../../../../tool/render/core/GLSLTool.js";
import * as GPUDetectTool$Wonderjs from "../../../../tool/service/gpu/GPUDetectTool.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as NoWorkerJobConfigTool$Wonderjs from "../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js";
import * as InitBasicMaterialJobTool$Wonderjs from "../../../../tool/job/no_worker/init/InitBasicMaterialJobTool.js";

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

export {
  
}
/*  Not a pure module */
