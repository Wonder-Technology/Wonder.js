

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_option from "../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../tool/TestTool.js";
import * as FakeGlTool$Wonderjs from "../../tool/gl/FakeGlTool.js";
import * as ProgramTool$Wonderjs from "../../tool/service/program/ProgramTool.js";
import * as ExecIMGUIAPI$Wonderjs from "../../../src/api/imgui/ExecIMGUIAPI.js";
import * as InitIMGUIJob$Wonderjs from "../../../src/job/no_worker/init/InitIMGUIJob.js";
import * as ExecIMGUITool$Wonderjs from "../../tool/service/imgui/ExecIMGUITool.js";
import * as AssetIMGUITool$Wonderjs from "../../tool/service/imgui/AssetIMGUITool.js";
import * as CreateStateMainService$Wonderjs from "../../../src/service/state/main/state/CreateStateMainService.js";

Wonder_jest.describe("ExecIMGUIAPI", (function (param) {
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
        return Wonder_jest.describe("clearExecFuncDataArr", (function (param) {
                      return Wonder_jest.test("clear exec func data arr", (function (param) {
                                    var state$1 = AssetIMGUITool$Wonderjs.prepareFontAsset(state[0]);
                                    var gl = FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                    var state$2 = FakeGlTool$Wonderjs.setFakeGl(gl, state$1);
                                    var state$3 = InitIMGUIJob$Wonderjs.execJob(undefined, state$2);
                                    var state$4 = ProgramTool$Wonderjs.setLastUsedProgram(1, state$3);
                                    var func = function (param, param$1, state) {
                                      return state;
                                    };
                                    var state$5 = ExecIMGUITool$Wonderjs.addExecFuncData(state$4, "e1", undefined, undefined, Caml_option.some(func), /* () */0);
                                    var state$6 = ExecIMGUIAPI$Wonderjs.clearExecFuncDataArr(state$5);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ExecIMGUITool$Wonderjs.getExecFuncDataArr(state$6).length), 0);
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
