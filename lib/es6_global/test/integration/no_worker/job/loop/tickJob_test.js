

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as DirectorTool$Wonderjs from "../../../../tool/core/DirectorTool.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as TimeControllerAPI$Wonderjs from "../../../../../src/api/TimeControllerAPI.js";
import * as TimeControllerTool$Wonderjs from "../../../../tool/service/timeController/TimeControllerTool.js";
import * as NoWorkerJobConfigTool$Wonderjs from "../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js";

describe("test tick job", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        var _buildNoWorkerJobConfig = function () {
          return NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"start_time\"\n        }\n      ]\n    }\n  ]\n        ", "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"tick\"\n        }\n      ]\n    }\n  ]\n        ", "\n\n[\n        {\n          \"name\": \"start_time\"\n        }\n]\n        ", "\n\n[\n        {\n          \"name\": \"tick\"\n        }\n]\n        ", /* () */0);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, _buildNoWorkerJobConfig(/* () */0), undefined, /* () */0);
                TimeControllerTool$Wonderjs.setStartTime(100);
                return TestTool$Wonderjs.closeContractCheck(/* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("compute gameTime", (function () {
                Wonder_jest.test("gameTime's unit is second", (function () {
                        var state$1 = DirectorTool$Wonderjs.init(state[0]);
                        var state$2 = DirectorTool$Wonderjs.run(state$1, 1100, /* () */0);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TimeControllerAPI$Wonderjs.getGameTime(state$2)), 1);
                      }));
                return Wonder_jest.test("record total game time", (function () {
                              var state$1 = DirectorTool$Wonderjs.init(state[0]);
                              var state$2 = DirectorTool$Wonderjs.run(state$1, 1000, /* () */0);
                              var state$3 = DirectorTool$Wonderjs.run(state$2, 2100, /* () */0);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TimeControllerAPI$Wonderjs.getGameTime(state$3)), 2);
                            }));
              }));
        describe("compute fps", (function () {
                Wonder_jest.test("fps is 60 on the first loop", (function () {
                        var state$1 = DirectorTool$Wonderjs.init(state[0]);
                        var state$2 = DirectorTool$Wonderjs.run(state$1, 500, /* () */0);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TimeControllerAPI$Wonderjs.getFps(state$2)), 60);
                      }));
                return Wonder_jest.test("test compute", (function () {
                              var state$1 = DirectorTool$Wonderjs.init(state[0]);
                              var state$2 = DirectorTool$Wonderjs.run(state$1, 1000, /* () */0);
                              var state$3 = DirectorTool$Wonderjs.run(state$2, 1050, /* () */0);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TimeControllerAPI$Wonderjs.getFps(state$3)), 20);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
