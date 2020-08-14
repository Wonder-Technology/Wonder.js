'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var FakeGlTool$Wonderjs = require("../../../../tool/gl/FakeGlTool.js");
var ScriptTool$Wonderjs = require("../../../../tool/service/script/ScriptTool.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var CreateStateMainService$Wonderjs = require("../../../../../src/service/state/main/state/CreateStateMainService.js");

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

/*  Not a pure module */
