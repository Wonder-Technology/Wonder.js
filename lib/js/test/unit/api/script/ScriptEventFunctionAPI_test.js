'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../tool/TestTool.js");
var ScriptTool$Wonderjs = require("../../../tool/service/script/ScriptTool.js");
var CreateStateMainService$Wonderjs = require("../../../../src/service/state/main/state/CreateStateMainService.js");
var ScriptEventFunctionAPI$Wonderjs = require("../../../../src/api/script/ScriptEventFunctionAPI.js");

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

/*  Not a pure module */
