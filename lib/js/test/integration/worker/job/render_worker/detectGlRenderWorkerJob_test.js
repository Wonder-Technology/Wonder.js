'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var CamlinternalOO = require("bs-platform/lib/js/camlinternalOO.js");
var SettingTool$Wonderjs = require("../../../../tool/service/setting/SettingTool.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var TestWorkerTool$Wonderjs = require("../../tool/TestWorkerTool.js");
var FakeGlWorkerTool$Wonderjs = require("../../tool/FakeGlWorkerTool.js");
var GlRenderWorkerTool$Wonderjs = require("../../tool/GlRenderWorkerTool.js");
var TestMainWorkerTool$Wonderjs = require("../main_worker/tool/TestMainWorkerTool.js");
var WorkerJobWorkerTool$Wonderjs = require("../../tool/WorkerJobWorkerTool.js");
var RenderWorkerStateTool$Wonderjs = require("../../../../tool/service/state/RenderWorkerStateTool.js");
var DetectGlRenderWorkerJob$Wonderjs = require("../../../../../src/job/worker/render/init/DetectGlRenderWorkerJob.js");

var class_tables = [
  0,
  0,
  0
];

Wonder_jest.describe("test detect gl render worker job", (function (param) {
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
        return Wonder_jest.describe("detect extension", (function (param) {
                      var _test = function (callIndex, extensionStr) {
                        var renderWorkerState = RenderWorkerStateTool$Wonderjs.createStateAndSetToStateData(/* () */0);
                        FakeGlWorkerTool$Wonderjs.setFakeGlToRenderWorkerState(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), renderWorkerState);
                        TestMainWorkerTool$Wonderjs.closeContractCheck(/* () */0);
                        if (!class_tables[0]) {
                          var $$class = CamlinternalOO.create_table(0);
                          var env = CamlinternalOO.new_variable($$class, "");
                          var env_init = function (env$1) {
                            var self = CamlinternalOO.create_object_opt(0, $$class);
                            self[env] = env$1;
                            return self;
                          };
                          CamlinternalOO.init_class($$class);
                          class_tables[0] = env_init;
                        }
                        return WorkerJobWorkerTool$Wonderjs.execRenderWorkerJob(DetectGlRenderWorkerJob$Wonderjs.execJob, (function (state) {
                                      var gl = GlRenderWorkerTool$Wonderjs.unsafeGetGl(state);
                                      return Promise.resolve(Sinon.toCalledWith(/* array */[extensionStr], Wonder_jest.Expect[/* expect */0](Sinon.getCall(callIndex, gl.getExtension))));
                                    }), Caml_option.some({
                                        data: {
                                          bufferData: Curry._1(class_tables[0], 0)
                                        }
                                      }), undefined, /* () */0);
                      };
                      Wonder_jest.testPromise("detect instanced_arrays", undefined, (function (param) {
                              return _test(0, "ANGLE_instanced_arrays");
                            }));
                      return Wonder_jest.testPromise("detect element_index_uint", undefined, (function (param) {
                                    return _test(1, "OES_element_index_uint");
                                  }));
                    }));
      }));

/*  Not a pure module */
