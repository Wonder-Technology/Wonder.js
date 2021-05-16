

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as CamlinternalOO from "../../../../../../../node_modules/bs-platform/lib/es6/camlinternalOO.js";
import * as SettingTool$Wonderjs from "../../../../tool/service/setting/SettingTool.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as TestWorkerTool$Wonderjs from "../../tool/TestWorkerTool.js";
import * as FakeGlWorkerTool$Wonderjs from "../../tool/FakeGlWorkerTool.js";
import * as GlRenderWorkerTool$Wonderjs from "../../tool/GlRenderWorkerTool.js";
import * as TestMainWorkerTool$Wonderjs from "../main_worker/tool/TestMainWorkerTool.js";
import * as WorkerJobWorkerTool$Wonderjs from "../../tool/WorkerJobWorkerTool.js";
import * as RenderWorkerStateTool$Wonderjs from "../../../../tool/service/state/RenderWorkerStateTool.js";
import * as DetectGlRenderWorkerJob$Wonderjs from "../../../../../src/job/worker/render/init/DetectGlRenderWorkerJob.js";

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

export {
  
}
/*  Not a pure module */
