

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as GLSLTool$Wonderjs from "../../../render/core/GLSLTool.js";
import * as SettingTool$Wonderjs from "../../../service/setting/SettingTool.js";
import * as InstanceTool$Wonderjs from "../../../service/instance/InstanceTool.js";

function testModelMatrixInstanceShaderLibs(sandbox, param, state) {
  var execFunc = param[2];
  var prepareForJudgeGLSLNotExecFunc = param[1];
  var prepareForJudgeGLSLFunc = param[0];
  Wonder_jest.test("if has no sourceInstance component, use modelMatrix_noInstance shader lib", (function (param) {
          var match = Curry._2(prepareForJudgeGLSLFunc, sandbox, state[0]);
          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getVsSource(match[1]), /* :: */[
                              "uniform mat4 u_mMatrix;",
                              /* :: */[
                                "mat4 mMatrix = u_mMatrix;",
                                /* [] */0
                              ]
                            ])), true);
        }));
  return Wonder_jest.describe("else", (function (param) {
                Wonder_jest.test("if support hardware instance, use modelMatrix_hardware_instance shader lib", (function (param) {
                        var match = Curry._2(prepareForJudgeGLSLNotExecFunc, sandbox, state[0]);
                        var match$1 = InstanceTool$Wonderjs.addSourceInstance(match[2], match[0]);
                        var state$1 = InstanceTool$Wonderjs.setGPUDetectDataAllowHardwareInstance(sandbox, match$1[0]);
                        Curry._1(execFunc, state$1);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getVsSource(match[1]), /* :: */[
                                            "attribute vec4 a_mVec4_0;",
                                            /* :: */[
                                              "attribute vec4 a_mVec4_1;",
                                              /* :: */[
                                                "attribute vec4 a_mVec4_2;",
                                                /* :: */[
                                                  "attribute vec4 a_mVec4_3;",
                                                  /* :: */[
                                                    "mat4 mMatrix = mat4(a_mVec4_0, a_mVec4_1, a_mVec4_2, a_mVec4_3);",
                                                    /* [] */0
                                                  ]
                                                ]
                                              ]
                                            ]
                                          ])), true);
                      }));
                return Wonder_jest.describe("else, use modelMatrix_batch_instance shader lib", (function (param) {
                              Wonder_jest.test("if state->gpuConfig->useHardwareInstance == false, use batch", (function (param) {
                                      var match = Curry._2(prepareForJudgeGLSLNotExecFunc, sandbox, state[0]);
                                      var match$1 = InstanceTool$Wonderjs.addSourceInstance(match[2], match[0]);
                                      var state$1 = SettingTool$Wonderjs.setGPU(/* record */[/* useHardwareInstance */false], match$1[0]);
                                      Curry._1(execFunc, state$1);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getVsSource(match[1]), /* :: */[
                                                          "uniform mat4 u_mMatrix;",
                                                          /* :: */[
                                                            "mat4 mMatrix = u_mMatrix;",
                                                            /* [] */0
                                                          ]
                                                        ])), true);
                                    }));
                              return Wonder_jest.test("if gpu not support hardware instance, use batch", (function (param) {
                                            var match = Curry._2(prepareForJudgeGLSLNotExecFunc, sandbox, state[0]);
                                            var match$1 = InstanceTool$Wonderjs.addSourceInstance(match[2], match[0]);
                                            var state$1 = InstanceTool$Wonderjs.setGPUDetectDataAllowBatchInstance(match$1[0]);
                                            Curry._1(execFunc, state$1);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getVsSource(match[1]), /* :: */[
                                                                "uniform mat4 u_mMatrix;",
                                                                /* :: */[
                                                                  "mat4 mMatrix = u_mMatrix;",
                                                                  /* [] */0
                                                                ]
                                                              ])), true);
                                          }));
                            }));
              }));
}

export {
  testModelMatrixInstanceShaderLibs ,
  
}
/* Wonder_jest Not a pure module */
