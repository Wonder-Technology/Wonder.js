

import * as Curry from "./../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "./../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../tool/TestTool.js";
import * as ScriptTool$Wonderjs from "../../../tool/service/script/ScriptTool.js";
import * as CreateStateMainService$Wonderjs from "../../../../src/service/state/main/state/CreateStateMainService.js";
import * as ScriptEventFunctionAPI$Wonderjs from "../../../../src/api/script/ScriptEventFunctionAPI.js";

Wonder_jest.describe("ScriptEventFunctionAPI", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */CreateStateMainService$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.init(sandbox, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("isScriptEventFunctionEnable", (function (param) {
                      return Wonder_jest.test("return is script event function enable", (function (param) {
                                    var match = ScriptTool$Wonderjs.createGameObject(state[0]);
                                    var state$1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptData */11](match[2], match[0], undefined, undefined, undefined, /* () */0);
                                    var state$2 = ScriptEventFunctionAPI$Wonderjs.disableScriptEventFunction(state$1);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ScriptEventFunctionAPI$Wonderjs.isScriptEventFunctionEnable(state$2)), false);
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
