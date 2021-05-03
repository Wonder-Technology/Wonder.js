

import * as Curry from "./../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "./../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../tool/TestTool.js";
import * as MainStateTool$Wonderjs from "../../../tool/service/state/MainStateTool.js";
import * as NoWorkerJobConfigTool$Wonderjs from "../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js";

Wonder_jest.describe("NoWorkerJobConfig", (function (param) {
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
        return Wonder_jest.describe("getInitPipelines", (function (param) {
                      return Wonder_jest.describe("contract check", (function (param) {
                                    return Wonder_jest.test("should exist job config", (function (param) {
                                                  return Wonder_jest.Expect[/* toThrowMessage */21]("expect noWorker job config exist, but actual not", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                                    return NoWorkerJobConfigTool$Wonderjs.getInitPipelines(state[0]);
                                                                  })));
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
