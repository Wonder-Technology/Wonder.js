

import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_option from "../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as CameraTool$Wonderjs from "../../../tool/service/camera/CameraTool.js";
import * as SettingTool$Wonderjs from "../../../tool/service/setting/SettingTool.js";
import * as MainStateTool$Wonderjs from "../../../tool/service/state/MainStateTool.js";
import * as TestWorkerTool$Wonderjs from "../tool/TestWorkerTool.js";
import * as FakeGlWorkerTool$Wonderjs from "../tool/FakeGlWorkerTool.js";
import * as RenderBasicJobTool$Wonderjs from "../../../tool/job/render_basic/RenderBasicJobTool.js";
import * as TestMainWorkerTool$Wonderjs from "../job/main_worker/tool/TestMainWorkerTool.js";
import * as FrontRenderLightJobTool$Wonderjs from "../../../tool/job/no_worker/loop/FrontRenderLightJobTool.js";
import * as RenderJobsRenderWorkerTool$Wonderjs from "../job/render_worker/tool/RenderJobsRenderWorkerTool.js";

Wonder_jest.describe("test commit gl", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestMainWorkerTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, 5, 8, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return TestWorkerTool$Wonderjs.clear(sandbox);
              }));
        return Wonder_jest.describe("should only commit once", (function (param) {
                      return Wonder_jest.testPromise("test render basic and front render light", undefined, (function (param) {
                                    var match = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, state[0]);
                                    var match$1 = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, match[0]);
                                    var match$2 = CameraTool$Wonderjs.createCameraGameObject(match$1[0]);
                                    var commit = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                    var state$1 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(commit), undefined, undefined, /* () */0), match$2[0]);
                                    return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function (param) {
                                                  return Promise.resolve(Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](commit)));
                                                }), state$1, sandbox, undefined, /* () */0);
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
