

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../tool/TestTool.js";
import * as FakeGlTool$Wonderjs from "../../tool/gl/FakeGlTool.js";
import * as ProgramTool$Wonderjs from "../../tool/service/program/ProgramTool.js";
import * as InitIMGUIJob$Wonderjs from "../../../src/job/no_worker/init/InitIMGUIJob.js";
import * as AssetIMGUITool$Wonderjs from "../../tool/service/imgui/AssetIMGUITool.js";
import * as ManageIMGUIAPI$Wonderjs from "../../../src/api/imgui/ManageIMGUIAPI.js";
import * as CreateStateMainService$Wonderjs from "../../../src/service/state/main/state/CreateStateMainService.js";

Wonder_jest.describe("ManageIMGUIAPI", (function (param) {
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
        return Wonder_jest.describe("sendCustomTextureProgramUniformProjectionMatData", (function (param) {
                      return Wonder_jest.test("clear last send program", (function (param) {
                                    var state$1 = AssetIMGUITool$Wonderjs.prepareFontAsset(state[0]);
                                    var gl = FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                    var state$2 = FakeGlTool$Wonderjs.setFakeGl(gl, state$1);
                                    var state$3 = InitIMGUIJob$Wonderjs.execJob(undefined, state$2);
                                    var state$4 = ProgramTool$Wonderjs.setLastUsedProgram(1, state$3);
                                    var state$5 = ManageIMGUIAPI$Wonderjs.sendCustomTextureProgramUniformProjectionMatData(gl, /* tuple */[
                                          500,
                                          250
                                        ], state$4);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](state$5[/* programRecord */30][/* lastUsedProgram */1]), undefined);
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
