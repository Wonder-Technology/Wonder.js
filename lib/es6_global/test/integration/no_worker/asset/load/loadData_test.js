

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_array from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Wonder_jest from "./../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as JudgeTool$Wonderjs from "../../../../tool/JudgeTool.js";
import * as SinonTool$Wonderjs from "../../tool/sinon/SinonTool.js";
import * as SettingTool$Wonderjs from "../../../../tool/service/setting/SettingTool.js";
import * as LoadDataTool$Wonderjs from "../../../tool/asset/load/LoadDataTool.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as RenderConfigTool$Wonderjs from "../../../../tool/service/renderConfig/RenderConfigTool.js";
import * as NoWorkerJobConfigTool$Wonderjs from "../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js";

Wonder_jest.describe("test load no worker data", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.init(sandbox, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test load job config json files", (function (param) {
                      var _buildFakeFetch = function (sandbox) {
                        var fetch = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        var match = NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0);
                        Sinon.returns(LoadDataTool$Wonderjs.buildFakeFetchJsonResponse(match[4]), Sinon.onCall(5, Sinon.returns(LoadDataTool$Wonderjs.buildFakeFetchJsonResponse(match[3]), Sinon.onCall(4, Sinon.returns(LoadDataTool$Wonderjs.buildFakeFetchJsonResponse(match[2]), Sinon.onCall(3, Sinon.returns(LoadDataTool$Wonderjs.buildFakeFetchJsonResponse(match[1]), Sinon.onCall(2, Sinon.returns(LoadDataTool$Wonderjs.buildFakeFetchJsonResponse(match[0]), Sinon.onCall(1, Sinon.returns(LoadDataTool$Wonderjs.buildFakeFetchJsonResponse(SettingTool$Wonderjs.buildSetting("true", undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), "\n        {\n        \"alpha\": true,\n        \"depth\": true,\n        \"stencil\": false,\n        \"antialias\": true,\n        \"premultiplied_alpha\": true,\n        \"preserve_drawing_buffer\": false\n        }\n               ", "false", "false")), Sinon.onCall(0, fetch))))))))))));
                        var match$1 = RenderConfigTool$Wonderjs.buildRenderConfig(undefined, undefined, /* () */0);
                        Sinon.returns(LoadDataTool$Wonderjs.buildFakeFetchJsonResponse(match$1[1]), Sinon.onCall(7, Sinon.returns(LoadDataTool$Wonderjs.buildFakeFetchJsonResponse(match$1[0]), Sinon.onCall(6, fetch))));
                        return fetch;
                      };
                      return Wonder_jest.describe("test load noWorker config files", (function (param) {
                                    Wonder_jest.testPromise("should pass dataDir for get json file path", undefined, (function (param) {
                                            var fetchFunc = _buildFakeFetch(sandbox);
                                            return LoadDataTool$Wonderjs.load(/* array */[
                                                          "../../.res/job/setting.json",
                                                          "../../.res/job/"
                                                        ], fetchFunc, undefined, /* () */0).then((function (param) {
                                                          return Promise.resolve(Sinon.toCalledWith(/* array */["../../.res/job/setting.json"], Wonder_jest.Expect[/* expect */0](fetchFunc)));
                                                        }));
                                          }));
                                    Wonder_jest.testPromise("should fetch shader_libs.json file", undefined, (function (param) {
                                            var fetchFunc = _buildFakeFetch(sandbox);
                                            return LoadDataTool$Wonderjs.load(/* array */[
                                                          "../../.res/job/setting.json",
                                                          "../../.res/job/"
                                                        ], fetchFunc, undefined, /* () */0).then((function (param) {
                                                          return Promise.resolve(Sinon.toCalledWith(/* array */["../../.res/job/render/shader/shader_libs.json"], Wonder_jest.Expect[/* expect */0](fetchFunc)));
                                                        }));
                                          }));
                                    Wonder_jest.describe("parse job record and set to state", (function (param) {
                                            return Wonder_jest.testPromise("test parse noWorker setting, init pipeline, noWorker pipeline, init job, noWorker job", undefined, (function (param) {
                                                          var fetchFunc = _buildFakeFetch(sandbox);
                                                          return LoadDataTool$Wonderjs.load(/* array */[], fetchFunc, undefined, /* () */0).then((function (param) {
                                                                        var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
                                                                        var __x = NoWorkerJobConfigTool$Wonderjs.getInitPipelines(state)[0][/* jobs */1].length;
                                                                        var __x$1 = NoWorkerJobConfigTool$Wonderjs.getLoopPipelines(state)[0][/* jobs */1].length;
                                                                        var __x$2 = NoWorkerJobConfigTool$Wonderjs.getInitJobs(state).length;
                                                                        var __x$3 = NoWorkerJobConfigTool$Wonderjs.getLoopJobs(state).length;
                                                                        return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                            NoWorkerJobConfigTool$Wonderjs.getSetting(state),
                                                                                            JudgeTool$Wonderjs.isGreaterThan(__x, 0),
                                                                                            JudgeTool$Wonderjs.isGreaterThan(__x$1, 0),
                                                                                            JudgeTool$Wonderjs.isGreaterThan(__x$2, 0),
                                                                                            JudgeTool$Wonderjs.isGreaterThan(__x$3, 0)
                                                                                          ]), /* tuple */[
                                                                                        /* record */[
                                                                                          /* initPipeline */"default",
                                                                                          /* loopPipeline */"default"
                                                                                        ],
                                                                                        true,
                                                                                        true,
                                                                                        true,
                                                                                        true
                                                                                      ]));
                                                                      }));
                                                        }));
                                          }));
                                    Wonder_jest.testPromise("test parse shaders", undefined, (function (param) {
                                            var fetchFunc = _buildFakeFetch(sandbox);
                                            return LoadDataTool$Wonderjs.load(/* array */[], fetchFunc, undefined, /* () */0).then((function (param) {
                                                          var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](RenderConfigTool$Wonderjs.getShaders(state)[/* staticBranchs */0]), /* array */[
                                                                          /* record */[
                                                                            /* name */"modelMatrix_instance",
                                                                            /* value : array */[
                                                                              "modelMatrix_noInstance",
                                                                              "modelMatrix_hardware_instance",
                                                                              "modelMatrix_batch_instance"
                                                                            ]
                                                                          ],
                                                                          /* record */[
                                                                            /* name */"normalMatrix_instance",
                                                                            /* value : array */[
                                                                              "normalMatrix_noInstance",
                                                                              "normalMatrix_hardware_instance",
                                                                              "normalMatrix_batch_instance"
                                                                            ]
                                                                          ]
                                                                        ]));
                                                        }));
                                          }));
                                    Wonder_jest.testPromise("test parse shader libs", undefined, (function (param) {
                                            var fetchFunc = _buildFakeFetch(sandbox);
                                            return LoadDataTool$Wonderjs.load(/* array */[], fetchFunc, undefined, /* () */0).then((function (param) {
                                                          var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Caml_array.caml_array_get(RenderConfigTool$Wonderjs.getShaderLibs(state), 0)), /* record */[
                                                                          /* name */"common",
                                                                          /* glsls *//* array */[
                                                                            /* record */[
                                                                              /* type_ */"vs",
                                                                              /* name */"common_vertex"
                                                                            ],
                                                                            /* record */[
                                                                              /* type_ */"fs",
                                                                              /* name */"common_fragment"
                                                                            ]
                                                                          ],
                                                                          /* variables *//* record */[
                                                                            /* uniforms *//* array */[
                                                                              /* record */[
                                                                                /* name */"u_vMatrix",
                                                                                /* field */"vMatrix",
                                                                                /* type_ */"mat4",
                                                                                /* from */"camera"
                                                                              ],
                                                                              /* record */[
                                                                                /* name */"u_pMatrix",
                                                                                /* field */"pMatrix",
                                                                                /* type_ */"mat4",
                                                                                /* from */"camera"
                                                                              ]
                                                                            ],
                                                                            /* attributes */undefined
                                                                          ]
                                                                        ]));
                                                        }));
                                          }));
                                    return Wonder_jest.describe("fix bug", (function (param) {
                                                  return Wonder_jest.testPromise("if the order of the fetch of noWorker json record change, shouldn't affect the setted record in state", undefined, (function (param) {
                                                                var fetchFunc = _buildFakeFetch(sandbox);
                                                                var match = NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                                SinonTool$Wonderjs.deferReturns(100, LoadDataTool$Wonderjs.buildFakeFetchJsonResponse(match[0]), Sinon.onCall(1, fetchFunc));
                                                                return LoadDataTool$Wonderjs.load(/* array */[], fetchFunc, undefined, /* () */0).then((function (param) {
                                                                              var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
                                                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](NoWorkerJobConfigTool$Wonderjs.getSetting(state)), /* record */[
                                                                                              /* initPipeline */"default",
                                                                                              /* loopPipeline */"default"
                                                                                            ]));
                                                                            }));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
