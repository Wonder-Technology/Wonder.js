

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../tool/TestTool.js";
import * as MainStateTool$Wonderjs from "../../../tool/service/state/MainStateTool.js";
import * as ExtendIMGUITool$Wonderjs from "../../../tool/service/imgui/ExtendIMGUITool.js";
import * as NoWorkerJobTool$Wonderjs from "../../../tool/service/job/no_worker/NoWorkerJobTool.js";
import * as RenderIMGUITool$Wonderjs from "../../../tool/service/imgui/RenderIMGUITool.js";
import * as NoWorkerJobConfigTool$Wonderjs from "../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js";

Wonder_jest.describe("test extend imgui", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"init_imgui\"\n        }\n      ]\n    }\n  ]\n        ", "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"render_imgui\"\n        }\n      ]\n    }\n  ]\n        ", "\n[\n        {\n          \"name\": \"init_imgui\"\n        }\n]\n        ", "\n[\n        {\n          \"name\": \"render_imgui\"\n        }\n]\n        ", /* () */0), undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test extend by add skin data and add custom control", (function (param) {
                      return Wonder_jest.describe("test render", (function (param) {
                                    return Wonder_jest.test("test color buffer data", (function (param) {
                                                  var state$1 = RenderIMGUITool$Wonderjs.prepareIMGUI(state);
                                                  var match = RenderIMGUITool$Wonderjs.prepareGl(sandbox, state$1);
                                                  var bufferData = match[3];
                                                  var state$2 = ExtendIMGUITool$Wonderjs.addExtendDataAndSetExecFunc(match[0]);
                                                  var state$3 = NoWorkerJobTool$Wonderjs.execInitJobs(state$2);
                                                  var bufferDataCallCountAfterInit = Sinon.getCallCount(bufferData);
                                                  NoWorkerJobTool$Wonderjs.execLoopJobs(state$3);
                                                  return RenderIMGUITool$Wonderjs.judgeNoTextureProgramColorBufferData(bufferData, bufferDataCallCountAfterInit);
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
