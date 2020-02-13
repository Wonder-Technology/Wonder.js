'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../tool/TestTool.js");
var FakeGlTool$Wonderjs = require("../../tool/gl/FakeGlTool.js");
var ProgramTool$Wonderjs = require("../../tool/service/program/ProgramTool.js");
var ExecIMGUIAPI$Wonderjs = require("../../../src/api/imgui/ExecIMGUIAPI.js");
var InitIMGUIJob$Wonderjs = require("../../../src/job/no_worker/init/InitIMGUIJob.js");
var ExecIMGUITool$Wonderjs = require("../../tool/service/imgui/ExecIMGUITool.js");
var AssetIMGUITool$Wonderjs = require("../../tool/service/imgui/AssetIMGUITool.js");
var CreateStateMainService$Wonderjs = require("../../../src/service/state/main/state/CreateStateMainService.js");

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

/*  Not a pure module */
