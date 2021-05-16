'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../tool/TestTool.js");
var ScriptAPI$Wonderjs = require("../../../../src/api/script/ScriptAPI.js");
var ScriptTool$Wonderjs = require("../../../tool/service/script/ScriptTool.js");
var ScriptAttributeAPI$Wonderjs = require("../../../../src/api/script/ScriptAttributeAPI.js");
var CreateStateMainService$Wonderjs = require("../../../../src/service/state/main/state/CreateStateMainService.js");

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

/*  Not a pure module */
