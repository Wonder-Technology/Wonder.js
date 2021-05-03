

import * as Curry from "./../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "./../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../tool/TestTool.js";
import * as ScriptAPI$Wonderjs from "../../../../src/api/script/ScriptAPI.js";
import * as ScriptTool$Wonderjs from "../../../tool/service/script/ScriptTool.js";
import * as ScriptAttributeAPI$Wonderjs from "../../../../src/api/script/ScriptAttributeAPI.js";
import * as CreateStateMainService$Wonderjs from "../../../../src/service/state/main/state/CreateStateMainService.js";

Wonder_jest.describe("ScriptAttributeAPI", (function (param) {
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
        Wonder_jest.describe("removeScriptAttributeField", (function (param) {
                return Wonder_jest.test("remove script attribute field", (function (param) {
                              var match = ScriptAPI$Wonderjs.createScript(state[0]);
                              var scriptAttributeName1 = "scriptAttribute1";
                              var scriptAttribute1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptAttribute */2](scriptAttributeName1);
                              ScriptAPI$Wonderjs.addScriptAttribute(match[1], scriptAttributeName1, scriptAttribute1, match[0]);
                              var scriptAttribute1$1 = ScriptAttributeAPI$Wonderjs.removeScriptAttributeField("b", scriptAttribute1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ScriptAttributeAPI$Wonderjs.getScriptAttributeEntries(scriptAttribute1$1)), /* array */[/* tuple */[
                                            "a",
                                            ScriptTool$Wonderjs.unsafeGetScriptAttributeEntries("a", scriptAttribute1$1)
                                          ]]);
                            }));
              }));
        return Wonder_jest.describe("getScriptAttributeEntries", (function (param) {
                      return Wonder_jest.test("get script attribute entries", (function (param) {
                                    var match = ScriptAPI$Wonderjs.createScript(state[0]);
                                    var scriptAttributeName1 = "scriptAttribute1";
                                    var scriptAttribute1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptAttribute */2](scriptAttributeName1);
                                    ScriptAPI$Wonderjs.addScriptAttribute(match[1], scriptAttributeName1, scriptAttribute1, match[0]);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ScriptAttributeAPI$Wonderjs.getScriptAttributeEntries(scriptAttribute1)), /* array */[
                                                /* tuple */[
                                                  "a",
                                                  ScriptTool$Wonderjs.unsafeGetScriptAttributeEntries("a", scriptAttribute1)
                                                ],
                                                /* tuple */[
                                                  "b",
                                                  ScriptTool$Wonderjs.unsafeGetScriptAttributeEntries("b", scriptAttribute1)
                                                ]
                                              ]);
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
