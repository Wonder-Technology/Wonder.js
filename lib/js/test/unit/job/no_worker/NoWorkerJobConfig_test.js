'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../tool/TestTool.js");
var MainStateTool$Wonderjs = require("../../../tool/service/state/MainStateTool.js");
var NoWorkerJobConfigTool$Wonderjs = require("../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js");

Wonder_jest.describe("NoWorkerJobConfig", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.init(sandbox, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("getInitPipelines", (function (param) {
                      return Wonder_jest.describe("contract check", (function (param) {
                                    return Wonder_jest.test("should exist job config", (function (param) {
                                                  return Wonder_jest.Expect[/* toThrowMessage */21]("expect noWorker job config exist, but actual not", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                                    return NoWorkerJobConfigTool$Wonderjs.getInitPipelines(state[0]);
                                                                  })));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
