

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "./../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as GLSLTool$Wonderjs from "../../../../tool/render/core/GLSLTool.js";
import * as SettingTool$Wonderjs from "../../../../tool/service/setting/SettingTool.js";
import * as InstanceTool$Wonderjs from "../../../../tool/service/instance/InstanceTool.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as TestWorkerTool$Wonderjs from "../../tool/TestWorkerTool.js";
import * as TestMainWorkerTool$Wonderjs from "../main_worker/tool/TestMainWorkerTool.js";
import * as CreateGlRenderWorkerJob$Wonderjs from "../../../../../src/job/worker/render/init/CreateGlRenderWorkerJob.js";
import * as InstanceRenderWorkerTool$Wonderjs from "./tool/InstanceRenderWorkerTool.js";
import * as RenderJobsRenderWorkerTool$Wonderjs from "./tool/RenderJobsRenderWorkerTool.js";
import * as InitInstanceRenderWorkerJob$Wonderjs from "../../../../../src/job/worker/render/init/InitInstanceRenderWorkerJob.js";
import * as GetSettingDataRenderWorkerJob$Wonderjs from "../../../../../src/job/worker/render/init/GetSettingDataRenderWorkerJob.js";
import * as PregetGLSLDataRenderWorkerJob$Wonderjs from "../../../../../src/job/worker/render/init/PregetGLSLDataRenderWorkerJob.js";
import * as GetMaterialDataRenderWorkerJob$Wonderjs from "../../../../../src/job/worker/render/init/GetMaterialDataRenderWorkerJob.js";
import * as InitBasicMaterialRenderWorkerJob$Wonderjs from "../../../../../src/job/worker/render/init/InitBasicMaterialRenderWorkerJob.js";
import * as GetRenderConfigDataRenderWorkerJob$Wonderjs from "../../../../../src/job/worker/render/init/GetRenderConfigDataRenderWorkerJob.js";
import * as InitBasicMaterialJobRenderWorkerTool$Wonderjs from "./tool/InitBasicMaterialJobRenderWorkerTool.js";

Wonder_jest.describe("test init basic material render worker job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestMainWorkerTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return TestWorkerTool$Wonderjs.clear(sandbox);
              }));
        return Wonder_jest.describe("test glsl", (function (param) {
                      return Wonder_jest.describe("test shader lib's glsl", (function (param) {
                                    return Wonder_jest.describe("test modelMatrix instance shader libs", (function (param) {
                                                  Wonder_jest.testPromise("if has no sourceInstance component, use modelMatrix_noInstance shader lib", undefined, (function (param) {
                                                          var match = InitBasicMaterialJobRenderWorkerTool$Wonderjs.prepareForJudgeGLSLNotExec(sandbox, state[0]);
                                                          var shaderSource = match[1];
                                                          return RenderJobsRenderWorkerTool$Wonderjs.init((function (state) {
                                                                        return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getVsSource(shaderSource), /* :: */[
                                                                                                "uniform mat4 u_mMatrix;",
                                                                                                /* :: */[
                                                                                                  "mat4 mMatrix = u_mMatrix;",
                                                                                                  /* [] */0
                                                                                                ]
                                                                                              ])), true));
                                                                      }), match[0]);
                                                        }));
                                                  return Wonder_jest.describe("else", (function (param) {
                                                                return Wonder_jest.testPromise("if support hardware instance, use modelMatrix_hardware_instance shader lib", undefined, (function (param) {
                                                                              var match = InitBasicMaterialJobRenderWorkerTool$Wonderjs.prepareForJudgeGLSLNotExec(sandbox, state[0]);
                                                                              var shaderSource = match[1];
                                                                              var match$1 = InstanceTool$Wonderjs.addSourceInstance(match[2], match[0]);
                                                                              InstanceRenderWorkerTool$Wonderjs.setGPUDetectDataAllowHardwareInstance(sandbox);
                                                                              return RenderJobsRenderWorkerTool$Wonderjs.initWithJob(/* array */[
                                                                                          (function (param, param$1) {
                                                                                              return CreateGlRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                                                                                            }),
                                                                                          (function (param, param$1) {
                                                                                              return GetRenderConfigDataRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                                                                                            }),
                                                                                          (function (param, param$1) {
                                                                                              return GetSettingDataRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                                                                                            }),
                                                                                          (function (param, param$1) {
                                                                                              return GetMaterialDataRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                                                                                            }),
                                                                                          (function (param, param$1) {
                                                                                              return PregetGLSLDataRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                                                                                            }),
                                                                                          (function (param, param$1) {
                                                                                              return InitInstanceRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                                                                                            }),
                                                                                          (function (param, param$1) {
                                                                                              return InitBasicMaterialRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                                                                                            })
                                                                                        ], (function (state) {
                                                                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getVsSource(shaderSource), /* :: */[
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
                                                                                                                  ])), true));
                                                                                          }), match$1[0]);
                                                                            }));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
