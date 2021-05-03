

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "./../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as FakeGlTool$Wonderjs from "../../../../tool/gl/FakeGlTool.js";
import * as ScriptTool$Wonderjs from "../../../../tool/service/script/ScriptTool.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as CreateStateMainService$Wonderjs from "../../../../../src/service/state/main/state/CreateStateMainService.js";

Wonder_jest.describe("test redo,undo script", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */CreateStateMainService$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test deep copy script record", (function (param) {
                return Wonder_jest.test("shadow copy gameObjectMap, isActiveMap", (function (param) {
                              return MainStateTool$Wonderjs.testShadowCopyArrayLikeMapData((function (state) {
                                            var match = state[/* scriptRecord */27];
                                            return /* array */[
                                                    match[/* gameObjectMap */3],
                                                    match[/* isActiveMap */4]
                                                  ];
                                          }), state[0]);
                            }));
              }));
        return Wonder_jest.describe("test restore", (function (param) {
                      return Wonder_jest.test("test restore script attribute", (function (param) {
                                    var match = ScriptTool$Wonderjs.createGameObject(state[0]);
                                    var script1 = match[2];
                                    var state$1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptData */11](script1, match[0], undefined, undefined, undefined, /* () */0);
                                    var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                    var state$3 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* setScriptAttributeFieldAValue */19](script1, 3, state$2);
                                    var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$3);
                                    var state$4 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* setScriptAttributeFieldAValue */19](script1, 5, state$3);
                                    var restoredState = MainStateTool$Wonderjs.restore(state$4, copiedState);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldAValue */12](script1, restoredState)), 3);
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
