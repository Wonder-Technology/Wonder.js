'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var ScriptAPI$Wonderjs = require("../../../../../src/api/script/ScriptAPI.js");
var ScriptTool$Wonderjs = require("../../../../tool/service/script/ScriptTool.js");
var InitScriptJobTool$Wonderjs = require("../../../../tool/job/no_worker/init/InitScriptJobTool.js");
var CreateStateMainService$Wonderjs = require("../../../../../src/service/state/main/state/CreateStateMainService.js");

Wonder_jest.describe("test init_script job", (function (param) {
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
        return Wonder_jest.test("exec all actived scripts' init event functions", (function (param) {
                      var match = ScriptTool$Wonderjs.createGameObject(state[0]);
                      var script1 = match[2];
                      var match$1 = ScriptTool$Wonderjs.createGameObject(match[0]);
                      var script2 = match$1[2];
                      var state$1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptData */11](script1, match$1[0], undefined, undefined, undefined, /* () */0);
                      var state$2 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptData */11](script2, state$1, undefined, undefined, undefined, /* () */0);
                      var state$3 = ScriptAPI$Wonderjs.setScriptIsActive(script2, false, state$2);
                      var state$4 = InitScriptJobTool$Wonderjs.exec(state$3);
                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                      ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldAValue */12](script1, state$4),
                                      ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldAValue */12](script2, state$4)
                                    ]), /* tuple */[
                                  ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldAValueAfterExecInitEventFunc */15](/* () */0),
                                  ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldAValueBeforeExecInitEventFunc */14](/* () */0)
                                ]);
                    }));
      }));

/*  Not a pure module */
