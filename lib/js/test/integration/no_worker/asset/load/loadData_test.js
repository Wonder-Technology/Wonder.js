'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var SinonTool$Wonderjs = require("../../tool/sinon/SinonTool.js");
var SettingTool$Wonderjs = require("../../../../tool/service/setting/SettingTool.js");
var LoadDataTool$Wonderjs = require("../../../tool/asset/load/LoadDataTool.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var RenderConfigTool$Wonderjs = require("../../../../tool/service/renderConfig/RenderConfigTool.js");
var NoWorkerJobConfigTool$Wonderjs = require("../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js");

describe("test load no worker data", (function () {
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
        describe("test load job config json files", (function () {
                var _buildFakeFetch = function (sandbox) {
                  var fetch = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                  var match = NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0);
                  Sinon.returns(LoadDataTool$Wonderjs.buildFakeFetchJsonResponse(match[4]), Sinon.onCall(5, Sinon.returns(LoadDataTool$Wonderjs.buildFakeFetchJsonResponse(match[3]), Sinon.onCall(4, Sinon.returns(LoadDataTool$Wonderjs.buildFakeFetchJsonResponse(match[2]), Sinon.onCall(3, Sinon.returns(LoadDataTool$Wonderjs.buildFakeFetchJsonResponse(match[1]), Sinon.onCall(2, Sinon.returns(LoadDataTool$Wonderjs.buildFakeFetchJsonResponse(match[0]), Sinon.onCall(1, Sinon.returns(LoadDataTool$Wonderjs.buildFakeFetchJsonResponse(SettingTool$Wonderjs.buildSetting("true", undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), "\n        {\n        \"alpha\": true,\n        \"depth\": true,\n        \"stencil\": false,\n        \"antialias\": true,\n        \"premultiplied_alpha\": true,\n        \"preserve_drawing_buffer\": false\n        }\n               ", "false", "false")), Sinon.onCall(0, fetch))))))))))));
                  var match$1 = RenderConfigTool$Wonderjs.buildRenderConfig(undefined, undefined, /* () */0);
                  Sinon.returns(LoadDataTool$Wonderjs.buildFakeFetchJsonResponse(match$1[1]), Sinon.onCall(7, Sinon.returns(LoadDataTool$Wonderjs.buildFakeFetchJsonResponse(match$1[0]), Sinon.onCall(6, fetch))));
                  return fetch;
                };
                describe("test load noWorker config files", (function () {
                        Wonder_jest.testPromise("should pass dataDir for get json file path", (function () {
                                var fetchFunc = _buildFakeFetch(sandbox);
                                return LoadDataTool$Wonderjs.load(/* array */[
                                              "../../.res/job/setting.json",
                                              "../../.res/job/"
                                            ], fetchFunc, undefined, /* () */0).then((function () {
                                              return Promise.resolve(Sinon.toCalledWith(/* array */["../../.res/job/setting.json"], Wonder_jest.Expect[/* expect */0](fetchFunc)));
                                            }));
                              }));
                        Wonder_jest.testPromise("should fetch shader_libs.json file", (function () {
                                var fetchFunc = _buildFakeFetch(sandbox);
                                return LoadDataTool$Wonderjs.load(/* array */[
                                              "../../.res/job/setting.json",
                                              "../../.res/job/"
                                            ], fetchFunc, undefined, /* () */0).then((function () {
                                              return Promise.resolve(Sinon.toCalledWith(/* array */["../../.res/job/render/shader/shader_libs.json"], Wonder_jest.Expect[/* expect */0](fetchFunc)));
                                            }));
                              }));
                        describe("parse job record and set to state", (function () {
                                return Wonder_jest.testPromise("test parse noWorker setting, init pipeline, noWorker pipeline, init job, noWorker job", (function () {
                                              var fetchFunc = _buildFakeFetch(sandbox);
                                              return LoadDataTool$Wonderjs.load(/* array */[], fetchFunc, undefined, /* () */0).then((function () {
                                                            var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
                                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                NoWorkerJobConfigTool$Wonderjs.getSetting(state),
                                                                                NoWorkerJobConfigTool$Wonderjs.getInitPipelines(state),
                                                                                NoWorkerJobConfigTool$Wonderjs.getLoopPipelines(state),
                                                                                NoWorkerJobConfigTool$Wonderjs.getInitJobs(state),
                                                                                NoWorkerJobConfigTool$Wonderjs.getLoopJobs(state)
                                                                              ]), /* tuple */[
                                                                            /* record */[
                                                                              /* initPipeline */"default",
                                                                              /* loopPipeline */"default"
                                                                            ],
                                                                            /* array */[/* record */[
                                                                                /* name */"default",
                                                                                /* jobs : array */[
                                                                                  /* record */[/* name */"create_canvas"],
                                                                                  /* record */[/* name */"create_gl"],
                                                                                  /* record */[/* name */"set_full_screen"],
                                                                                  /* record */[/* name */"set_viewport"],
                                                                                  /* record */[/* name */"detect_gl"],
                                                                                  /* record */[/* name */"init_camera"],
                                                                                  /* record */[/* name */"start_time"],
                                                                                  /* record */[/* name */"preget_glslData"],
                                                                                  /* record */[/* name */"init_state"],
                                                                                  /* record */[/* name */"init_basic_material"],
                                                                                  /* record */[/* name */"init_light_material"],
                                                                                  /* record */[/* name */"init_texture"]
                                                                                ]
                                                                              ]],
                                                                            /* array */[/* record */[
                                                                                /* name */"default",
                                                                                /* jobs : array */[
                                                                                  /* record */[/* name */"tick"],
                                                                                  /* record */[/* name */"dispose"],
                                                                                  /* record */[/* name */"reallocate_cpu_memory"],
                                                                                  /* record */[/* name */"update_transform"],
                                                                                  /* record */[/* name */"update_camera"],
                                                                                  /* record */[/* name */"get_camera_data"],
                                                                                  /* record */[/* name */"create_basic_render_object_buffer"],
                                                                                  /* record */[/* name */"create_light_render_object_buffer"],
                                                                                  /* record */[/* name */"clear_color"],
                                                                                  /* record */[/* name */"clear_buffer"],
                                                                                  /* record */[/* name */"clear_last_send_component"],
                                                                                  /* record */[/* name */"send_uniform_shader_data"],
                                                                                  /* record */[/* name */"render_basic"],
                                                                                  /* record */[/* name */"front_render_light"]
                                                                                ]
                                                                              ]],
                                                                            /* array */[
                                                                              /* record */[
                                                                                /* name */"create_canvas",
                                                                                /* flags */undefined
                                                                              ],
                                                                              /* record */[
                                                                                /* name */"create_gl",
                                                                                /* flags */undefined
                                                                              ],
                                                                              /* record */[
                                                                                /* name */"set_full_screen",
                                                                                /* flags */undefined
                                                                              ],
                                                                              /* record */[
                                                                                /* name */"set_viewport",
                                                                                /* flags */undefined
                                                                              ],
                                                                              /* record */[
                                                                                /* name */"detect_gl",
                                                                                /* flags */undefined
                                                                              ],
                                                                              /* record */[
                                                                                /* name */"init_camera",
                                                                                /* flags */undefined
                                                                              ],
                                                                              /* record */[
                                                                                /* name */"start_time",
                                                                                /* flags */undefined
                                                                              ],
                                                                              /* record */[
                                                                                /* name */"preget_glslData",
                                                                                /* flags */undefined
                                                                              ],
                                                                              /* record */[
                                                                                /* name */"init_state",
                                                                                /* flags */undefined
                                                                              ],
                                                                              /* record */[
                                                                                /* name */"init_basic_material",
                                                                                /* flags */undefined
                                                                              ],
                                                                              /* record */[
                                                                                /* name */"init_light_material",
                                                                                /* flags */undefined
                                                                              ],
                                                                              /* record */[
                                                                                /* name */"init_texture",
                                                                                /* flags */undefined
                                                                              ]
                                                                            ],
                                                                            /* array */[
                                                                              /* record */[
                                                                                /* name */"tick",
                                                                                /* flags */undefined
                                                                              ],
                                                                              /* record */[
                                                                                /* name */"update_transform",
                                                                                /* flags */undefined
                                                                              ],
                                                                              /* record */[
                                                                                /* name */"update_camera",
                                                                                /* flags */undefined
                                                                              ],
                                                                              /* record */[
                                                                                /* name */"get_camera_data",
                                                                                /* flags */undefined
                                                                              ],
                                                                              /* record */[
                                                                                /* name */"create_basic_render_object_buffer",
                                                                                /* flags */undefined
                                                                              ],
                                                                              /* record */[
                                                                                /* name */"create_light_render_object_buffer",
                                                                                /* flags */undefined
                                                                              ],
                                                                              /* record */[
                                                                                /* name */"clear_color",
                                                                                /* flags *//* array */["#000000"]
                                                                              ],
                                                                              /* record */[
                                                                                /* name */"clear_buffer",
                                                                                /* flags *//* array */[
                                                                                  "COLOR_BUFFER",
                                                                                  "DEPTH_BUFFER",
                                                                                  "STENCIL_BUFFER"
                                                                                ]
                                                                              ],
                                                                              /* record */[
                                                                                /* name */"clear_last_send_component",
                                                                                /* flags */undefined
                                                                              ],
                                                                              /* record */[
                                                                                /* name */"send_uniform_shader_data",
                                                                                /* flags */undefined
                                                                              ],
                                                                              /* record */[
                                                                                /* name */"render_basic",
                                                                                /* flags */undefined
                                                                              ],
                                                                              /* record */[
                                                                                /* name */"front_render_light",
                                                                                /* flags */undefined
                                                                              ],
                                                                              /* record */[
                                                                                /* name */"dispose",
                                                                                /* flags */undefined
                                                                              ],
                                                                              /* record */[
                                                                                /* name */"reallocate_cpu_memory",
                                                                                /* flags */undefined
                                                                              ]
                                                                            ]
                                                                          ]));
                                                          }));
                                            }));
                              }));
                        Wonder_jest.testPromise("test parse shaders", (function () {
                                var fetchFunc = _buildFakeFetch(sandbox);
                                return LoadDataTool$Wonderjs.load(/* array */[], fetchFunc, undefined, /* () */0).then((function () {
                                              var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](RenderConfigTool$Wonderjs.getShaders(state)[/* staticBranchs */0]), /* array */[
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
                        Wonder_jest.testPromise("test parse shader libs", (function () {
                                var fetchFunc = _buildFakeFetch(sandbox);
                                return LoadDataTool$Wonderjs.load(/* array */[], fetchFunc, undefined, /* () */0).then((function () {
                                              var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Caml_array.caml_array_get(RenderConfigTool$Wonderjs.getShaderLibs(state), 0)), /* record */[
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
                        describe("fix bug", (function () {
                                return Wonder_jest.testPromise("if the order of the fetch of noWorker json record change, shouldn't affect the setted record in state", (function () {
                                              var fetchFunc = _buildFakeFetch(sandbox);
                                              var match = NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0);
                                              SinonTool$Wonderjs.deferReturns(100, LoadDataTool$Wonderjs.buildFakeFetchJsonResponse(match[0]), Sinon.onCall(1, fetchFunc));
                                              return LoadDataTool$Wonderjs.load(/* array */[], fetchFunc, undefined, /* () */0).then((function () {
                                                            var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
                                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](NoWorkerJobConfigTool$Wonderjs.getSetting(state)), /* record */[
                                                                            /* initPipeline */"default",
                                                                            /* loopPipeline */"default"
                                                                          ]));
                                                          }));
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

/*  Not a pure module */
