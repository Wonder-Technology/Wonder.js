

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_option from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "./../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as ScriptAPI$Wonderjs from "../../../../../src/api/script/ScriptAPI.js";
import * as ScriptTool$Wonderjs from "../../../../tool/service/script/ScriptTool.js";
import * as DirectorTool$Wonderjs from "../../../../tool/core/DirectorTool.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as NoWorkerJobConfigTool$Wonderjs from "../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js";

Wonder_jest.describe("test update_script job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
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
        return Wonder_jest.describe("exec all update event functions", (function (param) {
                      Wonder_jest.test("only exec actived scripts' update event functions", (function (param) {
                              var match = ScriptTool$Wonderjs.createGameObject(state[0]);
                              var script1 = match[2];
                              var match$1 = ScriptTool$Wonderjs.createGameObject(match[0]);
                              var script2 = match$1[2];
                              var state$1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptData */11](script1, match$1[0], undefined, undefined, undefined, /* () */0);
                              var state$2 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptData */11](script2, state$1, undefined, undefined, undefined, /* () */0);
                              var state$3 = ScriptAPI$Wonderjs.setScriptIsActive(script1, false, state$2);
                              var state$4 = DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldBValue */13](script1, state$4),
                                              ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldBValue */13](script2, state$4)
                                            ]), /* tuple */[
                                          ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldBValueBeforeExecUpdateEventFunc */16](/* () */0),
                                          ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldBValueAfterExecUpdateEventFunc */17](/* () */0)
                                        ]);
                            }));
                      Wonder_jest.test("only exec existed update event functions", (function (param) {
                              var match = ScriptTool$Wonderjs.createGameObject(state[0]);
                              var script = match[2];
                              var scriptEventFunctionData1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptEventFunctionData */0](undefined, undefined, undefined);
                              var scriptEventFunctionData2 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptEventFunctionData */0](undefined, Caml_option.some(ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildUpdateEventFunc */7](/* () */0)), undefined);
                              var state$1 = ScriptAPI$Wonderjs.addScriptEventFunctionData(script, "scriptEventFunctionData1", scriptEventFunctionData1, match[0]);
                              var state$2 = ScriptAPI$Wonderjs.addScriptEventFunctionData(script, "scriptEventFunctionData2", scriptEventFunctionData2, state$1);
                              var scriptAttributeName = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getScriptAttributeName */3](/* () */0);
                              var scriptAttribute = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptAttribute */2](scriptAttributeName);
                              var state$3 = ScriptAPI$Wonderjs.addScriptAttribute(script, scriptAttributeName, scriptAttribute, state$2);
                              var state$4 = DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldBValue */13](script, state$4)), ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldBValueAfterExecUpdateEventFunc */17](/* () */0));
                            }));
                      Wonder_jest.describe("test one script component with one event function data", (function (param) {
                              Wonder_jest.describe("test one script component with one attribute", (function (param) {
                                      Wonder_jest.test("test attribute", (function (param) {
                                              var match = ScriptTool$Wonderjs.createGameObject(state[0]);
                                              var script1 = match[2];
                                              var match$1 = ScriptTool$Wonderjs.createGameObject(match[0]);
                                              var script2 = match$1[2];
                                              var state$1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptData */11](script1, match$1[0], undefined, undefined, undefined, /* () */0);
                                              var state$2 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptData */11](script2, state$1, undefined, undefined, undefined, /* () */0);
                                              var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldBValue */13](script1, state$3),
                                                              ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldBValue */13](script2, state$3)
                                                            ]), /* tuple */[
                                                          ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldBValueAfterExecUpdateEventFunc */17](/* () */0),
                                                          ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldBValueAfterExecUpdateEventFunc */17](/* () */0)
                                                        ]);
                                            }));
                                      return Wonder_jest.test("set transform local position in update", (function (param) {
                                                    var match = ScriptTool$Wonderjs.createGameObject(state[0]);
                                                    var script1 = match[2];
                                                    var match$1 = ScriptTool$Wonderjs.createGameObject(match[0]);
                                                    var script2 = match$1[2];
                                                    var state$1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptData */11](script1, match$1[0], undefined, Caml_option.some(ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildSetLocalPositionEventFunc */4](/* () */0)), undefined, /* () */0);
                                                    var state$2 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptData */11](script2, state$1, undefined, undefined, undefined, /* () */0);
                                                    var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                    ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getLocalPosition */10](script1, state$3),
                                                                    ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldBValue */13](script2, state$3)
                                                                  ]), /* tuple */[
                                                                ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getLocalPositionAfterExec */9](/* () */0),
                                                                ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldBValueAfterExecUpdateEventFunc */17](/* () */0)
                                                              ]);
                                                  }));
                                    }));
                              return Wonder_jest.test("test one script component with two attributes", (function (param) {
                                            var match = ScriptTool$Wonderjs.createGameObject(state[0]);
                                            var script1 = match[2];
                                            var match$1 = ScriptTool$Wonderjs.createGameObject(match[0]);
                                            var script2 = match$1[2];
                                            var state$1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndTwoAttributes[/* buildScriptData */5](script1, match$1[0]);
                                            var state$2 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptData */11](script2, state$1, undefined, undefined, undefined, /* () */0);
                                            var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndTwoAttributes[/* getAttribute1FieldBValue */6](script1, state$3),
                                                            ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldBValue */13](script2, state$3)
                                                          ]), /* tuple */[
                                                        ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndTwoAttributes[/* getAttribute1FieldBValueAfterExecUpdateEventFunc */7](/* () */0),
                                                        ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldBValueAfterExecUpdateEventFunc */17](/* () */0)
                                                      ]);
                                          }));
                            }));
                      return Wonder_jest.test("test one script component with two event function data", (function (param) {
                                    var match = ScriptTool$Wonderjs.createGameObject(state[0]);
                                    var script1 = match[2];
                                    var match$1 = ScriptTool$Wonderjs.createGameObject(match[0]);
                                    var script2 = match$1[2];
                                    var state$1 = ScriptTool$Wonderjs.TestCaseWithTwoEventFuncsAndTwoAttributes[/* buildScriptData */5](script1, match$1[0]);
                                    var state$2 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptData */11](script2, state$1, undefined, undefined, undefined, /* () */0);
                                    var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                    ScriptTool$Wonderjs.TestCaseWithTwoEventFuncsAndTwoAttributes[/* getAttribute1FieldAValue */6](script1, state$3),
                                                    ScriptTool$Wonderjs.TestCaseWithTwoEventFuncsAndTwoAttributes[/* getAttribute1FieldBValue */8](script1, state$3),
                                                    ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldBValue */13](script2, state$3)
                                                  ]), /* tuple */[
                                                ScriptTool$Wonderjs.TestCaseWithTwoEventFuncsAndTwoAttributes[/* getAttribute1FieldAValueAfterExecUpdateEventFunc */7](/* () */0),
                                                ScriptTool$Wonderjs.TestCaseWithTwoEventFuncsAndTwoAttributes[/* getAttribute1FieldBValueAfterExecUpdateEventFunc */9](/* () */0),
                                                ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldBValueAfterExecUpdateEventFunc */17](/* () */0)
                                              ]);
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
