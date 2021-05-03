

import * as Curry from "./../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "./../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../../tool/TestTool.js";
import * as ScriptTool$Wonderjs from "../../../../../tool/service/script/ScriptTool.js";
import * as DirectorTool$Wonderjs from "../../../../../tool/core/DirectorTool.js";
import * as NoWorkerJobConfigTool$Wonderjs from "../../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js";
import * as CreateStateMainService$Wonderjs from "../../../../../../src/service/state/main/state/CreateStateMainService.js";
import * as ScriptEventFunctionAPI$Wonderjs from "../../../../../../src/api/script/ScriptEventFunctionAPI.js";

Wonder_jest.describe("test exec script event function", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */CreateStateMainService$Wonderjs.createState(/* () */0)];
        var _buildNoWorkerJobConfig = function (param) {
          return NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"update_script\"\n        }\n      ]\n    }\n  ]\n        ", undefined, undefined, /* () */0);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, _buildNoWorkerJobConfig(/* () */0), undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("if script event function, not exec", (function (param) {
                      return Wonder_jest.describe("test update event func", (function (param) {
                                    Wonder_jest.test("test not exec", (function (param) {
                                            var match = ScriptTool$Wonderjs.createGameObject(state[0]);
                                            var script1 = match[2];
                                            var state$1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptData */11](script1, match[0], undefined, undefined, undefined, /* () */0);
                                            var state$2 = ScriptEventFunctionAPI$Wonderjs.disableScriptEventFunction(state$1);
                                            var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldBValue */13](script1, state$3)), ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldBValueBeforeExecUpdateEventFunc */16](/* () */0));
                                          }));
                                    return Wonder_jest.test("test exec after enable", (function (param) {
                                                  var match = ScriptTool$Wonderjs.createGameObject(state[0]);
                                                  var script1 = match[2];
                                                  var state$1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptData */11](script1, match[0], undefined, undefined, undefined, /* () */0);
                                                  var state$2 = ScriptEventFunctionAPI$Wonderjs.disableScriptEventFunction(state$1);
                                                  var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                                  var state$4 = ScriptEventFunctionAPI$Wonderjs.enableScriptEventFunction(state$3);
                                                  var state$5 = DirectorTool$Wonderjs.runWithDefaultTime(state$4);
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldBValue */13](script1, state$5)), ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldBValueAfterExecUpdateEventFunc */17](/* () */0));
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
