'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../../../tool/TestTool.js");
var ScriptTool$Wonderjs = require("../../../../../tool/service/script/ScriptTool.js");
var DirectorTool$Wonderjs = require("../../../../../tool/core/DirectorTool.js");
var NoWorkerJobConfigTool$Wonderjs = require("../../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js");
var CreateStateMainService$Wonderjs = require("../../../../../../src/service/state/main/state/CreateStateMainService.js");
var ScriptEventFunctionAPI$Wonderjs = require("../../../../../../src/api/script/ScriptEventFunctionAPI.js");

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

/*  Not a pure module */
